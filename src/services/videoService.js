import axios from "axios";

const URL = "http://localhost:5000/api/video";

export const getVideoToken = async (id, authToken, type) => {
  const res = await axios.get(`${URL}/token/${id}?type=${type}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return res.data.token;
};
