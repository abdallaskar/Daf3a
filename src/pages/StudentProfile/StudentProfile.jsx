import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/ProfileContext";
import { Link } from "react-router";
import { AuthContext } from "../../contexts/AuthContextProvider";

export default function StudentProfile() {
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
  const { user } = useContext(AuthContext);
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

  // Activity summary
  const sessionsAttended = studentBookings.filter(
    (b) => b.status === "confirmed"
  ).length;
  const activity = {
    sessions: sessionsAttended,
    workshops: studentWorkshops.length,
  };

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

  return (
    <div className="bg-background min-h-screen flex flex-col font-poppins mt-20">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column: Profile card and overview */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-surface rounded-xl shadow-lg p-6 text-center card">
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
              <h2 className="mt-4 text-2xl font-bold text-primary">
                {user.name || "Student"}
              </h2>
              <p className="text-secondary mb-3">Student</p>
              <Link
                to={"/profile"}
                className="btn-primary mt-5 px-10 py-2 rounded "
              >
                {user.isRegistered === true
                  ? "Edit Profile"
                  : "Complete Your Profile"}
              </Link>
            </div>
            <div className="bg-surface rounded-xl shadow-lg p-6 card">
              <h3 className="text-xl font-bold text-primary mb-4">
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
                  <span className="text-secondary">
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
                  <span className="text-secondary">
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
                  <span className="text-secondary">
                    {user.education || "N/A"}
                  </span>
                </div>
                <div className="pt-2">
                  <h4 className="font-semibold text-primary">Bio/Interests</h4>
                  <p className="text-secondary mt-1">
                    {user.bio || "No bio available"}
                  </p>
                </div>
                <div className="pt-2">
                  <h4 className="font-semibold text-primary">Badges</h4>
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
            {/* Bookings */}
            <div className="bg-surface rounded-xl shadow-lg p-6 card">
              <h3 className="text-xl font-bold text-primary mb-4">Bookings</h3>
              {loadingBookings ? (
                <div className="text-secondary">Loading bookings...</div>
              ) : studentBookings.length === 0 ? (
                <div className="text-secondary">No bookings found.</div>
              ) : (
                <div className="space-y-4">
                  {studentBookings.map((booking) => (
                    <div
                      key={booking._id || booking.id}
                      className="flex flex-col sm:flex-row gap-4 items-center p-4 rounded-lg border border-default"
                    >
                      <img
                        alt="Mentor"
                        className="w-24 h-24 rounded-lg object-cover"
                        src={booking.mentor?.image || "/public/Hero.jpg"}
                      />
                      <div className="flex-grow">
                        <p className="font-semibold text-primary">
                          {booking.title || booking.sessionTitle || "Session"}
                        </p>
                        <p className="text-sm text-secondary">
                          with {booking.mentor?.name || "Mentor"}
                        </p>
                        <p className="text-sm text-secondary mt-1">
                          {booking.date || booking.sessionDate || ""}
                          {booking.time ? ` | ${booking.time}` : ""}
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        {/* Show only the relevant button if completed or cancelled */}
                        {booking.status === "confirmed" ? (
                          <button
                            className="btn-primary px-4 py-2 rounded"
                            disabled
                          >
                            Completed
                          </button>
                        ) : booking.status === "cancelled" ? (
                          <button
                            className="btn-secondary px-4 py-2 rounded"
                            disabled
                          >
                            Cancelled
                          </button>
                        ) : (
                          <>
                            <button
                              className="btn-primary px-4 py-2 rounded"
                              disabled={actionLoading[booking._id]}
                              onClick={() => handleConfirm(booking._id)}
                            >
                              {actionLoading[booking._id]
                                ? "Processing..."
                                : "Mark as completed"}
                            </button>
                            <button
                              className="btn-secondary px-4 py-2 rounded"
                              disabled={actionLoading[booking._id]}
                              onClick={() => handleCancel(booking._id)}
                            >
                              {actionLoading[booking._id]
                                ? "Processing..."
                                : "Cancel"}
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Workshop Enrollments */}
            <div className="bg-surface rounded-xl shadow-lg p-6 card">
              <h3 className="text-xl font-bold text-primary mb-4">
                Workshop Enrollments
              </h3>
              {loadingWorkshops ? (
                <div className="text-secondary">Loading workshops...</div>
              ) : studentWorkshops.length === 0 ? (
                <div className="text-secondary">No workshops found.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {studentWorkshops.map((workshop) => (
                    <div
                      key={workshop._id || workshop.id}
                      className="border border-default rounded-lg overflow-hidden card"
                    >
                      <img
                        alt="Workshop"
                        className="h-32 w-full object-cover"
                        src={workshop.image || "/public/Hero.jpg"}
                      />
                      <div className="p-4">
                        <h4 className="font-semibold text-primary">
                          {workshop.title}
                        </h4>
                        <p className="text-sm text-secondary">
                          {workshop.mentor?.name || "Mentor"}
                        </p>
                        <span className="text-xs font-bold uppercase px-2 py-1 bg-success text-success rounded-full mt-2 inline-block">
                          {workshop.type || "online"}
                        </span>
                        <button className="btn-primary px-2 py-1 rounded ml-14">
                          View Workshop
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Activity Summary */}
            <div className="">
              <div className="bg-surface rounded-xl shadow-lg p-6 card">
                <h3 className="text-xl font-bold text-primary mb-4">
                  Activity Summary
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-surface-elevated rounded-lg">
                    <span className="text-secondary">Sessions Attended</span>
                    <span className="font-bold text-primary text-lg">
                      {activity.sessions}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-surface-elevated rounded-lg">
                    <span className="text-secondary">Workshops Joined</span>
                    <span className="font-bold text-primary text-lg">
                      {activity.workshops}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
