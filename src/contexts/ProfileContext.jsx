import { createContext, useEffect, useState } from "react";
import axios from "axios";

import { fetchMentorProfile } from "../services/mentorService";

export const MentorContext = createContext();

export const MentorProvider = ({ children }) => {
  const [mentor, setMentor] = useState(null);
  const token = localStorage.getItem("token");

  const refreshMentor = async () => {
    const mentorData = await fetchMentorProfile(token);
    setMentor(mentorData);
  };

  useEffect(() => {
    refreshMentor();
    // eslint-disable-next-line
  }, []);

  return (
    <MentorContext.Provider value={{ mentor, setMentor, refreshMentor }}>
      {children}
    </MentorContext.Provider>
  );
};
