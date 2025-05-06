import React, { useState } from 'react'
import { BsFilter } from "react-icons/bs";
import Button from '../../Buttons/Button'
import { RxPencil2 } from "react-icons/rx";
import Filters from "../../dropdowns/Filters";
import AllContacts from "../contacts/AllContacts";


function ChatHeader({ isCalls = false }) {
    const [toggleFilter, setToggleFilter] = useState(false)
    const [showContacts, setAllContacts] = useState(false)

    return (
        <div className="p-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">{isCalls ? 'Calls' : 'Chats'}</h2>
            <div className="flex gap-2">
                <Button
                    onClick={() => setAllContacts((prev) => prev ? false : true)}
                    className="hover:bg-gray-200 w-10 h-10 flex items-center justify-center rounded"
                >
                    <RxPencil2 className="text-[#54656f] cursor-pointer text-2xl" />
                </Button>
                <AllContacts setAllContacts={setAllContacts} showContacts={showContacts} />
                {!isCalls && <Button
                    onClick={() => setToggleFilter((prev) => prev ? false : true)}
                    className="hover:bg-gray-200 w-10 h-10 flex items-center justify-center rounded"
                >
                    <BsFilter className="text-[#54656f] cursor-pointer text-2xl" />
                </Button>}
                {!isCalls && <Filters toggleFilter={toggleFilter} />}
            </div>
        </div>
    )
}

export default ChatHeader