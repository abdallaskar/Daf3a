import ChatMessages from "./ChatMessages";
import ChatSideBar from "./ChatSideBar";
import ChatInput from "./ChatInput";
import StartNewChat from "./StartNewChat";

function Chat() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] h-screen bg-background overflow-hidden">
      <ChatSideBar className="hidden md:block border-r border-gray-200" />
      <div className="flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <ChatMessages />
        </div>
        <ChatInput />
        <StartNewChat className="md:hidden" />
      </div>
    </div>
  );
}

export default Chat;
