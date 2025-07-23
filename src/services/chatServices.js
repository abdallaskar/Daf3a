import axios from "axios";

const URL = "http://localhost:5000/api";
const token = localStorage.getItem("token") || sessionStorage.getItem("token");
export const getAllUserChats = async () => {
  try {
    const response = await axios.get(`${URL}/chats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user chats:", error);
    throw error;
  }
};

export const getOneToOneChat = async (receiverId) => {
  try {
    const response = await axios.post(`${URL}/chats`, receiverId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching one-to-one chat:", error);
    throw error;
  }
};

export const sendNewMessage = async (content, chatId) => {
  try {
    const response = await axios.post(
      `${URL}/messages`,
      { content, chatId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error sending new message:", error);
    throw error;
  }
};

export const getChatMessages = async (chatId) => {
  try {
    const response = await axios.get(`${URL}/messages/${chatId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    throw error;
  }
};
