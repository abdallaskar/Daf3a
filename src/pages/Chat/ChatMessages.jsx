import { useRef, useEffect } from "react";

function MessageList({ 
  messages, 
  user, 
  currentChat, 
  getOtherUser, 
  formatTime 
}) {
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 p-4 overflow-y-auto space-y-6">
      {messages.length > 0 && (
        <div className="text-center">
          <span className="text-xs text-secondary bg-input px-2 py-1 rounded-full">
            Today
          </span>
        </div>
      )}

      {messages.map((message, index) => {
        const isOwnMessage = message.sender === user?._id;
        
        return (
          <div
            key={index}
            className={`flex items-end gap-3 ${
              isOwnMessage ? "justify-end" : ""
            }`}
          >
            {!isOwnMessage && (
              <img
                alt="Sender avatar"
                className="w-8 h-8 rounded-full object-cover self-start"
                src={getOtherUser(currentChat).avatar || `https://ui-avatars.com/api/?name=${getOtherUser(currentChat).name || 'User'}&background=random`}
              />
            )}
            <div
              className={`flex flex-col gap-1 ${
                isOwnMessage ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`${
                  isOwnMessage
                    ? "bg-primary-brand text-text-inverse"
                    : "bg-input"
                } p-3 ${
                  isOwnMessage
                    ? "rounded-l-lg rounded-tr-lg"
                    : "rounded-r-lg rounded-tl-lg"
                } max-w-md`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
              <span className="text-xs text-secondary flex items-center gap-1">
                {formatTime(message.createdAt)}
                {isOwnMessage && message.read && (
                  <svg
                    className="w-4 h-4 text-accent"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143zm-2.822 1.765a.75.75 0 00-1.06-1.06l-5.456 5.456a.75.75 0 001.06 1.06l5.456-5.456z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                )}
              </span>
            </div>
            {isOwnMessage && (
              <img
                alt="Your avatar"
                className="w-8 h-8 rounded-full object-cover self-start"
                src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'You'}&background=random`}
              />
            )}
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessageList; 