import React from 'react';
import { BsTelephoneFill } from "react-icons/bs";
import { IoVideocam } from "react-icons/io5";

const CallIndividual = ({ call, setSelectedCall }) => {
  console.log('call', call);
  const individualCall = call.isCaller ? call.receiver : call.caller;
  console.log('individualCall', individualCall);
  

  return (
    <div onClick={() => setSelectedCall(call)} className="flex items-center justify-between p-3 hover:bg-gray-200 cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
          <img 
            src={`${import.meta.env.VITE_API_URL}/${individualCall.profile_picture}`}
            alt={individualCall.name}
            className="w-12 h-12 rounded-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-medium">{individualCall.name}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            {call.type === 'video' ? (
              <IoVideocam className="text-red-500" />
            ) : (
              <BsTelephoneFill className={`${call.call_status ? call.isCaller ? 'text-green-500' : 'text-blue-500' : 'text-red-500'}`} />
            )}
            <span>
                {call.call_status ? call.isCaller ? 'Outgoing' : 'Incoming' : 
                 <span className='text-red-500'>Missed</span>
                }
            </span>
          </div>
        </div>
      </div>
      <div className="text-sm text-gray-600">
        {call?.started_at?.date}
      </div>
    </div>
  );
};

export default CallIndividual;
