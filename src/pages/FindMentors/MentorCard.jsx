import { MdOutlineVerified } from "react-icons/md";
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router";
function MentorCard({ mentor }) {
  return (
    <>
      <div className="bg-surface rounded-xl card p-4 flex flex-col">
        <div className="relative">
          <img
            alt={mentor.name}
            className="w-full h-48 object-cover rounded-t-xl"
            src={mentor.image}
          />
          {mentor.verified && (
            <div className="absolute top-2 right-2 bg-amber-accent text-inverse p-1 rounded-full">
              <MdOutlineVerified size={20} color="yellow" />
            </div>
          )}
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="font-bold text-lg font-poppins text-primary">
            {mentor.name}
          </h3>
          <p className="text-secondary text-sm mb-2">
            {mentor.title} @ {mentor.company}
          </p>
          <div className="flex items-center gap-1 text-amber mb-2">
            <FaStar size={17} fill="#f59e0b" />
            <span className="font-bold">{mentor.rating}</span>
            <span className="text-xs text-tertiary">
              ({mentor.reviewCount})
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {mentor.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-surface-hover text-secondary text-xs font-medium px-2.5 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
          <div className="mt-auto flex flex-col gap-2">
            <Link to={`/mentor/booking`} className="btn-primary rounded-lg px-4 py-2 text-sm font-semibold">
              Book Session
            </Link>
            <Link
              to={`/mentorDetails/${mentor.id}`}
              className="btn-secondary text-brand border border-primary rounded-lg px-4 py-2 text-sm font-semibold   "
            >
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default MentorCard;
