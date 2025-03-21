"use client";
import { useEffect, useRef } from "react";

export default function VideoStream() {
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const socket = new WebSocket("ws://98.149.14.172:8080");

        socket.onopen = () => console.log("Connected to WebSocket");
        
        socket.onmessage = async (event) => {
            if (!imgRef.current) return;

            const blob = event.data instanceof Blob ? event.data : new Blob([event.data]); // Convert to Blob if needed
            const reader = new FileReader();
            
            reader.onload = () => {
                if (typeof reader.result === "string") {
                    imgRef.current!.src = reader.result; // Set as image source
                }
            };

            reader.readAsDataURL(blob); // Convert binary to Base64 URL
        };

        socket.onclose = () => console.log("Disconnected from WebSocket");

        return () => socket.close();
    }, []);

    return (
        <div>
            <img ref={imgRef} alt="" className="w-full h-full"/>
        </div>
    );
}
