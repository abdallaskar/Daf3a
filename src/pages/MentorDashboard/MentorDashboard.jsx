import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/ProfileContext";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { fetchWorkshopById } from "../../services/workshopService";
import MentorAvailability from "../../components/Mentor/MentorAvailability";
import { createReport, hasUserReported } from "../../services/reportService";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import StudentSlider from "../../components/StudentSlider/StudentSlider";

import JoinVideoRoomButton from "../Video/JoinRoomButton";
import axiosInstance from "../../services/axios";

import Cookies from "js-cookie";
function getDayOfWeek(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { weekday: "long" });
}

// Helper to check if booking is in the past
function isBookingPast(booking) {
  if (!booking.date || !booking.timeSlot?.length) return false;
  // Combine date and earliest timeSlot.start
  const dateStr = booking.date; // e.g., "2024-07-25"
  const timeStr = booking.timeSlot[0].start; // e.g., "14:00"
  // If timeStr is not in HH:mm format, adjust parsing as needed
  const sessionDateTime = new Date(`${dateStr}T${timeStr}`);
  return new Date() > sessionDateTime;
}

function isBookingCancelable(session) {
  if (!session.date || !session.timeSlot?.length) return false;
  const dateStr = session.date;
  const timeStr = session.timeSlot[0].start;
  const sessionDateTime = new Date(`${dateStr}T${timeStr}`);
  const now = new Date();
  const diffMs = sessionDateTime - now;
  const diffHours = diffMs / (1000 * 60 * 60);
  return diffHours >= 24;
}

