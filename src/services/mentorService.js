const URL = "http://localhost:5000";

export const fetchMentorProfile_User = async (token) => {
  try {
    const dataFromLocalStorage =
      JSON.parse(localStorage.getItem("user")) ||
      JSON.parse(sessionStorage.getItem("user"));
    const res = await fetch(`${URL}/api/users/${dataFromLocalStorage?._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (res.ok) return data?.user;
  } catch (err) {
    console.error("Fetch error:", err);
  }
  return null;
};

export const fetchMentorProfile_Mentor = async (token) => {
  if (mentor?.mentorID) {
    try {
      const res = await fetch(`${URL}/api/mentors/${mentor?.mentorID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const dataPartMentor = await res.json();
      console.log("Fetched mentor profile:", dataPartMentor);
      if (res.ok) return dataPartMentor?.mentor;
    } catch (err) {
      console.error("Fetch error:", err);
    }
  }
};
