import React, { useState, useEffect } from 'react';

export default function SchedDropDown (props){
    const setValue = props.setValue;
    const scheds = props.field.schedules;
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setValue(option);
        toggleDropdown();
        props.onSchedSelect(option);
    }

    useEffect(() => {
        setSelectedOption(props.value);
      }, [props.value]);

    return (
        <div className="dropdown relative w-full">
            <button
                className="py-1 pl-4 pr-10 block w-full h-11 border border-gray-500 rounded-md text-sm text-gray-600 text-left disabled:opacity-50 disabled:pointer-events-none bg-white hover:bg-gray-100"
                aria-label="select example"
                onClick={(e) => {
                    e.preventDefault(); // Prevent default form submission behavior
                    toggleDropdown();
                }}
            >
                {selectedOption ? selectedOption.eventName : "Select a Schedule"}
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
                <div className="absolute z-10 top-full mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200">
                    {/* {console.log(rooms)} */}
                    {/* {console.log(scheds)} */}
                    {Array.isArray(scheds) && scheds.length > 0 ? (
                        scheds.map((sched, index) => (
                            <button
                                key={index}
                                className="block w-full text-left py-2 px-4 text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleOptionClick(sched);
                                    // console.log(`Selected schedule: ${sched.eventName}`);
                                    // console.log(sched);
                                }}
                            >
                                {sched.eventName}
                            </button>
                        ))
                    ) : (
                        <div>Data not available.</div>
                    )}
                </div>
            )}
        </div>
    );
};
