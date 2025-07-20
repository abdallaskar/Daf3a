import { useRef, useEffect } from "react";

function ChatMessages({ messages, currentUser }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Group messages by date
  const groupedMessages = messages.reduce((groups, message) => {
    const date = "Today"; // In a real app, you would extract the date from message.time
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {});
  return (
    <>
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-background">
        {Object.entries(groupedMessages).map(([date, dateMessages]) => (
          <div key={date}>
            <div className="text-center text-sm text-secondary uppercase mb-6">
              {date}
            </div>
            <div className="space-y-6">
              {dateMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-end gap-3 ${
                    message.sender === "self" ? "justify-end" : ""
                  }`}
                >
                  {message.sender !== "self" && (
                    <img
                      src={currentUser.avatar}
                      alt="Avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                  <div
                    className={`max-w-md ${
                      message.sender === "self" ? "text-right" : ""
                    }`}
                  >
                    {message.text === "..." ? (
                      <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-lg rounded-bl-none shadow-default flex items-center">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s] mx-1"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      </div>
                    ) : (
                      <div
                        className={`${
                          message.sender === "self"
                            ? "bg-primary text-inverse rounded-br-none"
                            : "bg-gray-100 dark:bg-gray-800 text-primary rounded-bl-none"
                        } p-3 rounded-lg shadow-default`}
                      >
                        <p>{message.text}</p>
                      </div>
                    )}
                    <p className="text-xs text-secondary mt-1 px-1 flex items-center gap-1">
                      {message.time}
                      {message.sender === "self" && message.isRead && (
                        <svg
                          className="w-4 h-4 text-accent"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </p>
                  </div>
                  {message.sender === "self" && (
                    <img
                      src="https://lh3.googleusercontent.com/a/ACg8ocJ9XG7V4gLz-Yn4Qp_A-Y-h_g-H-cI-z-H=s96-c"
                      alt="Your avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </>
  );
}

export default ChatMessages;
