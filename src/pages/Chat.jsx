import React from 'react'
import { BsChatDotsFill, BsChatDots } from "react-icons/bs";
import { NavLink, Outlet } from "react-router-dom";
import { IoCall, IoCallOutline } from "react-icons/io5";

import Sidebar from '../components/Sidebar/SideBar';



function Chat() {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar />
      <div className="w-full relative z-20">
        <Outlet />
      </div>
    </div>
  )
}

export default Chat