import React, { useState } from 'react';
import Input from './Input';
import { FaLink } from "react-icons/fa6";
import { BsEmojiAstonished } from "react-icons/bs";
import { useAuth, useChat } from '../../hooks/useAuth';
import Button from "../Buttons/Button"
import SelectFiles from '../dropdowns/SelectFiles';
import ShowSelectedFile from '../ChatScreens/chatwindow/ShowSelectFile';




function MessageInput() {
    const [message, setMessage] = useState(""); // State to store the message input
    const { sendMessage } = useChat()
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

            <div className="flex bg-white px-4
                        absolute left-0 right-0 bottom-0 z-20
                        items-center justify-start gap-1 pl-2 py-3 border-t-[1.35px]
                        border-gray-300/50 w-full">
                <ShowSelectedFile />
                <SelectFiles
                    showFileDropDropdown={showFileDropDropdown}
                    SetShowFileDropDropdown={SetShowFileDropDropdown} />
                <div className="flex gap-5 ml-4 mr-2 items-center">
                    <Button

                        className="text-[#54656f] text-lg">
                        <BsEmojiAstonished />
                    </Button>
                    <Button
                        onClick={() => SetShowFileDropDropdown((prev) => !prev)}
                        className="text-[#54656f] text-xl">
                        <FaLink />
                    </Button>
                </div>
                <Input
                    placeholder="Type a message..."
                    value={message} // Bind input value to state
                    onChange={handleChange} // Update state on input change
                    onKeyDown={handleKeyDown} // Trigger action when Enter key is pressed
                    className="w-full focus:outline-none text-sm placeholder:text-sm text-[#54656f]"
                />
                <span className="">
                    <span aria-hidden="true" data-icon="ptt" class="">
                        <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" version="1.1" x="0px" y="0px" enable-background="new 0 0 24 24">
                            <title>ptt</title>
                            <path fill="currentColor" d="M11.999,14.942c2.001,0,3.531-1.53,3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531 S8.469,2.35,8.469,4.35v7.061C8.469,13.412,9.999,14.942,11.999,14.942z M18.237,11.412c0,3.531-2.942,6.002-6.237,6.002 s-6.237-2.471-6.237-6.002H3.761c0,4.001,3.178,7.297,7.061,7.885v3.884h2.354v-3.884c3.884-0.588,7.061-3.884,7.061-7.885 L18.237,11.412z"></path>
                        </svg>
                    </span>
                </span>
            </div>
        </>
    );
}

export default MessageInput;
