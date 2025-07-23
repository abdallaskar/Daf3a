import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContextProvider";
import {
  getAllUserChats,
  sendNewMessage,
  getChatMessages,
} from "../../services/chatServices";
import { socketService } from "../../services/socketService";
import EmptyChat from "./EmptyChat";
import MessageInput from "./ChatInput";
import MessageList from "./ChatMessages";
import ChatSidebar from "./ChatSideBar";
import NavBar from "./../../components/NavBar/NavBar";
import { ChatContext } from "../../contexts/ChatContextProvider";

// Import components

function Chat() {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {
    currentChat,
    setCurrentChat,
    chats,
    setChats,
  } = useContext(ChatContext);
  // Fetch user chats on component mount
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const data = await getAllUserChats();
        console.log("fetched chats:", data);

        setChats(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch chats:", error);
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  // Connect to socket when component mounts
  useEffect(() => {
    if (user) {
      socketService.connect();
      socketService.register(user._id);

      // Listen for incoming messages
      socketService.onReceiveMessage((data) => {
        if (currentChat && currentChat._id === data.chatId) {
          setMessages((prev) => [...prev, data]);
        }
      });

      // Listen for typing events
      socketService.onTyping((data) => {
        if (
          currentChat &&
          data.chatId === currentChat._id &&
          data.userId !== user._id
        ) {
          setIsTyping(true);
          setTypingUser(data.username);

          // Clear typing indicator after 3 seconds
          setTimeout(() => {
            setIsTyping(false);
            setTypingUser(null);
          }, 3000);
        }
      });

      return () => {
        socketService.offReceiveMessage();
        socketService.offTyping();
        socketService.disconnect();
      };
    }
  }, [user, currentChat]);

  // Handle chat selection
  const handleChatSelect = async (chat) => {
    setCurrentChat(chat);
    setSidebarOpen(false);

    try {
      const data = await getChatMessages(chat._id);
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
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  // Handle typing event
  const handleTyping = () => {
    if (currentChat && user) {
      socketService.emitTyping({
        chatId: currentChat._id,
        userId: user._id,
        username: user.name || user.username,
      });
    }
  };

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
                  handleTyping={handleTyping}
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
