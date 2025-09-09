import React from "react";

const ReportsDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-blue-700 mb-1">Reports</h1>
            <p className="text-gray-500">View and generate business reports.</p>
          </div>
          <select className="mt-4 md:mt-0 px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option>All Reports</option>
            <option>Sales</option>
            <option>Inventory</option>
            <option>Customers</option>
            <option>Suppliers</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-lg p-6 shadow flex flex-col items-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              ₦1,200,000
            </div>
            <div className="text-gray-700 font-semibold mb-1">Total Sales</div>
            <button className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
              View Report
            </button>
          </div>
          <div className="bg-green-50 rounded-lg p-6 shadow flex flex-col items-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              ₦350,000
            </div>
            <div className="text-gray-700 font-semibold mb-1">
              Total Purchases
            </div>
            <button className="mt-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">
              View Report
            </button>
          </div>
          <div className="bg-yellow-50 rounded-lg p-6 shadow flex flex-col items-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">12</div>
            <div className="text-gray-700 font-semibold mb-1">
              Low Stock Items
            </div>
            <button className="mt-2 px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700">
              View Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsDashboard;
