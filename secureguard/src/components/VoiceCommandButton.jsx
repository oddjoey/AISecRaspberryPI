"use client";

import React, { useState, useRef } from "react";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";

const VoiceCommandButton = ({ onCommand }) => {
    const [listening, setListening] = useState(false);
    const recognitionRef = useRef(null);

    const handleClick = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert("Speech recognition not supported in this browser.");
            return;
        }
        if (!listening) {
            const recognition = new window.webkitSpeechRecognition();
            recognitionRef.current = recognition;
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-US';

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setListening(false);
                if (onCommand) onCommand(transcript);
            };

            recognition.onerror = () => setListening(false);
            recognition.onend = () => setListening(false);

            recognition.start();
            setListening(true);
        } else {
            recognitionRef.current?.stop();
            setListening(false);
        }
    };

    return (
        <button
            onClick={handleClick}
            className={`p-3 rounded-full shadow-lg text-white transition ${listening ? 'bg-red-500' : 'bg-blue-500'} hover:scale-105`}
            title="Voice Command"
        >
            {listening ? <FaMicrophoneSlash /> : <FaMicrophone />}
        </button>
    );
};

export default VoiceCommandButton;