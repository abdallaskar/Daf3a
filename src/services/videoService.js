import axios from "axios";

const URL = "http://localhost:5000/api/video";

export const getVideoToken = async (workshopId, authToken) => {
  const res = await axios.get(`${URL}/token/${workshopId}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return res.data.token;
};
