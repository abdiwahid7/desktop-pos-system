import React from "react";

const SuppliersListDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-green-700 mb-1">
              Suppliers
            </h1>
            <p className="text-gray-500">View and manage your suppliers.</p>
          </div>
          <button className="mt-4 md:mt-0 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            + Add Supplier
          </button>
        </div>
        <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
          <input
            type="text"
            placeholder="Search suppliers..."
            className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 mb-2 md:mb-0"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr className="bg-green-100 text-green-700">
                <th className="py-2 px-4 text-left">#</th>
                <th className="py-2 px-4 text-left">Supplier Name</th>
                <th className="py-2 px-4 text-left">Contact</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 px-4">1</td>
                <td className="py-2 px-4">ABC Distributors</td>
                <td className="py-2 px-4">0801-234-5678</td>
                <td className="py-2 px-4">
                  <button className="text-green-600 hover:underline mr-2">
                    Edit
                  </button>
                  <button className="text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4">2</td>
                <td className="py-2 px-4">XYZ Supplies</td>
                <td className="py-2 px-4">0802-345-6789</td>
                <td className="py-2 px-4">
                  <button className="text-green-600 hover:underline mr-2">
                    Edit
                  </button>
                  <button className="text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SuppliersListDashboard;
