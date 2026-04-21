"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ onSearch, placeholder = "Search symbol..." }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef(null);

  const toggleSearch = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    
    if (!newState) {
      setSearchValue("");
      onSearch("");
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  return (
    <div className="relative w-full flex items-center">
      {!isExpanded ? (
        <div className="flex items-center cursor-pointer hover:text-gray-800" onClick={toggleSearch}>
          <Search size={18} className="text-gray-600 mr-2" />
          {/* <span className="font-medium">Symbol</span> */}
        </div>
      ) : (
        <div className="flex items-center w-full border rounded px-2 bg-white shadow-sm">
          <Search size={18} className="text-gray-500 mr-1" />
          <input
            ref={inputRef}
            type="text"
            className="outline-none bg-transparent p-2 w-full text-sm"
            placeholder={placeholder}
            value={searchValue}
            onChange={handleSearchChange}
          />
          {searchValue && (
            <button
              onClick={() => {
                setSearchValue("");
                onSearch("");
              }}
              className="mr-1 text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          )}
          <button
            onClick={toggleSearch}
            className="ml-1 text-gray-500 hover:text-gray-800 pl-1 border-l"
          >
            <X size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
