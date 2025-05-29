import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useCall } from '../../hooks/useAuth';

const AudioCall = forwardRef((props, ref) => {
  const { user } = useAuth();
  const { callState, callUser, answerCall, endCall,myAudio,userAudio } = useCall();
  const [micMuted, setMicMuted] = useState(false);



  useImperativeHandle(ref, () => ({
    callUser,
  }));

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };



  return (
    <>
      {(callState.receivingCall || callState.callAccepted || callState.callSend ) && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#22292f] z-50">
          <audio playsInline muted ref={myAudio} autoPlay className="hidden" />
          <audio playsInline ref={userAudio} autoPlay className="hidden" />
          <div className="w-full max-w-lg h-[400px] bg-[#181e23] rounded-xl shadow-xl flex flex-col items-center justify-center relative border border-[#23272b]">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-[#23272b] flex items-center justify-center mb-6 mt-2">
                <img 
                  src={`${import.meta.env.VITE_API_URL}/${callState.caller?.profile_picture || 'default-profile.png'}`}
                  alt={`${callState.caller?.name || 'User'}'s profile`}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="text-white text-2xl font-semibold mb-2">
                {callState.caller?.name || 'Unknown'}
              </div>
              <div className="text-[#b0b8c1] text-lg mb-8 tracking-wide">
                {callState.receivingCall && !callState.callAccepted ? 'Incoming Call...' : callState.callAccepted ? `${formatTime(callState.callDuration)}` : 'Ringing...'}
              </div>
            </div>
            <div className="absolute bottom-8 left-0 w-full flex items-center justify-center gap-8">
              {callState.receivingCall && !callState.callAccepted && (
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
              <button
                onClick={() => setMicMuted((prev) => !prev)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition bg-[#23272b] hover:bg-[#2c3238] border border-[#2c3238] ${micMuted ? 'text-red-500' : 'text-white'}`}
                title={micMuted ? 'Unmute' : 'Mute'}
              >
                {micMuted ? (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 19L5 5M15 9v2a3 3 0 01-6 0V9m6 0a3 3 0 00-6 0m6 0V5a3 3 0 00-6 0v4m12 6v1a6 6 0 01-12 0v-1m12 0H6" />
                  </svg>
                ) : (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 1v11m0 0a4 4 0 004-4V5a4 4 0 10-8 0v3a4 4 0 004 4zm6 4v1a6 6 0 01-12 0v-1m12 0H6" />
                  </svg>
                )}
              </button>
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
      )}
    </>
  );
});

export default AudioCall;