import React, { createContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContextProvider";
import { getAllUserChats } from "../services/chatServices";

export const ChatContext = createContext();

const ChatContextProvider = ({ children }) => {
  const [currentChat, setCurrentChat] = useState(null);
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState([]);
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const data = await getAllUserChats();
        console.log("fetched chats:", data);

        setChats(data);

      } catch (error) {
        console.error("Failed to fetch chats:", error);
      }
    };

    fetchChats();
  }, []);
  return (
    <ChatContext.Provider
      value={{
        currentChat,
        setCurrentChat,
        notification,
        setNotification,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
