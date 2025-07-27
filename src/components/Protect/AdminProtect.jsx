import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { Navigate } from "react-router";

function AdminProtect({ children }) {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/" />;
  }
  if (user.role !== "admin") {
    return <Navigate to="/" />;
  }
  return children;
}

export default AdminProtect;
