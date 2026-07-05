import { useEffect, useState } from "react";
import { getChats } from "../services/chat";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";

import "../style/Chat.css";


export default function Chat() {
    const [conversations, setConversations] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [loading, setLoading] = useState(false);

    const loadChats = async () => {
        try {
            const { data } = await getChats();

            setConversations(data.conversations);

            if (!selectedChat) {
                if (data.conversations.length > 0) {
                    setSelectedChat(data.conversations[0]);
                }
                return;
            }

            const updatedConversation = data.conversations.find(
                (conversation) =>
                    conversation._id === selectedChat._id
            );

            if (updatedConversation) {
                setSelectedChat(updatedConversation);
            } else if (data.conversations.length > 0) {
                setSelectedChat(data.conversations[0]);
            } else {
                setSelectedChat(null);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadChats();
    }, []);

  return (
    <>
        <Navbar />

        <div className="nexus-chat-layout-container">
            <Sidebar
                conversations={conversations}
                selectedChat={selectedChat}
                setSelectedChat={setSelectedChat}
                loadChats={loadChats}
            />

            <div className="nexus-chat-main-stream">
                <ChatWindow
                    selectedChat={selectedChat}
                />

                {selectedChat && (
                    <ChatInput
                        selectedChat={selectedChat}
                        setSelectedChat={setSelectedChat}
                        loading={loading}
                        setLoading={setLoading}
                    />
                )}
            </div>
        </div>
    </>
);  
}