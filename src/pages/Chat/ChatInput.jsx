import { FaPaperclip, FaSmile, FaPaperPlane } from "react-icons/fa";
import { IoSend } from 'react-icons/io5';

function MessageInput({ 
  newMessage, 
  setNewMessage, 
  handleSendMessage, 
  handleTyping 
}) {
  return (
    <div className="p-4 bg-surface border-t border-border">
      <form onSubmit={handleSendMessage} className="relative flex items-center">
        <input
          className="w-full pl-12 pr-28 py-3 rounded-full bg-input text-primary placeholder-secondary focus:outline-none focus:ring-2 focus:ring-primary-brand transition-shadow"
          placeholder="Type your message..."
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleTyping}
        />
        <div className="absolute left-0 inset-y-0 flex items-center pl-4">

        </div>
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center h-10 w-10 bg-primary-brand rounded-full text-text-inverse hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-brand transition-transform active:scale-95"
        >
          <IoSend className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}

export default MessageInput; 