import axios from "axios";

const URL = "http://localhost:5000/api";

export const getAnalytics = async () => {
    try {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        const response = await axios.get(`${URL}/admin/analytics`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Error fetching analytics:", error);
        throw error;
    }
}

export const verfiyMentor = async (mentorId) => {
    try {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        const response = await axios.put(`http://localhost:5000/api/admin/mentors/${mentorId}/verify`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Error verifying mentor:", error);
        throw error;
    }
}

export const deleteReview = async (reviewId) => {
  try {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const response = await axios.delete(`http://localhost:5000/api/reviews/${reviewId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
  }
};

export const deleteMentor = async (mentorId) => {
  try {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const response = await axios.delete(`http://localhost:5000/api/mentors/${mentorId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting mentor:", error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const response = await axios.delete(`http://localhost:5000/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};