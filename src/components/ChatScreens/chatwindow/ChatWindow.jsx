import React from "react";
import { IoIosLock } from "react-icons/io";
import Chatbox from "./Chatbox";
import { useChat } from "../../../hooks/useAuth";
import SelectChat from "./SelectChat";

const ChatWindow = ({initiateAudioCall}) => {
    
    const {selectedChat} = useChat(); 

    return (
        <>
            {
                selectedChat ?
                    <Chatbox initiateAudioCall={initiateAudioCall} />
                    :
                    <SelectChat />
            }
        </> 
    );
};

export default ChatWindow;
