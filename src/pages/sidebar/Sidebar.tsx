import React from "react";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white shadow-lg flex flex-col h-full">
      {/* Sidebar content goes here */}
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">Maulex POS</h1>
        <p className="text-sm text-gray-600">Inventory System</p>
      </div>
      {/* Add navigation and user info here */}
    </aside>
  );
};

export default Sidebar;
