import { createContext, useEffect, useState } from "react";
import {
  forgotPassword as forgotPasswordService,
  resetPassword as resetPasswordService,
  updatePassword as updatePasswordService,
} from "../services/authService";

export const AuthContext = createContext();
function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  useEffect(() => {
    const storedUser =
      localStorage.getItem("user") || sessionStorage.getItem("user") || null;
    const storedToken =
      localStorage.getItem("token") || sessionStorage.getItem("token") || null;

    console.log("Stored User:", storedUser);

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      console.log("User set from localStorage:", user);
    }

    if (storedToken) {
      setToken(storedToken);
      console.log("Token set from localStorage:", token);
    }
  }, []);

  // Handler for forgot password
  const forgotPassword = async (email) => {
    try {
      return await forgotPasswordService(email);
    } catch (error) {
      throw error;
    }
  };

  // Handler for reset password
  const resetPassword = async (resetData) => {
    try {
      return await resetPasswordService(resetData);
    } catch (error) {
      throw error;
    }
  };

  // Handler for update password
  const updatePassword = async (updateData, token) => {
    try {
      return await updatePasswordService(updateData, token);
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <AuthContext.Provider
        value={{
          user,
          setUser,
          token,
          setToken,
          forgotPassword,
          resetPassword,
          updatePassword,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
}

export default AuthContextProvider;
