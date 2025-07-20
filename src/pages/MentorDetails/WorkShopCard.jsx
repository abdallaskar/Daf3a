import { Link } from "react-router";

function WorkshopCard({ workshop }) {
  const spotsLeft =
    workshop.capacity - (workshop.registeredStudents?.length || 0);

  return (
    <div className="card overflow-hidden rounded-xl shadow-md flex flex-col transition hover:shadow-lg">
      <img
        className="w-full h-40 object-cover"
        src={workshop.image}
        alt={workshop.title}
      />
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-primary line-clamp-1">
          {workshop.title}
        </h3>

        <p className="text-sm text-secondary mt-1 line-clamp-2">
          {workshop.description}
        </p>

        <div className="text-xs text-secondary mt-3 space-y-1 w-[90%]">
          <div className="grid grid-cols-2 gap-4">
            {" "}
            <p>
              🗓 {new Date(workshop.date).toLocaleDateString()} | ⏰{" "}
              {workshop.time}
            </p>
            <p>📍 {workshop.location}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {" "}
            <p>🗣️ {workshop.language}</p>
            <p>💰 {workshop.price === 0 ? "Free" : `${workshop.price} EGP`}</p>
          </div>

          <p>👥 {spotsLeft} spots left</p>
        </div>

        <Link
          to={`/workshops/${workshop._id}`}
          className="btn-secondary mt-4 text-center text-sm px-4 py-2 rounded-lg font-medium"
        >
          Join Workshop
        </Link>
      </div>
    </div>
  );
}

export default WorkshopCard;
