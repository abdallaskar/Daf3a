import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import Navbar from "../../components/Admin/Navbar";
import { getAllWorkshops } from "../../services/getAllData";

export default function AdminWorkshops() {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkshops = async () => {
      setLoading(true);
      try {
        const response = await getAllWorkshops();
        console.log("Fetched workshops data:", response);
        setWorkshops(response.data);
      } catch {
        setWorkshops([]);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkshops();
  }, []);

  // Calculate analytics from workshops data
  const totalWorkshops = workshops.length;
  const averageAttendance = totalWorkshops > 0 ? Math.round(
    workshops.reduce((sum, ws) => sum + (ws.registeredStudents?.length || 0), 0) / totalWorkshops / (workshops[0]?.capacity || 1) * 100
  ) : 0;
  const averageFeedback = totalWorkshops > 0 ? (
    workshops.reduce((sum, ws) => sum + (ws.feedbackScore || 0), 0) / totalWorkshops
  ).toFixed(1) : 'N/A';

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="bg-surface shadow-lg rounded-lg p-8 transition-theme">
            <header className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold text-primary">Workshops Management</h1>
              
            </header>
            <div className="border-default border-b mb-6">
              
            </div>
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-primary text-center mb-6">
                Workshop Analytics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-4">
                <div className="card flex flex-col items-center justify-center p-6">
                  <p className="text-base text-secondary text-center">
                    Total Workshops
                  </p>
                  <p className="text-3xl font-bold text-primary mt-2 text-center">
                    {totalWorkshops}
                  </p>
                </div>
                <div className="card flex flex-col items-center justify-center p-6">
                  <p className="text-base text-secondary text-center">
                    Average Attendance
                  </p>
                  <p className="text-3xl font-bold text-primary mt-2 text-center">
                    {averageAttendance}%
                  </p>
                </div>
                <div className="card flex flex-col items-center justify-center p-6">
                  <p className="text-base text-secondary text-center">
                    Average Feedback Score
                  </p>
                  <p className="text-3xl font-bold text-primary mt-2 text-center">
                    {averageFeedback}/5
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-primary">
                Content Library
              </h2>
              <div className="card overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b">
                      <th className="p-4 text-base text-secondary font-semibold">Title</th>
                      <th className="p-4 text-base text-secondary font-semibold">Type</th>
                      <th className="p-4 text-base text-secondary font-semibold">Date</th>
                      <th className="p-4 text-base text-secondary font-semibold">Time</th>
                      <th className="p-4 text-base text-secondary font-semibold">Location</th>
                      <th className="p-4 text-base text-secondary font-semibold">Language</th>
                      <th className="p-4 text-base text-secondary font-semibold">Mentor</th>
                      <th className="p-4 text-base text-secondary font-semibold">Registered</th>
                      <th className="p-4 text-base text-secondary font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="9" className="text-center py-6 text-primary">Loading workshops...</td>
                    </tr>
                    ) : workshops.length === 0 ? (
                      <tr>
                        <td colSpan="9" className="text-center py-6 text-secondary">No workshops found.</td>
                    </tr>
                    ) : (
                      workshops.map((ws) => (
                        <tr key={ws._id} className="border-b hover-surface">
                          <td className="p-4 text-base text-link font-medium">{ws.title}</td>
                          <td className="p-4 text-base text-secondary">{ws.type}</td>
                          <td className="p-4 text-base text-secondary">{ws.date ? new Date(ws.date).toLocaleDateString() : ''}</td>
                          <td className="p-4 text-base text-secondary">{ws.time}</td>
                          <td className="p-4 text-base text-secondary">{ws.location}</td>
                          <td className="p-4 text-base text-secondary">{ws.language}</td>
                          <td className="p-4 text-base text-secondary">{ws.mentor?.name || 'N/A'}</td>
                          <td className="p-4 text-base text-secondary">{(ws.registeredStudents?.length || 0) + '/' + (ws.capacity || 0)}</td>
                      <td className="p-4">
                            <span className={`px-3 py-1 text-sm rounded-full ${ws.date && new Date(ws.date) < new Date() ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-link'}`}>
                              {ws.date && new Date(ws.date) < new Date() ? 'Completed' : 'Upcoming'}
                        </span>
                      </td>
                    </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
