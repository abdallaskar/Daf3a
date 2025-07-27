import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContextProvider";

function MentorProtect({ children }) {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/" />;
  }
  if (user.role !== "mentor") {
    return <Navigate to="/" />;
  }
  return children;
}

export default MentorProtect;
