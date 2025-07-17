import { createContext, useEffect, useState } from "react";
import { fetchUserProfile } from "../services/mentorService";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);


  const refreshUser = async (userId) => {
    // If userId is not provided, try to fetch current user
    let userData = null;
    if (userId) {
      userData = await fetchUserProfile(userId);
    } else {
      userData = await fetchUserProfile(); // Should fetch /api/auth/me
    }
    if (userData) setUser(userData);

  };

  useEffect(() => {
    refreshUser(); // Fetch current user on mount
    // eslint-disable-next-line
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};
