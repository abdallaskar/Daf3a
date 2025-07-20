import React, { useState, useEffect, useContext } from "react";
import WorkshopFilters from "./WorkshopFilters";
import {
  fetchWorkshops,
  markWorkshopAsCompleted,
} from "../../services/workshopService";
import { Link } from "react-router";
import { UserContext } from "../../contexts/ProfileContext";

function applyFilters(workshops, filters, search) {
  if (!Array.isArray(workshops)) return [];

  return workshops
    .filter((ws) => {
      if (search && !ws.title.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      if (
        filters.topic &&
        !ws.topic.toLowerCase().includes(filters.topic.toLowerCase())
      ) {
        return false;
      }
      if (
        (filters.language &&
          ws.language &&
          ws.language.toLowerCase() !== filters.language.toLowerCase()) ||
        !ws.language
      ) {
        return false;
      }
      if (
        filters.type &&
        ws.type &&
        ws.type.toLowerCase() !== filters.type.toLowerCase()
      ) {
        return false;
      }
      if (filters.date) {
        const wsDate = new Date(ws.date).toDateString();
        const filterDate = new Date(filters.date).toDateString();
        if (wsDate !== filterDate) {
          return false;
        }
      }
      if (filters.price) {
        if (filters.price === "Free" && !(ws.price == 0 || ws.price == null))
          return false;
        if (filters.price === "Paid" && !(ws.price > 0)) return false;
      }
      if (filters.location && ws.location) {
        let selectedType = filters.location;
        if (selectedType === "On-site") selectedType = "offline";
        if (selectedType === "Virtual") selectedType = "online";
        if (
          selectedType &&
          ws.type &&
          ws.type.toLowerCase() !== selectedType.toLowerCase()
        ) {
          return false;
        }
      }
      if (ws.status === "completed") return false;
      return true;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));
}

export default function Workshops() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    setLoading(true);
    fetchWorkshops()
      .then(async (data) => {
        const workshops = Array.isArray(data) ? data : [];
        const now = new Date();

        const toMark = workshops.filter((ws) => {
          if (ws.status !== "pending") return false;
          if (!ws.date || !ws.time) return false;

          const dateStr = ws.date.split("T")[0];
          const wsDateTime = new Date(`${dateStr}T${ws.time}`);
          return wsDateTime < now;
        });

        if (toMark.length > 0) {
          await Promise.all(
            toMark.map((ws) => markWorkshopAsCompleted(ws._id))
          );
          const updated = await fetchWorkshops();
          setWorkshops(Array.isArray(updated) ? updated : []);
        } else {
          setWorkshops(workshops);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filteredWorkshops = applyFilters(workshops, filters, search);

  return (
    <div className="min-h-screen">
      <main className="bg-background mx-auto mt-10 px-4 sm:px-6 lg:px-8 py-8">
        <WorkshopFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          search={search}
          onSearchChange={setSearch}
        />

        <div className="flex justify-between items-center mb-6 mt-6">
          <h1 className="text-3xl font-bold font-poppins text-primary">
            Workshops
          </h1>
        </div>

        <div className="min-h-[60vh] flex flex-col justify-center">
          {loading ? (
            <div className="text-center py-10 text-lg text-primary">
              Loading workshops...
            </div>
          ) : filteredWorkshops.length === 0 ? (
            <div className="text-center py-16 text-xl text-secondary">
              No workshops found. Try adjusting your filters or check back
              later.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-4 my-8">
              {filteredWorkshops.map((ws) => {
                const isFull =
                  Array.isArray(ws.registeredStudents) &&
                  Number(ws.capacity) > 0 &&
                  ws.registeredStudents.length >= Number(ws.capacity);

                const enrolledStudent = ws.registeredStudents?.find(
                  (s) => s?._id === user?._id
                );
                const isEnrolled = !!enrolledStudent;
                return (
                  <div
                    key={ws._id || ws.title}
                    className="bg-surface rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] flex flex-col"
                  >
                    <img
                      alt={ws.title}
                      className="w-full h-40 object-cover header-glass"
                      src={ws.image || "/public/Hero.jpg"}
                    />
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 mb-2">
                        {ws.language && (
                          <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold bg-gray-200 text-gray-800">
                            {ws.language}
                          </span>
                        )}
                        {ws.type && (
                          <span
                            className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                              ws.type === "online"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {ws.type === "online" ? "Virtual" : "On-site"}
                          </span>
                        )}
                        {ws.date && (
                          <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold bg-red-100 text-red-800">
                            {new Date(ws.date).toLocaleDateString()} {ws.time}
                          </span>
                        )}
                        {/* No status badge needed */}
                      </div>
                      <h3 className="text-lg font-bold font-poppins flex-grow text-primary">
                        {ws.title}
                      </h3>
                      <p className="text-sm text-secondary mb-3">
                        {ws.description}
                      </p>
                      <div className="flex items-center gap-3 mb-4">
                        {ws.mentor?.image && (
                          <img
                            alt="Mentor"
                            className="w-10 h-10 rounded-full"
                            src={ws.mentor.image}
                          />
                        )}
                        <div>
                          <p className="font-semibold text-sm">
                            {ws.mentor?.name}
                          </p>
                        </div>
                      </div>
                      <p className="text-xl font-bold mb-4 text-primary">
                        {ws.price === 0 || ws.price === "0" || !ws.price
                          ? "Free"
                          : `$${ws.price}`}
                      </p>
                      {isEnrolled ? (
                        <Link
                          to={`/workshops/${ws._id}`}
                          className="flex h-12 min-w-[110px] items-center justify-center rounded-lg px-6 text-base shadow-md bg-green-500 text-white font-bold "
                        >
                          Enrolled
                        </Link>
                      ) : isFull ? (
                        <button
                          className="flex h-12 min-w-[110px] items-center justify-center rounded-lg px-6 text-base shadow-md bg-gray-400 text-white font-bold cursor-not-allowed"
                          disabled
                        >
                          Full
                        </button>
                      ) : (
                        <Link
                          to={`/workshops/${ws._id}`}
                          className="flex h-12 min-w-[110px] items-center btn-primary justify-center rounded-lg px-6 text-base shadow-md btn-primary:hover"
                        >
                          Register
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
