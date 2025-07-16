const URL = "http://localhost:5000";
import axios from "axios";

const getToken = () =>
  sessionStorage.getItem("token") || localStorage.getItem("token");

// Fetch current user profile (by token) or by userId
export const fetchUserProfile = async (userId) => {
  try {
    const token = getToken();
    let url = `${URL}/api/auth/me`;
    if (userId) {
      url = `${URL}/api/users/${userId}`;
    }
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data?.user;
  } catch (err) {
    console.error("Fetch error:", err);
    return null;
  }
};

// Update current user profile (by token)
export const editUserProfile = async (formData) => {
  try {
    const token = getToken();
    const res = await axios.put(`${URL}/api/users/profile/update`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data?.user;
  } catch (err) {
    console.error("Edit error:", err);
    return null;
  }
};
