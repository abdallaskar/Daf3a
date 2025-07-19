import axiosInstance from "./axios";

export async function createPaidSession(data) {
    // Replace with your real endpoint
    const response = await axiosInstance.post('/bookings/paid', data);
    if (!response.ok) throw new Error('Failed to create paid session');
    return response.data;
}

export async function createFreeBooking(data) {
    // Replace with your real endpoint
    const response = await axiosInstance.post('/bookings/free', data);
    console.log(response);
    if (!response.ok) throw new Error('Failed to create free booking');
    return response.data;
}