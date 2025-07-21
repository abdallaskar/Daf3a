import { useContext, useEffect, useState } from "react";
import { getMessages, socketService } from "./../../services/socketService";
import { AuthContext } from "../../contexts/AuthContextProvider";
import ChatMessages from "./ChatMessages";
import ChatSideBar from "./ChatSideBar";
import ChatInput from "./ChatInput";
import { useParams } from "react-router";

function Chat() {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState({});
  const params = useParams();
  useEffect(() => {
    socketService.connect();
    socketService.register(user?._id);
    return () => {
      socketService.disconnect();
    };
  }, []);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const newMessage = {
      sender: user?._id,
      receiver: params.id,
      text,
    };
    await socketService.sendMessage(newMessage);
  };
  useEffect(() => {
    const fetchMessages = async () => {
      if (!user?._id || !params.id) return;
      const oldMessages = await getMessages(user._id, params.id);

  
      const mapped = oldMessages.map((msg) => ({
        ...msg,
        sender: msg.sender === user._id ? "self" : msg.sender,
      }));

      setMessages(mapped);
    };

    fetchMessages();
  }, [user, params.id]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] h-screen bg-background overflow-hidden">
      <ChatSideBar
        currentChat={currentChat}
        setCurrentChat={setCurrentChat}
        className="hidden md:block border-r border-gray-200"
      />

      <main className="flex flex-col transition-all duration-300">
        <ChatMessages
          messages={messages}
          setMessages={setMessages}
          currentUser={user}
        />
        <ChatInput sendMessage={sendMessage} />
      </main>
    </div>
  );
}

export default Chat;
