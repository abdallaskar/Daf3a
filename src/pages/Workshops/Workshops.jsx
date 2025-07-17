import React, { useState, useEffect } from "react";
import WorkshopFilters from "./WorkshopFilters";
import { fetchWorkshops } from "../../services/workshopService";

export default function Workshops() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("Soonest");
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);

  // Handler for filter changes
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Fetch workshops from backend
  useEffect(() => {
    setLoading(true);
    fetchWorkshops({ ...filters, search, sort })
      .then((data) => setWorkshops(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, [filters, search, sort]);

  // Filtering logic (client-side fallback, can be removed if backend handles all)
  const filteredWorkshops = Array.isArray(workshops)
    ? workshops.filter((ws) => {
        if (search && !ws.title.toLowerCase().includes(search.toLowerCase())) {
          return false;
        }
        if (
          filters.skill &&
          !ws.title.toLowerCase().includes(filters.skill.toLowerCase())
        ) {
          return false;
        }
        if (
          filters.language &&
          ws.language &&
          ws.language !== filters.language
        ) {
          return false;
        }
        // Add more filter logic as needed for topic, date, price, mentorRating, location
        return true;
      })
    : [];

  return (
    <div className="min-h-screen">
      <main className="bg-background mx-auto mt-10 px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters Component */}
        <WorkshopFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          search={search}
          onSearchChange={setSearch}
          sort={sort}
          onSortChange={setSort}
        />
        {/* Title */}
        <div className="flex justify-between items-center mb-6 mt-6">
          <h1 className="text-3xl font-bold font-poppins text-primary">
            Workshops
          </h1>
        </div>
        {/* Workshops Grid */}
        {loading ? (
          <div className="text-center py-10 text-lg text-primary">
            Loading workshops...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-4 my-8">
            {filteredWorkshops.map((ws) => (
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
                  </div>
                  <h3 className="text-lg font-bold font-poppins flex-grow text-primary">
                    {ws.title}
                  </h3>
                  <p className="text-sm text-secondary mb-3">
                    {ws.description}
                  </p>
                  <div className="flex items-center gap-3 mb-4">
                    {ws.mentor && ws.mentor.image && (
                      <img
                        alt="Mentor"
                        className="w-10 h-10 rounded-full"
                        src={ws.mentor.image}
                      />
                    )}
                    <div>
                      <p className="font-semibold text-sm">
                        {ws.mentor && ws.mentor.name}
                      </p>
                      {/* Optionally add mentor rating/reviews here */}
                    </div>
                  </div>
                  <p className="text-xl font-bold mb-4 text-primary">
                    {ws.price === 0 || ws.price === "0" || !ws.price
                      ? "Free"
                      : ws.price
                      ? `$${ws.price}`
                      : ""}
                  </p>
                  <a
                    className="flex h-12 min-w-[110px] items-center btn-primary justify-center rounded-lg px-6 text-base  shadow-md btn-primary:hover"
                    href="#"
                  >
                    Register
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
