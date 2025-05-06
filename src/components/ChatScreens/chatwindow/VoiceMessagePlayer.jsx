import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { FaPlay } from "react-icons/fa";
import { IoIosPause } from "react-icons/io";

const VoiceMessagePlayer = ({ audioUrl }) => {
    const waveformRef = useRef(null);
    const wavesurfer = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState("0:00");
    const [duration, setDuration] = useState("0:00");
    const [speed, setSpeed] = useState(1.0);

    useEffect(() => {
        if (!audioUrl || !waveformRef.current) return;

        // Cleanup before creating a new instance
        if (wavesurfer.current) {
            wavesurfer.current.destroy();
        }

        // Create new WaveSurfer instance
        wavesurfer.current = WaveSurfer.create({
            container: waveformRef.current,
            waveColor: "#d1d5db",
            progressColor: "transparent",
            cursorColor: "transparent",
            barWidth: 2,
            barHeight: 10,  // Make bars tall
            barGap: 1,
            height: 22,     // Keep canvas small (cursor height = canvas height)
            responsive: true,
            normalize: true,
            partialRender: true,
        });


        wavesurfer.current.load(audioUrl);

        wavesurfer.current.on("ready", () => {
            setDuration(formatTime(wavesurfer.current.getDuration()));
        });

        wavesurfer.current.on("audioprocess", () => {
            if (wavesurfer.current.isPlaying()) {
                setCurrentTime(formatTime(wavesurfer.current.getCurrentTime()));
            }
        });

        wavesurfer.current.on("finish", () => {
            setIsPlaying(false);
            setCurrentTime(duration);
        });

        return () => {
            if (wavesurfer.current) {
                wavesurfer.current.destroy();
                wavesurfer.current = null;
            }
        };
    }, [audioUrl]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };

    const togglePlayback = () => {
        if (wavesurfer.current) {
            wavesurfer.current.playPause();
            setIsPlaying((prev) => !prev);
        }
    };

    const handleSeek = (e) => {
        const clickX = e.nativeEvent.offsetX;
        const totalWidth = waveformRef.current.clientWidth;
        const duration = wavesurfer.current.getDuration();
        const seekTime = (clickX / totalWidth) * duration;
        wavesurfer.current.setCurrentTime(seekTime);
        setCurrentTime(formatTime(seekTime));
    };

    const toggleSpeed = () => {
        const nextSpeed = speed === 1.0 ? 1.5 : speed === 1.5 ? 2.0 : 1.0;
        setSpeed(nextSpeed);
        if (wavesurfer.current) {
            wavesurfer.current.setPlaybackRate(nextSpeed);
        }
    };

    return (
        <div className="flex h-14 items-center min-w-64 relative justify-between bg-white text-black px-3 py-2 rounded-xl gap-2">
            {/* Play/Pause Button */}
            <button onClick={togglePlayback} className="text-gray-600 w-6 h-6 flex items-center justify-center">
                {isPlaying ? <IoIosPause size={18} /> : <FaPlay size={14} />}
            </button>
            <span className="text-[9px] text-gray-500 absolute bottom-1 left-8">
                    {currentTime} / {duration}
                </span>
            {/* Waveform */}
            <div className="flex flex-col flex-1 gap-1">
                <div ref={waveformRef} onClick={handleSeek} className="cursor-pointer w-full progressContainer" />
            </div>
            {/* Speed Toggle */}
            <button onClick={toggleSpeed} className="bg-gray-200 text-black text-xs px-2 py-1 rounded-full w-8 h-8 flex items-center justify-center">
                {speed}x
            </button>
        </div>
    );
};

export default VoiceMessagePlayer;
