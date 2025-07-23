import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContextProvider";
import {
  getAllUserChats,
  sendNewMessage,
  getChatMessages,
} from "../../services/chatServices";
import EmptyChat from "./EmptyChat";
import MessageInput from "./ChatInput";
import MessageList from "./ChatMessages";
import ChatSidebar from "./ChatSideBar";
import NavBar from "./../../components/NavBar/NavBar";
import { ChatContext } from "../../contexts/ChatContextProvider";
import { io } from "socket.io-client";
let URL = "http://localhost:5000";
// Import components
let socket, selectedChatCompare;
function Chat() {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const { currentChat, setCurrentChat, chats, setChats } =
    useContext(ChatContext);
  // Fetch user chats on component mount
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const data = await getAllUserChats();
        console.log("fetched chats:", data);

        setChats(data);
        setLoading(false);
        socket.emit("join chat", currentChat._id);
      } catch (error) {
        console.error("Failed to fetch chats:", error);
        setLoading(false);
      }
    };

    fetchChats();
    selectedChatCompare = currentChat;
  }, [currentChat]);

  // Connect to socket when component mounts
  useEffect(() => {
    if (user?._id) {
      socket = io(URL);
      socket.emit("setup", user?._id);
      socket.on("connection", () => setSocketConnected(true));
    }
  }, []);

  // Handle chat selection
  const handleChatSelect = async (chat) => {
    setCurrentChat(chat);
    setSidebarOpen(false);

    try {
      const data = await getChatMessages(chat._id);
      console.log("Fetched messages:", data);
      setMessages(data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  // Handle sending a new message
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (newMessage.trim() === "" || !currentChat) return;

    try {
      await sendNewMessage(newMessage, currentChat._id);
      setNewMessage("");
      const data = await getChatMessages(currentChat._id);
      setMessages(data);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  // // Handle typing event
  // const handleTyping = () => {
  //   if (currentChat && user) {
  //     socketService.emitTyping({
  //       chatId: currentChat._id,
  //       userId: user._id,
  //       username: user.name || user.username,
  //     });
  //   }
  // };

  // Get other user from chat
  const getOtherUser = (chat) => {
    return chat?.users?.find((u) => u._id !== user?._id) || {};
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Get relative time for chat list
  const getRelativeTime = (timestamp) => {
    if (!timestamp) return "";

    const now = new Date();
    const messageDate = new Date(timestamp);
    const diffMs = now - messageDate;
    const diffMins = Math.round(diffMs / 60000);
    const diffHours = Math.round(diffMs / 3600000);
    const diffDays = Math.round(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}d`;
    return messageDate.toLocaleDateString();
  };

  return (
    <>
      <NavBar />
      <div className="pt-20 pb-8 px-4 md:px-8 min-h-screen bg-background">
        <div className="flex h-[calc(100vh-120px)] antialiased text-primary bg-surface rounded-lg shadow-default overflow-hidden">
          {/* Sidebar - Only visible on mobile when sidebarOpen is true */}
          <div
            className={`md:block ${
              sidebarOpen ? "block" : "hidden"
            } fixed md:relative z-20 h-full`}
          >
            <ChatSidebar
              chats={chats}
              loading={loading}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              currentChat={currentChat}
              handleChatSelect={handleChatSelect}
              getOtherUser={getOtherUser}
              getRelativeTime={getRelativeTime}
            />
          </div>

          {/* Main Content */}
          <main className="flex-1 flex flex-col w-full">
            {currentChat ? (
              <>
                <MessageList
                  messages={messages}
                  user={user}
                  currentChat={currentChat}
                  getOtherUser={getOtherUser}
                  formatTime={formatTime}
                />

                <MessageInput
                  newMessage={newMessage}
                  setNewMessage={setNewMessage}
                  handleSendMessage={handleSendMessage}
                  // handleTyping={handleTyping}
                />
              </>
            ) : (
              <EmptyChat setSidebarOpen={setSidebarOpen} />
            )}
          </main>
        </div>
      </div>
    </>
  );
}

export default Chat;
