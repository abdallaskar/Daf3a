import { IoIosArrowDropdown } from "react-icons/io";
import MentorCard from "./MentorCard";
import { useContext, useEffect, useState } from "react";
import { getAllMentors } from "../../services/getAllData";
import Loading from "../../components/Loading/Loading";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { getRecommendedMentors } from "../../services/MentorsService";
import { IoSearch } from "react-icons/io5";

function FindAllMentors() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [filteredExpertise, setFilteredExpertise] = useState("");
  const [filteredIndustry, setFilteredIndustry] = useState("");
  const [filteredPrice, setFilteredPrice] = useState("");

  useEffect(() => {
    // if (user.isRegistered) {
    //   const getMentors = async () => {
    //     setLoading(true);
    //     try {
    //       const data = await getRecommendedMentors();

    //       setMentors(data.data.mentors);
    //     } catch (error) {
    //       console.error("Failed to fetch mentors:", error);
    //     } finally {
    //       setLoading(false);
    //     }
    //   };
    //   getMentors();
    // } else {
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
    // }
  }, []);

  //Filters Select
  const MentorExpertise = new Set(
    mentors.flatMap((mentor) => mentor.expertise)
  );
  const MentorsIndustries = new Set(
    mentors
      .map((mentor) => mentor.title?.trim())
      .filter((title) => title)
      .map((title) => title.split(" ").slice(0, 2).join(" "))
  );

  const filteredMentors = mentors.filter((mentor) => {
    return (
      (filteredExpertise === "" ||
        mentor.expertise.includes(filteredExpertise)) &&
      (filteredIndustry === "" || mentor.title?.includes(filteredIndustry)) &&
      (filteredPrice === "" ||
        (filteredPrice === "free" ? mentor.price === 0 : mentor.price > 0))
    );
  });

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <div className="relative">
        <input
          className="w-full pl-10 pr-4 py-4 rounded-full border-2 border-input focus:outline-none focus:border-primary transition-colors"
          placeholder="Search by skill, industry, or mentor name"
          type="text"
          // onChange={(e) => {
          //   handleSearch(e.target.value);
          // }}
        />
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <IoSearch className="text-primary" />
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <select
          className="border-2 border-input rounded-full py-2 px-4"
          name="Expertise"
          id=""
          onChange={(e) => setFilteredExpertise(e.target.value)}
        >
          <option value="">Select Expertise</option>
          {Array(...MentorExpertise).map((skill) => {
            return (
              <option key={skill} value={skill}>
                {skill}
              </option>
            );
          })}
        </select>
        <select
          className="border-2 border-input rounded-full py-2 px-4"
          name="Industry"
          id=""
          onChange={(e) => setFilteredIndustry(e.target.value)}
        >
          <option value="">Select Industry</option>
          {Array(...MentorsIndustries).map((industry) => {
            return (
              <option key={industry} value={industry}>
                {industry}
              </option>
            );
          })}
        </select>
        <select
          className="border-2 border-input rounded-full py-2 px-4"
          name="Price"
          id=""
          onChange={(e) => setFilteredPrice(e.target.value)}
        >
          <option value="">Select Price</option>
          <option value="free">Free</option>
          <option value="paid">Paid</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredMentors?.map((mentor) => (
          <MentorCard key={mentor._id} mentor={mentor} />
        ))}
      </div>
    </>
  );
}

export default FindAllMentors;
