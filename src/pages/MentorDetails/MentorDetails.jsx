import { useEffect, useState } from "react";
import { IoMdStar } from "react-icons/io";
import { useParams } from "react-router";
import { getMentorById } from "../../services/MentorsService";

function MentorDetails() {
  const params = useParams();
  const mentorId = params.id;
  const [mentor, setMentor] = useState(null);
  useEffect(() => {
    const fetchMentorDetails = async () => {
      try {
        const response = await getMentorById(mentorId);
        console.log(response);
        setMentor(response);
      } catch (error) {
        console.error("Failed to fetch mentor details:", error);
      }
    };
    fetchMentorDetails();
  }, []);
  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
      <div className="max-w-4xl mx-auto flex flex-col gap-12">
        <div className="card flex flex-col md:flex-row items-center gap-8 p-8">
          <div className="flex-shrink-0">
            <img
              className="rounded-full w-32 h-32 md:w-40 md:h-40 border-4 border-primary shadow-lg object-cover"
              src={
                mentor?.profilePicture ||
                " https://lh3.googleusercontent.com/aida-public/AB6AXuD_VZ7QHVmJL1SNmwyxbM3eqLcqUTTBtC_aiEZRsjKkLwnQNyFdOMWLG3p9FJ9QKBA9LM2PfhtC3qRvrJDVmhFVdDvwAdgT67f2n9bFdNv0qFJi0rCKFC2r0DhZ1EJZkBYfqnMdYDBBYrzoX41ZlFKLcuG-5P_ggiHnyM-mJMPgluhVRW8IEl4cbzYipalpVOIwwhI6RuRmfCY_6zVJbffN83wTCBqfkwjm2WgwNiGSbQrpMe_a5kRJSZpEArTOS8hVqror65ouONI"
              }
              alt={mentor?.name}
            />
          </div>
          <div className="text-center md:text-left flex-1">
            <h1 className="font-poppins text-3xl font-bold text-primary">
              {mentor?.name}
            </h1>
            <p className="text-lg text-secondary mt-1">{mentor?.title}</p>
            <div className="flex items-center justify-center md:justify-start gap-1 mt-3">
              <div className="flex text-amber">
                {[...Array(5)].map(() => (
                  <IoMdStar size={20} />
                ))}
              </div>
              <span className="text-secondary font-medium">
                <span className="font-semibold me-2">{mentor?.rating}</span>{" "}
                (125 reviews)
              </span>
            </div>
            <p className="text-primary mt-4 max-w-lg mx-auto md:mx-0">
              {mentor?.bio}
            </p>
          </div>
        </div>
        <section>
          <h2 className="font-poppins text-2xl font-bold text-primary mb-6">
            Skills & Expertise
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mentor?.expertise.map((exp) => (
              <div key={exp} className="card text-center p-6">
                <p className="font-semibold text-lg mb-2 text-primary">
                  {exp}
                </p>
              </div>
            ))}
          </div>
        </section>
        {/* Upcoming Workshops */}
        <section>
          <h2 className="font-poppins text-2xl font-bold text-primary mb-6">
            Upcoming Workshops
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Effective Teaching Methods",
                desc: "Learn innovative teaching techniques to enhance student engagement.",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuANRCbzxtKZTv9S8FfmmgjtiRMTqSuzYbRLVZwUQ4a2wBXSqwnARuDrmgVNSnC2NJ4IP6eSp86b2ZbqwGyVuzI0xxg1akW9T3-i-qP02CHdpJgloGn9uDZEDp2MTkms1CZgZYhHXj1aq5nlUks0LSmf5UsRQHOjcsPW33oc7NnLKYF7Osv7GkVKk0IV9hfW--vxOBvO7Pd5Ld_FlwJO3AvA8t3jcNdCqlSnFA4fndxjAtGNn6x6bFa86DflIdhAfz9t_8PLXm9XGyk",
              },
              {
                title: "Designing Engaging Online Courses",
                desc: "Master the art of creating captivating online learning experiences.",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFGuxmZzTIgrx818fl0hLDlIkRODwmXRF3TidGDP6ck7BHbtR5g4gIxl_HmrzPaywsG3o5LBrp_xLs_G035ndedS-SWEdqEp7Cp-Qy4u18d6y9gNBzOdv30vWKCMu1Ra3T_UV8LARjnHxmrmXjN-Qm6fF-Wt7C5eA1ST4ZdUW7fWsl8bFeMaPekTOzGtLTbOGbwNdK7ZESJ7-l1YuTLNGbyqRfZyHUOXksplGF1uNXAmJDsKftGpKL5VFnpyIj_M3d_iVSfR-6nZ4",
              },
            ].map(({ title, desc, img }) => (
              <div
                key={title}
                className="card overflow-hidden p-0 flex flex-col"
              >
                <img
                  className="w-full aspect-video object-cover"
                  src={img}
                  alt={title}
                />
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-poppins text-xl font-semibold text-primary mb-2">
                    {title}
                  </h3>
                  <p className="text-secondary mb-4">{desc}</p>
                  <button className="btn-secondary rounded-lg px-4 py-2 text-sm font-semibold mt-auto">
                    Join Workshop
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* Reviews & Testimonials */}
        <section>
          <h2 className="font-poppins text-2xl font-bold text-primary mb-6">
            Reviews & Testimonials
          </h2>
          <div className="space-y-6">
            {[
              {
                name: "Liam Carter",
                date: "2023-08-15",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBixUaijz5tEGBv5-aQ-y47RyqEHeEDpTXf2p2BEc12EUDfpW1hYksNgX9ftrceM0pb6dmq-wmyD8Gg8t434dA_Z2AopC2kte8c3bxRq0xZJvioBx3vGzx79QpV_Knr_RaSuxGJklJICpKlGA6YYHe1VCkaK9iv_eCZNOsLa47t1c-qWNWRdNnk099bsyU1EUyAFfpQqpaoeJePhOFjfStehCrYeJ-JRFD6QLD0ubFvOCFtG0KBTU-27HUrrgGk8Sf6_Six962L_78",
                stars: 5,
                review:
                  "Dr. Sharma's workshop on effective teaching methods was incredibly insightful. I learned practical strategies that I could immediately apply in my classroom.",
              },
              {
                name: "Sophia Bennett",
                date: "2023-09-22",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-4a0s-iB7BdTdTwPtny-BM7q0bZTJTOHV7SUo-_7_cz2vyA5qy0M4fUn3OjBgxpxqgh71vIDgsdrGrRG4niPQqPfg3VbFkkG10l-qVuurs0wC6dZ5UKRHoX5DYb_sgftRhkUZl9D8t9dDxOSoFUNkNKEyK5DC_VjfDMz5S_YlGC1g5EwARh9xssqKCUoS5drVk8PixaDANtxQj_YVjEhe2RJ7s1BIKUABQ-J4jWWGp6jBw0enRhXNhWk9DASB88RqibDgBus5aE4",
                stars: 4,
                review:
                  "The online course design workshop was helpful, but I felt it could have been more interactive. Overall, a good learning experience.",
              },
            ].map(({ name, date, img, stars, review }) => (
              <div
                key={name}
                className="card border p-6 flex gap-4 items-start"
              >
                <img
                  className="bg-center bg-no-repeat aspect-square object-cover rounded-full w-12 h-12"
                  src={img}
                  alt={name}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-primary">{name}</p>
                      <p className="text-sm text-secondary">{date}</p>
                    </div>
                    <div className="flex text-amber">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i >= stars ? "text-tertiary" : ""
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="mt-3 text-primary">{review}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* Call to Action */}
        <div className="card text-center p-8">
          <h2 className="font-poppins text-2xl font-bold text-primary">
            Ready to level up your skills?
          </h2>
          <p className="text-secondary mt-2 mb-6">
            Book a one-on-one session with Dr. Sharma to get personalized
            guidance.
          </p>
          <button className="btn-primary rounded-lg px-6 py-3 text-base font-semibold">
            Start conversation
          </button>
        </div>
      </div>
    </main>
  );
}

export default MentorDetails;
