import React, { useState } from 'react';

export default function CollapseBtn(props) {
    const { label, placeholder, icon, type} = props.field;
    const [isOpen, setIsOpen] = useState(false);
    const value = props.value;
    const setValue = props.setValue;

    return (
        <div className='flex h-14'>
            <button
                type="button"
                className={`flex flex-col w-14 hs-collapse-toggle mr-1 ml-1 pt-2 px-4 inline-flex items-center font-semibold rounded-lg border hover:border-transparent hover:text-white hover:bg-brics-blue disabled:opacity-50 disabled:pointer-events-none ${
                    props.value
                        ? 'border-transparent text-white bg-brics-blue' // If it has a value
                        : 'border-gray-500 bg-white text-gray-500' // If it doesn't have a value
                }`}
                id="hs-basic-collapse"
                onClick={() => setIsOpen(!isOpen)}
            >
                {icon}
                <label className="text-[10px]"><b>{label}</b></label>
            </button>
            <div
                id="hs-basic-collapse-heading"
                className={`rounded-md hs-collapse overflow-hidden transition-all duration-500 ${isOpen ? 'w-full' : 'w-0'}`}
                aria-labelledby="hs-basic-collapse"
            >
                <div className='w-20'>
                    <input
                        type={type}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        required
                        className={`w-full h-11 border rounded-md px-3`}
                        placeholder={placeholder}
                    />
                </div>
            </div>
        </div>
    );
};
