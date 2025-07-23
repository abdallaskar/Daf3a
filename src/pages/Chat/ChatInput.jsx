import { FaLink } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";

function ChatInput() {
  const handleSubmit = (e) => {};
  return (
    <div className="p-4 bg-surface border-t border-default">
      <form onSubmit={handleSubmit} className="flex items-center gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full pl-4 pr-20 py-3 rounded-full input-field border-transparent focus:border-primary focus:ring-0 transition"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <button
              type="button"
              className="p-2 rounded-full text-secondary hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <FaLink size={20} />
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="bg-primary text-inverse rounded-full p-3 flex-shrink-0 shadow-lg hover:bg-opacity-90 transition-all duration-200 transform hover:scale-105"
          // disabled={!message.trim()}
        >
          <IoSend color="#fff" />
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
