import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { ChatList, FetchMessages } from "../api/auth"
import { CreateChatHandler } from "./messageHandler";
import { useAuth } from "../hooks/useAuth";
import useNotifications from "../hooks/useNotifications";
import socket from "../socket";   
// Set up Socket.IO client connection
// const socket = io("http://localhost:5000");/
// Create the context



export const chatContext = createContext();

// ChatProvider that wraps the application
const ChatProvider = ({ children }) => {
    const { user } = useAuth()
    const { notifications } = useNotifications();
    const [chatList, setChatList] = useState([]);
    const [messages, setMessages] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [file, setFile] = useState(null);

    // const selectChat = (chat, member) => {
    //     // console.log('chat member is ', member, chatId);

    //     // const chat = chatList.find(chat => {
    //     //     // console.log('prev chat id selected', chat._id === chatId);
    //     //     return chat._id === chatId
    //     // });
    //     // console.log('chat is selected', chat);
    //     setSelectedChat(chat);
    // };

    function UpdateLastMessage(message) {
        setChatList((prev) => prev.map((chat) => {
            if (message.chat === chat._id) {
                // console.log('this is chat message ', chat);
                chat.lastMessage.message_content = message.message_content
            }
            return chat
        }
        ))
    }


    const sendMessage = async (messageContent, filePath = null, message_type = "text", isGroupChat = false) => {
        const isNew = chatList.find(chat => chat?._id === selectedChat?._id)
        const chat = isNew ? selectedChat : await CreateChatHandler(user?._id, selectedChat?._id)
        console.log('This is file Object: ', file);

        const newMessage = {
            sender: user?._id,
            message_content: messageContent,
            message_type: file ? getMessageType(file.type) : message_type,
            timestamp: new Date().toLocaleTimeString(),
            chatId: chat?._id,
            file: filePath
        };
        console.log('New Messages is sending', newMessage);

        socket.emit("send-message", newMessage);
        setMessages((prevMessages) => [...prevMessages, { ...newMessage, sender: { _id: user?._id } }]); // Update message list locally
        setFile(null)
    };


    const getMessageType = (mimeType) => {
        if (mimeType.startsWith("image/")) return "image";
        if (mimeType.startsWith("video/")) return "video";
        if (mimeType.startsWith("audio/")) return "audio";
        return "file";
    };


    const fetchPrevMessages = async (chatId) => {
        const response = await FetchMessages(selectedChat?._id)
        // console.log('this is messages ', response);
        setMessages(response?.messages)
    }

    const IncrementPrevMessagesCount = (messageChatId) => {
        setChatList((prev) =>
            prev.map((chat) => {
                if (chat._id === messageChatId) {

                    return {
                        ...chat,
                        unreadMessages: chat.unreadMessages.map((unread) => ({
                            ...unread,
                            count: unread.count + 1, // ✅ Proper increment
                        })),
                    };
                }
                return chat;
            })
        );
    };

    useEffect(() => {
        if (notifications?.data?.chatId && notifications?.data?.message) {
            IncrementPrevMessagesCount(notifications?.data?.chatId);
            UpdateLastMessage(notifications?.data?.message)
        }
    }, [notifications]); // ✅ Only runs when `notifications` change





    useEffect(() => {

        socket.emit('join-chat', { userId: user?._id, chatId: selectedChat?._id });
        console.log('Chat is changed ', selectedChat);


        if (selectedChat?._id) fetchPrevMessages(selectedChat?._id)
        socket.emit('message-read', { chatId: selectedChat?._id, userId: user?._id });

        socket.on("receive-message", (message) => {
            console.log('This is received messages', message);

            if (selectedChat?._id != message?.chat) IncrementPrevMessagesCount(message?.chat)


            UpdateLastMessage(message)
            if (message.chat === selectedChat?._id) {
                setMessages((prevMessages) => [...prevMessages, message]);
            }
        });

        return () => {
            socket.off("receive-message");
        };
    }, [selectedChat]);


    const fetchChatList = async () => {
        // console.log('chat is going to fetched');
        const chatFetched = await ChatList()
        console.log('chat fetched is : ', chatFetched);
        setChatList(chatFetched?.chats)
    };


    useEffect(() => {
        // ✅ Listen for unread message count updates
        socket.on('unread-message-count', ({ chatId, count }) => {
            console.log('set new count ', { chatId, count });

            setChatList(prev =>
                prev.map(chat =>
                    chat._id === chatId ? { ...chat, unreadMessages: [{ userId: user?._id, count }] } : chat
                )
            );
        });

        return () => {
            socket.off('unread-message-count');
        };
    }, []);


    useEffect(() => {
        if (user?.isLogin) { fetchChatList(); }
    }, [user]);

    const addNewContact = (contact) => {
        setSelectedChat(contact);
    }


    // Function to add a new chat to the list
    const newChat = (contact) => {
        setChatList((prev) => [contact, ...prev]);
    };

    // Function to move a chat to the start (e.g., when it's selected)
    const moveToStart = (contactId) => {
        setChatList((prev) => {
            const updatedChatList = [...prev];
            const index = updatedChatList.findIndex(contact => contact.id === contactId);
            if (index !== -1) {
                const [contact] = updatedChatList.splice(index, 1);
                updatedChatList.unshift(contact);
            }
            return updatedChatList;
        });
    };


    return (
        <chatContext.Provider value={{ messages, chatList, setFile, file, fetchChatList, setSelectedChat, newChat, moveToStart, sendMessage, selectedChat, addNewContact }}>
            {children}
        </chatContext.Provider>
    );
};

export default ChatProvider;
