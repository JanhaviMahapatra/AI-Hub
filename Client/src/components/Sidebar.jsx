import { createChat, deleteChat } from "../services/chat";

import "../style/Sidebar.css";

export default function Sidebar({
    conversations,
    selectedChat,
    setSelectedChat,
    loadChats,
}) {
    const handleNewChat = async () => {
        try {
            const { data } = await createChat();

            await loadChats();

            setSelectedChat(data.conversation);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteChat(id);

            await loadChats();
        } catch (error) {
            console.error(error);
        }
    };

return (
    <div className="nexus-sidebar-container">
        <div className="nexus-sidebar-header">
            <button onClick={handleNewChat} className="nexus-new-chat-btn">
                <span className="material-symbols-outlined btn-icon"></span>
                <span>New chat</span>
            </button>
        </div>

        <div className="nexus-sidebar-list-viewport">
            {conversations.length === 0 ? (
                <p className="nexus-sidebar-empty-text">
                    No active sessions
                </p>
            ) : (
                conversations.map((chat) => (
                    <div
                        key={chat._id}
                        className={`nexus-sidebar-item ${
                            selectedChat?._id === chat._id ? 'active-chat-item' : ''
                        }`}
                    >
                        <div
                            onClick={() => setSelectedChat(chat)}
                            className="nexus-sidebar-item-title"
                        >
                            <span className="material-symbols-outlined item-chat-icon"></span>
                            <span className="title-truncate">{chat.title}</span>
                        </div>

                        <button
                            onClick={() => handleDelete(chat._id)}
                            className="nexus-sidebar-delete-btn"
                            title="Delete Session"
                        >
                            <span className="material-symbols-outlined delete-icon">delete</span>
                        </button>
                    </div>
                ))
            )}
        </div>
    </div>
);

}