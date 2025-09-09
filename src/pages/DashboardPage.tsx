import React from 'react';

const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* User Info & Quick Actions */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-blue-200 flex items-center justify-center text-2xl font-bold text-blue-700">U</div>
            <div>
              <div className="text-lg font-semibold text-gray-800">Welcome, Admin</div>
              <div className="text-sm text-gray-500">Role: Administrator</div>
            </div>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Logout</button>
            <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition">Change Password</button>
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">Exit</button>
          </div>
        </div>

        {/* KPIs & Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">₦1,200,000</div>
            <div className="text-gray-600">Total Sales</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <div className="text-3xl font-bold text-green-600 mb-2">₦350,000</div>
            <div className="text-gray-600">Total Purchases</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <div className="text-3xl font-bold text-orange-500 mb-2">12</div>
            <div className="text-gray-600">Low Stock Items</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">5</div>
            <div className="text-gray-600">Pending Payments</div>
          </div>
        </div>

        {/* Alerts & Notifications */}
        <div className="mb-8">
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg mb-2">
            <strong>Reminder:</strong> 3 items are below minimum stock level.
          </div>
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-2">
            <strong>Alert:</strong> 2 overdue supplier payments.
          </div>
        </div>

        {/* Recent Activities & Search */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="flex-1 bg-white rounded-xl shadow p-6">
            <div className="font-semibold text-gray-700 mb-4">Recent Activities</div>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>Sale posted: Invoice #INV-1005 (₦25,000) - 10 mins ago</li>
              <li>Stock adjusted: Samsung Galaxy S24 (+5) - 30 mins ago</li>
              <li>Payment received: John Smith (₦10,000) - 1 hour ago</li>
              <li>New item added: Nike Air Max - 2 hours ago</li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 bg-white rounded-xl shadow p-6 flex flex-col justify-between">
            <div>
              <div className="font-semibold text-gray-700 mb-2">Quick Search</div>
              <input type="text" placeholder="Search..." className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="mt-6">
              <div className="font-semibold text-gray-700 mb-2">Quick Links</div>
              <div className="flex flex-wrap gap-2">
                <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded">New Sale</button>
                <button className="bg-green-100 text-green-700 px-3 py-1 rounded">Add Item</button>
                <button className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded">Receive Goods</button>
                <button className="bg-purple-100 text-purple-700 px-3 py-1 rounded">Reports</button>
              </div>
            </div>
          </div>
        </div>

        {/* Charts & Graphs (Placeholder) */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="font-semibold text-gray-700 mb-4">Sales & Inventory Trends</div>
          <div className="h-48 flex items-center justify-center text-gray-400">[Charts & Graphs Here]</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
