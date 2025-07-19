import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { fetchWorkshopDetails } from "../../services/workshopService";

export default function WorkshopDetails() {
  const { id } = useParams();
  const [workshop, setWorkshop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchWorkshopDetails(id)
      .then((data) => setWorkshop(data))
      .catch(() => setError("Failed to load workshop details."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="text-center py-10 text-lg text-primary">
        Loading workshop details...
      </div>
    );
  if (error || !workshop)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white border rounded-xl p-6">
        {/* Title and Description */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold text-primary mb-2">
            {workshop.title}
          </h2>
          <p className="text-sm text-gray-700">{workshop.description}</p>
        </div>

        {/* Date & Time */}
        <div>
          <p className="text-sm text-gray-500">
            📅 {new Date(workshop.date).toLocaleDateString()} at 🕒{" "}
            {workshop.time}
          </p>
        </div>

        {/* Mentor Info */}
        <div className="flex items-center gap-3">
          <img
            src={workshop.mentor?.image || "/default-avatar.png"}
            alt="Mentor"
            className="w-10 h-10 rounded-full object-cover border"
          />
          <div>
            <p className="text-sm font-medium text-primary">
              {workshop.mentor?.name}
            </p>
            <p className="text-xs text-gray-500">Mentor</p>
          </div>
        </div>

        {/* Topic & Language */}
        <div>
          <p className="text-sm text-gray-700">
            📚 Topic: <span className="font-medium">{workshop.topic}</span>
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-700">
            🌐 Language:{" "}
            <span className="font-medium">{workshop.language}</span>
          </p>
        </div>

        {/* Type & Location */}
        <div>
          <p className="text-sm text-gray-700">
            🏷️ Type:{" "}
            <span className="capitalize font-medium">{workshop.type}</span>
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-700">
            📍 Location:{" "}
            <span className="font-medium">{workshop.location}</span>
          </p>
        </div>

        {/* Price */}
        <div>
          <p className="text-sm text-gray-700">
            💵 Price:{" "}
            <span className="font-semibold">
              {workshop.price > 0 ? `$${workshop.price}` : "Free"}
            </span>
          </p>
        </div>

        {/* Capacity Details */}
        <div>
          <p className="text-sm text-gray-700">
            👥 Capacity:{" "}
            <span className="font-medium">{workshop.capacity}</span> <br />✅
            Booked:{" "}
            <span className="text-green-600">
              {workshop.registeredStudents.length}
            </span>{" "}
            <br />
            🪑 Available:{" "}
            <span className="text-blue-600">
              {workshop.capacity - workshop.registeredStudents.length}
            </span>
          </p>
        </div>
      </div>
    );
}
