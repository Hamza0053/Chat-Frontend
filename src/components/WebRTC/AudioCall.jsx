// src/components/AudioCall.js
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import io from 'socket.io-client';
import SimplePeer from 'simple-peer';
import socket from '../../socket'; // Import the singleton socket instance
import { useAuth } from '../../hooks/useAuth';


const AudioCall = forwardRef((props, ref) => {
  const [stream, setStream] = useState(null);
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState('');
  const [callerSignal, setCallerSignal] = useState(null)
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [idToCall, setIdToCall] = useState('');
  const [me, setMe] = useState('');
  const myAudio = useRef();
  const userAudio = useRef();
  const connectionRef = useRef();
  const { user } = useAuth();
  const [showCallScreen, setshowCallScreen] = useState(false);
  const [micMuted, setMicMuted] = useState(false);
  const [isCaller, setIsCaller] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [receiver, setReceiver] = useState(null);
  const [callDuration, setCallDuration] = useState(0);
  const timerRef = useRef(null);
  const [callId, setCallId] = useState(null);

  useEffect(() => {
    // Get user media
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        setStream(stream);
        myAudio.current.srcObject = stream;
      })
      .catch((error) => {
        console.error('Error accessing media devices.', error);
      });

    socket.on('me', (id) => {
      console.log('My socket ID:', id);
      setMe(id);
    });

    socket.on('offer', (data) => {
      console.log('call accepted:', callAccepted);
      console.log('call ended:', callEnded);


      console.log('Offer received:', data);

      setSelectedMember(data.caller);
      console.log('Selected Member:', selectedMember);
      
      setshowCallScreen(true);
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.offer);
    });

    socket.on('answer', (data) => {
      console.log('Answer received:', data);
      setCallAccepted(true);
      connectionRef.current.signal(data.answer);
    });

    socket.on('call-status', (data) => {
      console.log('Call status:', data);
      setReceiver(data.receiver);
    });

    socket.on('ice-candidate', (data) => {
      console.log('ICE candidate received:', data);
      const candidate = new RTCIceCandidate(data.candidate);
      connectionRef.current.addIceCandidate(candidate);
    });



    socket.on('call-ended', () => {
      console.log('Call ended by the other user');
      leaveCall();
    });
    socket.on('call-initiated', (data) => {
      console.log('Call initiated by the other user' , data);
      setCallId(data.callId);
    });


    
    return () => {
      socket.off('me');
      socket.off('offer');
      socket.off('answer');
      socket.off('ice-candidate');
      socket.off('call-ended');
    };
  }, []);

  useEffect(() => {
    let interval = null;
    console.log('useEffect triggered with callAccepted:', callAccepted, 'callEnded:', callEnded);
    
    if (callAccepted && !callEnded) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else if (callEnded) {
      setCallDuration(0);
    }

    return () => {
      if (interval) {
        console.log('Cleaning up interval');
        // clearInterval(interval);
        interval = null;
      }
    };
  }, [callAccepted, callEnded]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const callUser = (member) => {
    console.log('Initiating call to:', member);
    const peer = new SimplePeer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on('signal', (data) => {
      if (data.type === 'offer') {
        console.log('Sending offer:', data, 'Receiver:', member, 'Caller:', user);

        setshowCallScreen(true);
        setSelectedMember(member);

        socket.emit('offer', {
          offer: data,
          receiver: member,
          caller: {
            id: user?._id,
            name: user?.name,
            profile_picture: user?.profile_picture
          },
        });

        // New listener for offer status
       
        // You can add more logic here to update the UI or state based on the offer status
      }
    });

    peer.on('iceCandidate', (candidate) => {
      console.log('Sending ICE candidate:', candidate);
      socket.emit('ice-candidate', {
        candidate: candidate,
        receiver: member,
      });
    });

    peer.on('stream', (stream) => {
      console.log('Receiving stream:', stream);
      userAudio.current.srcObject = stream;
    });

    peer.on('error', (err) => {
      console.error('Peer connection error:', err);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    console.log('Answering call from:', caller);
    const peer = new SimplePeer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on('signal', (data) => {
      if (data.type === 'answer') {
        console.log('Sending answer:', data);
        socket.emit('answer', {
          answer: data,
          targetSocketId: caller,
          callId: callId,
        });
      }
    });

    peer.on('iceCandidate', (candidate) => {
      console.log('Sending ICE candidate:', candidate);
      socket.emit('ice-candidate', {
        candidate: candidate,
        targetSocketId: caller,
      });
    });

    peer.on('stream', (stream) => {
      console.log('Receiving stream:', stream);
      userAudio.current.srcObject = stream;
    });

    peer.on('error', (err) => {
      console.error('Peer connection error:', err);
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
    setCallAccepted(true);
  };

  const leaveCall = () => {
    console.log('Ending call');
    setshowCallScreen(false);
    setCallEnded(true);
    setReceivingCall(false);
    setCallAccepted(false);
    if (connectionRef.current) {
      connectionRef.current.destroy();
    }
    // socket.emit('end-call', { userId: user._id });
  };

  const endCall = () => {
    leaveCall()
    socket.emit('end-call', { 
      targetSocketId: caller ? caller : receiver , 
      callId: callId,
      status: !caller && !callAccepted ? "Missed" : "Ended"
    });
  }
  // Expose functions to parent component
  useImperativeHandle(ref, () => ({
    callUser,
    setIdToCall,
  }));

  return (
    <>
      {
        (showCallScreen) && (
          <div className="fixed inset-0 flex items-center justify-center bg-[#22292f] z-50">
            <audio playsInline muted ref={myAudio} autoPlay className="hidden" />
            <audio playsInline ref={userAudio} autoPlay className="hidden" />
            <div className="w-full max-w-lg h-[400px] bg-[#181e23] rounded-xl shadow-xl flex flex-col items-center justify-center relative border border-[#23272b]">
              {/* Profile Picture */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-[#23272b] flex items-center justify-center mb-6 mt-2">
                  <img 
                    src={`${import.meta.env.VITE_API_URL}/${selectedMember?.profile_picture}`}
                    alt={`${selectedMember?.name || "User"}'s profile`}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                {/* Name */}
                <div className="text-white text-2xl font-semibold mb-2">
                  {
                    selectedMember?.name || "Unknown"
                  }
                </div>
                {/* Ringing or Call Duration */}
                <div className="text-[#b0b8c1] text-lg mb-8 tracking-wide">
                  {receivingCall && !callAccepted ? "Incoming Call..." : callAccepted ? `${formatTime(callDuration)}` : "Ringing..."}
                </div>
              </div>
              {/* Controls */}
              <div className="absolute bottom-8 left-0 w-full flex items-center justify-center gap-8">
                {/* Receive Call Button */}
                {receivingCall && !callAccepted && (
                  <button
                    onClick={answerCall}
                    className="w-16 h-16 rounded-full flex items-center justify-center bg-[#4caf50] hover:bg-[#388e3c] text-white text-3xl shadow-lg transition"
                    title="Receive Call"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2v6m0-6l-2-2m2 2l2 2" />
                    </svg>
                  </button>
                )}
                {/* Mic Button (toggle mute) */}
                <button
                  onClick={() => setMicMuted((prev) => !prev)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition bg-[#23272b] hover:bg-[#2c3238] border border-[#2c3238] ${micMuted ? "text-red-500" : "text-white"
                    }`}
                  title={micMuted ? "Unmute" : "Mute"}
                >
                  {micMuted ? (
                    // Mic Off Icon
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 19L5 5M15 9v2a3 3 0 01-6 0V9m6 0a3 3 0 00-6 0m6 0V5a3 3 0 00-6 0v4m12 6v1a6 6 0 01-12 0v-1m12 0H6" />
                    </svg>
                  ) : (
                    // Mic On Icon
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 1v11m0 0a4 4 0 004-4V5a4 4 0 10-8 0v3a4 4 0 004 4zm6 4v1a6 6 0 01-12 0v-1m12 0H6" />
                    </svg>
                  )}
                </button>
                {/* End Call Button */}
                <button
                  onClick={endCall}
                  className="w-16 h-16 rounded-full flex items-center justify-center bg-[#e53935] hover:bg-[#c62828] text-white text-3xl shadow-lg transition"
                  title="End Call"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4m16-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v6m16 0a9 9 0 01-16 0" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
});

export default AudioCall;