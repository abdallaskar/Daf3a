import axios from "axios";

const URL = "http://localhost:5000/api/workshops";

export const fetchWorkshops = async (filters = {}) => {
  try {
    const response = await axios.get(URL, { params: filters });
    const data = response.data.data || response.data;
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching workshops:", error);
    return [];
  }
};

export const fetchWorkshopById = async (id) => {
  try {
    const response = await axios.get(`${URL}/${id}`);
    return response.data.data || response.data;
  } catch (error) {
    console.error("Error fetching workshop:", error);
    return null;
  }
}; 