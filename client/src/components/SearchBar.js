import React, { useState } from "react";
import {Search} from 'lucide-react'

export default function SearchBar({onSearch}) {
    const [searchQuery, setSearchQuery] = useState('');


    // Function to handle changes in the input field
    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Function to handle search button click
    const handleSearch = () => {
        onSearch(searchQuery);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="flex justify-center">
            <div className="max-w-[1177px] w-full flex justify-start items-start bg-white rounded-l-lg shadow border border-gray-100">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="flex-grow px-4 py-3 text-gray-400 text-base font-small rounded-l-lg font-satoshi tracking-tight placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-transparent"
                    placeholder="Transaction ID"
                />
                <button
                    className="flex-shrink-0 w-16 h-[50px] bg-blue-500 text-white rounded-r-lg justify-center items-center shadow"
                    onClick={handleSearch}
                >
                    <div className="flex justify-center">
                        <Search color="white" />
                    </div>
                </button>
            </div>
        </div>
    );
}