import React, { useState } from 'react';

export default function IconBtn(props) {
    const { label, icon, value } = props;
    const [isActive, setIsActive] = useState(value);

    const handleClick = () => {
        // Toggle the value and notify the parent component
        setIsActive(!isActive);
        props.setValue(!isActive);
    };

    return (
        <div className='flex h-14'>
            <button
                type="button"
                className={`flex flex-col w-14 hs-collapse-toggle mr-1 ml-1 pt-2 px-4 inline-flex items-center font-semibold rounded-lg border hover:border-transparent hover:text-white hover:bg-brics-blue disabled:opacity-50 disabled:pointer-events-none 
                    ${
                    value 
                        ? 'border-transparent text-white bg-brics-blue' 
                        : 'border-gray-500 bg-white text-gray-500'}`}
                id="hs-basic-collapse"
                onClick={handleClick}
            >
                {icon}
                <label className="text-[10px]"><b>{label}</b></label>
            </button>
            {/* {console.log(label+" is "+value)} */}
        </div>
    );
}
