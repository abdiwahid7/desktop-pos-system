import React from "react";

const ModifySupplierStatementPage: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Modify Supplier Statement</h1>
      <form className="space-y-4 max-w-md">
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Supplier"
        />
        <textarea
          className="w-full border px-3 py-2 rounded"
          placeholder="Statement Details"
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          type="submit"
        >
          Modify
        </button>
      </form>
    </div>
  );
};

export default ModifySupplierStatementPage;
