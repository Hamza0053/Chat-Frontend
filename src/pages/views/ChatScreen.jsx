import React, { useState } from 'react'
import ChatList from '../../components/ChatScreens/chat/ChatList'
import ChatWindow from '../../components/ChatScreens/chatwindow/ChatWindow'
import Chatbox from '../../components/ChatScreens/chatwindow/Chatbox'
import AudioCall from '../../components/WebRTC/AudioCall'
import { useRef } from 'react'

function ChatScreen() {
    // const [isChatActive, setChatActive] = useState(true)
    const audioCallRef = useRef();
    const initiateAudioCall = (member) => {
        console.log('This is the member: ');
        
        if (audioCallRef.current) {
            audioCallRef.current.setIdToCall(member._id); // Set the ID to call
            audioCallRef.current.callUser(member); // Initiate the call
        }
    };
    return (
        <>
            <div className="flex w-full">
                <ChatList  />
                {/* <Chatbox setChatActive={setChatActive} /> */}
                <ChatWindow initiateAudioCall={initiateAudioCall} />
                <AudioCall ref={audioCallRef} />
            </div>
        </>
    )
}

export default ChatScreen