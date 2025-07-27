import axios from "axios";

const URL = import.meta.env.VITE_BASE_URL;

export const getVideoToken = async (id, authToken, type) => {
  const res = await axios.get(`${URL}/video/token/${id}?type=${type}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return res.data.token;
};
