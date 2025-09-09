import React, { useState } from "react";

type ProductGroup = {
  id: number;
  name: string;
  description: string;
};

const initialGroups: ProductGroup[] = [
  { id: 1, name: "Beverages", description: "All drink products" },
  { id: 2, name: "Snacks", description: "Chips, biscuits, etc." },
];

const ProductGroupDashboard: React.FC = () => {
  const [groups, setGroups] = useState<ProductGroup[]>(initialGroups);
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const filteredGroups = groups.filter(
    (g) =>
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    if (!newName.trim()) return;
    setGroups([
      ...groups,
      { id: Date.now(), name: newName, description: newDesc },
    ]);
    setNewName("");
    setNewDesc("");
    setShowAdd(false);
  };

  const handleDelete = (id: number) => {
    setGroups(groups.filter((g) => g.id !== id));
  };

  const handleEdit = (group: ProductGroup) => {
    setEditId(group.id);
    setEditName(group.name);
    setEditDesc(group.description);
  };

  const handleEditSave = () => {
    if (editId === null) return;
    setGroups(
      groups.map((g) =>
        g.id === editId ? { ...g, name: editName, description: editDesc } : g
      )
    );
    setEditId(null);
    setEditName("");
    setEditDesc("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-blue-700 mb-1">
              Product Groups
            </h1>
            <p className="text-gray-500">
              Manage and organize your product groups.
            </p>
          </div>
          <button
            className="mt-4 md:mt-0 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            onClick={() => setShowAdd(true)}
          >
            + Add Group
          </button>
        </div>
        <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
          <input
            type="text"
            placeholder="Search groups..."
            className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mb-2 md:mb-0"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr className="bg-blue-100 text-blue-700">
                <th className="py-2 px-4 text-left">#</th>
                <th className="py-2 px-4 text-left">Group Name</th>
                <th className="py-2 px-4 text-left">Description</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredGroups.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-gray-400">
                    No groups found.
                  </td>
                </tr>
              )}
              {filteredGroups.map((group, idx) => (
                <tr className="border-b" key={group.id}>
                  <td className="py-2 px-4">{idx + 1}</td>
                  <td className="py-2 px-4">
                    {editId === group.id ? (
                      <input
                        className="border px-2 py-1 rounded w-32"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                      />
                    ) : (
                      group.name
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {editId === group.id ? (
                      <input
                        className="border px-2 py-1 rounded w-48"
                        value={editDesc}
                        onChange={(e) => setEditDesc(e.target.value)}
                      />
                    ) : (
                      group.description
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {editId === group.id ? (
                      <>
                        <button
                          className="text-green-600 hover:underline mr-2"
                          onClick={handleEditSave}
                        >
                          Save
                        </button>
                        <button
                          className="text-gray-600 hover:underline"
                          onClick={() => setEditId(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="text-blue-600 hover:underline mr-2"
                          onClick={() => handleEdit(group)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 hover:underline"
                          onClick={() => handleDelete(group.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Group Modal */}
        {showAdd && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-80">
              <h2 className="text-lg font-bold mb-4">Add Product Group</h2>
              <input
                className="border px-2 py-1 rounded w-full mb-2"
                placeholder="Group Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <input
                className="border px-2 py-1 rounded w-full mb-4"
                placeholder="Description"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <button
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => setShowAdd(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={handleAdd}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGroupDashboard;
