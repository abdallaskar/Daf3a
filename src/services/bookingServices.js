import axiosInstance from "./axios";



export const createPaidSession = async (data) => {
    try {
        const response = await axiosInstance.post("/bookings/paid", data);
        return response;
    } catch (error) {
        console.log(error);
        console.error("❌ Error creating paid session:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to create paid session");
    }
};

export async function createFreeBooking(data) {
    // Replace with your real endpoint
    const response = await axiosInstance.post('/bookings/free', data);
    console.log(response);
    // if (!response.ok) throw new Error('Failed to create free booking');
    return response;
}