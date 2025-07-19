import axios from "axios";
const URL = "http://localhost:5000/api";
export const getMentorById = async (id) => {
  try {
    const response = await axios.get(`${URL}/mentors/${id}`, {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem("token") || sessionStorage.getItem("token")
        }`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching mentor by ID:", error);
    throw error;
  }
};
