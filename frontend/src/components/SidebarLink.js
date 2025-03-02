import React from 'react';

const SidebarLink = ({ icon, text, active = false }) => {
  return (
    <div className={`
      flex items-center gap-3 px-4 py-3 cursor-pointer
      hover:bg-gray-100 transition-colors
      ${active ? 'bg-gray-100' : ''}
    `}>
      <span className={`text-lg ${active ? 'text-blue-600' : 'text-gray-600'}`}>
        {icon}
      </span>
      <span className={active ? 'text-blue-600' : 'text-gray-600'}>
        {text}
      </span>
    </div>
  );
};

export default SidebarLink; 