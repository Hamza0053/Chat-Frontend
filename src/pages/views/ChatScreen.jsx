import React, { useState } from 'react'
import ChatList from '../../components/ChatScreens/chat/ChatList'
import ChatWindow from '../../components/ChatScreens/chatwindow/ChatWindow'
import Chatbox from '../../components/ChatScreens/chatwindow/Chatbox'



function ChatScreen() {
    // const [isChatActive, setChatActive] = useState(true)

    return (
        <>
            <div className="flex w-full">
                <ChatList  />
                {/* <Chatbox setChatActive={setChatActive} /> */}
                <ChatWindow />
            </div>
        </>
    )
}

export default ChatScreen