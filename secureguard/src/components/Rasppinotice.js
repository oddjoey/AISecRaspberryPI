"use client";
import React, { useEffect, useState } from 'react';

const Rasppinotice = ({ raspberryPiState }) => {
  const [notification, setNotification] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('bg-blue-100');
  const [textColor, setTextColor] = useState('text-blue-600');
  const [borderColor, setBorderColor] = useState('border-blue-200');

  useEffect(() => {
    let timer;

    if (raspberryPiState === 'ONLINE') {
      setNotification('Raspberry Pi is now ONLINE');
      setBackgroundColor('bg-green-100');
      setTextColor('text-green-600');
      setBorderColor('border-green-200');
      timer = setTimeout(() => setNotification(''), 3000);
    } else if (raspberryPiState === 'OFFLINE') {
      setNotification('Raspberry Pi is now OFFLINE');
      setBackgroundColor('bg-red-100');
      setTextColor('text-red-600');
      setBorderColor('border-red-200');
      timer = setTimeout(() => setNotification(''), 3000);
    } else if (raspberryPiState === 'CONNECTING') {
      setNotification('Connecting to Raspberry Pi...');
      setBackgroundColor('bg-yellow-100');
      setTextColor('text-yellow-600');
      setBorderColor('border-yellow-200');
      timer = setTimeout(() => setNotification(''), 3000);
    }

    return () => clearTimeout(timer);
  }, [raspberryPiState]);

  return (
    notification && (
      <div className={`fixed top-1 left-0 right-0 z-50 ${backgroundColor} border ${borderColor} ${textColor} px-4 py-3 text-center`}>
        {notification}
      </div>
    )
  );
};

export default Rasppinotice;