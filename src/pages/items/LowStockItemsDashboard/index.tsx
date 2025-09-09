import React from "react";

const LowStockItemsDashboard: React.FC = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold mb-4">Low Stock Items Dashboard</h1>
    <p className="text-gray-600 mb-2">View low stock items here.</p>
    <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
      Low stock items coming soon...
    </div>
  </div>
);

export default LowStockItemsDashboard;
