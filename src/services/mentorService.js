const URL = "http://localhost:5000";
import axios from "axios";

const token = sessionStorage.getItem("token") || localStorage.getItem("token");

export const fetchUserProfile = async () => {
  try {
    const res = await axios.get(`${URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data?.user;
  } catch (err) {
    console.error("Fetch error:", err);
  }
  return null;
};

export const editUserProfile = async (formData) => {
  try {
    const res = await axios.put(`${URL}/api/users/profile/update`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data?.user;
  } catch (err) {
    console.error("Edit error:", err);
  }
};

// export const fetchMentorProfile = async () => {
//   try {
//     const res = await axios.get(`${URL}/api/mentors/${mentor?.mentorID}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return res.data?.mentor;
//   } catch (err) {
//     console.error("Fetch error:", err);
//   }
// };

export const createMentorProfile = async (formData) => {
  try {
    const res = await axios.post(`${URL}/api/mentors`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data?.mentor;
  } catch (err) {
    console.error("Create error:", err);
  }
};

export const editMentorProfile = async (formData) => {
  try {
    const res = await axios.put(
      `${URL}/api/mentors/${mentor?.mentorID}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data?.mentor;
  } catch (err) {
    console.error("Edit error:", err);
  }
};

export const fetchStudentProfile = async () => {
  try {
    const res = await axios.get(`${URL}/api/students/${student?.studentID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data?.student;
  } catch (err) {
    console.error("Fetch error:", err);
  }
};

export const createStudentProfile = async (formData) => {
  try {
    const res = await axios.post(`${URL}/api/students`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data?.student;
  } catch (err) {
    console.error("Create error:", err);
  }
};

export const editStudentProfile = async (formData) => {
  try {
    const res = await axios.put(
      `${URL}/api/students/${student?.studentID}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data?.student;
  } catch (err) {
    console.error("Edit error:", err);
  }
};
