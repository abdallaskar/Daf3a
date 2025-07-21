import axios from "axios";
import { io } from "socket.io-client";
const URL = "http://localhost:5000";
const socket = io(`${URL}`, {
  autoConnect: false,
});

export const socketService = {
  connect: () => socket.connect(),
  disconnect: () => socket.disconnect(),
  register: async (userId) => {
    socket.emit("register", userId);
  },
  sendMessage: async ({ sender, receiver, text }) => {
    socket.emit("sendMessage", { sender, receiver, text });
  },
  onReceiveMessage: (cb) => {
    socket.on("receiveMessage", cb);
  },
  offReceiveMessage: () => {
    socket.off("receiveMessage");
  },
};

export async function getMessages(userId, otherUserId) {
  try {
    const res = await axios.get(`${URL}/api/messages/${userId}/${otherUserId}`, {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem("token") || sessionStorage.getItem("token")
        }`,
      },
    });

    console.log("Fetched messages:", res.data);
    return res.data.data || [];
  } catch (err) {
    console.error("Failed to fetch messages", err);
    return [];
  }
}
