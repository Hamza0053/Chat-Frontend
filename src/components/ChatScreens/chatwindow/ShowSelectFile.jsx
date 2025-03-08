import React, { useState } from 'react';

import { FaLink } from "react-icons/fa6";
import { BsEmojiAstonished } from "react-icons/bs";
import { useAuth, useChat } from '../../../hooks/useAuth';
import Button from "../../Buttons/Button"
import Input from '../../Inputs/Input';
import { IoSendSharp } from "react-icons/io5";
import DisplayFile from './DisplayFile';

import { RiDeleteBin5Line } from "react-icons/ri";


function ShowSelectedFile() {
    const [message, setMessage] = useState(""); // State to store the message input
    const { sendMessage, file, setFile } = useChat()
    const { user } = useAuth()
    const [showFileDropDropdown, SetShowFileDropDropdown] = useState(false)

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && message.trim() !== "") {
            console.log('meess ', user?._id);
            sendMessage(message)
            setMessage("");
        }
    };

    const handleChange = (event) => {
        setMessage(event.target.value);
    };


    return (
        <>
            {
                file &&
                <div className=" bg-white 
                                    z-20 left-3 right-3 h-[350px] sm:w-[60%] absolute bottom-4 shadow-lg shadow-gray-300/50
                                    overflow-hidden rounded-md
                                    border-t-[1.35px] 
                                  border-gray-300/50 flex flex-col">
                    <div className="w-full bg-amber-100">
                        <div className="flex gap-5 w-full bg-[#f3f3f3] p-2 pr-6 items-center">
                            <Button
                                onClick={() => setFile(null)}
                                className="text-[#5a6c77] text-2xl
                                            rounded flex ml-auto  items-center justify-center">
                                <RiDeleteBin5Line />
                            </Button>
                        </div>
                        <DisplayFile />
                    </div>
                    <div className="mt-auto">
                        <div className="w-full flex items-center  bg-[#eeeeee] h-12 justify-start pl-1">
                            <div className="mr-2 mt-1">
                                <Button

                                    className="text-[#5a6c77] text-lg">
                                    <BsEmojiAstonished />
                                </Button>
                            </div>
                            <Input
                                placeholder="Type a message..."
                                value={message} // Bind input value to state
                                onChange={handleChange} // Update state on input change
                                onKeyDown={handleKeyDown} // Trigger action when Enter key is pressed
                                className="w-full px-2 focus:outline-none text-sm placeholder:text-sm placeholder:text-[#5a6c77] text-[#5a6c77]"
                            />
                        </div>
                        <div className="flex gap-5 w-full bg-[#f3f3f3] p-2 items-center">
                            <Button
                                onClick={() => {
                                    sendMessage(message)
                                    setMessage("");
                                }}
                                className="text-white bg-green-500 h-[35px] w-[35px] 
                                            rounded text-lg flex ml-auto  items-center justify-center">
                                <IoSendSharp />
                            </Button>
                        </div>
                    </div>
                </div>
            }

        </>
    );
}

export default ShowSelectedFile;
