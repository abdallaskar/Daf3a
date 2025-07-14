import axios from "axios";

const URL = "http://localhost:5000/api/auth";

export const signUp = async (userData) => {
  console.log(`${URL}/register`);

  try {
    console.log("Signing up user with data:");
    const response = await axios.post(`${URL}/register`, userData);
    console.log("User registered successfully:", response);
    return response.data;
  } catch (error) {
    console.log("Error during registration:", error);
    throw error;
  }
};
