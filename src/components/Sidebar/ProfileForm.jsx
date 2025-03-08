import { useState } from "react";
import Input from "../Inputs/Input";
import Image from "../Image/Image";
import Button from "../Buttons/Button";
import { useAuth, useLoading } from "../../hooks/useAuth";

import LogoutModal from "../Models/LogoutModel";



export default function ProfileForm({ showProfileForm, profileRef }) {
    const { user, updateProfileHandler } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const { setLoading } = useLoading()
    const [showLogoutModel, setShowLogoutModel] = useState(false)
    const [userProfile, setUserProfile] = useState({
        name: user?.name,
        status: user?.status,
        phone: user?.phone || '03xx-xxxxxxx',
        profile_picture: `${import.meta.env.VITE_API_URL}/${user?.profile_picture}`
    });



    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUserProfile((prevProfile) => ({
                ...prevProfile,
                profile_picture: file
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const formData = new FormData();
        Object.entries(userProfile).forEach(([key, value]) => {
            formData.append(key, value);
        });
        const success = await updateProfileHandler(formData)
        if (success) {
            setLoading(false)
        }
    };
    return (
        <>
            {
                showLogoutModel &&
                <LogoutModal
                    onCancel={() => setShowLogoutModel(false)}
                />
            }

            <form ref={profileRef} onSubmit={handleSubmit} className={`max-w-md min-w-[350px] mx-auto p-6 border rounded-lg flex
                                            flex-col gap-3 shadow-lg bg-white transition-all duration-150 origin-bottom absolute bottom-2 ${showProfileForm ? 'scale-y-100' : 'scale-y-0'}
                                            z-10 left-6 text-center border-gray-300/30 shadow-gray-300/40 `}>
                <div className="group flex w-24 h-24 justify-center mb-4 relative bg-red-300 rounded-full cursor-pointer">
                    <Image
                        src={typeof userProfile.profile_picture === 'string' ? userProfile.profile_picture : URL.createObjectURL(userProfile.profile_picture)}
                        alt="Profile"
                        className="rounded-full"
                    />
                    <Input
                        label="✏️"
                        type="file"
                        labelStyle="bg-gray-900/30 hidden group-hover:flex absolute inset-0 rounded-full cursor-pointer flex items-center justify-center"
                        name="profile_picture"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                    />
                </div>
                <div className="flex items-center justify-between">
                    {isEditing ? (
                        <Input
                            type="text"
                            name="name"
                            value={userProfile.name}
                            onChange={handleChange}
                            className="w-full outline-1 outline-gray-300 shadow shadow-gray-300/50 border-b-2 border-transparent focus:border-green-600 focus:outline-gray-300 rounded h-8 text-md placeholder:text-sm px-2 text-[#54656f]"
                        />
                    ) : (
                        <h2 className="text-sm font-medium text-[#54656f]">{userProfile.name}</h2>
                    )}
                    <Button
                        onClick={() => setIsEditing(!isEditing)}
                        className="ml-2 h-9 rounded w-10 hover:bg-gray-100"
                    >
                        ✏️
                    </Button>
                </div>
                <div className="flex flex-col items-start gap-1 justify-between">
                    <span className="text-[#54656f] block font-semibold text-start">about</span>
                    {isEditing ? (
                        <Input
                            type="text"
                            name="status"
                            value={userProfile.status}
                            onChange={handleChange}
                            className="w-full outline-1 outline-gray-300 shadow shadow-gray-300/50 border-b-2 border-transparent focus:border-green-600 focus:outline-gray-300 rounded h-8 text-md placeholder:text-sm px-2 text-[#54656f]"
                        />
                    ) : (
                        <h2 className="text-sm font-medium text-[#54656f]">{userProfile.status}</h2>
                    )}
                </div>
                <div className="flex flex-col items-start gap-1 justify-between">
                    <span className="text-[#54656f] block font-semibold text-start">Phone number</span>
                    {isEditing ? (
                        <Input
                            type="text"
                            name="phone"
                            value={userProfile.phone}
                            onChange={handleChange}
                            className="w-full outline-1 outline-gray-300 shadow shadow-gray-300/50 border-b-2 border-transparent focus:border-green-600 focus:outline-gray-300 rounded h-8 text-md placeholder:text-sm px-2 text-[#54656f]"
                        />
                    ) : (
                        <h2 className="text-sm font-medium text-[#54656f]">{userProfile.phone}</h2>
                    )}
                </div>
                <div className="flex items-center justify-center mt-4">
                    {
                        !isEditing &&
                        <Button
                            onClick={() => setShowLogoutModel(true)}
                            className="  w-32 p-2 border border-gray-300 text-red-500 mr-auto block rounded"
                        >
                            Log out
                        </Button>}
                    {
                        isEditing &&
                        <Button
                            type="submit"
                            className=" w-32 p-2 border border-gray-300 text-green-500 mr-auto block rounded"
                        >
                            Save Changes
                        </Button>}
                </div>
            </form>
        </>
    );
}
