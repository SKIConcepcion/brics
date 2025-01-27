import React from 'react';

//input parameters:
{/* <ReservationFilter sortBy={sortBy} setSortBy={setSortBy} filterOptions={array of dicts}/> */}

export const ReservationFilter = ({ toggleDropdown, isOpen, handleSort, filterLabel, filterOptions}) => {
    return (
        <div className="relative">
            <div className="dropdown relative inline-block">
            <button
                className="py-1 pl-4 pr-10 block w-full border border-gray-200 rounded-full text-sm text-gray-500 disabled:opacity-50 disabled:pointer-events-none bg-white hover:bg-gray-100"
                aria-label="select example"
                style={{ fontFamily: 'Satoshi-regular', color: 'rgba(0, 0, 0, 0.5)' }}
                onClick={toggleDropdown}
            >
                {filterLabel}
                <svg
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none ${isOpen ? 'rotate-180' : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>
            {isOpen && (
                <div className="absolute z-50 top-full mt-1 w-full bg-white rounded-lg shadow-lg border border-blue-500">
                    {
                        filterOptions.map((item) => {
                            return (
                                <button className="block w-full text-left py-2 px-4 text-sm text-gray-800 hover:bg-blue-500 focus:outline-none focus:bg-gray-100" onClick={() => {handleSort(item['optionValue'])}}>
                                    {item['optionText']}
                                </button>
                            )
                        }

                        )
                    }
                </div>
            )}
            </div>
        </div>
    );
};

export default ReservationFilter;