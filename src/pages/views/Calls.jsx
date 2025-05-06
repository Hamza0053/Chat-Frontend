import React, { useState } from 'react'
import CallList from '../../components/Calls/CallList'
import CallInfo from '../../components/Calls/CallInfo'
import { IoVideocam, IoLink, IoKeypad } from 'react-icons/io5'

function Calls() {
  const [selectedCall, setSelectedCall] = useState(null);

  console.log('selectedCall', selectedCall);

  const nullScreen = (<div className="flex space-x-8 mt-8 items-center justify-center min-h-screen w-full">
    <div className="flex flex-col items-center">
      <div className="bg-gray-800 p-4 rounded-full">
        <IoVideocam className="text-green-500 text-3xl" />
      </div>
      <span className="mt-2 text-white">Start call</span>
    </div>
    <div className="flex flex-col items-center">
      <div className="bg-gray-800 p-4 rounded-full">
        <IoLink className="text-white text-3xl" />
      </div>
      <span className="mt-2 text-white">New call link</span>
    </div>
    <div className="flex flex-col items-center">
      <div className="bg-gray-800 p-4 rounded-full">
        <IoKeypad className="text-white text-3xl" />
      </div>
      <span className="mt-2 text-white">Call a number</span>
    </div>
  </div>)

  return (
    <div className="flex flex-row items-start justify-center h-full">
      <CallList setSelectedCall={setSelectedCall} />
      {selectedCall ? (
        <CallInfo call={selectedCall} setSelectedCall={setSelectedCall} />
      ) : (
        nullScreen
      )}
    </div>
  )
}

export default Calls