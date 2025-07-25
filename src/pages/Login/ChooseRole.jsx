import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { setUserRole } from "../../services/profileService";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";

export default function ChooseRole() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    if (user && user.role) {
      if (user.role === "student") navigate("/studentprofile");
      else if (user.role === "mentor") navigate("/mentordashboard");
    }
  }, [user, navigate]);

  const handleChoose = async (role) => {
    try {
      const res = await setUserRole(role);
      if (res && res.user) {
        localStorage.setItem("user", JSON.stringify(res.user));
        setUser(res.user);
      }
      if (role === "student") navigate("/studentprofile");
      else navigate("/mentordashboard");
    } catch (err) {
      alert("Failed to set role. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-8 text-primary">
          Choose your role
        </h2>
        <div className="flex flex-col gap-6">
          <button
            className="flex items-center justify-center gap-3 text-lg font-semibold bg-blue-600 text-white rounded-lg px-6 py-4 shadow hover:bg-blue-700 transition-colors duration-200"
            onClick={() => handleChoose("student")}
          >
            <FaUserGraduate className="text-2xl" /> I am a Student
          </button>
          <button
            className="flex items-center justify-center gap-3 text-lg font-semibold bg-purple-600 text-white rounded-lg px-6 py-4 shadow hover:bg-purple-700 transition-colors duration-200"
            onClick={() => handleChoose("mentor")}
          >
            <FaChalkboardTeacher className="text-2xl" /> I am a Mentor
          </button>
        </div>
      </div>
    </div>
  );
}
