import React from "react";

const QuickSearchPage: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Quick Search</h1>
      <input
        className="w-full border px-3 py-2 rounded mb-4"
        placeholder="Search for items..."
      />
      <div className="bg-white rounded shadow p-4">
        (Search results will appear here)
      </div>
    </div>
  );
};

export default QuickSearchPage;
