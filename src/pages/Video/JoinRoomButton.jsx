import { useState } from "react";
import { useNavigate } from "react-router";
import { getVideoToken } from "../../services/videoService";

export default function JoinVideoRoomButton({ workshopId, token }) {
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();

  const handleJoin = async () => {
    setLoading(true);
    try {
      const videoToken = await getVideoToken(workshopId, token);
      window.open(`/videocall?token=${videoToken}`, "_blank");
      // navigate(`/videocall?token=${videoToken}`);
    } catch (err) {
      console.error("Error getting video token:", err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleJoin}
      disabled={loading}
      className={`w-full ${
        loading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-purple-600 hover:bg-purple-800"
      } text-white font-medium px-4 py-2 rounded transition duration-200 mt-2`}
    >
      {loading ? "Loading..." : "🎥 Join Video Room"}
    </button>
  );
}
