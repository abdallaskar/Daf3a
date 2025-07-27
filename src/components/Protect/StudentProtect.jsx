import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContextProvider";

function StudentProtect({ children }) {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/" />;
  }
  if (user.role !== "student") {
    return <Navigate to="/" />;
  }
  return children;
}

export default StudentProtect;
