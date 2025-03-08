import React, { useMemo } from "react";
import Image from "../../Image/Image";
import Button from "../../Buttons/Button";
import { IoIosArrowBack } from "react-icons/io";
import { useChat } from "../../../hooks/useAuth";

const ChatUserProfile = () => {
    const { selectedChat, setSelectedChat } = useChat();

    // Memoize member to prevent unnecessary recalculations
    const member = useMemo(() => selectedChat?.members?.[0] || selectedChat, [selectedChat]);

    // Handle case where there is no selected chat
    if (!member) return null;

    return (
        <div className="flex items-center space-x-3 p-3 bg-white shadow-sm absolute z-20 right-0 left-0 shadow-gray-300/40">
            {/* Back Button (Visible only on small screens) */}
            <Button onClick={() => setSelectedChat(null)} className="block sm:hidden">
                <IoIosArrowBack />
            </Button>

            {/* Profile Picture */}
            <Image
                src={`http://localhost:5000/${member?.profile_picture || "default-profile.png"}`}
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
        </div>
    );
};

export default ChatUserProfile;
