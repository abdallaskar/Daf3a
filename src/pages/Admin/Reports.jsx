import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import Navbar from "../../components/Admin/Navbar";
import {
  getAllReports,
  markReportResolved,
} from "../../services/reportService";

const TABS = [
  { key: "all", label: "All Reports" },
  { key: "unresolved", label: "Unresolved" },
  { key: "resolved", label: "Resolved" },
];

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [resolving, setResolving] = useState({}); // { [reportId]: true/false }
  const [activeTab, setActiveTab] = useState("all");
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await getAllReports();
        setReports(response.reports || response.data || []);
      } catch (err) {
        setError("Failed to fetch reports.");
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const handleResolve = async (reportId) => {
    setResolving((prev) => ({ ...prev, [reportId]: true }));
    try {
      await markReportResolved(reportId);
      setReports((reports) =>
        reports.map((r) =>
          r._id === reportId ? { ...r, status: "resolved" } : r
        )
      );
    } catch {
      alert("Failed to resolve report.");
    } finally {
      setResolving((prev) => ({ ...prev, [reportId]: false }));
    }
  };

  let filteredReports = reports;
  if (activeTab === "unresolved") {
    filteredReports = reports.filter((r) => r.status !== "resolved");
  } else if (activeTab === "resolved") {
    filteredReports = reports.filter((r) => r.status === "resolved");
  }

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="bg-surface shadow-lg rounded-lg p-8 transition-theme">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
              <h1 className="text-2xl font-bold text-primary">Reports</h1>
            </div>
            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                    activeTab === tab.key
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-primary hover:bg-primary/10"
                  }`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="card overflow-x-auto p-6 w-full">
              {loading ? (
                <div className="text-center text-accent mb-4">
                  Loading reports...
                </div>
              ) : error ? (
                <div className="text-center text-red-500 mb-4">{error}</div>
              ) : filteredReports.length === 0 ? (
                <div className="text-center text-secondary mb-4">
                  No reports found.
                </div>
              ) : (
                <table className="w-full min-w-[800px] text-left">
                  <thead>
                    <tr className="border-default border-b">
                      <th className="p-4 text-sm font-semibold text-primary">
                        Reporter
                      </th>
                      <th className="p-4 text-sm font-semibold text-primary">
                        Reported User
                      </th>
                      <th className="p-4 text-sm font-semibold text-primary">
                        Booking
                      </th>
                      <th className="p-4 text-sm font-semibold text-primary">
                        Reason
                      </th>
                      <th className="p-4 text-sm font-semibold text-primary">
                        Message
                      </th>
                      <th className="p-4 text-sm font-semibold text-primary">
                        Status
                      </th>
                      <th className="p-4 text-sm font-semibold text-secondary">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredReports.map((report) => (
                      <tr key={report._id}>
                        <td className="whitespace-nowrap px-6 py-4 max-w-xs truncate">
                          {report.reporter?.name || report.reporter || "-"}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 max-w-xs truncate">
                          {report.reportedUser?.name ||
                            report.reportedUser ||
                            "-"}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 max-w-xs break-words">
                          {report.booking?._id ? (
                            <>
                              <div>ID: {report.booking._id}</div>
                              {report.booking.date && (
                                <div>Date: {report.booking.date}</div>
                              )}
                            </>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 max-w-xs truncate">
                          {report.reason}
                        </td>
                        <td className="px-6 py-4 max-w-xs">
                          <button
                            className="btn-secondary px-3 py-1 rounded"
                            onClick={() => {
                              setSelectedMessage(report.message);
                              setMessageModalOpen(true);
                            }}
                          >
                            View Message
                          </button>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {report.status === "resolved" ? (
                            <span className="text-green-600 font-semibold">
                              Resolved
                            </span>
                          ) : (
                            <span className="text-red-600 font-semibold">
                              Pending
                            </span>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {report.status !== "resolved" && (
                            <button
                              className="btn-primary px-4 py-2 rounded"
                              onClick={() => handleResolve(report._id)}
                              disabled={resolving[report._id]}
                            >
                              {resolving[report._id]
                                ? "Resolving..."
                                : "Mark as Resolved"}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </main>
      </div>
      {messageModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Report Message</h2>
            <div className="bg-gray-50 rounded p-4 break-words whitespace-pre-line text-secondary shadow-inner border border-default mb-4">
              {selectedMessage}
            </div>
            <div className="flex justify-end">
              <button
                className="btn-primary px-4 py-2 rounded"
                onClick={() => setMessageModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
