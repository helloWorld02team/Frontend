import React from 'react';
import { Search } from 'lucide-react'; 

function SearchBox() {
  return (
    <div className="flex items-center  rounded-2xl p-2  bg-white w-full max-w-sm h-13 shadow-2xl">
      <Search className="text-gray-400 mr-2 " />
      <input
        type="search"
        placeholder="ค้นหา"
        className="focus:outline-none w-full text-gray-700 "
      />
    </div>
  );
}

export default SearchBox;
