import React, { useState } from 'react';
import { useChat } from '../../../hooks/useAuth';
import { IoCloseSharp } from "react-icons/io5";

function DisplayFile() {
    const { file, setFile } = useChat();
    const [caption, setCaption] = useState("");
    const [previewURL, setPreviewURL] = useState(null);
    if (!file) return null; // If no file is selected, return nothing.
    console.log('This is file in the Display File: ', file);
    const filePreview = URL.createObjectURL(file);
 
    return (
        <div className="relative bg-gray-800  rounded-md  w-full">

            {/* 🖼️ Image Preview */}
            {file.type.startsWith("image/") && (
                <img
                    src={filePreview}
                    alt="preview"
                    className="h-[209px] w-full object-cover px-12 rounded-md border border-gray-200"
                />
            )}

            {/* 🎥 Video Preview */}
            {file.type.startsWith("video/") && (
                <video
                    className="h-[209px] w-full object-contain rounded-md border border-gray-200"
                    controls
                >
                    <source src={filePreview} type={file.type} />
                </video>
            )}

            {/* 📄 Document Preview */}
            {file.type.startsWith("application/") && (
                <div className="flex items-center justify-between p-4 bg-gray-100 rounded-md border border-gray-300">
                    <span className="text-gray-700 font-semibold truncate w-3/4">{file.name}</span>
                    <a
                        href={filePreview}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 font-semibold hover:underline"
                    >
                        Open File
                    </a>
                </div>
            )}

        </div>
    );
}

export default DisplayFile;
