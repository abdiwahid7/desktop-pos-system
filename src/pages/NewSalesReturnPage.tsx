import React from "react";

const NewSalesReturnPage: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">New Sales Return</h1>
      <form className="space-y-4 max-w-md">
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Customer"
        />
        <input className="w-full border px-3 py-2 rounded" placeholder="Item" />
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Amount"
          type="number"
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

export default NewSalesReturnPage;
