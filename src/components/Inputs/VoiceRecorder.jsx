import { useState, useRef } from "react";
import Button from "../Buttons/Button";
import { UploadFile } from "../../api/auth";
import { useChat } from "../../hooks/useAuth";
import { IoSendSharp } from "react-icons/io5";


const VoiceRecorder = () => {
    const [recording, setRecording] = useState(false);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const { sendMessage } = useChat();
    const [recordingTime, setRecordingTime] = useState(0);
    const timerRef = useRef(null);


    const formatTime = (seconds) => {
        const min = Math.floor(seconds / 60)
            .toString()
            .padStart(2, "0");
        const sec = (seconds % 60).toString().padStart(2, "0");
        return `${min}:${sec}`;
    };

    // 🎤 Start Recording
    const startRecording = async () => {
        audioChunksRef.current = []; // Clear old chunks

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
            audioChunksRef.current.push(event.data);
        };

        mediaRecorder.onstop = async () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
            await SendMessageHandler(audioBlob);
        };

        mediaRecorder.start();
        setRecording(true);

        setRecordingTime(0);
        timerRef.current = setInterval(() => {
            setRecordingTime((prev) => prev + 1);
        }, 1000);
    };

    // 🛑 Stop Recording
    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setRecording(false);
            clearInterval(timerRef.current);
        }
    };

    // 📤 Send Voice Message
    async function SendMessageHandler(audioBlob) {
        console.log('Uploading audio blob: ', audioBlob);
        const response = await UploadFile(audioBlob);
        console.log('Upload response: ', response);

        if (response?.success) {
            sendMessage("voice message", response.fileName, "audio");
        }
    }

    return (
        <div>
            {recording ? (
               <div className="flex items-center justify-center gap-3">
                <span className="text-gray-600 text-md font-semibold">{formatTime(recordingTime)}</span>
                <button onClick={stopRecording} className="text-white bg-green-500 h-[35px] w-[35px] 
                                                            rounded text-lg flex ml-auto  items-center justify-center">
                    <IoSendSharp />
                </button>
               </div>
            ) : (
                <Button onClick={startRecording}>
                    <span>
                        <span aria-hidden="true" data-icon="ptt">
                            <svg viewBox="0 0 24 24" height="24" width="24">
                                <title>ptt</title>
                                <path fill="currentColor" d="M11.999,14.942c2.001,0,3.531-1.53,3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531 S8.469,2.35,8.469,4.35v7.061C8.469,13.412,9.999,14.942,11.999,14.942z M18.237,11.412c0,3.531-2.942,6.002-6.237,6.002 s-6.237-2.471-6.237-6.002H3.761c0,4.001,3.178,7.297,7.061,7.885v3.884h2.354v-3.884c3.884-0.588,7.061-3.884,7.061-7.885 L18.237,11.412z"></path>
                            </svg>
                        </span>
                    </span>
                </Button>
            )}
        </div>
    );
};

export default VoiceRecorder;
