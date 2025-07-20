import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router";
import {
  fetchWorkshopDetails,
  registerToWorkshop,
} from "../../services/workshopService";
import { UserContext } from "../../contexts/ProfileContext";

export default function WorkshopDetails() {
  const { id } = useParams();
  const [workshop, setWorkshop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [registering, setRegistering] = useState(false);
  const [registerMsg, setRegisterMsg] = useState("");
  const { user } = useContext(UserContext);

  const refreshWorkshop = () => {
    setLoading(true);
    fetchWorkshopDetails(id)
      .then((data) => setWorkshop(data))
      .catch(() => setError("Failed to load workshop details."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    refreshWorkshop();
  }, [id]);

  if (loading)
    return (
      <div className="text-center py-10 text-lg text-primary">
        Loading workshop details...
      </div>
    );
  if (error || !workshop)
    return (
      <div className="text-center py-10 text-lg text-red-500">
        {error || "Workshop not found."}
      </div>
    );

  const isFull =
    Array.isArray(workshop.registeredStudents) &&
    Number(workshop.capacity) > 0 &&
    workshop.registeredStudents.length >= Number(workshop.capacity);
  const isEnrolled =
    user &&
    Array.isArray(workshop.registeredStudents) &&
    workshop.registeredStudents.some((s) =>
      typeof s === "string" ? s === user._id : s?._id === user._id
    );

  const handleRegister = async () => {
    setRegistering(true);
    setRegisterMsg("");
    try {
      await registerToWorkshop(id);
      setRegisterMsg("Successfully registered!");
      refreshWorkshop();
    } catch (err) {
      setRegisterMsg(
        err?.response?.data?.message || "Failed to register. Please try again."
      );
    } finally {
      setRegistering(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex justify-center py-10 px-4 pt-15">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Workshop Image */}
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center overflow-hidden">
          <img
            src={workshop.image || "/public/Hero.jpg"}
            alt={workshop.title}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {/* Title */}
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-primary font-poppins">
              {workshop.title}
            </h1>
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                workshop.status === "completed"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {workshop.status.charAt(0).toUpperCase() +
                workshop.status.slice(1)}
            </span>
          </div>

          {/* Description */}
          <p className="text-base text-gray-700 mb-6 leading-relaxed">
            {workshop.description}
          </p>

          <hr className="my-4" />

          {/* Mentor & Date/Time */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            {/* Mentor Info */}
            <div className="flex items-center gap-4">
              <img
                src={workshop.mentor?.image || "/default-avatar.png"}
                alt="Mentor"
                className="w-14 h-14 rounded-full object-cover border"
              />
              <div>
                <p className="text-lg font-semibold text-primary">
                  {workshop.mentor?.name}
                </p>
                <p className="text-sm text-gray-500">Mentor</p>
              </div>
            </div>

            {/* Date & Language */}
            <div className="flex flex-col items-start sm:items-end">
              <span className="bg-red-100 text-red-800 text-sm font-semibold px-4 py-1 rounded-full mb-1">
                {new Date(workshop.date).toLocaleDateString()} – {workshop.time}
              </span>
              <span className="bg-gray-200 text-gray-800 text-xs font-medium px-3 py-1 rounded-full">
                {workshop.language}
              </span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Detail label="Topic" value={workshop.topic} />
              <Detail
                label="Type"
                value={workshop.type === "online" ? "Virtual" : "On-site"}
              />
              <Detail
                label="Location"
                value={
                  workshop.location ||
                  (workshop.type === "online" ? "Online" : "-")
                }
              />
            </div>
            <div className="space-y-2">
              <Detail
                label="Price"
                value={workshop.price > 0 ? `$${workshop.price}` : "Free"}
              />
              <Detail label="Capacity" value={workshop.capacity} />
              <Detail
                label="Booked"
                value={workshop.registeredStudents?.length || 0}
              />
              <Detail
                label="Available"
                value={
                  workshop.capacity - (workshop.registeredStudents?.length || 0)
                }
              />
            </div>
          </div>

          <hr className="my-4" />

          {/* Register Button */}
          <div className="flex flex-col items-center mt-6 gap-2">
            {isFull ? (
              <button
                className="bg-gray-400 text-white font-bold rounded-full px-6 py-3 cursor-not-allowed"
                disabled
              >
                Workshop Full
              </button>
            ) : isEnrolled ? (
              <button
                className="bg-green-500 text-white font-bold rounded-full px-6 py-3 cursor-not-allowed"
                disabled
              >
                Enrolled
              </button>
            ) : registerMsg === "Successfully registered!" ? (
              <>
                <div className="text-green-600 text-center text-base font-semibold mb-2">
                  Successfully registered!
                </div>
                <Link
                  to="/workshops"
                  className="bg-primary text-white font-bold rounded-full px-6 py-3 hover:bg-primary/90 transition text-center"
                >
                  Go Back
                </Link>
              </>
            ) : (
              <button
                className="bg-primary text-white font-bold rounded-full px-6 py-3 hover:bg-primary/90 transition"
                onClick={handleRegister}
                disabled={registering}
              >
                {registering ? "Registering..." : "Confirm Registration"}
              </button>
            )}
            {registerMsg && registerMsg !== "Successfully registered!" && (
              <div className="text-red-500 text-center text-sm">
                {registerMsg}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <p className="text-sm text-gray-700">
      <span className="font-semibold">{label}:</span> {value}
    </p>
  );
}
