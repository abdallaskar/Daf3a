import axios from "axios";
const URL = "http://localhost:5000";
const getToken = () =>
  sessionStorage.getItem("token") || localStorage.getItem("token");

// Create a new report (by student or mentor)
export async function createReport(reportData) {
  try {
    const token = getToken();
    console.log("Sending report payload:", reportData);
    const response = await axios.post(`${URL}/api/reports`, reportData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating report:", error);
    if (error.response) {
      console.error("Backend error:", error.response.data);
    }
    throw error;
  }
}

// Admin: Get all reports
export async function getAllReports() {
  try {
    const token = getToken();
    const response = await axios.get(`${URL}/api/reports`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
}

// Admin: Mark a report as resolved
export async function markReportResolved(reportId) {
  try {
    const token = getToken();
    const response = await axios.patch(
      `${URL}/api/reports/${reportId}/resolve`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error resolving report:", error);
    throw error;
  }
}
