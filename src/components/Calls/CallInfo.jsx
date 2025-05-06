import React from 'react';
import { IoCall, IoChatbubble, IoVideocam } from 'react-icons/io5';
import { IoClose } from "react-icons/io5";

function CallInfo({ call, setSelectedCall }) {
    const individualCall = call.isCaller ? call.receiver : call.caller;
    return (
        <div className="bg-white rounded-lg p-6 w-full mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Call Info</h2>
                <button
                    onClick={() => {
                        setSelectedCall(null);
                    }}
                    className="text-gray-500 hover:text-gray-700 cursor-pointer">
                    <IoClose className="text-2xl" />
                </button>
            </div>
            <div className="border-[1px] border-gray-200 rounded mt-4">
                <div className="flex items-center justify-between p-3 border-b-[1px] border-gray-200">
                    <div className="flex items-center">
                        <img
                            src={`${import.meta.env.VITE_API_URL}/${individualCall.profile_picture}`}
                            alt={individualCall.name}
                            className="w-10 h-10 rounded-full mr-3"
                        />
                        <span className="text-lg font-bold">{individualCall.name}</span>
                    </div>
                    <div className="flex space-x-2">
                        <IoChatbubble className="text-xl text-gray-800" />
                        <IoVideocam className="text-xl text-gray-800" />
                        <IoCall className="text-xl text-gray-800" />
                    </div>
                </div>
                <div className=" flex justify-between items-end p-3 pb-5" >
                    <div className="flex flex-col gap-2">
                        <div className="text-sm text-gray-600">
                            {call?.started_at?.date}
                        </div>
                        <div className="flex items-center text-sm text-gray-800">
                            <IoCall className="mr-2" />
                            <span>
                                {call.isCaller ? 'Outgoing' : 'Incoming'} {call.call_type} call at {call?.started_at?.time}
                            </span>
                        </div>
                    </div>
                    <div className="text-sm text-gray-500">
                        {call.call_status ? call.isCaller ? 'Outgoing' : 'Incoming' :
                            <span className='text-red-500'>Missed</span>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CallInfo;