// CallContext.js
import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import SimplePeer from 'simple-peer';
import socket from '../socket';
import { useAuth } from '../hooks/useAuth';

export const CallContext = createContext();

export const CallProvider = ({ children }) => {
  const { user } = useAuth();
  const [callState, setCallState] = useState({
    callSend: false,
    receivingCall: false,
    caller: null,
    callerSignal: null,
    callAccepted: false,
    callEnded: false,
    stream: null,
    callDuration: 0,
    callStatus: null,
    callSend: false,
    callId: null,
  });

  const myAudio = useRef();
  const userAudio = useRef();
  const connectionRef = useRef();
  const timerRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        setCallState((prevState) => ({ ...prevState, stream }));
        myAudio.current.srcObject = stream;
      })
      .catch((error) => {
        console.error('Error accessing media devices.', error);
      });

    socket.on('offer', (data) => {
      console.log('received offer from : ', data);
      
      setCallState((prevState) => ({
        ...prevState,
        receivingCall: true,
        caller: data.caller,
        callerSignal: data.offer,
      }));
    });

    socket.on('call-initiated', (data) => {
      console.log('call initiated by : ', data);
      setCallState((prevState) => ({ ...prevState, callId: data.callId }));
    });

    socket.on('call-status', (data) => {
      console.log('call status is : ', data);
      setCallState((prevState) => ({ ...prevState, callStatus: data }));
    });

    socket.on('answer', (data) => {
      console.log('received answer from : ', data);
      connectionRef.current.signal(data.answer);
      setCallState((prevState) => ({ ...prevState, callAccepted: true }));
    });

    socket.on('call-ended', () => {
      leaveCall();
      
    });

    return () => {
      socket.off('offer');
      socket.off('answer');
      socket.off('call-ended');
    };
  }, []);

  const callUser = (member) => {
    const peer = new SimplePeer({
      initiator: true,
      trickle: false,
      stream: callState.stream,
    });

    peer.on('signal', (data) => {
      if (data.type === 'offer') {
        setCallState((prevState) => ({
          ...prevState, callSend: true,
          caller: member
        }));
        socket.emit('offer', {
          offer: data,
          receiver: member,
          caller: {
            id: user?._id,
            name: user?.name,
            profile_picture: user?.profile_picture
          },
        });
      }
    });

    peer.on('stream', (stream) => {
      userAudio.current.srcObject = stream;
    });

    connectionRef.current = peer;

    // Start the timer for the caller
    timerRef.current = setInterval(() => {
      setCallState((prevState) => ({
        ...prevState,
        callDuration: prevState.callDuration + 1,
      }));
    }, 1000);
  };

  const answerCall = () => {
    const peer = new SimplePeer({
      initiator: false,
      trickle: false,
      stream: callState.stream,
    });

    peer.on('signal', (data) => {
      if (data.type === 'answer') {
        socket.emit('answer', {
          answer: data,
          targetSocketId: callState?.caller?.callerSocketId,
          callId: callState?.callId,
        });
      }
    });

    peer.signal(callState.callerSignal);
    connectionRef.current = peer;
    setCallState((prevState) => ({ ...prevState, callAccepted: true }));

    // Start the timer
    timerRef.current = setInterval(() => {
      setCallState((prevState) => ({
        ...prevState,
        callDuration: prevState.callDuration + 1,
      }));
    }, 1000);
  };

  const leaveCall = () => {
    console.log('Ending call');
    setCallState((prevState) => ({
      ...prevState,
      callEnded: true,
      callAccepted: false,
      receivingCall: false,
      callSend: false,
    }));
    if (connectionRef.current) {
      connectionRef.current.destroy();
    }
    // Stop the timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const endCall = () => {
    leaveCall();
    socket.emit('end-call', { 
      targetSocketId: callState?.caller?.callerSocketId ? callState?.caller?.callerSocketId : callState?.receiver, 
      callId: callState?.callId,
      status: !callState?.caller && !callState?.callAccepted ? "Missed" : "Ended"
    });
  };

  return (
    <CallContext.Provider value={{ callState, setCallState, callUser, answerCall, endCall }}>
      {children}
      <audio ref={userAudio} autoPlay />
    </CallContext.Provider>
  );
};