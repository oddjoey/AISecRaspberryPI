"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { FaHome, FaVideo, FaUsers, FaCog, FaSignOutAlt, FaQuestionCircle, FaCamera, FaBars, FaSearch, FaExclamationTriangle, FaUserSecret, FaTruck } from 'react-icons/fa';
import { MdSecurity } from 'react-icons/md';
import { BiCctv } from 'react-icons/bi';
import VideoStream from './VideoStream';
import SidebarLink from './SidebarLink';
import VoiceCommandButton from './VoiceCommandButton';
import Cameranotice from './Cameranotice';

const LiveFeed = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [enableCamera1, setEnableCamera1] = useState(false);

  const cameraFeeds = [
    { id: 2, name: 'Parking Lot', location: 'Camera Feed 2' },
    { id: 3, name: 'Warehouse', location: 'Camera Feed 3' },
    { id: 4, name: 'Loading Dock', location: 'Camera Feed 4' },
  ];

  const entryDetections = [
    { location: 'Front Entrance', time: '12:45 PM' },
    { location: 'Loading Dock', time: '11:30 AM' },
    { location: 'Parking Lot', time: '10:15 AM' },
    { location: 'Parking Lot', time: '10:05 AM' },
  ];

  const handleVoiceCommand = (command) => {
    alert(`Voice Command recognized: "${command}"`);
  }

  const handleToggle = (e) => {
    setEnableCamera1(e.target.checked);
  };

  useEffect(() => {
    // get data, update toggles...
  }, []);

  return (
   <> <Cameranotice cameraState={enableCamera1 ? 'ON' : 'OFF'} />
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
          <Link href="/">
            <SidebarLink icon={<FaHome />} text="Homepage" />
          </Link>
          <Link href="/security-panel">
            <SidebarLink icon={<MdSecurity />} text="Security Panel" />
          </Link>
          <Link href="/detection-data">
            <SidebarLink icon={<BiCctv />} text="Detection Data" />
          </Link>
          <SidebarLink icon={<FaVideo />} text="Live Feed" active />
          <Link href="/guests">
            <SidebarLink icon={<FaUsers />} text="Guests" />
          </Link>
          <Link href="/recordings">
            <SidebarLink icon={<FaCamera />} text="Recordings" />
          </Link>
          <Link href="/account-settings">
            <SidebarLink icon={<FaCog />} text="Account Settings" />
          </Link>
          <Link href="/system-settings">
            <SidebarLink icon={<FaCog />} text="System Settings" />
          </Link>
        </nav>
        <div className="absolute bottom-0 w-64 border-t">
          <SidebarLink icon={<FaSignOutAlt />} text="Logout" />
          <SidebarLink icon={<FaQuestionCircle />} text="Help" />
        </div>
      </div>

      {/* Main Content for live feed */}
      <div className="flex-1 overflow-auto p-4 lg:p-8">

        <VoiceCommandButton onCommand ={handleVoiceCommand} />
        <h1 className="text-2xl font-bold mb-6">Live Feed</h1>

        {/* Camera Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div key="" className="bg-white rounded-lg shadow-md p-4">
            <div className="bg-gray-200 overflow-hidden h-48 md:h-64 rounded-lg flex items-center justify-center mb-2">
              {enableCamera1 ? <VideoStream/> : <></>}
            </div>
            <div className="flex justify-center items-center space-x-4">
              <div className="flex justify-center items-center space-x-4">
                <span className="text-gray-700">Camera 1</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={enableCamera1} onChange={handleToggle} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
          {cameraFeeds.map(camera => (
            <div key={camera.id} className="bg-white rounded-lg shadow-md p-4">
              <div className="bg-gray-200 h-48 md:h-64 rounded-lg flex items-center justify-center mb-2">
                {camera.location}
              </div>
              <div className="text-gray-700">{camera.name}</div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Object/Person Finder */}
          <div className="bg-white rounded-lg shadow-md p-4 w-full">
            <h2 className="text-lg font-semibold mb-4">Object/Person Finder</h2>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Search for object or person"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
              <button className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition duration-300 whitespace-nowrap w-full sm:w-auto">
                Search
              </button>
            </div>
          </div>

          {/* Recent Alerts to camera feeds */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-4">Recent Alerts</h2>
            <div className="space-y-4">
              <AlertItem
                icon={<FaUserSecret />}
                title="Unidentified Person"
                time="Detected at 11:45 AM"
              />
              <AlertItem
                icon={<FaExclamationTriangle />}
                title="Unauthorized Access"
                time="Attempted at 12:30 PM"
              />
              <button className="text-blue-500 hover:text-blue-600 text-sm">View All</button>
            </div>
          </div>

          {/* Proximity Detection */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-4">Proximity Detection</h2>
            <div className="space-y-3">
              <ProximityItem icon={<FaUsers />} text="Person 1 - Warehouse" />
              <ProximityItem icon={<FaUsers />} text="Person 2 - Front Entrance" />
              <ProximityItem icon={<FaTruck />} text="Delivery Truck - Loading Dock" />
              <button className="text-blue-500 hover:text-blue-600 text-sm">View All</button>
            </div>
          </div>
        </div>
      </div>
    </div> </>
  );
};

const AlertItem = ({ icon, title, time }) => (
  <div className="flex items-center space-x-3">
    <div className="bg-gray-100 p-2 rounded-full">{icon}</div>
    <div>
      <div className="font-semibold">{title}</div>
      <div className="text-sm text-gray-500">{time}</div>
    </div>
  </div>
);

const ProximityItem = ({ icon, text }) => (
  <div className="flex items-center space-x-3">
    <div className="bg-gray-100 p-2 rounded-full">{icon}</div>
    <span>{text}</span>
  </div>
);

export default LiveFeed; 
