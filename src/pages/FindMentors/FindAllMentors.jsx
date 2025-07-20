import { IoIosArrowDropdown } from "react-icons/io";
import MentorCard from "./MentorCard";
import { useContext, useEffect, useState } from "react";
import { getAllMentors } from "../../services/getAllData";
import Loading from "../../components/Loading/Loading";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { getRecommendedMentors } from "../../services/MentorsService";
import { IoSearch } from "react-icons/io5";
import { getArrayFromNumbers } from "../../utils/Numbers";
import { set } from "react-hook-form";

function FindAllMentors() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [filteredExpertise, setFilteredExpertise] = useState("");
  const [filteredIndustry, setFilteredIndustry] = useState("");
  const [filteredPrice, setFilteredPrice] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    setActivePage(1);
  }, [filteredExpertise, filteredIndustry, filteredPrice, searchQuery]);
  useEffect(() => {
    if (user.isRegistered && user.role === "student") {
      const getMentors = async () => {
        setLoading(true);
        try {
          // const data = await getRecommendedMentors();
          const response = await getAllMentors();
          console.log("Response:", response);
          // console.log("Recommended Mentors:", data.data.recommendedMentors)
          setMentors(response);
          // setMentors(data.data.recommendedMentors);
        } catch (error) {
          console.error("Failed to fetch mentors:", error);
        } finally {
          setLoading(false);
        }
      };
      getMentors();
    } else {
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
    }
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

  let filteredMentors = mentors.filter((mentor) => {
    const expertiseMatch = filteredExpertise
      ? mentor.expertise.includes(filteredExpertise)
      : true;
    const industryMatch = filteredIndustry
      ? mentor.title?.includes(filteredIndustry)
      : true;
    const priceMatch = filteredPrice
      ? filteredPrice === "free"
        ? mentor.price === 0
        : mentor.price > 0
      : true;
    const searchMatch = searchQuery
      ? mentor.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    // Combine all conditions
    return searchMatch && expertiseMatch && industryMatch && priceMatch;
  });
  //Pagination
  const pageSize = 4;
  const noOfPages = Math.ceil(filteredMentors.length / pageSize);
  const pages = getArrayFromNumbers(noOfPages);
  const start = (activePage - 1) * pageSize;
  const end = start + pageSize;
  filteredMentors = filteredMentors.slice(start, end);
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <div className="relative">
        <input
          className="w-full pl-10 pr-4 py-4 rounded-full border-2 border-input focus:outline-none focus:border-primary transition-colors"
          placeholder="Search mentors by name"
          type="text"
          onChange={(e) => setSearchQuery(e.target.value)}
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
      {noOfPages > 1 && (
        <div class="flex items-center justify-center space-x-1 p-8">
          {pages.map((page) => (
            <span
              onClick={() => setActivePage(page)}
              key={page}
              className={`text-sm font-bold cursor-pointer leading-normal flex size-10 items-center justify-center text-white rounded-full ${activePage === page
                ? "bg-primary"
                : "bg-surface border border-default text-primary hover-primary hover:!text-white "
                }`}
            >
              {page}
            </span>
          ))}
        </div>
      )}
    </>
  );
}

export default FindAllMentors;

// {
//     "success": true,
//     "data": {
//         "recommendedMentors": [
//             {
//                 "_id": "66dcb0014f2b8509a1c1a11d",
//                 "name": "Eng. Maha Farouk",
//                 "email": "mentor2@example.com",
//                 "password": "$2b$10$Nm2Eyd7u8/N3gUweiWkgB.69ml3uGeZv99QJXZK6sjN.y/YYgNsQG",
//                 "role": "mentor",
//                 "phoneNumber": "01000000013",
//                 "image": "",
//                 "title": "Product Design Mentor",
//                 "bio": "Maha empowers learners with strong foundations in UX and human-centered design.",
//                 "preferredLanguage": [
//                     "english"
//                 ],
//                 "isRegistered": true,
//                 "skills": [],
//                 "expertise": [
//                     "UI/UX",
//                     "Design Thinking",
//                     "React",
//                     "Project Management"
//                 ],
//                 "links": [],
//                 "experience": "7 years in product design",
//                 "languages": [
//                     "Arabic",
//                     "English"
//                 ],
//                 "availability": [],
//                 "rating": 5,
//                 "verified": true,
//                 "cvs": [],
//                 "createdAt": "2025-07-19T06:06:45.870Z",
//                 "updatedAt": "2025-07-20T08:02:54.764Z",
//                 "__v": 12,
//                 "price": 50
//             }
//         ],
//         "recommendedWorkshops": [
//             {
//                 "_id": "687b35f39815c0dc4b3803e7",
//                 "title": "UX/UI Bootcamp",
//                 "description": "Master the principles of user experience and interface design.",
//                 "date": "2025-08-03T00:00:00.000Z",
//                 "time": "17:00",
//                 "location": "Cairo Design Hub",
//                 "type": "offline",
//                 "price": 150,
//                 "language": "English",
//                 "rating": 4,
//                 "topic": "Design",
//                 "mentor": "66dcb0014f2b8509a1c1a11d",
//                 "capacity": 20,
//                 "registeredStudents": [
//                     "66aaf9949f1a6b13e4e19b26",
//                     "66aaf9949f1a6b13e4e19b27",
//                     "687c220aa6677e2ff1abcdf6"
//                 ],
//                 "createdAt": "2025-07-19T06:06:43.252Z",
//                 "updatedAt": "2025-07-19T23:10:58.284Z",
//                 "__v": 1,
//                 "image": ""
//             }
//         ]
//     }
// }
