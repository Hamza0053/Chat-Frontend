import React, { useEffect, useState } from "react";
import { AiOutlineFilePdf } from "react-icons/ai";
import { AiOutlineFileWord, AiOutlineFileExcel, AiOutlineFileText } from "react-icons/ai";

export function DocumentPreview({ fileUrl }) {
    const [fileSize, setFileSize] = useState("");
    const fileName = fileUrl
    const fileExtension = fileName

    // Fetch file size
    useEffect(() => {
        if (fileUrl) {
            fetch(fileUrl)
                .then(response => response.blob())
                .then(blob => {
                    setFileSize((blob.size / 1024).toFixed(2) + " KB");
                })
                .catch(error => console.error("Error loading file:", error));
        }
    }, [fileUrl]);

    // Determine file type and assign an icon
    const getFileIcon = () => {
        if (fileExtension === "pdf") return <AiOutlineFilePdf size={32} className="text-red-500" />;
        if (["doc", "docx"].includes(fileExtension)) return <AiOutlineFileWord size={32} className="text-blue-500" />;
        if (["xls", "xlsx"].includes(fileExtension)) return <AiOutlineFileExcel size={32} className="text-green-500" />;
        return <AiOutlineFileText size={32} className="text-gray-500" />;
    };

    return (
        <div className="mt-2 p-2 bg-gray-100 rounded-md border border-gray-300 shadow-md min-w-full flex flex-col items-center justify-between">
            {/* File Icon and Info */}
            <div className="flex items-center gap-3">
                {getFileIcon()}
                <div>
                    <p className="text-gray-700 font-semibold truncate w-40">{fileName}</p>
                    <p className="text-xs text-gray-500">{fileSize || "Loading..."} | {fileExtension.toUpperCase()} Document</p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-3 flex gap-2 w-full">
                <a
                    href={`${import.meta.env.VITE_API_URL}/${fileUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                    Open
                </a>
                <a
                    href={fileUrl}
                    download
                    className="flex-1 text-center bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300"
                >
                    Save as...
                </a>
            </div>
        </div>
    );
}

export function DocumentPreviewString({ base64String, fileName = "Uploaded Document" }) {
    if (!base64String) {
        return <p className="text-gray-500">No file uploaded</p>;
    }

    // Convert Base64 to Data URL for actions
    const pdfDataUrl = `${base64String}`;

    return (
        <div className="mt-2 p-2 bg-gray-100 rounded-md border border-gray-300 shadow-md min-w-full flex flex-col items-center justify-between">
            {/* File Icon and Details */}
            <div className="flex items-center gap-2">
                <AiOutlineFilePdf size={32} className="text-red-500" />
                <div>
                    <p className="text-gray-800 font-semibold truncate w-40">{fileName}</p>
                    <p className="text-xs text-gray-500">PDF Document</p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-3 flex gap-2 w-full">
                <a
                    href={pdfDataUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                    Open
                </a>
                <a
                    href={pdfDataUrl}
                    download={fileName}
                    className="flex-1 text-center bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300"
                >
                    Save as...
                </a>
            </div>
        </div>
    );
}



// export default {DocumentPreview,DocumentPreviewString};
