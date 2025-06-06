"use client";
import React, { useState, useRef, useContext } from 'react';
import Link from 'next/link'
import {
  FaHome, FaVideo, FaUsers, FaCog, FaSignOutAlt, FaQuestionCircle, FaCamera, FaBars, FaDoorClosed,
  FaExclamationTriangle, FaRadiationAlt, FaFire, FaTint, FaGasPump, FaBuilding, FaMicrophone, FaMicrophoneSlash
} from 'react-icons/fa';
import { MdSecurity } from 'react-icons/md';
import { BiCctv } from 'react-icons/bi';
import SidebarLink from './SidebarLink';
import VoiceCommandButton from './VoiceCommandButton';
import { ThemeContext } from './ThemeProvider.tsx';
import { Rasppinotice } from './Rasppinotice';

const SecurityPanel = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { isDarkMode } = useContext(ThemeContext);
  const [raspberryPiState, setRaspberryPiState] = useState('OFFLINE');

  const notifications = [
    { icon: <FaDoorClosed className="text-blue-500" />, title: "Front Door Opened", time: "2025-03-15 08:30 AM" },
    { icon: <FaExclamationTriangle className="text-yellow-500" />, title: "Motion Detected - Backyard", time: "2025-03-15 02:45 AM" },
    { icon: <FaRadiationAlt className="text-red-500" />, title: "Smoke Detected - Kitchen", time: "2025-03-14 07:15 PM" }
  ];

  const alerts = [
    { icon: <FaFire className="text-red-500" />, title: "Fire Alert", status: "No fire detected" },
    { icon: <FaTint className="text-blue-500" />, title: "Flood Alert", status: "No flood detected" },
    { icon: <FaGasPump className="text-yellow-500" />, title: "Gas Leak Alert", status: "No gas leak detected" },
    { icon: <FaBuilding className="text-gray-500" />, title: "Earthquake Alert", status: "No seismic activity detected" }
  ];

  const handleVoiceCommand = (command) => {
    alert(`Voice Command recognized: "${command}"`);
  };

  const connectToRaspberryPi = async () => {
    try {
      setRaspberryPiState('CONNECTING');
      
      // Simulate connection process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // If connection is successful
      setRaspberryPiState('ONLINE');
    } catch (error) {
      console.error('Failed to connect to Raspberry Pi:', error);
      setRaspberryPiState('OFFLINE');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-gray-800 text-white"
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <div className={`
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        transform transition-transform duration-300 ease-in-out
        fixed lg:static lg:translate-x-0
        w-64 h-full bg-white shadow-lg z-10
      `}>
        <div className="p-4 font-bold text-lg border-b">AI Security System</div>
        <nav className="mt-4">
          <Link href="/"><SidebarLink icon={<FaHome />} text="Homepage" /></Link>
          <SidebarLink icon={<MdSecurity />} text="Security Panel" active />
          <Link href="/detection-data"><SidebarLink icon={<BiCctv />} text="Detection Data" /></Link>
          <Link href="/live-feed"><SidebarLink icon={<FaVideo />} text="Live Feed" /></Link>
          <Link href="/guests"><SidebarLink icon={<FaUsers />} text="Guests" /></Link>
          <Link href="/recordings"><SidebarLink icon={<FaCamera />} text="Recordings" /></Link>
          <Link href="/information"><SidebarLink icon={<FaCamera />} text="Information" /></Link>
          <Link href="/account-settings"><SidebarLink icon={<FaCog />} text="Account Settings" /></Link>
          <Link href="/system-settings"><SidebarLink icon={<FaCog />} text="System Settings" /></Link>
        </nav>
        <div className="absolute bottom-0 w-64 border-t">
          <SidebarLink icon={<FaSignOutAlt />} text="Logout" />
          <SidebarLink icon={<FaQuestionCircle />} text="Help" />
        </div>
      </div>

      {/* Security Panel */}
      <div className="flex-1 overflow-auto p-4 lg:p-8 relative">

        {/* Voice Command Button */}
        <VoiceCommandButton onCommand={handleVoiceCommand} />

        <h1 className="text-2xl font-bold mb-6">Security Panel</h1>

        {/* System Status */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-center items-center space-x-4">
            <span className="text-gray-700">Enable Security</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
        
        {/* Notifications */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Notifications</h2>
          {notifications.map((notification, index) => (
            <NotificationItem
              key={index}
              icon={notification.icon}
              title={notification.title}
              time={notification.time}
            />
          ))}
        </div>

        {/* Intruder Alert */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Intruder Alert</h2>
          <div className="bg-gray-800 text-white p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FaExclamationTriangle className="text-red-500" />
                <div>
                  <div className="font-semibold">Potential Intruder Detected</div>
                  <div className="text-sm text-gray-300">
                    Location: Back Door<br />
                    Time: 2025-03-15 03:22 AM
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded">
                  Call Police
                </button>
                <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
                  View Camera
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Disaster Prevention */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Disaster Prevention</h2>
          <div className="grid grid-cols-2 gap-4">
            {alerts.map((alert, index) => (
              <AlertItem
                key={index}
                icon={alert.icon}
                title={alert.title}
                status={alert.status}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Toggle = () => (
  <div className="relative inline-block w-12 h-6 rounded-full bg-gray-200">
    <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white shadow"></div>
  </div>
);

const NotificationItem = ({ icon, title, time }) => (
  <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 border-b">
    {icon}
    <div>
      <div className="font-semibold">{title}</div>
      <div className="text-sm text-gray-500">{time}</div>
    </div>
  </div>
);

const AlertItem = ({ icon, title, status }) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
    <div className="flex items-center space-x-3">
      {icon}
      <div>
        <div className="font-semibold">{title}</div>
        <div className="text-sm text-gray-500">{status}</div>
      </div>
    </div>
    <Toggle />
  </div>
);

export default SecurityPanel;
