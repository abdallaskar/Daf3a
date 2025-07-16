import { createContext, useEffect, useState } from "react";

import { fetchMentorProfile } from "../services/mentorService";

export const MentorContext = createContext();

export const MentorProvider = ({ children }) => {
  const [mentor, setMentor] = useState(null);

  const refreshMentor = async (mentorId) => {
    mentorId =
      mentorId ||
      localStorage.getItem("mentorId") ||
      sessionStorage.getItem("mentorId");
    if (!mentorId) return;
    const mentorData = await fetchMentorProfile(mentorId);
    setMentor(mentorData);
  };

  useEffect(() => {
    const mentorId = localStorage.getItem("mentorId");
    if (mentorId) {
      refreshMentor(mentorId);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <MentorContext.Provider value={{ mentor, setMentor, refreshMentor }}>
      {children}
    </MentorContext.Provider>
  );
};
