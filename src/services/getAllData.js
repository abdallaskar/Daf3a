import axios from "axios";

const URL = "http://localhost:5000/api";

export const getAllUsers = async () => {
  try {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const response = await axios.get(`${URL}/users`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
  } catch (error) {
    console.log("Error fetching users:", error);
    throw error;
  }
};

export const getAllMentors = async () => {
  try {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const response = await axios.get(`${URL}/mentors`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log("Error fetching mentors:", error);
    throw error;
  }
};

export const getAllStudents = async () => { 
    try {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        const response = await axios.get(`${URL}/students`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Error fetching students:", error);
        throw error;
    }
}
export const getAllReviews = async () => {
    try {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        const response = await axios.get(`${URL}/reviews`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Error fetching reviews:", error);
        throw error;
    }
}

export const getAllWorkshops = async () => {
    try {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        const response = await axios.get(`${URL}/workshops`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Error fetching workshops:", error);
        throw error;
    }
}

