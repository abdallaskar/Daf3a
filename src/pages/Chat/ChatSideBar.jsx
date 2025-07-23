import { FaSearch } from "react-icons/fa";

function ChatSidebar({ 
  chats, 
  loading, 
  searchTerm, 
  setSearchTerm, 
  currentChat, 
  handleChatSelect,
  getOtherUser,
  getRelativeTime 
}) {
 
  const filteredChats = chats.filter(chat => 
    chat.users.some(u => 
      u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      u.username?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <aside className="w-full md:w-80 lg:w-96 flex flex-col border-r border-border bg-surface h-full">
      <div className="p-4 border-b border-border">
        <div className="relative">
          <input
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-input text-primary placeholder-secondary focus:outline-none focus:ring-2 focus:ring-primary-brand transition-shadow"
            placeholder="Search chats"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="h-5 w-5 text-secondary" />
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <nav className="p-2 space-y-1">
          {loading ? (
            <div className="flex justify-center p-4">
              <p>Loading chats...</p>
            </div>
          ) : filteredChats.length === 0 ? (
            <div className="flex justify-center p-4">
              <p>No chats found</p>
            </div>
          ) : (
            filteredChats.map((chat) => {
              const otherUser = getOtherUser(chat);
              return (
                <button
                  key={chat._id}
                  onClick={() => handleChatSelect(chat)}
                  className={`flex items-center p-3 rounded-lg w-full text-left ${
                    currentChat?._id === chat._id
                      ? "bg-primary-brand bg-opacity-20"
                      : "hover:bg-surface-hover transition-colors"
                  }`}
                >
                  <div className="relative">
                    <img
                      alt={`${otherUser.name || 'User'} avatar`}
                      className="w-12 h-12 rounded-full object-cover"
                      src={otherUser.avatar || `https://ui-avatars.com/api/?name=${otherUser.name || 'User'}&background=random`}
                    />
                    {otherUser.isOnline && (
                      <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-success border-2 border-surface"></span>
                    )}
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between items-baseline">
                      <p className="font-semibold text-primary">
                        {otherUser.name || otherUser.username || 'User'}
                        <span className="text-xs font-medium text-secondary ml-1">
                          ({otherUser.role === 'mentor' ? 'Mentor' : 'Student'})
                        </span>
                      </p>
                      <p className="text-xs text-secondary">
                        {getRelativeTime(chat.lastMessage?.createdAt)}
                      </p>
                    </div>
                    <p className="text-sm text-secondary truncate">
                      {chat.lastMessage?.content || 'Start a conversation'}
                    </p>
                  </div>
                </button>
              );
            })
          )}
        </nav>
      </div>
    </aside>
  );
}

export default ChatSidebar; 