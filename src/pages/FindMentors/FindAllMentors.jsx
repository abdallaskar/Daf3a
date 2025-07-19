import { IoIosArrowDropdown } from "react-icons/io";
import MentorCard from "./MentorCard";
import { useEffect, useState } from "react";
import { getAllMentors } from "../../services/getAllData";
import Loading from "../MentorDetails/Loading";

function FindAllMentors() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMentors = async () => {
      setLoading(true);
      try {
        const data = await getAllMentors();
        setMentors(data);
      } catch (error) {
        console.error("Failed to fetch mentors:", error);
      } finally {
        setLoading(false);
      }
    };
    getMentors();
  }, []);
  console.log(mentors);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <div className="flex flex-wrap gap-3">
        {[
          "Skills",
          "Industry",
          "Price Range",
          "Mentor Rating",
          "More Filters",
        ].map((filter) => (
          <button
            key={filter}
            className="flex items-center gap-2 bg-surface border border-default rounded-full px-4 py-2 text-sm font-medium text-secondary hover-surface transition-theme"
          >
            {filter}
            <IoIosArrowDropdown size={20} />
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {mentors.map((mentor) => (
          <MentorCard key={mentor._id} mentor={mentor} />
        ))}
      </div>
    </>
  );
}

export default FindAllMentors;
