import { useEffect, useState } from "react";
import { IoMdStar } from "react-icons/io";
import { Link, useParams } from "react-router";
import { getMentorById } from "../../services/MentorsService";

import { getMentorWorkshops } from "../../services/profileService";
import { getReviewsByTarget } from "../../services/getAllData";

import Loading from "../../components/Loading/Loading";
import { getAllMentorWorkshops } from "../../services/workshopService";
import WorkshopCard from "./WorkShopCard";


function MentorDetails() {
  const params = useParams();
  const mentorId = params.id;
  const [mentor, setMentor] = useState(null);
  const [workshops, setWorkshops] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMentorDetails = async () => {
      setLoading(true);
      try {
        const response = await getMentorById(mentorId);
        setMentor(response);
      } catch (error) {
        console.error("Failed to fetch mentor details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMentorDetails();

    const fetchMentorWorkshops = async () => {
      setLoading(true);
      try {
        const response = await getAllMentorWorkshops(mentorId);
        setWorkshops(response.data);
        console.log("Fetched mentor workshops:", response.data);
      } catch (error) {
        console.error("Failed to fetch mentor workshops:", error);
      } finally {
        setLoading(false);

      }
    };
    fetchMentorWorkshops();
    const fetchMentorReviews = async () => {

      setLoading(true);
      try {
        const response = await getReviewsByTarget("mentor", mentorId);
        setReviews(response);
      } catch (error) {
        console.error("Failed to fetch mentor reviews:", error);
      } finally {
        setLoading(false);

      }
    };
    fetchMentorReviews();
  }, []);
  if (loading) {
    return <Loading />;
  }
  return (
    <main className="container mx-auto bg-background px-4 sm:px-6 lg:px-8 py-12 flex-1">
      <div className="max-w-4xl mx-auto flex flex-col gap-12">
        <div className="card flex flex-col md:flex-row items-center gap-8 p-8">
          <div className="flex-shrink-0">
            <img
              className="rounded-full w-32 h-32 md:w-40 md:h-40 border-4 border-primary shadow-lg object-cover"
              src={
                mentor?.image ||
                " https://lh3.googleusercontent.com/aida-public/AB6AXuD_VZ7QHVmJL1SNmwyxbM3eqLcqUTTBtC_aiEZRsjKkLwnQNyFdOMWLG3p9FJ9QKBA9LM2PfhtC3qRvrJDVmhFVdDvwAdgT67f2n9bFdNv0qFJi0rCKFC2r0DhZ1EJZkBYfqnMdYDBBYrzoX41ZlFKLcuG-5P_ggiHnyM-mJMPgluhVRW8IEl4cbzYipalpVOIwwhI6RuRmfCY_6zVJbffN83wTCBqfkwjm2WgwNiGSbQrpMe_a5kRJSZpEArTOS8hVqror65ouONI"
              }
              alt={mentor?.name}
            />
          </div>
          <div className="text-center md:text-left flex-1">
            <h1 className="font-poppins text-3xl font-bold text-primary">
              {mentor?.name}
            </h1>
            <div className="flex gap-3 my-2 text-center items-center">
              {" "}
              <p className="text-lg text-brand ">{mentor?.title}</p>
              <p className="text-secondary">{mentor?.experience}</p>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-1 mt-3">
              <div className="flex text-amber">
                {[...Array(5)].map((_, i) => (
                  <IoMdStar
                    key={i}
                    size={20}
                    className={
                      i >= mentor?.rating ? "text-tertiary" : "text-amber-400"
                    }
                  />
                ))}
              </div>
              <span className="text-secondary font-medium">
                <span className="font-semibold me-2">{mentor?.rating}</span>{" "}
                {reviews?.length} Reviews
              </span>
            </div>
            <p className="text-brand mt-4 max-w-lg mx-auto md:mx-0">
              {mentor?.bio}
            </p>
            <div className="mt-6 text-primary">
              Languages:
              {mentor?.languages.map((lang) => (
                <span key={lang} className="text-secondary ms-2">
                  {lang}
                </span>
              ))}
            </div>

            <div className="mt-6">
              {mentor?.socialLinks?.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand hover:underline"
                >
                  {link.platform}
                </a>
              ))}
            </div>
          </div>
        </div>
        <section>
          <h2 className="font-poppins text-2xl font-bold text-primary mb-6">
            Skills & Expertise
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mentor?.expertise.map((exp) => (
              <div key={exp} className="card text-center p-6">
                <p className="font-semibold text-lg mb-2 text-primary">{exp}</p>
              </div>
            ))}
          </div>
        </section>
        <h2 className="font-poppins text-2xl font-bold text-primary mb-5">
          Upcoming Workshops
        </h2>
        {workshops?.length > 0 ? (
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {workshops?.map((workshop) => (
                <WorkshopCard key={workshop._id} workshop={workshop} />
              ))}
            </div>
          </section>
        ) : (
          <div>
            <p className="text-secondary text-center">
              No upcoming workshops at this time.
            </p>
          </div>
        )}
        <h2 className="font-poppins text-2xl font-bold text-primary mb-5">
          Reviews & Testimonials
        </h2>
        {reviews?.length > 0 ? (
          <section>
            <div className="space-y-6">
              {reviews.map((review) => (
                <div
                  key={review.author.name}
                  className="card border p-6 flex gap-4 items-start"
                >
                  <img
                    className="bg-center bg-no-repeat aspect-square object-cover rounded-full w-12 h-12"
                    src={review?.author.image}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-primary">
                          {review.author.name}
                        </p>
                        <p className="text-sm text-secondary">
                          {new Date(review?.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex text-amber">
                        {[...Array(5)].map((_, i) => (
                          <IoMdStar
                            key={i}
                            size={20}
                            className={
                              i >= mentor?.rating
                                ? "text-tertiary"
                                : "text-amber-400"
                            }
                          />
                        ))}
                      </div>
                    </div>
                    <p className="mt-3 text-brand">{review?.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <div>
            <p className="text-secondary text-center">
              No reviews available for this mentor yet.
            </p>
          </div>
        )}

        <div className="card text-center p-8">
          <h2 className="font-poppins text-2xl font-bold text-primary">
            Ready to level up your skills?
          </h2>
          <p className="text-secondary mt-2 mb-6">
            Book a one-on-one session with{" "}
            <span className="ms-1">{mentor?.name}</span> to get personalized
            guidance.
          </p>
          <Link to={`/chat`} className="btn-primary rounded-lg px-6 py-3 text-base font-semibold">
            Start conversation
          </Link>
        </div>
      </div>
    </main>
  );
}

export default MentorDetails;
