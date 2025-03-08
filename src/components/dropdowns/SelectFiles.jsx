import React, { useEffect, useRef } from 'react'
import { SiRocketdotchat } from "react-icons/si";
import { FaRegHeart } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { HiOutlineUserGroup } from "react-icons/hi2";
import Input from '../Inputs/Input';
import { useChat } from '../../hooks/useAuth';



function SelectFiles({ showFileDropDropdown, SetShowFileDropDropdown }) {
    const { setFile , file } = useChat()
    const containerRef = useRef(null); // Reference for detecting outside clicks


    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        console.log('This is Selected Files ', event.target.files);
        if (selectedFile) {
            const reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onload = () => {
                console.log('Read as Base64 String ', reader);
                const base64Data = reader.result.split(",")[1]; // Extract Base64 part
                console.log('base64Data', base64Data);
                setFile({
                    name: selectedFile.name,
                    type: selectedFile.type,
                    data: base64Data,
                    preview: reader.result
                });
            };
        }
    };




    // 📌 Handle outside click to close dropdown
    useEffect(() => {
        function handleClickOutside(event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                SetShowFileDropDropdown(false); // Close dropdown if clicked outside
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);



    return (
        <div
            ref={containerRef}
            className={`transition-all shadow-xl shadow-gray-300/70 duration-150 origin-bottom  
        z-50 w-[170px] py-4 p-2 flex flex-col gap-1 border-gray-300 
        rounded-sm bg-white absolute bottom-14 ${showFileDropDropdown && !file ? ' scale-y-100' : ' scale-y-0'}`}>
            <Input
                onChange={handleFileChange}
                type='file'
                name='select-photos'
                className="hidden"
                labelStyle="hover:bg-gray-300/70 px-3 py-[6px] w-full flex text-[#54656f] items-center text-md justify-start gap-3 rounded"
                label={
                    <>
                        <SiRocketdotchat className=" cursor-pointer text-lg" />
                        Photos
                    </>
                }
                accept="image/*"
            />
            <Input
                onChange={handleFileChange}
                type='file'
                name='select-videos'
                className="hidden"
                labelStyle="hover:bg-gray-300/70 px-3 py-[6px] w-full flex text-[#54656f] items-center text-md justify-start gap-3 rounded"
                label={
                    <>
                        <FaRegHeart className=" cursor-pointer text-lg" />
                        Videos
                    </>
                }
                accept="video/*"
            />
            <Input
                type='file'
                name='select-contacts'
                className="hidden"
                labelStyle="hover:bg-gray-300/70 px-3 py-[6px] w-full flex text-[#54656f] items-center text-md justify-start gap-3 rounded"
                label={
                    <>
                        <IoPersonOutline className=" cursor-pointer text-lg" />
                        Contacts
                    </>
                }
            />
            <Input
                onChange={handleFileChange}
                type='file'
                name='select-documents'
                className="hidden"
                labelStyle="hover:bg-gray-300/70 px-3 py-[6px] w-full flex text-[#54656f] items-center text-md justify-start gap-3 rounded"
                label={
                    <>
                        <HiOutlineUserGroup className=" cursor-pointer text-lg" />
                        Documents
                    </>
                }
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
            />
        </div>
    )
}

export default SelectFiles;
