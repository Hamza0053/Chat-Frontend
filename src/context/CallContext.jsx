// CallContext.js
import React, { createContext, useContext, useState } from 'react';

const CallContext = createContext();

export const useCall = () => useContext(CallContext);

export const CallProvider = ({ children }) => {
  const [callState, setCallState] = useState({
    callSend: false,
    receivingCall: false,
    caller: null,
    callerSignal: null,
    callAccepted: false,
    callEnded: false,
  });

  const initiateCall = (member) => {
    console.log('Initiating call to:', member);
    setCallState((prevState) => ({
      ...prevState,
      callSend: true,
      // Set other call-related states as needed
    }));
  };

  const receiveCall = (data) => {
    setCallState((prevState) => ({
      ...prevState,
      receivingCall: true,
      caller: data.from,
      callerSignal: data.offer,
    }));
  };

  const acceptCall = () => {
    setCallState((prevState) => ({
      ...prevState,
      callAccepted: true,
    }));
  };

  const endCall = () => {
    setCallState((prevState) => ({
      ...prevState,
      callEnded: true,
    }));
  };

  return (
    <CallContext.Provider value={{ callState, initiateCall, receiveCall, acceptCall, endCall }}>
      {children}
    </CallContext.Provider>
  );
};