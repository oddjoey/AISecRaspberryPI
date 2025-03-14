"use client";
import React, { useState } from 'react';
import Link from "next/link"
import { FaHome, FaVideo, FaUsers, FaCamera, FaCog, FaSignOutAlt, FaQuestionCircle, FaBars, FaEdit, FaHistory, FaUserPlus, FaTrash } from 'react-icons/fa';
import { MdSecurity } from 'react-icons/md';
import { BiCctv } from 'react-icons/bi';
import SidebarLink from './SidebarLink';

const Guests = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [accessType, setAccessType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [expirationTime, setExpirationTime] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [searchProfiles, setSearchProfiles] = useState('');

  const handleGenerateAccessCode = () => {
    // Implementation for generating access code
    console.log('Generating access code...');
  };

  const handleAddToBlacklist = () => {
    // Implementation for adding to blacklist
    console.log('Adding to blacklist...');
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

      {/* Main Content (your existing content) */}
      <div className="flex-1 overflow-auto p-4 lg:p-8">
        <h1 className="text-2xl font-bold mb-6">Guest Management</h1>

        {/* Temporary Access Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Temporary Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Guest Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Enter guest name"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Access Type</label>
              <select
                className="w-full p-2 border rounded bg-gray-100"
                value={accessType}
                onChange={(e) => setAccessType(e.target.value)}
              >
                <option value="">Select access type</option>
                <option value="visitor">Visitor</option>
                <option value="contractor">Contractor</option>
                <option value="temporary">Temporary Staff</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Start Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">End Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          <button
            onClick={handleGenerateAccessCode}
            className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Generate Access Code
          </button>
        </div>

        {/* Vehicle Blacklist Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Vehicle Blacklist</h2>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              className="flex-1 p-2 border rounded"
              placeholder="Enter license plate to blacklist"
              value={licensePlate}
              onChange={(e) => setLicensePlate(e.target.value)}
            />
            <button
              onClick={handleAddToBlacklist}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Add to Blacklist
            </button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-left bg-gray-50">
                <th className="p-2">License Plate</th>
                <th className="p-2">Date Added</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2">ABC123</td>
                <td className="p-2">2025-03-15</td>
                <td className="p-2">
                  <button className="text-gray-600 hover:text-red-600">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Profile Management Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Profile Management</h2>
            <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 flex items-center gap-2">
              <FaUserPlus /> New Profile
            </button>
          </div>
          <input
            type="text"
            className="w-full p-2 border rounded mb-4"
            placeholder="Search profiles"
            value={searchProfiles}
            onChange={(e) => setSearchProfiles(e.target.value)}
          />
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div>
                <h3 className="font-semibold">Person 1</h3>
                <p className="text-sm text-gray-600">Frequent Visitor</p>
                <div className="text-sm text-gray-600 mt-1">
                  <p>Last Visit: 2025-03-10</p>
                  <p>Total Visits: 15</p>
                </div>
              </div>
              <div className="ml-auto flex gap-2">
                <button className="text-gray-600 hover:text-blue-600">
                  <FaEdit />
                </button>
                <button className="text-gray-600 hover:text-blue-600">
                  <FaHistory />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guests; 