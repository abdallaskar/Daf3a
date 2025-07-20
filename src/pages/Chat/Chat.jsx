import { useContext, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeContextProvider";
// import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import ChatSideBar from "./ChatSideBar";

function Chat() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentChat, setCurrentChat] = useState({
    id: 1,
    name: "Sarah",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAtfOZYWM9_cb3rI7e58MIBK7B5ZwZc_AXekAMhLo8oou4c2mYkv-pOyWAW_u_Ccn5Jb4LO9qS7Ma_77lK2wCmrt_NdsQyLWfhRb4c_rx0qfFa8wyAnm5pfvxalalKI6I2FmKQd_gB56KijVngJjZZanwIQQdP3x-pUxzJak7tVqs56CCh0odA7spuc7jUiLlU3dNU2RroxXk4Iu4EpsEn3cTMROvYKul31kqUQEnmUDAAsA7lWAwhLNP0nSvNz6xBNWe2TMbCJPeo",
    status: "online",
    lastMessage: "Awesome! Glad to hear it.",
    lastMessageTime: "2:30 PM"
  });

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey, how was the workshop?",
      sender: "other",
      time: "2:31 PM",
      isRead: true
    },
    {
      id: 2,
      text: "It was great! Learned a lot.",
      sender: "self",
      time: "2:32 PM",
      isRead: true
    },
    {
      id: 3,
      text: "Awesome! Glad to hear it.",
      sender: "other",
      time: "2:33 PM",
      isRead: true
    }
  ]);



  const sendMessage = (text) => {
    if (!text.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      text,
      sender: "self",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: false
    };
    
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="grid  overflow-hidden bg-background">
      <ChatSideBar 
        isOpen={sidebarOpen} 
        currentChat={currentChat}
        setCurrentChat={setCurrentChat}
      />
      <main className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'md:ml-80' : ''}`}>
        <ChatMessages 
          messages={messages} 
          currentUser={{ 
            avatar: "https://lh3.googleusercontent.com/a/ACg8ocJ9XG7V4gLz-Yn4Qp_A-Y-h_g-H-cI-z-H=s96-c" 
          }} 
        />
        <ChatInput sendMessage={sendMessage} />
      </main>
    </div>
  );
}

export default Chat; 