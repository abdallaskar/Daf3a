import React, { createContext, useContext, useState, useEffect } from "react";

const ProfileContext = createContext();

export function useProfile() {
  return useContext(ProfileContext);
}

export function ProfileProvider({ mentorId, children }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      try {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");

        const res = await fetch(`http://localhost:5000/api/mentors/${mentorId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        const data = await res.json();
        console.log(data);
        setProfile(data);
      } catch {
        setProfile(null);
      }
      setLoading(false);
    }
    if (mentorId) fetchProfile();
  }, [mentorId]);

  async function updateProfile(updates) {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const res = await fetch(`http://localhost:5000/api/mentors/${mentorId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });
    const data = await res.json();
    setProfile(data);
    return data;
  }

  return (
    <ProfileContext.Provider value={{ profile, setProfile, updateProfile, loading }}>
      {children}
    </ProfileContext.Provider>
  );
} 