"use client";

import React, { useState } from 'react';
import Link from "next/link";
import { FaHome, FaVideo, FaUsers, FaCamera, FaCog, FaSignOutAlt, FaQuestionCircle, FaBars, FaPlay, FaDownload, FaCut, FaHighlighter, FaBookmark, FaFilter } from 'react-icons/fa';
import { MdSecurity } from 'react-icons/md';
import { BiCctv } from 'react-icons/bi';
import SidebarLink from './SidebarLink';
import VoiceCommandButton from './VoiceCommandButton';

const Recordings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [videoQuality, setVideoQuality] = useState('');
  const [recordingDuration, setRecordingDuration] = useState('');
  const [storageLimit, setStorageLimit] = useState('');
  const [selectedVideo, setSelectedVideo] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const recordingLogs = [
    { date: '2025-03-15 14:30', duration: '1h 30m', size: '500 MB' },
    { date: '2025-03-14 09:15', duration: '45m', size: '250 MB' }
  ];

  const pastRecordings = [
    { date: '2025-03-10 10:00', duration: '1h 15m' },
    { date: '2025-03-09 14:30', duration: '45m' },
    { date: '2025-03-08 09:00', duration: '2h' }
  ];

  const handleVoiceCommand = (command) => {
    alert(`Voice Command recognized: "${command}"`);
  };

  const handleSaveSettings = () => {
    console.log('Saving settings...');
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
        w-64 h-screen bg-white shadow-lg z-10 flex flex-col
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
          <Link href="/information">
            <SidebarLink icon={<FaCamera />} text="Information" />
          </Link>
          <Link href="/account-settings">
            <SidebarLink icon={<FaCog />} text="Account Settings" />
          </Link>
          <Link href="/system-settings">
            <SidebarLink icon={<FaCog />} text="System Settings" />
          </Link>
        </nav>
        <div className="border-t mt-auto">
          <SidebarLink icon={<FaSignOutAlt />} text="Logout" />
          <SidebarLink icon={<FaQuestionCircle />} text="Help" />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8">

        <VoiceCommandButton onCommand={handleVoiceCommand} />
        <h1 className="text-2xl font-bold mb-6">Recordings</h1>

        {/* Recording Logs */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Recording Logs</h2>
          <table className="w-full">
            <thead>
              <tr className="text-left">
                <th className="pb-3">Date/Time</th>
                <th className="pb-3">Duration</th>
                <th className="pb-3">Size</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recordingLogs.map((log, index) => (
                <tr key={index}>
                  <td className="py-2">{log.date}</td>
                  <td>{log.duration}</td>
                  <td>{log.size}</td>
                  <td>
                    <button className="mr-2 text-gray-600 hover:text-blue-600">
                      <FaPlay />
                    </button>
                    <button className="text-gray-600 hover:text-blue-600">
                      <FaDownload />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recording Settings */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Recording Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Video Quality</label>
              <select 
                className="w-full p-2 border rounded"
                value={videoQuality}
                onChange={(e) => setVideoQuality(e.target.value)}
              >
                <option value="">Select quality</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div>
              <label className="block mb-2">Recording Duration</label>
              <input
                type="number"
                placeholder="Max duration in minutes"
                className="w-full p-2 border rounded"
                value={recordingDuration}
                onChange={(e) => setRecordingDuration(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block mb-2">Storage Limit</label>
            <input
              type="number"
              placeholder="Max storage in GB"
              className="w-full p-2 border rounded"
              value={storageLimit}
              onChange={(e) => setStorageLimit(e.target.value)}
            />
          </div>
          <button
            onClick={handleSaveSettings}
            className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
          >
            Save Settings
          </button>
        </div>

        {/* Edit Videos */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Edit Videos</h2>
          <select 
            className="w-full p-2 border rounded mb-4"
            value={selectedVideo}
            onChange={(e) => setSelectedVideo(e.target.value)}
          >
            <option value="">Select Video</option>
          </select>
          <div className="bg-gray-200 h-64 rounded flex items-center justify-center mb-4">
            Video Player Placeholder
          </div>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 flex items-center gap-2">
                <FaCut /> Trim
              </button>
              <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 flex items-center gap-2">
                <FaHighlighter /> Highlight
              </button>
              <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 flex items-center gap-2">
                <FaBookmark /> Bookmark
              </button>
            </div>
            <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
              Save as New Video
            </button>
          </div>
        </div>

        {/* Past Recordings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Past Recordings</h2>
          <div className="flex gap-4 mb-4">
            <input
              type="date"
              className="p-2 border rounded"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              type="date"
              className="p-2 border rounded"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <div className="flex gap-2 ml-auto">
              <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 flex items-center gap-2">
                <FaFilter /> Filter
              </button>
              <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 flex items-center gap-2">
                <FaBookmark /> Bookmarked
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pastRecordings.map((recording, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <div className="bg-gray-200 h-40 flex items-center justify-center">
                  Thumbnail
                </div>
                <div className="p-3">
                  <div className="font-semibold">{recording.date}</div>
                  <div className="text-sm text-gray-600">Duration: {recording.duration}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Recordings; 
