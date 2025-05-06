import React, { useMemo, useRef } from "react";
import Image from "../../Image/Image";
import Button from "../../Buttons/Button";
import { IoIosArrowBack } from "react-icons/io";
import { FaPhone } from "react-icons/fa"; // Import phone icon
import { useChat } from "../../../hooks/useAuth";
import AudioCall from "../../WebRTC/AudioCall"; // Import the AudioCall component
// import AudioCall from "../../WebRTC/AudioCall";

// At the top of your entry file
window.global = window;

const ChatUserProfile = ({initiateAudioCall}) => {
    const { selectedChat, setSelectedChat } = useChat();
    // const audioCallRef = useRef(); // Create a ref for the AudioCall component

    // Memoize member to prevent unnecessary recalculations
    const member = useMemo(() => selectedChat?.members?.[0] || selectedChat, [selectedChat]);

    // Handle case where there is no selected chat
    if (!member) return null;

    // const initiateAudioCall = (member) => {
    //     console.log('This is the member: ');
        
    //     if (audioCallRef.current) {
    //         audioCallRef.current.setIdToCall(member._id); // Set the ID to call
    //         audioCallRef.current.callUser(member); // Initiate the call
    //     }
    // };

    return (
        <div className="flex items-center space-x-3 p-3 bg-white shadow-sm absolute z-20 right-0 left-0 shadow-gray-300/40">
            {/* Back Button (Visible only on small screens) */}
            <Button onClick={() => setSelectedChat(null)} className="block sm:hidden">
                <IoIosArrowBack />
            </Button>

            <Image
                src={`${import.meta.env.VITE_API_URL}/${member?.profile_picture || "default-profile.png"}`}
                className="rounded-full w-10 h-10"
                alt={`${member?.name || "User"}'s Profile Picture`}
            />

            {/* Chat Info */}
            <div className="flex-1">
                <h3 className="font-semibold text-md">{member?.name || "Unknown User"}</h3>
                <p className="text-sm text-[#54656f]">
                    {member.name === 'Meta AI' ?
                        'Llama 3.1' :
                        member?.last_seen?.time || "Last seen unavailable"}
                </p>
            </div>

            <Button onClick={() => initiateAudioCall(member)} className="text-blue-500">
                <FaPhone />
            </Button>

            {/* Render the AudioCall component */}
            {/* <AudioCall ref={audioCallRef} /> */}
        </div>
    );
};

export default ChatUserProfile;
