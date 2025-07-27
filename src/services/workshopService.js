import axios from "axios";
import Cookies from "js-cookie";
const URL = import.meta.env.VITE_BASE_URL;

export const fetchWorkshops = async () => {
  try {
    const response = await axios.get(`${URL}/workshops`);
    const data = response.data.data || response.data;
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching workshops:", error);
    return [];
  }
};

export const fetchWorkshopById = async (id) => {
  try {
    const response = await axios.get(`${URL}/workshops/${id}`);
    return response.data.data || response.data;
  } catch (error) {
    console.error("Error fetching workshop:", error);
    return null;
  }
};

export const createWorkshop = async (workshopData) => {
  try {
    const token = Cookies.get("token");
    const response = await axios.post(`${URL}/workshops`, workshopData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data || response.data;
  } catch (error) {
    console.error("Error creating workshop:", error);
    throw error;
  }
};

export const fetchWorkshopDetails = async (id) => {
  try {
    const response = await axios.get(`${URL}/workshops/${id}`, {});
    return response.data.data || response.data;
  } catch (error) {
    console.error("Error fetching workshop details:", error);
    return null;
  }
};

export const registerToWorkshop = async (id) => {
  const token = Cookies.get("token");
  try {
    const response = await axios.post(
      `${URL}/workshops/${id}/register`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error registering to workshop:", error);
    throw error;
  }
};

export const markWorkshopAsCompleted = async (id) => {
  const token = Cookies.get("token");
  try {
    const response = await axios.patch(
      `${URL}/workshops/${id}/completed`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error marking workshop as completed:", error);
    throw error;
  }
};
export const getAllMentorWorkshops = async (mentorId) => {
  try {
    const response = await axios.get(`${URL}/workshops/mentor/${mentorId}`);
    console.log("Fetched mentor workshops:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching mentor workshops:", error);
    return [];
  }
};
