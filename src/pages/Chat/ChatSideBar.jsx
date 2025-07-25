import { useContext } from "react";
import { Link } from "react-router";
import { ThemeContext } from "../../contexts/ThemeContextProvider";

function ChatSideBar({ isOpen, currentChat, setCurrentChat }) {

  const chats = [
    {
      id: 1,
      name: "Sarah",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAtfOZYWM9_cb3rI7e58MIBK7B5ZwZc_AXekAMhLo8oou4c2mYkv-pOyWAW_u_Ccn5Jb4LO9qS7Ma_77lK2wCmrt_NdsQyLWfhRb4c_rx0qfFa8wyAnm5pfvxalalKI6I2FmKQd_gB56KijVngJjZZanwIQQdP3x-pUxzJak7tVqs56CCh0odA7spuc7jUiLlU3dNU2RroxXk4Iu4EpsEn3cTMROvYKul31kqUQEnmUDAAsA7lWAwhLNP0nSvNz6xBNWe2TMbCJPeo",
      status: "online",
      lastMessage: "Awesome! Glad to hear it.",
      lastMessageTime: "2:30 PM",
    },
    {
      id: 2,
      name: "Alex",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBj5iyUT_DmksZ1V_6W5EeAggN1xMffGRXFoZocVn0eiT5LVdWUdTkYynykW8pq9VsFv9gQCS4Zu87o7sDzWehMegI3F-Hsm6kANtA6F5lOJ8MtKh_waGoBdpQTY2NzkyVk_vM0D_rUhtCu1ngmnK08fdWpZpumkLl8Ep9wM1ThSkgnuU9NEFLVjlJpxHC5yxr5qyPyvTyHtib1JQtHpw3rbHeg61yvQzxdwPgIETSWYLRrqpir53Zev_lUCvVlb2vxZ9Ls-IG8Ycc",
      status: "offline",
      lastMessage: "I'm looking forward to our session.",
      lastMessageTime: "Yesterday",
    },
  ];

  return (
    <>
      <aside
        className={`w-80 bg-surface flex-shrink-0 border-r hidden md:block border-default fixed md:relative h-full z-30 `}
      >

        <div className="p-4">
          <div className="relative">
            <input
              className="w-full pl-10 pr-4 py-2 rounded-full input-field border-transparent focus:border-primary focus:ring-0 transition"
              placeholder="Search chats"
              type="text"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  clipRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  fillRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <nav className="p-2 space-y-1">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors cursor-pointer ${
                  currentChat.id === chat.id
                    ? "bg-gray-100 dark:bg-gray-800"
                    : "hover-surface"
                }`}
                onClick={() => setCurrentChat(chat)}
              >
                <div className="relative">
                  <img
                    src={chat.avatar}
                    alt={`${chat.name}'s avatar`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {chat.status === "online" && (
                    <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-success border-2 border-surface"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p
                      className={`${
                        currentChat.id === chat.id
                          ? "font-semibold"
                          : "font-medium"
                      } truncate text-primary`}
                    >
                      {chat.name}
                    </p>
                    <p className="text-xs text-secondary">
                      {chat.lastMessageTime}
                    </p>
                  </div>
                  <p className="text-sm text-secondary truncate">
                    {chat.lastMessage}
                  </p>
                </div>
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}

export default ChatSideBar;
