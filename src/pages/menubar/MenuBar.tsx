import React from "react";

const MenuBar: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      {/* Menu bar content goes here */}
      <h2 className="text-2xl font-semibold text-gray-800">Menu</h2>
      <div className="text-sm text-gray-600">
        {new Date().toLocaleDateString()}
      </div>
    </nav>
  );
};

export default MenuBar;
