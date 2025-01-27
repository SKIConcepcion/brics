import React from "react";

export const SearchBox = ({ searchText, setSearchText, onSearch }) => {
  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="max-w-xs">
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
          <svg
            className="flex-shrink-0 size-4 text-gray-400/60"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
        </div>
        <input
          className="py-1 px-10 block w-full border-gray-200 rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          style={{ fontFamily: "Satoshi-regular" }}
        />
      </div>
    </div>
    );
}

export default SearchBox;
