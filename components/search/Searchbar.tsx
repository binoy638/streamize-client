import React, { useState } from "react";
import { SearchIcon, PlusIcon, SelectorIcon } from "@heroicons/react/solid";
import ProviderSelector from "./ProviderSelector";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { setSearchQuery } from "../../store/slice/searchBar.slice";
import { useRouter } from "next/router";

interface SearchbarProps {
  def: "search" | "add";
  showProviderSelector?: boolean;
}

function Searchbar({ def, showProviderSelector = false }: SearchbarProps) {
  const dispatch = useTypedDispatch();

  const router = useRouter();

  const { query, torrentProvider } = useTypedSelector(
    (state) => state.searchBar.search
  );

  const [type, setType] = useState<"search" | "add">(def);

  const toggleHandler = () => {
    setType((prev) => (prev === "search" ? "add" : "search"));
  };

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (type === "search") {
      router.push({
        pathname: "/search",
        query: { q: query, p: torrentProvider },
      });
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <form onSubmit={onSubmitHandler} className="flex h-10">
        <button
          type="button"
          onClick={toggleHandler}
          className="rounded-l flex justify-center items-center gap-2 pl-4 pr-2 border-t border-l border-b bg-gray-200 border-gray-400  hover:opacity-80"
        >
          {type === "search" ? "Search" : "Add"}
          <SelectorIcon className="h-5 w-5" />
        </button>
        <input
          type="text"
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          placeholder={`${
            type === "search" ? "Enter movie name" : "Add magnet link"
          }`}
          className="w-full border-gray-400 border-t border-b focus:outline-none pl-4"
        />
        <button
          type="submit"
          className="bg-secondary rounded-r px-4 border-t border-r border-b border-secondary hover:opacity-80"
        >
          {type === "search" ? (
            <SearchIcon className="h-5 w-5" />
          ) : (
            <PlusIcon className="h-5 w-5" />
          )}
        </button>
      </form>
      {type === "search" && showProviderSelector && <ProviderSelector />}
    </div>
  );
}

export default Searchbar;
