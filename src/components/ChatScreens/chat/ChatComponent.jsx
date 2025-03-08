import React from "react";
import Image from "../../Image/Image";


function ChatComp({ index, chat, onClick }) {

    const chatMember = chat?.members[0]
    const unreadMessagesCount = chat?.unreadMessages[0]?.count
    // console.log('chat is ', unreadMessagesCount);
    console.log(chat?.updatedAt?.time);

    return (
        <div
            key={index}
            onClick={onClick}
            className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-200 cursor-pointer relative"
        >
            {/* Profile picture */}
            <div className="w-10 h-10 bg-gray-300 rounded-full">
                <Image
                    src={`http://localhost:5000/${chatMember?.profile_picture}`} // Dynamically load the profile picture
                    className='rounded-full w-10 h-10'
                />
            </div>

            {/* Chat info */}
            <div className="flex-1 w-full">
                <h3 className="font-medium">{chatMember?.name}</h3>  {/* Display the chat name */}
                <p className="text-sm text-[#54656f] line-clamp-1 max-w-[88%]">{chat?.lastMessage?.message_content}</p>  {/* Display last message */}
            </div>
            <span className={`text-[13px] absolute top-3 right-3 m-0
                ${unreadMessagesCount > 0 ? 'text-green-600 font-semibold':'text-[#54656f]'}
                `}>{ chat?.updatedAt?.time}</span>
            {
                unreadMessagesCount > 0 &&
                <span className="bg-green-600 text-[12px] font-semibold text-white w-4 h-4 flex items-center justify-center rounded-full absolute bottom-3 right-3">{unreadMessagesCount}</span>
            }
        </div>
    );
}

export default ChatComp;
