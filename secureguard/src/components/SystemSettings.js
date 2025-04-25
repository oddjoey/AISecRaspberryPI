"use client";
import React, { useState } from 'react';
import Link from "next/link";
import { FaHome, FaVideo, FaUsers, FaCamera, FaCog, FaSignOutAlt, FaQuestionCircle, FaBars, FaPlus } from 'react-icons/fa';
import { MdSecurity } from 'react-icons/md';
import { BiCctv } from 'react-icons/bi';
import SidebarLink from './SidebarLink';
import VoiceCommandButton from './VoiceCommandButton';

const SystemSettings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    voiceCommandLanguage: 'English',
    voiceResponseVolume: 75,
    enableVoiceNotifications: false,
    currentPIN: '',
    newPIN: '',
    confirmPIN: '',
    devices: {
      smartDoorLock: true,
      livingRoomLights: true,
      thermostat: false
    }
  });

  const handleVoiceCommand = (command) => {
    alert(`Voice Command recognized: "${command}"`);
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

      {/* MContent for system settings */}
      <main className="flex-1 p-8">

        <VoiceCommandButton onCommand={handleVoiceCommand} />
        
        <h1 className="text-2xl font-bold mb-2">System Settings</h1>
        <p className="text-gray-600 mb-6">Control system-wide configurations and advanced settings</p>

        <div className="space-y-6">
          {/* System Voice Settings */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">System Voice Settings</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Voice Command Language</label>
                <select 
                  className="w-full p-2 border rounded"
                  value={formData.voiceCommandLanguage}
                  onChange={(e) => setFormData({...formData, voiceCommandLanguage: e.target.value})}
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1">Voice Response Volume</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  className="w-full"
                  value={formData.voiceResponseVolume}
                  onChange={(e) => setFormData({...formData, voiceResponseVolume: e.target.value})}
                />
              </div>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-gray-600"
                  checked={formData.enableVoiceNotifications}
                  onChange={(e) => setFormData({...formData, enableVoiceNotifications: e.target.checked})}
                />
                <span className="ml-2">Enable voice notifications</span>
              </label>
            </div>
          </div>

          {/* PIN Settings */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">PIN Settings</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Current PIN</label>
                <input
                  type="password"
                  className="w-full p-2 border rounded"
                  placeholder="Enter current PIN"
                  value={formData.currentPIN}
                  onChange={(e) => setFormData({...formData, currentPIN: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm mb-1">New PIN</label>
                <input
                  type="password"
                  className="w-full p-2 border rounded"
                  placeholder="Enter new PIN"
                  value={formData.newPIN}
                  onChange={(e) => setFormData({...formData, newPIN: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Confirm New PIN</label>
                <input
                  type="password"
                  className="w-full p-2 border rounded"
                  placeholder="Confirm new PIN"
                  value={formData.confirmPIN}
                  onChange={(e) => setFormData({...formData, confirmPIN: e.target.value})}
                />
              </div>

              <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
                Update PIN
              </button>
            </div>
          </div>

          {/* Home Control System */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Home Control System</h2>
            
            <div className="space-y-4">
              <h3 className="font-medium">Connected Devices</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Smart Door Lock</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={formData.devices.smartDoorLock}
                      onChange={(e) => setFormData({
                        ...formData,
                        devices: {...formData.devices, smartDoorLock: e.target.checked}
                      })}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <span>Living Room Lights</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={formData.devices.livingRoomLights}
                      onChange={(e) => setFormData({
                        ...formData,
                        devices: {...formData.devices, livingRoomLights: e.target.checked}
                      })}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <span>Thermostat</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={formData.devices.thermostat}
                      onChange={(e) => setFormData({
                        ...formData,
                        devices: {...formData.devices, thermostat: e.target.checked}
                      })}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>

              <button className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 flex items-center">
                <FaPlus className="mr-2" /> Add New Device
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SystemSettings; 