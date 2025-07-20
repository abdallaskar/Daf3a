import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
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
