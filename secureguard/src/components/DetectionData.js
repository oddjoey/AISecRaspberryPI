"use client";
import React, { useState } from 'react';
import Link from 'next/link'
import { FaHome, FaExclamationTriangle, FaVideo, FaUsers, FaCog, FaSignOutAlt, FaQuestionCircle, FaUserPlus, FaUserMinus, FaCheck, FaBan, FaCamera, FaBars } from 'react-icons/fa';
import { MdSecurity } from 'react-icons/md';
import { BiCctv } from 'react-icons/bi';

const DetectionData = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
            <SidebarLink icon={<BiCctv />} text="Detection Data" active />
          </Link>
          <Link href="/live-feed">
            <SidebarLink icon={<FaVideo />} text="Live Feed" />
          </Link>
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
          <Link href="/log-out">
            <SidebarLink icon={<FaSignOutAlt />} text="Logout" />
          </Link>
          <Link href="/help">
            <SidebarLink icon={<FaQuestionCircle />} text="Help" />
          </Link>
        </div>
      </div>

      {/* Detection Data */}
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Detection Data</h1>

        {/* Face Detection Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Face Detection</h2>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <StatCard title="Recognized Faces" value="24" />
            <StatCard title="New Faces" value="3" />
            <StatCard title="Total Entries" value="27" />
          </div>
          <div className="flex space-x-2 mb-6">
            <button className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
              <FaUserPlus /> <span>Add Guest</span>
            </button>
            <button className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
              <FaUserMinus /> <span>Remove Guest</span>
            </button>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow p-5 text-left">
              <h3 className="font-semibold mb-2">Recognized Faces</h3>
              <div className="flex flex-wrap gap-2 max-w-full">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0"></div>
                ))}
              </div>
              <button className="text-blue-500 mt-2">View All</button>
            </div>
            <div className="bg-white rounded-lg shadow p-5 text-left">
              <h3 className="font-semibold mb-2">New Faces</h3>
              <div className="flex flex-wrap gap-2 max-w-full">
                {[1, 2].map(i => (
                  <div key={i} className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0"></div>
                ))}
              </div>
              <button className="text-blue-500 mt-2">Add to Database</button>
            </div>
          </div>
        </div>

        {/* Vehicle Detection Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Vehicle Detection</h2>
          <div className="bg-gray-600 text-white p-4 rounded-lg mb-4">
            <div className="text-sm">Total Vehicles Detected</div>
            <div className="text-3xl font-bold">18</div>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <StatCard title="Current Vehicles" value="3" />
            <StatCard title="Whitelisted" value="12" />
            <StatCard title="Blacklisted" value="2" />
          </div>
          <div className="flex space-x-2 mb-6">
            <button className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
              <FaCheck /> <span>Whitelist</span>
            </button>
            <button className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
              <FaBan /> <span>Blacklist</span>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left bg-gray-50">
                  <th className="p-3">License Plate</th>
                  <th className="p-3">Make</th>
                  <th className="p-3">Model</th>
                  <th className="p-3">Color</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                <VehicleRow plate="ABC 123" make="Toyota" model="Camry" color="Silver" status="Whitelisted" />
                <VehicleRow plate="XYZ 789" make="Honda" model="Civic" color="Blue" status="Blacklisted" />
                <VehicleRow plate="DEF 456" make="Ford" model="F-150" color="Black" status="Unclassified" />
              </tbody>
            </table>
          </div>
        </div>

        {/* Recording Statistics Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Recording Statistics</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Detection Counts</h3>
              <div className="bg-gray-100 h-48 rounded flex items-center justify-center">
                Bar Chart: Detection Counts
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Visitor Frequency</h3>
              <div className="bg-gray-100 h-48 rounded flex items-center justify-center">
                Line Chart: Visitor Frequency
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="font-semibold mb-2">System Performance</h3>
            <div className="bg-gray-100 h-48 rounded flex items-center justify-center">
              Area Chart: System Performance
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SidebarLink = ({ icon, text, active }) => (
  <a
    href="#"
    className={`flex items-center space-x-2 px-4 py-3 hover:bg-gray-100 ${
      active ? 'bg-gray-100' : ''
    }`}
  >
    {icon}
    <span>{text}</span>
  </a>
);

const StatCard = ({ title, value }) => (
  <div className="bg-gray-50 p-4 rounded">
    <div className="text-sm text-gray-600">{title}</div>
    <div className="text-2xl font-bold">{value}</div>
  </div>
);

const VehicleRow = ({ plate, make, model, color, status }) => (
  <tr className="border-t">
    <td className="p-3">{plate}</td>
    <td className="p-3">{make}</td>
    <td className="p-3">{model}</td>
    <td className="p-3">{color}</td>
    <td className="p-3">
      <span className={`px-2 py-1 rounded text-sm ${
        status === 'Whitelisted' ? 'bg-green-100 text-green-800' :
        status === 'Blacklisted' ? 'bg-red-100 text-red-800' :
        'bg-gray-100 text-gray-800'
      }`}>
        {status}
      </span>
    </td>
  </tr>
);

export default DetectionData; 