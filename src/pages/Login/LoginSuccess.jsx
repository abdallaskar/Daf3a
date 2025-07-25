import { useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { fetchUserProfile } from "../../services/profileService";
import { AuthContext } from "../../contexts/AuthContextProvider";

export default function LoginSuccess() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      // Fetch user profile and store it
      fetchUserProfile().then((profile) => {
        if (profile) {
          localStorage.setItem("user", JSON.stringify(profile));
          setUser(profile);
          if (!profile.role) {
            navigate("/choose-role");
            return;
          }
        }
        navigate("/"); // or wherever you want to redirect after login
      });
    }
  }, [navigate, setUser]);

  return <div className="text-center py-10">Logging you in...</div>;
}
