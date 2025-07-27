import axios from "axios";
import Cookies from "js-cookie";
const URL = import.meta.env.VITE_BASE_URL;

export const getAnalytics = async () => {
  try {
    const token = Cookies.get("token");
    const response = await axios.get(`${URL}/admin/analytics`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error fetching analytics:", error);
    throw error;
  }
};

export const verfiyMentor = async (mentorId) => {
  try {
    const token = Cookies.get("token");
    const response = await axios.put(
      `${URL}/admin/mentors/${mentorId}/verify`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error verifying mentor:", error);
    throw error;
  }
};

export const deleteReview = async (reviewId) => {
  try {
    const token = Cookies.get("token");
    const response = await axios.delete(
      `${URL}/reviews/${reviewId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
  }
};

export const deleteMentor = async (mentorId) => {
  try {
    const token = Cookies.get("token");
    const response = await axios.delete(
      `${URL}/mentors/${mentorId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting mentor:", error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const token = Cookies.get("token");
    const response = await axios.delete(
      `${URL}/users/${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }

};

// Suspend a user
export const suspendUser = async (userId) => {
  try {

    const token = Cookies.get("token");
    const response = await axios.patch(
      `${URL}/users/${userId}/suspend`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error suspending user:", error);
    throw error;
  }
};

// Unsuspend a user
export const unsuspendUser = async (userId) => {
  try {

    const token = Cookies.get("token");
    const response = await axios.patch(
      `${URL}/users/${userId}/unsuspend`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error unsuspending user:", error);
    throw error;
  }
};

// Get mentor by ID
export const getMentorById = async (id) => {
  try {

    const token = Cookies.get("token");
    const response = await axios.get(`${URL}/mentors/${id}`, {
      headers: { Authorization: `Bearer ${token}` },

    });
    return response.data;
  } catch (error) {
    console.error("Error fetching mentor by ID:", error);
    throw error;
  }
};

