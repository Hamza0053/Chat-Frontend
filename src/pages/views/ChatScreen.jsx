import React from 'react'
import ChatList from '../../components/ChatScreens/chat/ChatList'
import ChatWindow from '../../components/ChatScreens/chatwindow/ChatWindow'
// import { useCall } from '../../hooks/useAuth'

function ChatScreen() {
   

    return (
        <>
            <div className="flex w-full">
                <ChatList  />
                <ChatWindow/>
            </div>
        </>
    )
}

export default ChatScreen