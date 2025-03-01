import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaDoorOpen, 
  FaExclamationTriangle, 
  FaRadiation,
  FaHome,
  FaVideo,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaQuestionCircle,
  FaFire,
  FaWater,
  FaGasPump,
  FaHouseDamage
} from 'react-icons/fa';

const SecurityPanel = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4 font-bold text-lg border-b">AI Security System</div>
        <nav className="mt-4">
          <Link to="/">
            <SidebarLink icon={<FaHome />} text="Homepage" />
          </Link>
          <SidebarLink icon={<FaExclamationTriangle />} text="Security Panel" active />
          <SidebarLink icon={<FaVideo />} text="Detection Data" />
          <SidebarLink icon={<FaVideo />} text="Live Feed" />
          <SidebarLink icon={<FaUsers />} text="Guests" />
          <SidebarLink icon={<FaVideo />} text="Recordings" />
          <SidebarLink icon={<FaCog />} text="Account Settings" />
          <SidebarLink icon={<FaCog />} text="System Settings" />
        </nav>
        <div className="absolute bottom-0 w-64 border-t">
          <SidebarLink icon={<FaSignOutAlt />} text="Logout" />
          <SidebarLink icon={<FaQuestionCircle />} text="Help" />
        </div>
      </div>

      {/* Security Panel */}
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Security Panel</h1>

        {/* System Status */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">System Status</h2>
          <div className="flex items-center justify-between">
            <span>Security System</span>
            <Toggle />
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Notifications</h2>
          <NotificationItem 
            icon={<FaDoorOpen className="text-blue-500" />}
            title="Front Door Opened"
            time="2025-03-15 08:30 AM"
          />
          <NotificationItem 
            icon={<FaExclamationTriangle className="text-yellow-500" />}
            title="Motion Detected - Backyard"
            time="2025-03-15 02:45 AM"
          />
          <NotificationItem 
            icon={<FaRadiation className="text-red-500" />}
            title="Smoke Detected - Kitchen"
            time="2025-03-14 07:15 PM"
          />
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
            <AlertItem 
              icon={<FaFire className="text-red-500" />}
              title="Fire Alert"
              status="No fire detected"
            />
            <AlertItem 
              icon={<FaWater className="text-blue-500" />}
              title="Flood Alert"
              status="No flood detected"
            />
            <AlertItem 
              icon={<FaGasPump className="text-yellow-500" />}
              title="Gas Leak Alert"
              status="No gas leak detected"
            />
            <AlertItem 
              icon={<FaHouseDamage className="text-gray-500" />}
              title="Earthquake Alert"
              status="No seismic activity detected"
            />
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