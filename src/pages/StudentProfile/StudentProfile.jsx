import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/ProfileContext";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { fetchWorkshopById } from "../../services/workshopService";
import { createReport, hasUserReported } from "../../services/reportService";
import JoinVideoRoomButton from "../Video/JoinRoomButton";
import Cookies from "js-cookie";
import Loading from "../../components/Loading/Loading";

export default function StudentProfile() {
  const navigate = useNavigate();
  const {
    fetchStudentWorkshops,
    fetchStudentBookings,
    hanldeBookingConfirm,
    hanldeBookingCancel,
  } = useContext(UserContext);
  const [studentWorkshops, setStudentWorkshops] = useState([]);
  const [loadingWorkshops, setLoadingWorkshops] = useState(true);
  const [studentBookings, setStudentBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [actionLoading, setActionLoading] = useState({}); // { [bookingId]: true/false }
  const { user, token } = useContext(AuthContext);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportTarget, setReportTarget] = useState(null); // user being reported
  const [reportWorkshop, setReportWorkshop] = useState(null); // workshop context
  const [reportReason, setReportReason] = useState("");
  const [reportText, setReportText] = useState("");
  const [reportLoading, setReportLoading] = useState(false);
  const [reportError, setReportError] = useState("");
  const [reportSuccess, setReportSuccess] = useState("");
  const [reportedBookings, setReportedBookings] = useState({});
  const [reportedMentors, setReportedMentors] = useState({}); // { [bookingId]: true/false }
  const [reportedWorkshops, setReportedWorkshops] = useState({}); // { [workshopId]: true/false }
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [cancelTargetBooking, setCancelTargetBooking] = useState(null);

  useEffect(() => {
    const fetchWorkshops = async () => {
      setLoadingWorkshops(true);
      const data = await fetchStudentWorkshops();
      setStudentWorkshops(Array.isArray(data) ? data : []);
      setLoadingWorkshops(false);
    };
    fetchWorkshops();
  }, [fetchStudentWorkshops]);

  const refreshBookings = async () => {
    setLoadingBookings(true);
    const data = await fetchStudentBookings();
    setStudentBookings(Array.isArray(data) ? data : []);
    setLoadingBookings(false);
  };

  useEffect(() => {
    refreshBookings();
    // eslint-disable-next-line
  }, [fetchStudentBookings]);

  // Move checkReports to the top level
  const checkReports = async () => {
    if (!user || !studentBookings.length) return;
    // Set all to null first
    const initial = {};
    for (const booking of studentBookings) {
      initial[booking._id] = null;
    }
    setReportedMentors(initial);

    const results = {};
    for (const booking of studentBookings) {
      if (!booking.mentor?._id) continue;
      results[booking._id] = await hasUserReported({
        reporter: user._id,
        reportedUser: booking.mentor._id,
        booking: booking._id,
      });
    }
    setReportedMentors(results);
  };

  useEffect(() => {
    checkReports();
  }, [user, studentBookings]);

  const checkWorkshopReports = async () => {
    if (!user || !studentWorkshops.length) return;
    // Set all to null first
    const initial = {};
    for (const workshop of studentWorkshops) {
      initial[workshop._id] = null;
    }
    setReportedWorkshops(initial);

    const results = {};
    for (const workshop of studentWorkshops) {
      if (!workshop.mentor?._id) continue;
      results[workshop._id] = await hasUserReported({
        reporter: user._id,
        reportedUser: workshop.mentor._id,
        workshop: workshop._id,
      });
    }
    setReportedWorkshops(results);
  };

  useEffect(() => {
    checkWorkshopReports();
  }, [user, studentWorkshops]);

  // Activity summary
  const sessionsAttended = studentBookings.filter(
    (b) => b.attendStatus === "confirmed"
  ).length;
  const activity = {
    sessions: sessionsAttended,
    workshops: studentWorkshops.length,
  };

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

  function isBookingCancelable(booking) {
    if (!booking.date || !booking.timeSlot?.length) return false;
    const dateStr = booking.date;
    const timeStr = booking.timeSlot[0].start;
    const sessionDateTime = new Date(`${dateStr}T${timeStr}`);
    const now = new Date();
    const diffMs = sessionDateTime - now;
    const diffHours = diffMs / (1000 * 60 * 60);
    return diffHours >= 24;
  }

  if (!user) {
    return <div className="text-center py-10">Loading...</div>;
  }

  const handleConfirm = async (bookingId) => {
    setActionLoading((prev) => ({ ...prev, [bookingId]: true }));
    await hanldeBookingConfirm(bookingId);
    await refreshBookings();
    setActionLoading((prev) => ({ ...prev, [bookingId]: false }));
  };

  const handleCancel = async (bookingId) => {
    setActionLoading((prev) => ({ ...prev, [bookingId]: true }));
    await hanldeBookingCancel(bookingId);
    await refreshBookings();
    setActionLoading((prev) => ({ ...prev, [bookingId]: false }));
  };

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

  const handleOpenReportModal = (targetUser, booking) => {
    setReportTarget(targetUser);
    setReportWorkshop(booking);
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
      let isBooking = false;
      if (reportWorkshop && Array.isArray(reportWorkshop.timeSlot)) {
        reportPayload.booking = reportWorkshop._id;
        isBooking = true;
      } else if (reportWorkshop) {
        reportPayload.workshop = reportWorkshop._id;
      }
      await createReport(reportPayload);
      setReportSuccess("Report submitted successfully.");
      if (isBooking) {
        setReportedMentors((prev) => ({
          ...prev,
          [reportWorkshop._id]: true,
        }));
      } else {
        setReportedWorkshops((prev) => ({
          ...prev,
          [reportWorkshop._id]: true,
        }));
      }
      setTimeout(() => setReportModalOpen(false), 1500);
    } catch (err) {
      setReportError("Failed to submit report.");
    } finally {
      setReportLoading(false);
    }
  };

  return (
    <div className="bg-background dark:bg-surface-dark min-h-screen flex flex-col font-poppins mt-20">
      <main className="container mx-auto px-2 sm:px-4 lg:px-8 py-4 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
          {/* Left column: Profile card and overview */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-surface dark:bg-surface-elevated rounded-xl shadow-lg p-4 sm:p-6 text-center card">
              <div className="relative inline-block">
                <img
                  alt={user.name || "Student"}
                  className="w-32 h-32 rounded-full mx-auto object-cover"
                  src={
                    user.image ||
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuChiWUUjCvCBVhDs7l-xeVI4Gg-A22-bfquh_K2AATcbmbNolzrtaQ0ZWW3TD3F0FVLEz_TgCHqjCo_4d0qaN3QvVl_lAPJE_ONBF9YgXnHx2YYrA3EKwJWh_MBWWhJ2P94gbKayVE3tcKcnR4b_hulmxqfgq6Hnml_SxKMXgiVEWkKVzcqGB_XkE5MJTLTN4WzcPjtWYuT0o_tKksVZ6Xk8nmf2xCZ5UaLhRGJ580m8eOJkh1ql1EH_MtnRSQl4PSoAkQMkK4zYCk"
                  }
                />
                <span className="absolute bottom-2 right-2 bg-success rounded-full p-1.5 border-2 border-surface">
                  <svg
                    className="h-3 w-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
              <h2 className="mt-4 text-2xl font-bold text-primary dark:text-white">
                {user.name || "Student"}
              </h2>
              <p className="text-secondary dark:text-gray-400 mb-3">Student</p>
              <Link
                to={"/profile"}
                className="btn-primary mt-5 px-10 py-2 rounded"
              >
                {user.isRegistered === true
                  ? "Edit Profile"
                  : "Complete Your Profile"}
              </Link>
            </div>
            <div className="bg-surface dark:bg-surface-elevated rounded-xl shadow-lg p-4 sm:p-6 card">
              <h3 className="text-xl font-bold text-primary dark:text-white mb-4">
                Profile Overview
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <svg
                    className="w-5 h-5 text-secondary"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <span className="text-secondary dark:text-gray-400">
                    {user.email || "student@email.com"}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg
                    className="w-5 h-5 text-secondary"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <span className="text-secondary dark:text-gray-400">
                    {user.phoneNumber || "+1-555-123-4567"}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg
                    className="w-5 h-5 text-secondary"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M15.042 21.672L13.684 16.6m0 0l-2.51-2.222m2.51 2.222l2.492.388M13.684 16.6L12 14.5m0 0l-2.51 2.222M12 14.5L14.492 12.11M13.684 16.6l-2.222-2.51m0 0l-2.492.388M11.478 14.11L12 14.5m0 0l2.222 2.51m-2.222-2.51l-.388-2.492m0 0l2.222-2.51m-2.222 2.51L12 14.5M3 10.5v5.25a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25V10.5m-18 0a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 8.25m-18 0v-2.25a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 6M3 10.5v-2.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <span className="text-secondary dark:text-gray-400">
                    {user.education || "N/A"}
                  </span>
                </div>
                <div className="pt-2">
                  <h4 className="font-semibold text-primary dark:text-white">
                    Bio/Interests
                  </h4>
                  <p className="text-secondary dark:text-gray-400 mt-1">
                    {user.bio || "No bio available"}
                  </p>
                </div>
                <div className="pt-2">
                  <h4 className="font-semibold text-primary dark:text-white">
                    Badges
                  </h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                      Newbie
                    </span>
                    <span className="bg-success/20 text-success text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                      Active Learner
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right column: Bookings, Workshops, Activity, Security */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bookings - Vertical Slider */}
            <div className="bg-surface dark:bg-surface-elevated rounded-xl shadow-lg p-4 sm:p-6 card">
              <div className="mb-6">
                <h3 className="text-3xl font-bold text-primary dark:text-white mb-2">
                  Bookings
                </h3>
                <p className="text-secondary dark:text-gray-400 text-sm">
                  Manage your upcoming and completed sessions
                </p>
              </div>
              {loadingBookings ? (
                <div className="text-secondary">Loading bookings...</div>
              ) : studentBookings.length === 0 ? (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900 dark:to-emerald-900 border-2 border-dashed border-green-200 dark:border-green-700 rounded-xl p-6 sm:p-8 text-center ">
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
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    No Sessions Scheduled
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    You don't have any upcoming sessions yet
                  </p>
                </div>
              ) : (
                <div className="relative" style={{ height: "400px" }}>
                  <div
                    id="bookings-slider"
                    className="flex flex-col gap-4 overflow-y-auto py-4 sm:py-8"
                    style={{ height: "100%" }}
                  >
                    {studentBookings.map((booking) => (
                      <div
                        key={booking._id || booking.id}
                        className="bg-white dark:bg-surface-elevated rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                      >
                        <div className="p-4 sm:p-6">
                          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2 sm:gap-4">
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
                                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                                    {booking.date || booking.sessionDate || ""}
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
                                  <span className="text-sm text-gray-600 dark:text-gray-300">
                                    {booking.time ? booking.time : ""}
                                    {booking.timeSlot &&
                                      booking.timeSlot.length > 0 && (
                                        <span className="inline-block ml-2">
                                          {booking.timeSlot.map(
                                            (slot, index) => (
                                              <span
                                                key={index}
                                                className="inline-block mr-2"
                                              >
                                                {slot.start}
                                              </span>
                                            )
                                          )}
                                        </span>
                                      )}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 mb-4">
                                <div className="flex items-center gap-2">
                                  <img
                                    alt="Mentor"
                                    className="w-8 h-8 rounded-full object-cover"
                                    src={
                                      booking.mentor?.image ||
                                      "/public/Hero.jpg"
                                    }
                                  />
                                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                    with {booking.mentor?.name || "Mentor"}
                                  </span>
                                </div>

                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    booking.attendStatus === "pending"
                                      ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300"
                                      : booking.attendStatus === "confirmed"
                                      ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                                      : "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
                                  }`}
                                >
                                  {booking.attendStatus === "pending"
                                    ? "Pending"
                                    : booking.attendStatus === "confirmed"
                                    ? "Completed"
                                    : "Cancelled"}
                                </span>
                              </div>

                              <h4 className="font-semibold text-primary dark:text-white text-lg">
                                {booking.title ||
                                  booking.sessionTitle ||
                                  "Session"}
                              </h4>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-2">
                              {booking.attendStatus === "confirmed" ||
                              booking.attendStatus === "cancelled" ? (
                                <>
                                  <button
                                    className={
                                      booking.attendStatus === "confirmed"
                                        ? "px-4 py-2 rounded-lg font-medium cursor-not-allowed bg-green-100 text-green-700"
                                        : "px-4 py-2 rounded-lg font-medium cursor-not-allowed bg-red-100 text-red-700"
                                    }
                                    disabled
                                  >
                                    {booking.attendStatus === "confirmed"
                                      ? "Completed"
                                      : "Cancelled"}
                                  </button>
                                  {reportedMentors[booking._id] === null ||
                                  reportedMentors[booking._id] === undefined ? (
                                    <span className="text-secondary text-xs ml-2">
                                      Checking...
                                    </span>
                                  ) : !reportedMentors[booking._id] ? (
                                    <button
                                      className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 hover:shadow-md transition-all duration-200 flex items-center gap-2"
                                      onClick={() =>
                                        handleOpenReportModal(
                                          booking.mentor,
                                          booking
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
                                    <span className="text-green-600 dark:text-green-300 font-semibold ml-2 flex items-center gap-1">
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
                              ) : (
                                <>
                                  <div className="relative group inline-block">
                                    <button
                                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                                        !isBookingPast(booking)
                                          ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                                          : "bg-green-500 text-white hover:bg-green-600 hover:shadow-md"
                                      }`}
                                      disabled={
                                        actionLoading[booking._id] ||
                                        !isBookingPast(booking)
                                      }
                                      onClick={() => handleConfirm(booking._id)}
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
                                      {actionLoading[booking._id]
                                        ? "Processing..."
                                        : "Mark as completed"}
                                    </button>
                                    {!isBookingPast(booking) && (
                                      <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                        The session can be marked as completed
                                        only after it has passed.
                                      </span>
                                    )}
                                  </div>
                                  <div className="relative group inline-block mt-2">
                                    <button
                                      type="button"
                                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                                        !isBookingCancelable(booking)
                                          ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                                          : "bg-red-500 text-white hover:bg-red-600 hover:shadow-md"
                                      }`}
                                      disabled={
                                        actionLoading[booking._id] ||
                                        !isBookingCancelable(booking)
                                      }
                                      onClick={() => {
                                        setCancelTargetBooking(booking._id);
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
                                      {actionLoading[booking._id]
                                        ? "Processing..."
                                        : "Cancel"}
                                    </button>
                                    {!isBookingCancelable(booking) && (
                                      <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                        You can only cancel at least 24 hours
                                        before the session.
                                      </span>
                                    )}
                                  </div>
                                  {/* Join Meeting Room Button for bookings that are not cancelled */}
                                  {booking.attendStatus !== "cancelled" &&
                                    booking.attendStatus !== "confirmed" &&
                                    booking.timeSlot &&
                                    booking.timeSlot.length > 0 && (
                                      <div className="inline-block">
                                        <JoinVideoRoomButton
                                          className="w-[150px]"
                                          RoomId={booking._id}
                                          StartTime={booking.timeSlot[0].start}
                                          token={token || Cookies.get("token")}
                                          isAvailable={(() => {
                                            if (
                                              !booking.date ||
                                              !booking.timeSlot?.length
                                            )
                                              return false;
                                            const dateStr = booking.date;
                                            const timeStr =
                                              booking.timeSlot[0].start;
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
            </div>
            {/* Workshop Enrollments - Horizontal Slider */}
            <div className="bg-surface rounded-xl shadow-lg p-6 card">
              <div className="mb-6">
                <h3 className="text-3xl font-bold text-primary mb-2">
                  Workshop Enrollments
                </h3>
                <p className="text-secondary text-sm">
                  Manage your workshop enrollments and track your progress
                </p>
              </div>
              {loadingWorkshops ? (
                <Loading />
              ) : studentWorkshops.length === 0 ? (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 border-2 border-dashed border-blue-200 dark:border-blue-700 rounded-xl p-6 sm:p-8 text-center">
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
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    No Workshops Enrolled
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    You haven't enrolled in any workshops yet
                  </p>
                  <Link
                    to="/workshops"
                    className="btn-primary px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                  >
                    Browse Workshops
                  </Link>
                </div>
              ) : (
                <div className="grid gap-6">
                  {studentWorkshops.map((workshop) => (
                    <div
                      key={workshop._id || workshop.id}
                      className="bg-white dark:bg-surface-elevated rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                {workshop.title}
                              </h3>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  workshop.type === "online"
                                    ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                                    : "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                                }`}
                              >
                                {workshop.type || "online"}
                              </span>
                            </div>

                            {/* Workshop Date and Time */}
                            {(workshop.date || workshop.time) && (
                              <div className="flex items-center gap-2 sm:gap-4 mb-3">
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
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
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
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                      {workshop.time}
                                    </span>
                                  </div>
                                )}
                              </div>
                            )}

                            <div className="flex items-center gap-2 mb-3">
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
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                Mentor: {workshop.mentor?.name || "Unknown"}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 sm:gap-3">
                            <button
                              onClick={() =>
                                handleViewWorkshop(workshop._id || workshop.id)
                              }
                              className="btn-primary px-6 py-2 rounded-lg font-medium hover:shadow-md transition-all duration-200 flex items-center gap-2 flex-shrink-0"
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

                            {/* Join Meeting Room Button */}
                            {workshop.status !== "completed" && (
                              <JoinVideoRoomButton
                                className="w-[150px]"
                                RoomId={workshop._id}
                                StartTime={workshop.time}
                                token={token || Cookies.get("token")}
                                isAvailable={(() => {
                                  if (!workshop?.date || !workshop?.time)
                                    return false;
                                  const startTime = new Date(
                                    `${workshop.date.split("T")[0]}T${
                                      workshop.time
                                    }:00`
                                  );
                                  return new Date() >= startTime;
                                })()}
                                type="workshop"
                              />
                            )}

                            {reportedWorkshops[workshop._id] === null ||
                            reportedWorkshops[workshop._id] === undefined ? (
                              <span className="text-secondary text-xs ml-2">
                                Checking...
                              </span>
                            ) : !reportedWorkshops[workshop._id] &&
                              workshop.status === "completed" ? (
                              <button
                                className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 hover:shadow-md transition-all duration-200 flex items-center gap-2"
                                onClick={() =>
                                  handleOpenReportModal(
                                    workshop.mentor,
                                    workshop
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
                                Report Mentor
                              </button>
                            ) : reportedWorkshops[workshop._id] &&
                              workshop.status === "completed" ? (
                              <span className="text-green-600 dark:text-green-300 font-semibold text-xs ml-2 flex items-center gap-1">
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
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Activity Summary */}
            <div className="">
              <div className="bg-surface dark:bg-surface-elevated rounded-xl shadow-lg p-4 sm:p-6 card">
                <h3 className="text-xl font-bold text-primary dark:text-white mb-4">
                  Activity Summary
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-surface-elevated dark:bg-surface-dark rounded-lg">
                    <span className="text-secondary dark:text-gray-400">
                      Sessions Attended
                    </span>
                    <span className="font-bold text-primary dark:text-white text-lg">
                      {activity.sessions}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-surface-elevated dark:bg-surface-dark rounded-lg">
                    <span className="text-secondary dark:text-gray-400">
                      Workshops Joined
                    </span>
                    <span className="font-bold text-primary dark:text-white text-lg">
                      {activity.workshops}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
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
      {/* Cancel Confirmation Modal */}
      {cancelModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Cancel Session</h2>
            <p className="mb-4 text-secondary">
              Are you sure you want to cancel? <br />
              <span className="text-red-600 font-semibold">
                If you cancel before 24 hours of the session, you will get no
                refunds.
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
                  handleCancel(cancelTargetBooking);
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
  );
}
