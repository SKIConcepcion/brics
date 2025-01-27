import React, { useState, useEffect } from 'react';

export const Toast = ({ text, onClose }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        console.log("Toast component mounted");
        const timer = setTimeout(() => {
            console.log("Toast timeout expired, hiding toast");
            setVisible(false);
            onClose(); // Call onClose to notify the parent component that the toast is closed
        }, 5000); // Set timeout for 5 seconds

        // Clear the timeout if the component is unmounted before the timeout expires
        return () => clearTimeout(timer);
    }, [onClose]);

    const handleClose = () => {
        console.log("Close button clicked, hiding toast");
        setVisible(false);
        onClose(); // Call onClose to notify the parent component that the toast is closed
    };

    return (
        <div className={`max-w-md bg-blue-900 text-base text-white rounded-lg shadow-lg ${visible ? '' : 'hidden'}`} role="alert">
            <div className="flex p-4">
                <div className="flex-shrink-0 flex justify-center items-center mr-2 border border-white rounded-full w-6 h-6">
                    <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                        <path fillRule="evenodd" d="M8.293 13.707a1 1 0 0 1-1.414 0L3 10.414l1.414-1.414 3.879 3.879 7.793-7.793L16.293 6.5l-7 7a1 1 0 0 1-1.414 0z" clipRule="evenodd" />
                    </svg>
                </div>

                <div className="flex-grow pl-2 pr-4 text-left">
                    {text}
                </div>
                <div className="flex-shrink-0">
                    <button type="button" className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 rounded-lg text-white hover:text-white opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100" onClick={handleClose}>
                        <span className="sr-only">Close</span>
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                            <path fillRule="evenodd" d="M6 6 14 14" clipRule="evenodd"></path>
                            <path fillRule="evenodd" d="M6 14 14 6" clipRule="evenodd"></path>
                        </svg>

                    </button>
                </div>
            </div>
        </div>
    );
};

export default Toast;
