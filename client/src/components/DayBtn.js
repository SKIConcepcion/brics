import React from 'react';

export default function DayBtn({ icon, value, setValue }) {
    const handleClick = () => {
        const dayOfWeek = getDayOfWeek(icon);
        const updatedValue = value.includes(dayOfWeek)
            ? value.filter(day => day !== dayOfWeek)
            : [...value, dayOfWeek];
        setValue(updatedValue);
    };

    const getDayOfWeek = (icon) => {
        switch (icon) {
            case "Mo":
                return 0; // Monday
            case "Tu":
                return 1; // Tuesday
            case "We":
                return 2; // Wednesday
            case "Th":
                return 3; // Thursday
            case "Fr":
                return 4; // Friday
            case "Sa":
                return 5; // Saturday
            default:
                return null;
        }
    };

    return (
        <div className='flex h-12'>
            <button
                type="button"
                className={`flex flex-col w-12 hs-collapse-toggle mr-1 ml-1 inline-flex items-center justify-center text-sm font-bold rounded-full border hover:border-transparent hover:text-white hover:bg-brics-blue disabled:opacity-50 disabled:pointer-events-none 
                    ${value.includes(getDayOfWeek(icon)) && value.length > 0 ? 'border-transparent text-white bg-brics-blue' : 'border-gray-500 bg-white text-gray-500'}`}
                onClick={handleClick}
            >
                {icon}
            </button>
        </div>
    );
}
