import React, { useState } from 'react';

export const FileUploadProg = () => {
    // State for managing file uploads
    const [uploads, setUploads] = useState([]);

    // Function to delete a file upload
    const handleDelete = (index) => {
        const newUploads = [...uploads];
        newUploads.splice(index, 1);
        setUploads(newUploads);
    };

    return (
        <div className="flex flex-col bg-white border shadow-sm rounded-lg w-full">
            {/* File Uploading Progress Form */}
            {/* Body */}
            <div className="p-4 md:p-5 space-y-7">
                {/* Conditional rendering of uploaded files or placeholder */}
                {uploads.length > 0 ? (
                    // Mapping through uploaded files
                    uploads.map((file, index) => (
                        <div key={index}>
                            {/* Uploading File Content */}
                            <div className="mb-2 flex justify-between items-center">
                                <div className="flex items-center gap-x-3">
                                    <span className="size-8 flex justify-center items-center border border-gray-200 text-gray-500 rounded-lg">
                                        <svg className="flex-shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                            <polyline points="17 8 12 3 7 8"></polyline>
                                            <line x1="12" x2="12" y1="3" y2="15"></line>
                                        </svg>
                                    </span>
                                    <div>
                                        <p className="text-sm font-medium text-gray-800">{file.name}</p>
                                        <p className="text-xs text-gray-500">{file.size}</p>
                                    </div>
                                </div>
                                <div className="inline-flex items-center gap-x-2">
                                    {/* Delete button */}
                                    <button className="text-gray-500 hover:text-gray-800" onClick={() => handleDelete(index)}>
                                        <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M3 6h18"></path>
                                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                            <line x1="10" x2="10" y1="11" y2="17"></line>
                                            <line x1="14" x2="14" y1="11" y2="17"></line>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            {/* Progress Bar */}
                            <div className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden" role="progressbar" aria-valuenow={file.progress} aria-valuemin="0" aria-valuemax="100">
                                <div className="flex flex-col justify-center rounded-full overflow-hidden bg-teal-500 text-xs text-white text-center whitespace-nowrap transition duration-500" style={{width: `${file.progress}%`}}></div>
                            </div>
                        </div>
                    ))
                ) : (
                    // Placeholder for no uploaded files
                    <div className="text-gray-500 text-center">Uploaded files will be shown here.</div>
                )}
            </div>
            {/* End Body */}
            {/* Footer */}
            {/* <div className="bg-gray-50 border-t border-gray-200 rounded-b-lg py-2 px-4 md:px-5 w-full">
                <div className="flex flex-wrap justify-between items-center gap-x-3">
                    <div>
                        <span className="text-sm font-semibold text-gray-800">
                            {uploads.filter(upload => upload.progress === 100).length} success, {uploads.filter(upload => upload.progress !== 100).length} failed
                        </span>
                    </div>
                </div>
            </div> */}
            {/* End Footer */}
        </div>
    );
}

export default FileUploadProg;
