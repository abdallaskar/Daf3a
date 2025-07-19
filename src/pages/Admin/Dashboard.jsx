import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Admin/Sidebar'
import Navbar from '../../components/Admin/Navbar'
import { getAnalytics } from '../../services/adminServices'
import { getAllUsers } from '../../services/getAllData'

// Helper component for coloring percentages
const Percent = ({ value, className = "" }) => (
  <span className={`font-medium ${value.startsWith('+') ? 'text-green-600' : value.startsWith('-') ? 'text-red-600' : ''} ${className}`}>
    {value}
  </span>
);

export default function Dashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nonAdminUserCount, setNonAdminUserCount] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const analyticsRes = await getAnalytics();
        setAnalytics(analyticsRes.data);
        // Fetch all users with a high limit (e.g., 1000)
        const usersRes = await getAllUsers(1, 1000);
        const users = usersRes.users || [];
        const nonAdmins = users.filter(user => user.role !== "admin");
        setNonAdminUserCount(nonAdmins.length);
      } catch {
        setError('Failed to load analytics');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  console.log(analytics)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 bg-background">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="bg-surface shadow-lg rounded-lg p-8 m-4 transition-theme">
            <h2 className="text-3xl font-bold text-primary mb-8">Overview</h2>
            {loading ? (
              <div>Loading analytics...</div>
            ) : error ? (
              <div className="text-red-600">{error}</div>
            ) : (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5 mb-10">
                <div className="card p-6">
                  <p className="text-base font-medium text-secondary mb-2">User Signups</p>
                  <p className="text-3xl font-bold text-primary mb-1">{nonAdminUserCount !== null ? nonAdminUserCount : analytics.totalUsers}</p>
                  <Percent value="+12%" className="text-base" />
                </div>
                <div className="card p-6">
                  <p className="text-base font-medium text-secondary mb-2">Students</p>
                  <p className="text-3xl font-bold text-primary mb-1">{analytics.totalStudents}</p>
                  <Percent value="+8%" className="text-base" />
                </div>
                <div className="card p-6">
                  <p className="text-base font-medium text-secondary mb-2">Mentors</p>
                  <p className="text-3xl font-bold text-primary mb-1">{analytics.totalMentors}</p>
                  <Percent value="+5%" className="text-base" />
                </div>
                <div className="card p-6">
                  <p className="text-base font-medium text-secondary mb-2">Workshops</p>
                  <p className="text-3xl font-bold text-primary mb-1">{analytics.totalWorkshops}</p>
                  <Percent value="-5%" className="text-base" />
                </div>
                <div className="card p-6">
                  <p className="text-base font-medium text-secondary mb-2">Reviews</p>
                  <p className="text-3xl font-bold text-primary mb-1">{analytics.totalReviews}</p>
                  <Percent value="+0%" className="text-base" />
                </div>
              </div>
            )}
            <h2 className="text-2xl font-semibold text-primary mt-8 mb-6">Summary</h2>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="card p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-lg font-medium text-primary">User Growth</p>
                    <p className="text-sm text-secondary">Last 30 Days</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-primary">+15%</p>
                    <Percent value="+2%" className="text-sm" />
                  </div>
                </div>
                <div className="mt-6 h-48">
                  <svg
                    fill="none"
                    height="100%"
                    preserveAspectRatio="none"
                    viewBox="0 0 472 150"
                    width="100%"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25"
                      stroke="var(--link-color)"
                      strokeLinecap="round"
                      strokeWidth="3"
                    ></path>
                    <path
                      d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H0V109Z"
                      fill="url(#paint0_linear_growth)"
                    ></path>
                    <defs>
                      <linearGradient
                        gradientUnits="userSpaceOnUse"
                        id="paint0_linear_growth"
                        x1="236"
                        x2="236"
                        y1="1"
                        y2="149"
                      >
                        <stop
                          stopColor="var(--link-color)"
                          stopOpacity="0.4"
                        ></stop>
                        <stop
                          offset="1"
                          stopColor="var(--link-color)"
                          stopOpacity="0"
                        ></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              <div className="card p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-lg font-medium text-primary">Workshop Engagement</p>
                    <p className="text-sm text-secondary">Last 30 Days</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-primary">-8%</p>
                    <Percent value="-3%" className="text-sm" />
                  </div>
                </div>
                <div className="mt-6 h-48 flex items-end justify-between px-2">
                  <div className="w-8 rounded-t-md bg-accent" style={{height: '30%'}}></div>
                  <div className="w-8 rounded-t-md bg-accent" style={{height: '90%'}}></div>
                  <div className="w-8 rounded-t-md bg-accent" style={{height: '90%'}}></div>
                  <div className="w-8 rounded-t-md bg-accent" style={{height: '80%'}}></div>
                  <div className="w-8 rounded-t-md bg-amber opacity-75" style={{height: '10%'}}></div>
                  <div className="w-8 rounded-t-md bg-accent" style={{height: '80%'}}></div>
                  <div className="w-8 rounded-t-md bg-accent" style={{height: '50%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
