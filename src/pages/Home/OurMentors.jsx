import { useEffect, useState } from "react";
import { getAllMentors } from "../../services/getAllData";

function OurMentors() {
  const [mentors, setMentors] = useState([]);
  useEffect(() => {
    const getMentors = async () => {
      try {
        const mentors = await getAllMentors();
        setMentors(mentors);
      } catch (error) {
        console.error("Error fetching mentors:", error);
      }
    };
    getMentors();
  }, []);
  const sortedMentors = [...mentors].sort((a, b) => b.rating - a.rating);
  const mentorList = sortedMentors.slice(0, 4);
  return (
    <>
      <section className="bg-surface py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-poppins text-3xl text-primary font-bold sm:text-4xl">
              Meet Our Mentors
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-secondary">
              Get guidance from the best in the industry.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {mentorList.map((mentor) => (
              <div
                key={mentor._id}
                className="group overflow-hidden rounded-lg card card
                hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  alt={mentor.name}
                  className="h-56 w-full object-cover"
                  src={mentor.image || "https://via.placeholder.com/150"}
                />
                <div className="p-6">
                  <h3 className="font-poppins text-primary text-lg font-semibold">
                    {mentor.name}
                  </h3>
                  <p className="text-secondary">{mentor.expertise}</p>
                  <div className="mt-4">
                    <span className="inline-block bg-primary text-white text-xs font-semibold px-2 py-1 rounded-full">
                      {mentor.rating} / 5
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default OurMentors;
