import React from "react";

const NewItemPage: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">New Item</h1>
      <form className="space-y-4 max-w-md">
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Item Name"
        />
        <input className="w-full border px-3 py-2 rounded" placeholder="SKU" />
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Price"
          type="number"
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          type="submit"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default NewItemPage;
