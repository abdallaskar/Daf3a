import { useContext, useEffect, useState } from "react";
import { IoMdStar } from "react-icons/io";
import { Link, useParams } from "react-router";
import { getMentorById } from "../../services/MentorsService";

import { getMentorWorkshops } from "../../services/profileService";
import { getReviewsByTarget } from "../../services/getAllData";
import { createReview } from "../../services/reviewService";

import Loading from "../../components/Loading/Loading";
import { getAllMentorWorkshops } from "../../services/workshopService";
import WorkshopCard from "./WorkShopCard";
import { AuthContext } from "../../contexts/AuthContextProvider";

function MentorDetails() {
  const { user } = useContext(AuthContext);
  const params = useParams();
  const mentorId = params.id;
  const [mentor, setMentor] = useState(null);
  const [workshops, setWorkshops] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] = useState(true);

  const [reviewComment, setReviewComment] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState("");
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  // Get the latest 5 reviews
  const latestReviews = reviews
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const nextReview = () => {
    setCurrentReviewIndex((prev) =>
      prev === latestReviews.length - 1 ? 0 : prev + 1
    );
  };

  const prevReview = () => {
    setCurrentReviewIndex((prev) =>
      prev === 0 ? latestReviews.length - 1 : prev - 1
    );
  };

  // Reset index when reviews change
  useEffect(() => {
    setCurrentReviewIndex(0);
  }, [reviews.length]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewSubmitting(true);
    setReviewError("");
    setReviewSuccess("");
    try {
      console.log("User object:", user);
      console.log("User ID:", user._id || user.id);
      console.log("Review data being sent:", {
        targetType: "mentor",
        targetId: mentorId,
        comment: reviewComment,
        rating: reviewRating,
        authorId: user._id || user.id,
      });

      await createReview({
        targetType: "mentor",
        targetId: mentorId,
        comment: reviewComment,
        rating: reviewRating,
        authorId: user._id || user.id,
      });
      setReviewSuccess("Review submitted!");
      setReviewComment("");
      setReviewRating(0);
      // Refresh reviews
      const response = await getReviewsByTarget("mentor", mentorId);
      setReviews(response);
    } catch (error) {
      console.error("Review submission error:", error);
      console.error("Error details:", error.response?.data);
      setReviewError("Failed to submit review. Please try again.");
    } finally {
      setReviewSubmitting(false);
    }
  };

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
  const hasReviewed = reviews.some(
    (r) => (r.author._id || r.author.id) === (user._id || user.id)
  );
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
        {/* Review Form */}
        <section className="mb-8">
          {hasReviewed ? (
            <div className="text-green-700 bg-green-100 p-4 rounded text-center font-semibold">
              You have already submitted a review for this mentor.
            </div>
          ) : (
            <form
              onSubmit={handleReviewSubmit}
              className="card border p-6 flex flex-col gap-4 mb-6"
            >
              <div className="flex items-center gap-2">
                <span className="font-semibold text-primary">Your Rating:</span>
                <div className="flex text-amber">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setReviewRating(star)}
                      className="focus:outline-none"
                    >
                      <IoMdStar
                        size={24}
                        className={
                          star <= reviewRating
                            ? "text-amber-400"
                            : "text-tertiary"
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                className="input-field w-full border border-input rounded-md p-3 text-secondary bg-background"
                placeholder="Write your review..."
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                rows={3}
                required
                disabled={reviewSubmitting}
              />
              <div className="flex justify-end gap-4">
                {reviewError && (
                  <span className="text-red-600 text-sm">{reviewError}</span>
                )}
                {reviewSuccess && (
                  <span className="text-green-600 text-sm">
                    {reviewSuccess}
                  </span>
                )}
                <button
                  type="submit"
                  className="btn-primary px-6 py-2 rounded"
                  disabled={
                    reviewSubmitting ||
                    reviewRating === 0 ||
                    !reviewComment.trim()
                  }
                >
                  {reviewSubmitting ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </form>
          )}
        </section>
        {reviews?.length > 0 ? (
          <section>
            <div className="relative">
              {/* Review Slider */}
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{
                    transform: `translateX(-${currentReviewIndex * 100}%)`,
                  }}
                >
                  {latestReviews.map((review, index) => (
                    <div
                      key={review.author.name}
                      className="card border p-6 flex gap-4 items-start min-w-full"
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
                                  i >= review?.rating
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
              </div>

              {/* Navigation Buttons */}
              {latestReviews.length > 1 && (
                <>
                  <button
                    onClick={prevReview}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors mt-4"
                  >
                    <svg
                      className="w-6 h-6 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={nextReview}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors mt-4"
                  >
                    <svg
                      className="w-6 h-6 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </>
              )}

              {/* Dots Indicator */}
              {latestReviews.length > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                  {latestReviews.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentReviewIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentReviewIndex
                          ? "bg-primary"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                    />
                  ))}
                </div>
              )}
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
          <button className="btn-primary rounded-lg px-6 py-3 text-base font-semibold">
            Start conversation
          </button>
        </div>
      </div>
    </main>
  );
}

export default MentorDetails;
