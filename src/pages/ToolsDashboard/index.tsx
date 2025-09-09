import React from "react";

const ToolsDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Tools</h1>
        <p className="text-gray-500 mb-6">Access system tools and utilities.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded-lg p-6 shadow flex flex-col items-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              Backup Database
            </div>
            <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Backup Now
            </button>
          </div>
          <div className="bg-green-50 rounded-lg p-6 shadow flex flex-col items-center">
            <div className="text-2xl font-bold text-green-600 mb-2">
              Restore Database
            </div>
            <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              Restore
            </button>
          </div>
          <div className="bg-yellow-50 rounded-lg p-6 shadow flex flex-col items-center">
            <div className="text-2xl font-bold text-yellow-600 mb-2">
              Export Data
            </div>
            <button className="mt-2 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700">
              Export
            </button>
          </div>
          <div className="bg-red-50 rounded-lg p-6 shadow flex flex-col items-center">
            <div className="text-2xl font-bold text-red-600 mb-2">
              System Logs
            </div>
            <button className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
              View Logs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsDashboard;
