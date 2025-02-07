import React from 'react';
import { Search } from 'lucide-react'; 

function SearchBox() {
  return (
    <div className="flex items-center p-2 w-full max-w-sm h-13 pl-10 gap-5">
      <Search className="text-[#575757]" />
      <input
        type="search"
        placeholder="ค้นหา"
        className="focus:outline-none w-full text-[#575757] text-xl"
      />
    </div>
  ); 
}

export default SearchBox;
