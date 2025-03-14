"use client";
import React, { useState } from 'react';
import Link from 'next/link'
import { FaHome, FaVideo, FaUsers, FaCamera, FaCog, FaSignOutAlt, FaQuestionCircle, FaBars, FaTrash, FaLaptop, FaMobileAlt, FaLink, FaUserPlus } from 'react-icons/fa';
import { MdSecurity } from 'react-icons/md';
import { BiCctv } from 'react-icons/bi';
import SidebarLink from './SidebarLink';

const AccountSettings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: 'Bruce Wayne',
    email: 'Wayne@example.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: false
  });

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
            <SidebarLink icon={<FaCog />} text="Account Settings" active />
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

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-2">Account Settings</h1>
        <p className="text-gray-600 mb-6">Customize your account and manage security settings</p>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">General Settings</h2>

          {/* Account Information */}
          <div className="mb-8">
            <h3 className="font-semibold mb-4">Account Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Full Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Email Address</label>
                <input
                  type="email"
                  className="w-full p-2 border rounded"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Change Password */}
          <div className="mb-8">
            <h3 className="font-semibold mb-4">Change Password</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Current Password</label>
                <input
                  type="password"
                  className="w-full p-2 border rounded"
                  value={formData.currentPassword}
                  onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">New Password</label>
                <input
                  type="password"
                  className="w-full p-2 border rounded"
                  value={formData.newPassword}
                  onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Confirm New Password</label>
                <input
                  type="password"
                  className="w-full p-2 border rounded"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                />
              </div>
              <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
                Update Password
              </button>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="mb-8">
            <h3 className="font-semibold mb-4">Notification Preferences</h3>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-gray-600"
                  checked={formData.emailNotifications}
                  onChange={(e) => setFormData({...formData, emailNotifications: e.target.checked})}
                />
                <span className="ml-2">Email notifications</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-gray-600"
                  checked={formData.smsNotifications}
                  onChange={(e) => setFormData({...formData, smsNotifications: e.target.checked})}
                />
                <span className="ml-2">SMS notifications</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-gray-600"
                  checked={formData.pushNotifications}
                  onChange={(e) => setFormData({...formData, pushNotifications: e.target.checked})}
                />
                <span className="ml-2">Push notifications</span>
              </label>
            </div>
          </div>

          {/* Registration Settings */}
          <div className="mb-8">
            <h3 className="font-semibold mb-4">Registration Settings</h3>
            <div className="mb-4">
              <h4 className="font-medium mb-2">Registered Users</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <span className="ml-3">Person 1 (Primary)</span>
                  </div>
                  <button className="text-gray-500 hover:text-red-500">
                    <FaTrash />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <span className="ml-3">Person 2</span>
                  </div>
                  <button className="text-gray-500 hover:text-red-500">
                    <FaTrash />
                  </button>
                </div>
              </div>
              <button className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 flex items-center">
                <FaUserPlus className="mr-2" /> New User
              </button>
            </div>

            <div>
              <h4 className="font-medium mb-2">Linked Devices</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FaLaptop className="text-gray-600" />
                    <span className="ml-3">MacBook Pro</span>
                  </div>
                  <button className="text-gray-500 hover:text-red-500">
                    <FaTrash />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FaMobileAlt className="text-gray-600" />
                    <span className="ml-3">iPhone 13</span>
                  </div>
                  <button className="text-gray-500 hover:text-red-500">
                    <FaTrash />
                  </button>
                </div>
              </div>
              <button className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 flex items-center">
                <FaLink className="mr-2" /> Link New Device
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountSettings; 