export default function MentorDashboard() {
  const navigate = useNavigate();
  const {
    bookings,
    workshops,
    reviews,
    handleRemoveAvailability,
    profileCompletion,
    updateMentorPriceHandler,
    hanldeBookingCancel,
    hanldeBookingConfirm,
  } = useContext(UserContext);
  const { user, token } = useContext(AuthContext);

  // All hooks must be before any return or conditional
  const [priceInput, setPriceInput] = useState("");
  const [priceLoading, setPriceLoading] = useState(false);
  const [priceSuccess, setPriceSuccess] = useState("");
  const [priceError, setPriceError] = useState("");
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportTarget, setReportTarget] = useState(null); // user being reported
  const [reportWorkshop, setReportWorkshop] = useState(null); // workshop context
  const [reportReason, setReportReason] = useState("");
  const [reportText, setReportText] = useState("");
  const [reportLoading, setReportLoading] = useState(false);
  const [reportError, setReportError] = useState("");
  const [reportSuccess, setReportSuccess] = useState("");
  const [reportedSessions, setReportedSessions] = useState({});
  const [reportedWorkshopStudents, setReportedWorkshopStudents] = useState({}); // { [workshopId]: { [studentId]: true/false } }
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [cancelTargetSession, setCancelTargetSession] = useState(null);

  // Function to check if mentor has set up payment method
  const hasPaymentMethod = () => {
    // Check if user has stripeAccountId or similar payment setup property
    // You may need to adjust this based on your backend implementation
    return user?.stripeAccountId || user?.paymentMethod || user?.stripeAccount;
  };

  // Sort sessions by newest first (using date and time)
  const sortedSessions = [...bookings].sort((a, b) => {
    if (!a.date || !b.date) return 0;

    // Create date objects for comparison
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    // If dates are different, sort by date (newest first)
    if (dateA.getTime() !== dateB.getTime()) {
      return dateB.getTime() - dateA.getTime();
    }

    // If dates are the same, sort by time (newest first)
    const timeA = a.timeSlot?.[0]?.start || "00:00";
    const timeB = b.timeSlot?.[0]?.start || "00:00";

    return timeB.localeCompare(timeA);
  });

  // Sort workshops by newest first (using createdAt or date)
  const sortedWorkshops = [...workshops].sort((a, b) => {
    // Try to use createdAt first, then fall back to date
    const dateA = a.createdAt ? new Date(a.createdAt) : new Date(a.date || 0);
    const dateB = b.createdAt ? new Date(b.createdAt) : new Date(b.date || 0);

    return dateB.getTime() - dateA.getTime();
  });

  // Move these functions to the top level of the component
  const checkSessionReports = async () => {
    if (!user || !bookings.length) return;
    // Set all to null first
    const initial = {};
    for (const session of bookings) {
      if (!session.student?._id) continue;
      const key = `${session._id}_${session.student._id}`;
      initial[key] = null;
    }
    setReportedSessions(initial);

    const results = {};
    for (const session of bookings) {
      if (!session.student?._id) continue;
      const key = `${session._id}_${session.student._id}`;
      results[key] = await hasUserReported({
        reporter: user._id,
        reportedUser: session.student._id,
        booking: session._id,
      });
    }
    setReportedSessions(results);
  };

  const checkWorkshopStudentReports = async () => {
    if (!user || !workshops.length) return;
    // Set all to null first
    const initial = {};
    for (const workshop of workshops) {
      if (!workshop.registeredStudents?.length) continue;
      initial[workshop._id] = {};
      for (const student of workshop.registeredStudents) {
        initial[workshop._id][student._id] = null;
      }
    }
    setReportedWorkshopStudents(initial);

    const results = {};
    for (const workshop of workshops) {
      if (!workshop.registeredStudents?.length) continue;
      results[workshop._id] = {};
      for (const student of workshop.registeredStudents) {
        results[workshop._id][student._id] = await hasUserReported({
          reporter: user._id,
          reportedUser: student._id,
          workshop: workshop._id,
        });
      }
    }
    setReportedWorkshopStudents(results);
  };

  useEffect(() => {
    checkSessionReports();
  }, [user, bookings]);

  useEffect(() => {
    checkWorkshopStudentReports();
  }, [user, workshops]);

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

  const handleOpenReportModal = (targetUser, workshop) => {
    setReportTarget(targetUser);
    setReportWorkshop(workshop);
    setReportReason("");
    setReportText("");
    setReportError("");
    setReportSuccess("");
    setReportModalOpen(true);
  };

  const handleSubmitReport = async () => {
    setReportLoading(true);
    setReportError("");
    if (!reportReason) {
      setReportError("Please select a reason.");
      setReportLoading(false);
      return;
    }
    if (!reportText) {
      setReportError("Please provide details.");
      setReportLoading(false);
      return;
    }
    try {
      const reportPayload = {
        reportedUser: reportTarget._id,
        reason: reportReason,
        message: reportText,
      };
      let isSession = false;
      if (reportWorkshop && Array.isArray(reportWorkshop.timeSlot)) {
        reportPayload.booking = reportWorkshop._id;
        isSession = true;
      } else if (reportWorkshop) {
        reportPayload.workshop = reportWorkshop._id;
      }
      await createReport(reportPayload);
      setReportSuccess("Report submitted successfully.");
      if (isSession) {
        // Update reportedSessions for this session/student
        const key = `${reportWorkshop._id}_${reportTarget._id}`;
        setReportedSessions((prev) => ({
          ...prev,
          [key]: true,
        }));
      } else {
        // Update reportedWorkshopStudents for this workshop/student
        setReportedWorkshopStudents((prev) => ({
          ...prev,
          [reportWorkshop._id]: {
            ...(prev[reportWorkshop._id] || {}),
            [reportTarget._id]: true,
          },
        }));
      }
      setTimeout(() => setReportModalOpen(false), 1500);
    } catch (err) {
      setReportError("Failed to submit report.");
    } finally {
      setReportLoading(false);
    }
  };

  const handleConnect = async () => {
    try {
      const res = await axiosInstance.post("/create-stripe-account-link", {});
      window.location.href = res.data.url;
    } catch (err) {
      console.error("Error connecting to Stripe:", err);
      toast.error("Failed to connect to Stripe");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="grid grid-cols-[auto,1fr] min-h-screen">
          {/* Sidebar */}
          <aside className="fixed left-0 top-0 w-64 h-[100%] bg-surface shadow-md p-6 flex flex-col justify-between py-20">
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
          <main className="col-start-2 ml-64 p-6 lg:p-10">
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-primary">
                Welcome back, {user.name}
              </h1>
            </header>
            {/* Stats */}

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <NavBar />
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
            </section>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2">
                {/* Upcoming Sessions - Vertical Slider */}
                <section className="mb-8">
                  <div className="mb-6">
                    <h2 className="text-3xl font-bold text-primary mb-2">
                      Sessions
                    </h2>
                    <p className="text-secondary text-sm">
                      Manage your upcoming and completed sessions
                    </p>
                  </div>

                  {bookings.length === 0 ? (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-dashed border-green-200 rounded-xl p-8 text-center">
                      <svg
                        className="w-16 h-16 text-green-300 mx-auto mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        No Sessions Scheduled
                      </h3>
                      <p className="text-gray-500">
                        You don't have any upcoming sessions yet
                      </p>
                    </div>
                  ) : (
                    <div className="relative" style={{ height: "400px" }}>
                      <div
                        id="mentor-bookings-slider"
                        className="flex flex-col gap-4 overflow-y-auto py-8"
                        style={{ height: "100%" }}
                      >
                        {sortedSessions.map((session) => (
                          <div
                            key={session._id}
                            className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                          >
                            <div className="p-6">
                              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-3">
                                    <div className="flex items-center gap-2">
                                      <svg
                                        className="w-5 h-5 text-gray-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                      </svg>
                                      <span className="text-lg font-bold text-gray-900">
                                        {session.date}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <svg
                                        className="w-4 h-4 text-gray-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                      </svg>
                                      <span className="text-sm text-gray-600">
                                        {session.timeSlot.map((slot, index) => (
                                          <span
                                            key={index}
                                            className="inline-block mr-2"
                                          >
                                            {slot.start}
                                          </span>
                                        ))}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-3 mb-4">
                                    <div className="flex items-center gap-2">
                                      <svg
                                        className="w-4 h-4 text-gray-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                      </svg>
                                      <span className="text-sm font-medium text-gray-700">
                                        Student:{" "}
                                        {session.student?.name || "Unknown"}
                                      </span>
                                    </div>

                                    <span
                                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                        session.attendStatus === "pending"
                                          ? "bg-yellow-100 text-yellow-700"
                                          : session.attendStatus === "confirmed"
                                          ? "bg-green-100 text-green-700"
                                          : "bg-red-100 text-red-700"
                                      }`}
                                    >
                                      {session.attendStatus === "pending"
                                        ? "Pending"
                                        : session.attendStatus === "confirmed"
                                        ? "Completed"
                                        : "Cancelled"}
                                    </span>
                                  </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                  {session.attendStatus === "pending" && (
                                    <>
                                      <div className="relative group inline-block">
                                        <button
                                          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                                            !isBookingPast(session)
                                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                              : "bg-green-500 text-white hover:bg-green-600 hover:shadow-md"
                                          }`}
                                          onClick={() =>
                                            hanldeBookingConfirm(session._id)
                                          }
                                          disabled={!isBookingPast(session)}
                                        >
                                          <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth={2}
                                              d="M5 13l4 4L19 7"
                                            />
                                          </svg>
                                          Mark as Completed
                                        </button>
                                        {!isBookingPast(session) && (
                                          <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                            The session can be marked as
                                            completed only after it has passed.
                                          </span>
                                        )}
                                      </div>
                                      <div className="relative group inline-block">
                                        <button
                                          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                                            !isBookingCancelable(session)
                                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                              : "bg-red-500 text-white hover:bg-red-600 hover:shadow-md"
                                          }`}
                                          disabled={
                                            !isBookingCancelable(session)
                                          }
                                          onClick={() => {
                                            setCancelTargetSession(session._id);
                                            setCancelModalOpen(true);
                                          }}
                                        >
                                          <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth={2}
                                              d="M6 18L18 6M6 6l12 12"
                                            />
                                          </svg>
                                          Cancel
                                        </button>
                                        {!isBookingCancelable(session) && (
                                          <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                            You can only cancel at least 24
                                            hours before the session.
                                          </span>
                                        )}
                                      </div>
                                      <div className="inline-block">
                                        <JoinVideoRoomButton
                                          className="w-[150px]"
                                          RoomId={session._id}
                                          StartTime={
                                            session.timeSlot &&
                                            session.timeSlot.length > 0
                                              ? session.timeSlot[0].start
                                              : ""
                                          }
                                          token={token || Cookies.get("token")}
                                          isAvailable={(() => {
                                            if (
                                              !session.date ||
                                              !session.timeSlot?.length
                                            )
                                              return false;
                                            const dateStr = session.date;
                                            const timeStr =
                                              session.timeSlot[0].start;
                                            const sessionDateTime = new Date(
                                              `${dateStr}T${timeStr}`
                                            );
                                            return (
                                              new Date() >= sessionDateTime
                                            );
                                          })()}
                                          type="booking"
                                        />
                                      </div>
                                    </>
                                  )}

                                  {(session.attendStatus === "confirmed" ||
                                    session.attendStatus === "cancelled") && (
                                    <>
                                      <button
                                        className={`px-4 py-2 rounded-lg font-medium cursor-not-allowed ${
                                          session.attendStatus === "confirmed"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                        }`}
                                        disabled
                                      >
                                        {session.attendStatus === "confirmed"
                                          ? "Completed"
                                          : "Cancelled"}
                                      </button>

                                      {reportedSessions[
                                        `${session._id}_${session.student?._id}`
                                      ] === null ||
                                      reportedSessions[
                                        `${session._id}_${session.student?._id}`
                                      ] === undefined ? (
                                        <span className="text-secondary text-xs ml-2">
                                          Checking...
                                        </span>
                                      ) : !reportedSessions[
                                          `${session._id}_${session.student?._id}`
                                        ] ? (
                                        <button
                                          className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 hover:shadow-md transition-all duration-200 flex items-center gap-2"
                                          onClick={() =>
                                            handleOpenReportModal(
                                              session.student,
                                              session
                                            )
                                          }
                                        >
                                          <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth={2}
                                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                                            />
                                          </svg>
                                          Report
                                        </button>
                                      ) : (
                                        <span className="text-green-600 font-semibold ml-2 flex items-center gap-1">
                                          <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth={2}
                                              d="M5 13l4 4L19 7"
                                            />
                                          </svg>
                                          Reported
                                        </span>
                                      )}
                                    </>
                                  )}
                                </div>
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
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-3xl font-bold text-primary mb-2">
                        My Workshops
                      </h2>
                      <p className="text-secondary text-sm">
                        Manage your workshops and track student registrations
                      </p>
                    </div>
                    {user.verified && (
                      <Link
                        to={"/createworkshop"}
                        className="btn-primary px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                      >
                        <svg
                          className="w-5 h-5 mr-2 inline"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                        Create Workshop
                      </Link>
                    )}
                  </div>

                  {workshops.length === 0 ? (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-dashed border-blue-200 rounded-xl p-8 text-center">
                      <svg
                        className="w-16 h-16 text-blue-300 mx-auto mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        No Workshops Yet
                      </h3>
                      <p className="text-gray-500 mb-4">
                        Create your first workshop to start teaching students
                      </p>
                      {user.verified && (
                        <Link
                          to={"/createworkshop"}
                          className="btn-primary px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                        >
                          Create Your First Workshop
                        </Link>
                      )}
                    </div>
                  ) : (
                    <div className="grid gap-6">
                      {sortedWorkshops.map((workshop) => (
                        <div
                          key={workshop._id}
                          className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                        >
                          <div className="p-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                  <h3 className="text-xl font-bold text-gray-900">
                                    {workshop.title}
                                  </h3>
                                  <span
                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                      workshop.type === "online"
                                        ? "bg-blue-100 text-blue-700"
                                        : "bg-green-100 text-green-700"
                                    }`}
                                  >
                                    {workshop.type}
                                  </span>
                                </div>

                                {/* Workshop Date and Time */}
                                {(workshop.date || workshop.time) && (
                                  <div className="flex items-center gap-4 mb-3">
                                    {workshop.date && (
                                      <div className="flex items-center gap-2">
                                        <svg
                                          className="w-4 h-4 text-gray-500"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                          />
                                        </svg>
                                        <span className="text-sm font-medium text-gray-700">
                                          {new Date(
                                            workshop.date
                                          ).toLocaleDateString()}
                                        </span>
                                      </div>
                                    )}
                                    {workshop.time && (
                                      <div className="flex items-center gap-2">
                                        <svg
                                          className="w-4 h-4 text-gray-500"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                          />
                                        </svg>
                                        <span className="text-sm font-medium text-gray-700">
                                          {workshop.time}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                )}

                                {workshop.registeredStudents &&
                                  workshop.registeredStudents.length > 0 && (
                                    <div className="mb-4">
                                      <div className="flex items-center gap-2 mb-2">
                                        <svg
                                          className="w-4 h-4 text-gray-500"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                                          />
                                        </svg>
                                        <span className="text-sm font-medium text-gray-600">
                                          {workshop.registeredStudents.length}{" "}
                                          student
                                          {workshop.registeredStudents
                                            .length !== 1
                                            ? "s"
                                            : ""}{" "}
                                          registered
                                        </span>
                                      </div>
                                      <StudentSlider
                                        students={workshop.registeredStudents}
                                        workshop={workshop}
                                        handleOpenReportModal={
                                          handleOpenReportModal
                                        }
                                        reportedMap={
                                          reportedWorkshopStudents[
                                            workshop._id
                                          ] || {}
                                        }
                                      />
                                    </div>
                                  )}
                              </div>

                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() =>
                                    handleViewWorkshop(
                                      workshop._id || workshop.id
                                    )
                                  }
                                  className="btn-primary px-6 py-2 rounded-lg font-medium hover:shadow-md transition-all duration-200 flex items-center gap-2"
                                >
                                  <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                  </svg>
                                  View Details
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
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
                {user.verified && (
                  <section>
                    <h2 className="text-2xl font-semibold text-primary mb-4">
                      Session Price
                    </h2>
                    {hasPaymentMethod() ? (
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
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <button
                            onClick={handleConnect}
                            className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700 transition-colors"
                          >
                            Edit Your Payment Method
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <svg
                              className="h-5 w-5 text-yellow-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-yellow-800">
                              Payment Method Required
                            </h3>
                            <div className="mt-2 text-sm text-yellow-700">
                              <p>
                                You need to set up your payment method to set
                                your session price. This ensures you can receive
                                payments for your sessions.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <button
                            onClick={handleConnect}
                            className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700 transition-colors"
                          >
                            Add Your Payment Method
                          </button>
                        </div>
                      </div>
                    )}
                  </section>
                )}
                {/* Mentor Balance Section */}
                {user.verified && (
                  <section className="mt-8">
                    <h2 className="text-2xl font-semibold text-primary mb-4">
                      Mentor Balance
                    </h2>
                    <div className="bg-surface rounded-lg shadow-md p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <svg
                              className="w-6 h-6 text-green-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                              />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm text-secondary font-medium">
                              Current Balance
                            </p>
                            <p className="text-2xl font-bold text-primary">
                              {user.balance ? `${user.balance} EGP` : "0 EGP"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                )}
              </div>
            </div>
            <Footer />
          </main>
        </div>

        {reportModalOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
              <h2 className="text-lg font-bold mb-4">
                Report {reportTarget?.name}
              </h2>
              <label className="block mb-2 font-medium">Reason</label>
              <select
                className="w-full border rounded p-2 mb-2"
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                disabled={reportLoading}
              >
                <option value="">Select a reason</option>
                <option value="Abuse">Abuse</option>
                <option value="Fraud">Fraud</option>
                <option value="Other">Other</option>
              </select>
              <label className="block mb-2 font-medium">Details</label>
              <textarea
                className="w-full border rounded p-2 mb-2"
                rows={4}
                value={reportText}
                onChange={(e) => setReportText(e.target.value)}
                placeholder="Describe the issue..."
                disabled={reportLoading}
              />
              {reportError && (
                <div className="text-red-500 mb-2">{reportError}</div>
              )}
              {reportSuccess && (
                <div className="text-green-500 mb-2">{reportSuccess}</div>
              )}
              <div className="flex justify-end gap-2">
                <button
                  className="btn-secondary px-4 py-2 rounded"
                  onClick={() => setReportModalOpen(false)}
                  disabled={reportLoading}
                >
                  Cancel
                </button>
                <button
                  className="btn-primary px-4 py-2 rounded"
                  onClick={handleSubmitReport}
                  disabled={reportLoading || !reportReason || !reportText}
                >
                  {reportLoading ? "Submitting..." : "Submit Report"}
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Cancel Confirmation Modal for Mentor */}
        {cancelModalOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
              <h2 className="text-lg font-bold mb-4">Cancel Session</h2>
              <p className="mb-4 text-secondary">
                Are you sure you want to cancel this session? <br />
                <span className="text-blue-700 font-semibold">
                  If you cancel, the funds for this session will be
                  automatically refunded to the student.
                </span>
              </p>
              <div className="flex justify-end gap-2">
                <button
                  className="btn-secondary px-4 py-2 rounded"
                  onClick={() => setCancelModalOpen(false)}
                >
                  No, Go Back
                </button>
                <button
                  className="btn-danger px-4 py-2 rounded"
                  onClick={() => {
                    hanldeBookingCancel(cancelTargetSession);
                    setCancelModalOpen(false);
                  }}
                >
                  Yes, Cancel Session
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
