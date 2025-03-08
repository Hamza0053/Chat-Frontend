import React from 'react'
import { SiRocketdotchat } from "react-icons/si";
import { FaRegHeart } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { HiOutlineUserGroup } from "react-icons/hi2";
import Button from '../Buttons/Button';

// https://www.facebook.com/reel/1432165407762795
function Filters({toggleFilter}) {
    return (


        <div className={`transition-all shadow-gray-300/50 duration-150 origin-top ${toggleFilter ? ' scale-y-100' : ' scale-y-0'}  absolute z-50 w-[200px] py-4 p-2 flex flex-col gap-1 border-[1.3px] border-gray-300 rounded-sm right-4 sm:-right-36 top-16 bg-[#efefee]`}>

            <span className="text-gray-400 mb-2 block px-3 font-semibold text-sm">Filter Chats By</span>

            <Button
                text="Unread"
                className="hover:bg-gray-300/70 px-3 py-[6px] w-full flex text-[#54656f] items-center text-md justify-start gap-3 rounded"
            >
                <SiRocketdotchat className=" cursor-pointer text-lg" />
            </Button>

            <Button
                text="Favoutes"
                className="hover:bg-gray-300/70 px-3 py-[6px] w-full flex text-[#54656f] items-center text-md justify-start gap-3 rounded"
            >
                <FaRegHeart className=" cursor-pointer text-lg" />
            </Button>
            <Button
                text="Contacts"
                className="hover:bg-gray-300/70 px-3 py-[6px] w-full flex text-[#54656f] items-center text-md justify-start gap-3 rounded"
            >
                <IoPersonOutline className=" cursor-pointer text-lg" />
            </Button>
            <Button
                text="Groups"
                className="hover:bg-gray-300/70 px-3 py-[6px] w-full flex text-[#54656f] items-center text-md justify-start gap-3 rounded"
            >
                <HiOutlineUserGroup className=" cursor-pointer text-lg" />
            </Button>



        </div>
    )
}

export default Filters