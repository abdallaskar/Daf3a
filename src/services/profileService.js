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
    console.error("Edit error:", err?.response?.data || err.message);
    return null;
  }
};

export const getMentorBookings = async (userId) => {
  try {
    const token = getToken();
    let url = `${URL}/api/bookings/mentor`;
    if (userId) {
      url = `${URL}/api/bookings/mentor/${userId}`;
    }
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Fetch error:", err);
    return null;
  }
};
export const getMentorWorkshops = async (userId) => {
  try {
    const token = getToken();
    let url = `${URL}/api/workshops/mentor`;
    if (userId) {
      url = `${URL}/api/workshops/mentor/${userId}`;
    }
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Fetch error:", err);
    return null;
  }
};

// Confirm Booking
export const confirmBookingHandler = async (bookingId) => {
  try {
    const token = getToken();
    const res = await axios.patch(
      `${URL}/api/bookings/${bookingId}/confirm`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  } catch (err) {
    console.error("Confirm Booking Error:", err);
    return null;
  }
};

// Cancel Booking
export const cancelBookingHandler = async (bookingId) => {
  try {
    const token = getToken();
    const res = await axios.patch(
      `${URL}/api/bookings/${bookingId}/cancel`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  } catch (err) {
    console.error("Cancel Booking Error:", err);
    return null;
  }
};

export const getReviewsByTarget = async (targetType, targetId) => {
  try {
    const res = await axios.get(`${URL}/api/reviews/${targetType}/${targetId}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching reviews:", err);
    return [];
  }
};

export const addAvailability = async (date, day, slots) => {
  try {
    const token = getToken();
    const res = await axios.post(
      `${URL}/api/mentors/availability/add`,
      {
        date,
        day,
        slots,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Add error:", error);
    throw error;
  }
};

// Remove slots
export const removeAvailability = async (date, day, slots) => {
  try {
    const token = getToken();
    const res = await axios.post(
      `${URL}/api/mentors/availability/remove`,
      {
        date,
        day,
        slots,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Remove error:", error);
    throw error;
  }
};

export const updateMentorPrice = async (price) => {
  try {
    const token = getToken();
    const res = await axios.put(
      `${URL}/api/mentors/mentor/set-price`,
      { price: Number(price) },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Update price error:", error);
    throw error;
  }
};
