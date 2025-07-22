import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function LoginSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      // Optionally: fetch user profile here and store it
      navigate("/"); // or wherever you want to redirect after login
    }
  }, [navigate]);

  return <div className="text-center py-10">Logging you in...</div>;
}
