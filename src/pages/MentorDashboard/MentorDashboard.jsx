import { useContext, useState } from "react";
import { UserContext } from "../../contexts/ProfileContext";
import { Link, useNavigate } from "react-router";
import { MdDelete } from "react-icons/md";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { fetchWorkshopById } from "../../services/workshopService";
import Calendar from "react-calendar";
import MentorAvailability from "../../components/Mentor/MentorAvailability";

function getDayOfWeek(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { weekday: "long" });
}

export default function MentorDashboard() {
  const navigate = useNavigate();
  const {
    bookings,
    workshops,
    reviews,
    selectedDate,
    setSelectedDate,
    selectedDay,
    setSelectedDay,
    slotStart,
    setSlotStart,
    slotEnd,
    setSlotEnd,
    tempSlots,
    availabilityError,
    availabilitySuccess,
    handleAddSlot,
    handleRemoveTempSlot,
    handleSaveDay,
    handleRemoveAvailability,
    profileCompletion,
    updateMentorPriceHandler,
    hanldeBookingCancel,
    hanldeBookingConfirm,
  } = useContext(UserContext);

  const [priceInput, setPriceInput] = useState("");
  const [priceLoading, setPriceLoading] = useState(false);
  const [priceSuccess, setPriceSuccess] = useState("");
  const [priceError, setPriceError] = useState("");
  const { user } = useContext(AuthContext);
  if (!user) {
    return <div className="text-center py-10">Loading...</div>;
  }
  console.log(user);
  console.log(bookings);
  console.log(workshops);
  console.log(reviews);

  const handleViewWorkshop = async (workshopId) => {
    try {
      const workshop = await fetchWorkshopById(workshopId);
      if (workshop) {
        navigate(`/workshops/${workshopId}`);
      }
    } catch (error) {
      console.error("Error fetching workshop:", error);
    }
  };

  // Remove a day from availability (now with date)
  const handleRemoveDay = async (date, day) => {
    const dayObj = user.availability?.find(
      (a) => a.day === day && a.date === date
    );
    if (!dayObj) return;
    try {
      await handleRemoveAvailability(date, day, dayObj.slots);
    } catch (e) {
      // Optionally handle error
    }
  };

  // Handle price update
  const handlePriceUpdate = async () => {
    setPriceLoading(true);
    setPriceSuccess("");
    setPriceError("");
    try {
      await updateMentorPriceHandler(priceInput);
      setPriceSuccess("Price updated successfully!");
      setPriceInput("");
    } catch (e) {
      setPriceError("Failed to update price.");
    } finally {
      setPriceLoading(false);
    }
  };

  const DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <>
      <div className="mt-20">
        <div className="bg-background text-primary">
          <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-surface shadow-md p-6 hidden lg:flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <img
                    alt={user.name}
                    className="w-12 h-12 rounded-full"
                    src={user.image}
                  />
                  <div>
                    <h1 className="font-bold text-lg text-primary">
                      {user.name}
                    </h1>
                    <p className="text-sm text-secondary">{user.role}</p>
                  </div>
                </div>
                <nav className="flex flex-col gap-2">
                  {/* ...nav links as before... */}
                  {/* Dashboard */}
                  <a
                    className="flex items-center gap-3 px-4 py-2 rounded-lg bg-primary text-white font-semibold"
                    href="#"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      ></path>
                    </svg>
                    <span>Dashboard</span>
                  </a>
                  {/* Sessions */}
                  {/* <a
                  className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-secondary text-secondary"
                  href="#"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                    <path
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  </svg>
                  <span>Sessions</span>
                </a> */}
                  {/* Workshops */}
                  {/* <a
                  className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-secondary text-secondary"
                  href="#"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  </svg>
                  <span>Workshops</span>
                </a> */}
                  {/* Earnings */}
                  {/* <a
                  className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-secondary text-secondary"
                  href="#"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1m0 12a9 9 0 110-18 9 9 0 010 18zm0 0a9 9 0 000-18 9 9 0 000 18z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  </svg>
                  <span>Earnings</span>
                </a> */}
                  {/* Settings */}
                  {/* <a
                  className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-secondary text-secondary"
                  href="#"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                    <path
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  </svg>
                  <span>Settings</span>
                </a> */}
                  <div className="flex flex-col gap-2">
                    <Link
                      to={"/profile"}
                      className="flex items-center gap-3 px-4 py-2 rounded-lg btn-secondary text-white font-semibold"
                    >
                      {user.isRegistered === true
                        ? "Edit Profile"
                        : "complete Your profile"}
                    </Link>{" "}
                  </div>
                </nav>
              </div>
            </aside>
            {/* Main Content */}
            <main className="flex-1 p-6 lg:p-10">
              <header className="mb-8">
                <h1 className="text-3xl font-bold text-primary">
                  Welcome back, {user.name}
                </h1>
              </header>
              {/* Stats */}
              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-surface shadow-md rounded-lg  p-6 flex flex-col justify-between">
                  <p className="font-semibold text-primary">Booked Sessions</p>
                  <p className="text-4xl font-bold text-primary-color">
                    {bookings.length}
                  </p>
                </div>
                <div className="bg-surface rounded-lg shadow-md  p-6 flex flex-col justify-between">
                  <p className="font-semibold text-primary">Rating</p>
                  <p className="text-4xl font-bold text-primary-color">
                    {user.rating}
                  </p>
                </div>
                <div className="bg-surface rounded-lg shadow-md  p-6 flex flex-col justify-between">
                  <p className="font-semibold text-primary">Workshops</p>
                  <p className="text-4xl font-bold text-primary-color">
                    {workshops.length}
                  </p>
                </div>
                <div className="bg-surface rounded-lg shadow-md  p-6 flex flex-col justify-between">
                  <p className="font-semibold text-primary">Balance </p>
                  <p className="text-3xl font-bold text-primary-color">
                    {user.balance} <small>EGP</small>
                  </p>
                </div>
              </section>
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2">
                  {/* Upcoming Sessions - Vertical Slider */}
                  <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-primary mb-4">
                      Sessions
                    </h2>
                    {bookings.length === 0 ? (
                      <div className="text-secondary">No sessions found.</div>
                    ) : (
                      <div className="relative" style={{ height: "350px" }}>
                        <div
                          id="mentor-bookings-slider"
                          className="flex flex-col gap-4 overflow-y-auto py-8"
                          style={{ height: "100%" }}
                        >
                          {bookings.map((session) => (
                            <div
                              key={session._id}
                              className="bg-surface rounded-lg shadow-md  p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-4"
                            >
                              <div className="flex-1">
                                <p className="text-lg font-bold text-primary">
                                  {session.date} ·{" "}
                                  {session.timeSlot.map((slot, index) => (
                                    <span
                                      key={index}
                                      className="inline-block mr-2"
                                    >
                                      {slot.start}
                                    </span>
                                  ))}
                                </p>
                                <p className="text-secondary mb-4">
                                  Student: {session.student?.name || "Unknown"}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {/* Show "Mark as Completed" button only if not cancelled */}
                                  {session.status !== "cancelled" && (
                                    <button
                                      onClick={() =>
                                        hanldeBookingConfirm(session._id)
                                      }
                                      className={
                                        session.status === "confirmed"
                                          ? "btn-primary px-4 py-2 rounded"
                                          : "btn-secondary px-4 py-2 rounded"
                                      }
                                    >
                                      {session.status === "pending"
                                        ? "Mark as Completed"
                                        : "Completed"}
                                    </button>
                                  )}

                                  {/* Show "Cancel" button only if not confirmed */}
                                  {session.status !== "confirmed" && (
                                    <button
                                      onClick={() =>
                                        hanldeBookingCancel(session._id)
                                      }
                                      className={
                                        session.status === "cancelled"
                                          ? "btn-danger bg-danger px-4 py-2 rounded"
                                          : "btn-secondary px-4 py-2 rounded"
                                      }
                                    >
                                      {session.status === "cancelled"
                                        ? "Cancelled"
                                        : "Cancel"}
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </section>
                  {/* My Workshops */}
                  <section className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-2xl font-semibold text-primary">
                        My Workshops
                      </h2>
                      {user.verified && (
                        <Link
                          to={"/createworkshop"}
                          className="btn-primary px-4 py-2 rounded"
                        >
                          Create Workshop
                        </Link>
                      )}
                    </div>
                    {workshops.map((workshop) => (
                      <div
                        key={workshop._id}
                        className="bg-surface rounded-lg shadow-md  p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-4"
                      >
                        <div className="flex-1">
                          <p className="text-lg font-bold text-primary">
                            {workshop.title}
                          </p>
                          <p className="text-sm text-secondary mb-4">
                            <span className="font-semibold">Type:</span>
                            <span
                              className={
                                workshop.type === "online"
                                  ? `bg-primary py-1 px-2 rounded-full text-white ml-2`
                                  : `bg-secondary py-1 px-2 rounded-full text-white ml-2`
                              }
                            >
                              {workshop.type}
                            </span>
                          </p>
                          <button
                            onClick={() =>
                              handleViewWorkshop(workshop._id || workshop.id)
                            }
                            className="btn-primary px-4 py-2 rounded"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    ))}
                  </section>
                  {/* Reviews & Ratings - Vertical Slider */}
                  <section>
                    <h2 className="text-2xl font-semibold text-primary mb-4">
                      Reviews & Ratings
                    </h2>
                    <div className="bg-surface rounded-lg shadow-md  p-6 mb-6">
                      <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                        <div className="text-center">
                          <p className="text-6xl font-bold text-primary-color">
                            {user.rating}
                          </p>
                          <div className="flex justify-center text-yellow-400"></div>
                          <p className="text-sm text-secondary">
                            {reviews.length} reviews
                          </p>
                        </div>
                        <div className="w-full flex-1"></div>
                      </div>
                      {reviews.length === 0 ? (
                        <div className="text-secondary">No reviews found.</div>
                      ) : (
                        <div className="relative" style={{ height: "350px" }}>
                          <div
                            id="mentor-reviews-slider"
                            className="flex flex-col gap-6 overflow-y-auto py-8"
                            style={{ height: "100%" }}
                          >
                            {reviews.map((review) => (
                              <div key={review._id} className="border-t pt-6">
                                <div className="flex items-center gap-3 mb-2">
                                  <img
                                    alt={review.author.name}
                                    className="w-10 h-10 rounded-full"
                                    src={review.author.image}
                                  />
                                  <div>
                                    <p className="font-semibold">
                                      {review.author.name}
                                    </p>
                                    <p className="text-sm text-secondary">
                                      {new Date(
                                        review.createdAt
                                      ).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                      })}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex text-yellow-400 mb-2"></div>
                                <p className="text-secondary italic">
                                  "{review.comment}"
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </section>
                  {/* Availability Overview - now full width below the grid */}
                  {user.verified && (
                    <section className="mt-8">
                      <h2 className="text-2xl font-semibold text-primary mb-4">
                        Availability Overview
                      </h2>
                      <MentorAvailability />
                    </section>
                  )}
                </div>

                {/* Right Sidebar */}
                <div className="space-y-8">
                  {/* Profile Completion */}
                  <section>
                    <h2 className="text-2xl font-semibold text-primary mb-4">
                      Profile Completion
                    </h2>
                    <div className="bg-surface rounded-lg shadow-md  p-6">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-semibold">Profile Completion</p>
                        <p className="font-bold text-primary-color">
                          {profileCompletion}%
                        </p>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2.5">
                        <div
                          className="bg-primary-color h-2.5 rounded-full"
                          style={{ width: `${profileCompletion}%` }}
                        ></div>
                      </div>
                    </div>
                  </section>
                  {/* Mentor Price Section */}
                  <section>
                    <h2 className="text-2xl font-semibold text-primary mb-4">
                      Session Price
                    </h2>
                    <div className="bg-surface rounded-lg shadow-md p-6">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="font-semibold"> Price/Hour:</span>
                        <span className="text-primary-color font-bold text-lg">
                          {user.price ? `${user.price} EGP` : "Not set"}
                        </span>
                      </div>
                      <div className="flex gap-2 items-center mb-2">
                        <input
                          type="number"
                          min="0"
                          step="1"
                          className="input-field px-2 py-1 text-sm w-32"
                          placeholder="Enter new price"
                          value={priceInput}
                          onChange={(e) => setPriceInput(e.target.value)}
                          disabled={priceLoading}
                        />
                        <button
                          className="btn-primary rounded px-3 py-1 text-sm"
                          onClick={handlePriceUpdate}
                          disabled={priceLoading || !priceInput}
                        >
                          {priceLoading ? "Saving..." : "Update Price"}
                        </button>
                      </div>
                      {priceSuccess && (
                        <div className="text-green-600 text-sm mb-1">
                          {priceSuccess}
                        </div>
                      )}
                      {priceError && (
                        <div className="text-red-500 text-sm mb-1">
                          {priceError}
                        </div>
                      )}
                    </div>
                  </section>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
