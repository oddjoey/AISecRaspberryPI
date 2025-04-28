"use client";
import { useEffect, useRef, useState } from 'react';

export default function VideoStream() {
  const [imgSrc, setImgSrc] = useState('/current_frame.jpg');
  const ws = useRef(null);

  useEffect(() => {
    // Connect to WebSocket
    const socket = new WebSocket("ws://localhost:8080"); // Replace with your server IP if not local

    socket.onmessage = (event) => {
      if (event.data === 'new_frame') {
        // Force reload the image with a timestamp to bypass cache
        setImgSrc(`/current_frame.jpg?${Date.now()}`);
      }
    };

    return () => {
        socket.close();
    };
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Live Stream</h1>
      <img src={imgSrc} alt="Live Stream"/>
    </div>
  );
}
