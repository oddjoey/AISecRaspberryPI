"use client";
import React, { useEffect, useState } from 'react';

const Cameranotice = ({ cameraState }) => {
  const [notification, topmessage] = useState('');

  useEffect(() => {
    if (cameraState === 'ON') {
      topmessage('AiRaspberry Securegard camera turned ON');
    } else if (cameraState === 'OFF') {
      topmessage('AiRaspberry Securegard camera turned OFF');
    }

    const timer = setTimeout(() => {
      topmessage('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [cameraState]);

  return (
    notification && (
      <div className="fixed top-1 left-0 right-0 z-50 bg-blue-100 border border-blue-200 text-blue-600 px-4 py-3 text-center">
        {notification}
      </div>
    )
  );
};
export default Cameranotice;


