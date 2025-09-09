import React from "react";

const ReturnGoodsPage: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Return Goods</h1>
      <form className="space-y-4 max-w-md">
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Supplier"
        />
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Goods Description"
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          type="submit"
        >
          Return
        </button>
      </form>
    </div>
  );
};

export default ReturnGoodsPage;
