import React from "react";
import ChatUserProfile from "./ChatUserProfile";
import Message from "./Message";
import chat_pattren from '../../../assets/chat_pattren.png'
import Image from "../../Image/Image";
import Input from "../../Inputs/Input";
import MessageInput from "../../Inputs/MessageInput";
import { useChat } from "../../../hooks/useAuth";

const messages = [
    {
        sender: "Sir Umer",
        time: "10:13 PM",
        message: "Assalamualaikum Tomorrow Institute will be closed due to 5th February Kashmir Day",
        isSender: false,
    },
    {
        sender: "You",
        time: "10:15 PM",
        message: "ok",
        isSender: true,
    },
    {
        sender: "Sir Umer",
        time: "10:15 PM",
        message: "Agr koi office ka Kam hai toh ana hai\nWarana rehna do",
        isSender: false,
    },
    {
        sender: "You",
        time: "10:16 PM",
        message: "sir sey puch lay meraaa",
        isSender: true,
    },
    {
        sender: "You",
        time: "10:16 PM",
        message: "ok",
        isSender: true,
    },
];


const   Chatbox = () => {    
    const { selectedChat, messages } = useChat();
   
    // console.log('This is ======================== messagess', messages);

    return (
        <div className={`${selectedChat ? 'flex' : 'hidden'} sm:flex w-full flex-col max-h-screen relative`}>
            <ChatUserProfile />

            <div className=" h-screen">
                <Image
                    src={chat_pattren}
                    className="bg-[#faf7f4] w-full max-h-full  absolute inset-0 z-0"
                />

                <div className=" z-10 p-6 absolute top-[73px] bottom-12 left-0 right-0 overflow-y-auto">
                    {
                        messages?.map((msg, index) => (
                            <Message msg={msg} index={index} />
                        ))}
                </div>

                <MessageInput />
            </div>
        </div>
    );
};

export default Chatbox;
