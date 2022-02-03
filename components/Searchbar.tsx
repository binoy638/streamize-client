import React from "react";
import { SearchIcon } from "@heroicons/react/solid";

function Searchbar() {
  return (
    <div className="flex h-10 ">
      <input
        type="text"
        placeholder="Add magnet link or search movies "
        className="w-full rounded-l  border-gray-400 border-t border-l-2 lg:border-l border-b focus:outline-none pl-4"
      />
      <button className="bg-secondary rounded-r px-4 border-t border-r border-b border-secondary hover:opacity-80">
        <SearchIcon className="h-5 w-5" />
      </button>
    </div>
  );
}

export default Searchbar;
