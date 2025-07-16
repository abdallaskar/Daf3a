import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    const storedUser =
      localStorage.getItem("user") || sessionStorage.getItem("user") || null;
    const storedToken =
      localStorage.getItem("token") || sessionStorage.getItem("token") || null;
    const storedProfile =
      localStorage.getItem("profile") ||
      sessionStorage.getItem("profile") ||
      null;
    console.log("Stored User:", storedUser);

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      console.log("User set from localStorage:", user);
    }
    if (storedToken) {
      setToken(storedToken);
      console.log("Token set from localStorage:", token);
    }
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
      console.log("Profile set from localStorage:", profile);
    }
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ user, setUser, token, setToken,setProfile }}>
        {children}
      </AuthContext.Provider>
    </>
  );
}

export default AuthContextProvider;
