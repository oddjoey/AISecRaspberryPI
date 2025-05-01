//Coporate with chatgpt

"use client";
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import {
  FaHome, FaVideo, FaUsers, FaCamera, FaCog,
  FaSignOutAlt, FaQuestionCircle, FaBars, FaEdit
} from 'react-icons/fa';
import { MdSecurity } from 'react-icons/md';
import { BiCctv } from 'react-icons/bi';
import SidebarLink from './SidebarLink';

const Information = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [uploadFaceProfile, setUploadFaceProfile] = useState(null);
  const [addName, setAddName] = useState('');
  const [profiles, setProfiles] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('profiles');
    if (saved) {
      setProfiles(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('profiles', JSON.stringify(profiles));
  }, [profiles]);

  const handleInformation = () => {
    if (!addName || !uploadFaceProfile) {
      alert('Please Enter a Name and Face Profile.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const imageData = reader.result;
      const newProfile = {
        name: addName,
        image: imageData,
      };

      if (editingIndex !== null) {
        const updated = [...profiles];
        updated[editingIndex] = newProfile;
        setProfiles(updated);
        setEditingIndex(null);
      } else {
        setProfiles([...profiles, newProfile]);
      }

      setAddName('');
      setUploadFaceProfile(null);
    };

    reader.readAsDataURL(uploadFaceProfile);
  };

  const handleEdit = (index) => {
    const profile = profiles[index];
    setAddName(profile.name);
    setEditingIndex(index);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-gray-800 text-white"
      >
        <FaBars />
      </button>

      <div className={`
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        transform transition-transform duration-300 ease-in-out
        fixed lg:static lg:translate-x-0
        w-64 h-full bg-white shadow-lg z-10
      `}>
        <div className="p-4 font-bold text-lg border-b">AI Security System</div>
        <nav className="mt-4">
          <Link href="/"><SidebarLink icon={<FaHome />} text="Homepage" /></Link>
          <Link href="/security-panel"><SidebarLink icon={<MdSecurity />} text="Security Panel" /></Link>
          <Link href="/detection-data"><SidebarLink icon={<BiCctv />} text="Detection Data" /></Link>
          <SidebarLink icon={<FaVideo />} text="Live Feed" active />
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

      <div className="flex-1 overflow-auto p-4 lg:p-8">
        <h1 className="text-2xl font-bold mb-6">Information Updates</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Add or Edit Member</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Add New Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Enter new name"
                value={addName}
                onChange={(e) => setAddName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Upload Profile Picture</label>
              <input
                type="file"
                accept="image/*"
                className="w-full p-2 border rounded"
                onChange={(e) => setUploadFaceProfile(e.target.files?.[0] || null)}
              />
              {uploadFaceProfile && (
                <img
                  src={URL.createObjectURL(uploadFaceProfile)}
                  alt="Preview"
                  className="mt-2 h-32 rounded"
                />
              )}
            </div>
          </div>
          <button
            onClick={handleInformation}
            className="mt-6 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            {editingIndex !== null ? 'Update Information' : 'Add Your Information'}
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Added Members</h2>
          {profiles.length === 0 ? (
            <p>No members added yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profiles.map((profile, index) => (
                <div key={index} className="flex items-center gap-4 border p-4 rounded">
                  <img src={profile.image} alt={profile.name} className="h-18 w-18 rounded" />
                  <div className="flex-1">
                    <h3 className="font-bold">{profile.name}</h3>
                    <button
                      onClick={() => handleEdit(index)}
                      className="mt-2 text-sm text-blue-600 hover:underline flex items-center"
                    >
                      <FaEdit className="mr-1" /> Edit Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Information;

