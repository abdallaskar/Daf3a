import { createContext, useEffect, useState } from "react";
import axios from "axios";

import {
  fetchMentorProfile_Mentor,
  fetchMentorProfile_User,
} from "../services/mentorService";

export const MentorContext = createContext();

export const MentorProvider = ({ children }) => {
  const [mentor, setMentor] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchData() {
      const dataPartUser = await fetchMentorProfile_User(token);
      setMentor(dataPartUser);
      if (dataPartUser?.isRegistered) {
        const dataPartMentor = await fetchMentorProfile_Mentor(token);
        setMentor({ ...dataPartUser, ...dataPartMentor });
      }
    }
    fetchData();
  }, []);

  const updateMentor = async (formData, image) => {
    try {
      const dataToSend = {
        name: formData?.name,
        phoneNumber: formData?.phoneNumber,
      };
      const res = await axios.put(
        "http://localhost:5000/api/users/profile/update",
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data.user);
      setMentor({ ...mentor, ...res.data.user });
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <MentorContext.Provider value={{ mentor, updateMentor }}>
      {children}
    </MentorContext.Provider>
  );
};
