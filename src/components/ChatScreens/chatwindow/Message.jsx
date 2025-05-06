import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { DocumentPreview, DocumentPreviewString } from './DocumentPreview';
import VoiceMessagePlayer from './VoiceMessagePlayer';



function Message({ index, msg }) {
    const { user } = useAuth();

    // console.log('this is messages ', msg);

    return (
        <div key={index} className={`flex ${msg.isSender ? "justify-end" : "justify-start"} mb-2 overflow-y-auto`}>
            <div
                className={`max-w-[80%] px-2 py-1 shadow-sm shadow-gray-300/40 rounded-b-lg rounded relative z-20
                ${msg.sender._id === user?._id ? "bg-[#d9fdd3] ml-auto" : "bg-white"} break-words whitespace-pre-line`}
            >


                {/* 🖼️ File Preview (if file exists) */}
                {msg.file && (
                    <div className="my-1 border border-gray-200 min-w-full overflow-hidden rounded-md">
                        {/* 🖼️ Image Preview (Styled with `object-cover` for consistency) */}
                        {msg.message_type === "image" && (
                            <img
                                src={`${import.meta.env.VITE_API_URL}/${msg.file}`}
                                alt="Sent File"
                                className="w-full h-[200px] object-cover rounded-md"
                            />
                        )}

                        {/* 🎥 Video Preview (Same rounded corners & sizing) */}
                        {msg.message_type === "video" && (
                            <video className="w-full h-[200px] object-cover rounded-md" controls>
                                <source src={`${import.meta.env.VITE_API_URL}/${msg.file}`} type="video/mp4" />
                            </video>
                        )}
                        {/* 🎵 Audio Preview (Consistent padding & background for visibility) */}
                        {/* {msg.message_type === "audio" && (
                            <div className="flex items-center justify-between bg-gray-100 p-3 rounded-md">
                                <audio className="w-full" controls>
                                    <source src={`${import.meta.env.VITE_API_URL}/${msg.file}`} type="audio/mpeg" />
                                </audio>
                            </div>
                        )} */}
                        {msg.message_type === "audio" && (
                            <VoiceMessagePlayer audioUrl={`${import.meta.env.VITE_API_URL}/${msg.file}`} />
                        )}

                        {/* 📄 Document Preview (Styled like Image & Video for consistency) */}
                        {msg.message_type === "file" &&

                            <DocumentPreview fileUrl={msg.file} />
                        }
                    </div>
                )}
                {/* 📝 Message Content */}
                {msg.message_content && <span className="text-base">{msg.message_content}</span>}
                {/* ⏳ Timestamp */}
                <span className="text-[10px] relative left-[5px] -bottom-1 text-gray-500 ml-2 self-end">
                    {msg?.createdAt?.time}
                </span>
            </div>
        </div>
    );
}

export default Message;
