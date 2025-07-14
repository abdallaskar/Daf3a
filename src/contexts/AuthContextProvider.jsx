import { createContext, use, useEffect, useState } from "react";

export const AuthContext = createContext();
function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user") || null;
    console.log("Stored User:", storedUser);

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      console.log("User set from localStorage:", user);
    } else {
      setUser(null);
    }
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ user, setUser, token, setToken }}>
        {children}
      </AuthContext.Provider>
    </>
  );
}

export default AuthContextProvider;
