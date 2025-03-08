import React, { useEffect, useState } from 'react'
import Input from '../../Inputs/Input'
import { HiOutlineUserGroup } from "react-icons/hi2";
import { LuArrowLeft } from "react-icons/lu";
import Button from '../../Buttons/Button';
import ChatMember from './chatmember/ChatMember';
import { AllContactsApi } from '../../../api/auth';
import { useAuth, useChat, useContacts } from '../../../hooks/useAuth';
import SkeletonLoader from './chatmember/Skeleton';
import SearchInput from '../../Inputs/SearchInput';



function AllContacts({ showContacts, setAllContacts }) {
    const { user } = useAuth();
    const { addNewContact } = useChat()
    const [searchQuery, setSearchQuery] = useState(null);
    const { regularUsers, fetchContacts, loading } = useContacts()



    useEffect(() => {
        fetchContacts();
    }, [showContacts]);

    // Filter contacts based on the search query
    const filteredContacts = searchQuery
        ? regularUsers?.filter(contact =>
            contact?.name.toLowerCase().includes(searchQuery.toLowerCase())  // Case insensitive search
        )
        : regularUsers;

    return (
        <div className={`transition-all duration-200 z-50 origin-left sm:origin-top ${showContacts ? 'scale-x-100  sm:scale-y-100 ' : 'scale-x-0 scale-y-100 sm:scale-y-0 sm:scale-x-100'} 
        absolute z-50 py-4 flex flex-col gap-1 border-[1.3px] border-gray-300 shadow-md shadow-gray-300/50
        rounded-sm  inset-0 sm:inset-auto sm:min-w-84 sm:-right-60 sm:top-12 overflow-y-auto h-[calc(100vh-68px)]  bg-[#efefee] `}>

            <div className="px-3 flex items-center justify-start gap-2 ">
                <Button
                    onClick={() => setAllContacts((prev) => !prev)}
                    className='sm:hidden '
                >
                    <LuArrowLeft className='text-xl mb-1' />
                </Button>
                <span className="text-gray-800 mb-2 block font-semibold text-sm">
                    New Chat
                </span>
            </div>

            <SearchInput
                placeholder="Search or Start a new chat"
                onChange={(e) => setSearchQuery(e.target.value)}
            />


            <div className="flex-1 overflow-y-auto mt-5 px-3 relative z-50">
                <div className="flex items-center space-x-3 p-3 rounded-md hover:bg-gray-200 cursor-pointer">
                    <div className="w-10 h-10 bg-gray-300 flex items-center justify-center pb-1 rounded-full">
                        <HiOutlineUserGroup className='text-[#54656f] text-2xl' />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold">New Group </h3>
                    </div>
                </div>

                <h3 className="font-semibold text-sm my-3">All Contacts </h3>

                {
                    loading ?
                        Array(6).fill(0).map(() => <SkeletonLoader />)

                        :
                        filteredContacts?.length > 0 ? (
                            filteredContacts.map((contact, index) => (

                                <ChatMember
                                    onClick={
                                        () => {

                                            addNewContact(contact)
                                            setAllContacts(false)
                                        }
                                    }
                                    key={index}
                                    index={index}
                                    data={contact} />
                            ))
                        ) : (
                            <div>No contacts found</div>
                        )
                }
            </div>
        </div>
    );
}

export default AllContacts;
