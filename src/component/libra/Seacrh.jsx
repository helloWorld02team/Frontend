import React from 'react';
import { Search } from 'lucide-react'; 

function SearchBox() {
  return (
    <div className="flex items-center border rounded-2xl p-2 shadow-sm bg-white w-full max-w-sm">
      <Search className="text-gray-400 mr-2" />
      <input
        type="text"
        placeholder="ค้นหา"
        className="focus:outline-none w-full text-gray-700"
      />
    </div>
  );
}

export default SearchBox;
