"use client";
import React, { useState, useRef, useEffect, useContext } from 'react';
import Link from 'next/link'
import { FaHome, FaVideo, FaUsers, FaCog, FaSignOutAlt, FaQuestionCircle, FaUserPlus, FaUserMinus, FaCheck, FaBan, FaCamera, FaBars, FaTimes } from 'react-icons/fa';
import { MdSecurity } from 'react-icons/md';
import { BiCctv } from 'react-icons/bi';
import SidebarLink from './SidebarLink';
import VoiceCommandButton from './VoiceCommandButton';
import { ThemeContext } from './ThemeProvider.tsx';

const DetectionData = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedFace, setSelectedFace] = useState(null);
  const [showFaceProfile, setShowFaceProfile] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedFace, setEditedFace] = useState(null);
  const [showNewFaceModal, setShowNewFaceModal] = useState(false);
  const [selectedNewFace, setSelectedNewFace] = useState(null);
  const [showAddGuestModal, setShowAddGuestModal] = useState(false);
  const [newGuest, setNewGuest] = useState({
    name: '',
    relation: '',
    accessLevel: 'Limited'
});
  const [showRemoveGuestModal, setShowRemoveGuestModal] = useState(false);
  const [selectedFaceToRemove, setSelectedFaceToRemove] = useState(null);
  const [showViewAllModal, setShowViewAllModal] = useState(false);
  const [viewAllType, setViewAllType] = useState('recognized');
  const [searchQuery, setSearchQuery] = useState('');

  const { isDarkMode } = useContext(ThemeContext);

  const ws = useRef(null);
  const faceFile = useRef(null);

  // Sample face data - this would come from an API if we need to test more
  const [recognizedFaces, setRecognizedFaces] = useState([
    { id: 1, name: 'Diddy', relation: 'Family Member', lastVisit: '2025-03-15', totalVisits: 12, alerts: 0 },
    { id: 2, name: 'John Cena', relation: 'Friend', lastVisit: '2025-03-14', totalVisits: 5, alerts: 1 },
    { id: 3, name: 'Trump', relation: 'Neighbor', lastVisit: '2025-03-13', totalVisits: 3, alerts: 0 },
  ]);

  const [newFaces, setNewFaces] = useState([
    { 
      id: 4, 
      name: 'ID#1234567890', 
      relation: 'Unknown', 
      lastSeen: '2025-03-15',
      totalVisits: 1,
      alerts: 0
    },
    { 
      id: 5, 
      name: 'ID#1223567891', 
      relation: 'Unknown', 
      lastSeen: '2025-03-15',
      totalVisits: 1,
      alerts: 0
    },
  ]);

  useEffect(() => {
    ws.current = new WebSocket('ws://192.168.1.119:8765');

    ws.current.onopen = () => {
      console.log('WebSocket connected!');
    };

    ws.current.onmessage = (event) => {
      console.log('Received from server:', event.data);
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }, []);

  const handleFaceClick = (face) => {
    setSelectedFace(face);
    setEditedFace(face);
    setShowFaceProfile(true);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setRecognizedFaces(recognizedFaces.map(face => 
      face.id === editedFace.id ? editedFace : face
    ));
    setSelectedFace(editedFace);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setEditedFace(selectedFace);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    setEditedFace({
      ...editedFace,
      [e.target.name]: e.target.value
    });
  };

  const handleNewFaceClick = (face) => {
    setSelectedNewFace(face);
    setShowNewFaceModal(true);
  };

  const handleAddToDatabase = () => {
    if (selectedNewFace) {
      const updatedFace = {
        ...selectedNewFace,
        lastVisit: selectedNewFace.lastSeen,
        totalVisits: 1,
        alerts: 0
      };
      setRecognizedFaces([...recognizedFaces, updatedFace]);
      setNewFaces(newFaces.filter(face => face.id !== selectedNewFace.id));
      setShowNewFaceModal(false);
    }
  };

  const handleAddGuestClick = () => {
    setShowAddGuestModal(true);
  };

  const handleRemoveGuest = (faceId) => {
    // Remove from recognized faces
    setRecognizedFaces(recognizedFaces.filter(face => face.id !== faceId));
    // Remove from new faces
    setNewFaces(newFaces.filter(face => face.id !== faceId));
    
    // Close modal if the removed face was selected
    if (selectedFace?.id === faceId) {
      setShowFaceProfile(false);
      setSelectedFace(null);
    }
    if (selectedNewFace?.id === faceId) {
      setShowNewFaceModal(false);
      setSelectedNewFace(null);
    }
  };

  const handleNewGuestChange = (e) => {
    setNewGuest({
      ...newGuest,
      [e.target.name]: e.target.value
    });
  };

  const handleAddGuestSubmit = () => {
    const newFace = {
      id: Date.now(), // Using timestamp as temporary ID
      name: newGuest.name,
      relation: newGuest.relation,
      lastVisit: new Date().toISOString().split('T')[0],
      totalVisits: 0,
      alerts: 0,
      accessLevel: newGuest.accessLevel
    };
    
    setRecognizedFaces([...recognizedFaces, newFace]);
    setShowAddGuestModal(false);
    setNewGuest({
      name: '',
      relation: '',
      accessLevel: 'Limited'
    });
  };

  const handleRemoveGuestClick = () => {
    setShowRemoveGuestModal(true);
    setSelectedFaceToRemove(null);
  };

  const handleAddFaceClick = () => {
    console.log(faceFile.current, ws.current)
    if (!faceFile.current || !ws.current || ws.current.readyState !== WebSocket.OPEN) 
      return;

    const encoder = new TextEncoder();
    const textBytes = encoder.encode(faceFile.current.name);
    const header = new Uint32Array([textBytes.length]);
    const arrayBuffer = new Blob([header.buffer, textBytes, faceFile.current])

    ws.current?.send(arrayBuffer);
  }

  const handleFaceSelectForRemoval = (face) => {
    setSelectedFaceToRemove(face);
  };

  const handleConfirmRemove = () => {
    if (selectedFaceToRemove) {
      handleRemoveGuest(selectedFaceToRemove.id);
      setShowRemoveGuestModal(false);
    }
  };

  const handleViewAllClick = (type) => {
    setViewAllType(type);
    setSearchQuery('');
    setShowViewAllModal(true);
  };

  const handleVoiceCommand = (command) => {
    alert(`Voice Command recognized: "${command}"`);
  }

  const filteredFaces = viewAllType === 'recognized' 
    ? recognizedFaces.filter(face => 
        face.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : newFaces;

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
        <VoiceCommandButton onCommand={handleVoiceCommand} />
        <h1 className="text-2xl font-bold mb-6">Detection Data</h1>

        {/* Face Detection Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Face Detection</h2>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <StatCard title="Recognized Faces" value={recognizedFaces.length} />
            <StatCard title="New Faces" value={newFaces.length} />
            <StatCard title="Total Entries" value={recognizedFaces.length + newFaces.length} />
          </div>
          <div className="flex space-x-2 mb-6">
            <button 
              onClick={handleAddGuestClick}
              className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              <FaUserPlus /> <span>Add Guest</span>
            </button>
            <button 
              onClick={handleRemoveGuestClick}
              className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              <FaUserMinus /> <span>Remove Guest</span>
            </button>
            <button
              onClick={handleAddFaceClick}
              className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              <FaUserPlus /> <span>Add Face</span>
            </button>
            <div className="relative">
              <input
              type="file"
              id="face_upload"
              accept="image/jpg"
              onChange={(e) => {faceFile.current = e.target.files?.[0]}}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              aria-label="Upload face image"
              />
              <div className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                <FaCamera /> <span>Choose File</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow p-5 text-left">
              <h3 className="font-semibold mb-2">Recognized Faces</h3>
              <div className="flex flex-wrap gap-2 max-w-full">
                {recognizedFaces.map(face => (
                  <div 
                    key={face.id} 
                    className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0 cursor-pointer hover:ring-2 hover:ring-blue-500"
                    onClick={() => handleFaceClick(face)}
                  ></div>
                ))}
              </div>
              <button 
                onClick={() => handleViewAllClick('recognized')}
                className="text-blue-500 mt-2 hover:text-blue-600"
              >
                View All
              </button>
            </div>
            <div className="bg-white rounded-lg shadow p-5 text-left">
              <h3 className="font-semibold mb-2">New Faces</h3>
              <div className="flex flex-wrap gap-2 max-w-full">
                {newFaces.map(face => (
                  <div 
                    key={face.id} 
                    className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0 cursor-pointer hover:ring-2 hover:ring-blue-500"
                    onClick={() => handleNewFaceClick(face)}
                  ></div>
                ))}
              </div>
              <button 
                onClick={() => handleViewAllClick('new')}
                className="text-blue-500 mt-2 hover:text-blue-600"
              >
                View All
              </button>
            </div>
          </div>
        </div>

        {/* View All Modal */}
        {showViewAllModal && (
          <div className="fixed inset-0 bg-black/15 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {viewAllType === 'recognized' ? 'Recognized Faces' : 'New Faces'}
                </h2>
                <button 
                  onClick={() => setShowViewAllModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes />
                </button>
              </div>

              {viewAllType === 'recognized' && (
                <div className="mb-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by name..."
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {searchQuery && (
                      <span className="absolute right-3 top-2 text-gray-400 text-sm">
                        {filteredFaces.length} results
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto">
                {filteredFaces.map(face => (
                  <div 
                    key={face.id}
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                      <div>
                        <h3 className="font-semibold text-lg">{face.name}</h3>
                        <p className="text-gray-600">{face.relation}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last {viewAllType === 'recognized' ? 'Visit' : 'Seen'}</span>
                        <span className="font-medium">{viewAllType === 'recognized' ? face.lastVisit : face.lastSeen}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Visits</span>
                        <span className="font-medium">{face.totalVisits}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Alerts</span>
                        <span className={`font-medium ${face.alerts > 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {face.alerts}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Face Profile Modal */}
        {showFaceProfile && selectedFace && (
          <div className="fixed inset-0 bg-black/15 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Face Profile</h2>
                <button 
                  onClick={() => setShowFaceProfile(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes />
                </button>
              </div>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        name="name"
                        value={editedFace.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Name"
                      />
                      <input
                        type="text"
                        name="relation"
                        value={editedFace.relation}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Relation"
                      />
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-lg font-semibold">{selectedFace.name}</h3>
                      <p className="text-gray-600">{selectedFace.relation}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Visit</span>
                  <span className="font-medium">{selectedFace.lastVisit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Visits</span>
                  <span className="font-medium">{selectedFace.totalVisits}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Alerts Triggered</span>
                  <span className={`font-medium ${selectedFace.alerts > 0 ? 'text-red-500' : 'text-green-500'}`}>
                    {selectedFace.alerts}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold mb-2">Recent Activity</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Entry at Front Door</span>
                    <span className="text-gray-500">2025-03-15 08:30 AM</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Exit at Back Door</span>
                    <span className="text-gray-500">2025-03-15 09:15 AM</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex space-x-2">
                {isEditing ? (
                  <>
                    <button 
                      onClick={handleSaveClick}
                      className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Save Changes
                    </button>
                    <button 
                      onClick={handleCancelClick}
                      className="flex-1 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={handleEditClick}
                      className="flex-1 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                      Edit Profile
                    </button>
                    <button 
                      onClick={() => handleRemoveGuest(selectedFace.id)}
                      className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Remove Guest
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* New Face Modal */}
        {showNewFaceModal && selectedNewFace && (
          <div className="fixed inset-0 bg-black/15 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">New Face Detected</h2>
                <button 
                  onClick={() => setShowNewFaceModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes />
                </button>
              </div>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{selectedNewFace.name}</h3>
                  <p className="text-gray-600">{selectedNewFace.relation}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Seen</span>
                  <span className="font-medium">{selectedNewFace.lastSeen}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Visits</span>
                  <span className="font-medium">{selectedNewFace.totalVisits}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Alerts</span>
                  <span className={`font-medium ${selectedNewFace.alerts > 0 ? 'text-red-500' : 'text-green-500'}`}>
                    {selectedNewFace.alerts}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold mb-2">Recent Activity</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>First Detection</span>
                    <span className="text-gray-500">{selectedNewFace.lastSeen} 08:30 AM</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex space-x-2">
                <button 
                  onClick={handleAddToDatabase}
                  className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Add to Recognized Faces
                </button>
                <button 
                  onClick={() => handleRemoveGuest(selectedNewFace.id)}
                  className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Remove Guest
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Guest Modal */}
        {showAddGuestModal && (
          <div className="fixed inset-0 bg-black/15 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Add New Guest</h2>
                <button 
                  onClick={() => setShowAddGuestModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newGuest.name}
                    onChange={handleNewGuestChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter guest name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Relation</label>
                  <input
                    type="text"
                    name="relation"
                    value={newGuest.relation}
                    onChange={handleNewGuestChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter relation"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Access Level</label>
                  <select
                    name="accessLevel"
                    value={newGuest.accessLevel}
                    onChange={handleNewGuestChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Limited">Limited</option>
                    <option value="Standard">Standard</option>
                    <option value="Full">Full</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex space-x-2">
                <button 
                  onClick={handleAddGuestSubmit}
                  className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Add Guest
                </button>
                <button 
                  onClick={() => setShowAddGuestModal(false)}
                  className="flex-1 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Remove Guest Modal */}
        {showRemoveGuestModal && (
          <div className="fixed inset-0 bg-black/15 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Select Guest to Remove</h2>
                <button 
                  onClick={() => setShowRemoveGuestModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Recognized Faces Section */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg mb-2">Recognized Faces</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {recognizedFaces.map(face => (
                      <div 
                        key={face.id}
                        onClick={() => handleFaceSelectForRemoval(face)}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          selectedFaceToRemove?.id === face.id 
                            ? 'border-red-500 bg-red-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                          <div>
                            <h4 className="font-medium">{face.name}</h4>
                            <p className="text-sm text-gray-600">{face.relation}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* New Faces Section */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg mb-2">New Faces</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {newFaces.map(face => (
                      <div 
                        key={face.id}
                        onClick={() => handleFaceSelectForRemoval(face)}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          selectedFaceToRemove?.id === face.id 
                            ? 'border-red-500 bg-red-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                          <div>
                            <h4 className="font-medium">{face.name}</h4>
                            <p className="text-sm text-gray-600">{face.relation}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <button 
                  onClick={() => setShowRemoveGuestModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleConfirmRemove}
                  disabled={!selectedFaceToRemove}
                  className={`px-4 py-2 rounded ${
                    selectedFaceToRemove 
                      ? 'bg-red-500 text-white hover:bg-red-600' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Remove Selected Guest
                </button>
              </div>
            </div>
          </div>
        )}

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
