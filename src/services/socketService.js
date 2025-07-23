import axios from "axios";
import { io } from "socket.io-client";
const URL = "http://localhost:5000";

// Create socket instance with reconnection options
const socket = io(`${URL}`, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

// Store socket connection status
let isConnected = false;

export const socketService = {
  connect: () => {
    if (!isConnected) {
      socket.connect();
      isConnected = true;
      console.log("Socket connected");
    }
  },
  disconnect: () => {
    socket.disconnect();
    isConnected = false;
    console.log("Socket disconnected");
  },
  isConnected: () => isConnected,
  register: async (userId) => {
    if (!userId) return;
    if (socket.connected) {
      socket.emit("join", userId);
      console.log("Joined user room immediately:", userId);
    } else {
      socket.once("connect", () => {
        socket.emit("join", userId);
        console.log("Joined user room on connect:", userId);
      });
    }
  },
  sendMessage: async ({ sender, receiver, text }) => {
    console.log("Emitting message via socket:", { sender, receiver, text });
    socket.emit("sendMessage", { sender, receiver, text });
  },
  onReceiveMessage: (cb) => {
    socket.on("receiveMessage", (data) => {
      const { sender, receiver, ...rest } = data;
      io.to(sender).emit("receiveMessage", { ...rest, sender: "self" });
      io.to(receiver).emit("receiveMessage", { ...rest, sender });
      console.log("Received message via socket:", data);
      cb(data);
    });
  },
  offReceiveMessage: () => {
    socket.off("receiveMessage");
  },
  onUserOnline: (cb) => {
    socket.on("userOnline", cb);
  },
  offUserOnline: () => {
    socket.off("userOnline");
  },
  onUserOffline: (cb) => {
    socket.on("userOffline", cb);
  },
  offUserOffline: () => {
    socket.off("userOffline");
  },
  onTyping: (cb) => {
    socket.on("typing", cb);
  },
  offTyping: () => {
    socket.off("typing");
  },
  emitTyping: (data) => {
    socket.emit("typing", data);
  },
  // Add reconnect method
  reconnect: () => {
    if (!isConnected) {
      socket.connect();
      isConnected = true;
    }
  },
};
