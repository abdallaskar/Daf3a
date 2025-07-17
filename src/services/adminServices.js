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