import React, { useState } from "react";
import { FiUsers, FiMessageSquare, FiSettings } from "react-icons/fi";
import Image from '../../Image/Image'
import Input from '../../Inputs/Input'
import { IoIosSearch } from "react-icons/io";

import { useChat } from "../../../hooks/useAuth";
import ChatComp from "./ChatComponent";
import ChatHeader from "./Header";
import SearchInput from "../../Inputs/SearchInput";
import useNotificationPermission from "../../../hooks/useNotificationPermission";




const ChatList = () => {
  const { chatList, setSelectedChat, selectedChat } = useChat()
  const permission = useNotificationPermission()

  return (
    <div className={`${selectedChat ? 'hidden' : 'flex'} sm:flex w-full transition-all duration-200  sm:w-1/4 
    sm:ml-14 relative 2xl:m-0 sm:min-w-64 md:min-w-72 lg:min-w-96 bg-gray-100 border-r border-gray-300 h-screen flex flex-col`}>
      {/* Sidebar Header */}
      <ChatHeader />

      <SearchInput
        placeholder="Search or Start a new chat">
        <IoIosSearch className="text-md mt-[1px] text-[#54656f]" />
      </SearchInput>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto mt-5 px-3">
        {
          chatList?.map((chat, index) => (
            <ChatComp
              onClick={() => setSelectedChat(chat)
              }
              index={index}
              chat={chat} />
          ))
        }
      </div>
    </div>
  );
};

export default ChatList;
