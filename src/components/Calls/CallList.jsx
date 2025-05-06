import React, { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";


import SearchInput from "../Inputs/SearchInput";
import ChatHeader from "../ChatScreens/chat/Header";
import { CallList as CallListFetch } from "../../api/auth";
import CallIndividual from "./CallIndividual";




const CallList = ({ setSelectedCall }) => {
    const [callListData, setCallListData] = useState([])

    useEffect(() => {
        const fetchCallList = async () => {
            const response = await CallListFetch()
            
            if(response.success){
                setCallListData(response.calls)
            }
        }
        fetchCallList()
    }, [])

//   const permission = useNotificationPermission()        

  return (
    <div className={`sm:flex w-full transition-all duration-200  sm:w-1/4 
    sm:ml-14 relative 2xl:m-0 sm:min-w-64 md:min-w-72 lg:min-w-96 bg-gray-100 border-r border-gray-300 h-screen flex flex-col`}>
      {/* Sidebar Header */}
      <ChatHeader isCalls={true} />

      <SearchInput
        placeholder="Search or Start a new chat">
        <IoIosSearch className="text-md mt-[1px] text-[#54656f]" />
      </SearchInput>

      <div className="overflow-y-auto flex-1 mt-3">
        {callListData.map((call) => (
          <CallIndividual key={call.id} call={call} setSelectedCall={setSelectedCall} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(CallList);
