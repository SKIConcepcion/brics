import React, { useRef } from 'react';
import DropIcon from "../assets/drag_and_drop.png";
import axios from "axios";

export default function DragpDropImage({ handleUpload, handleDrop, pictures, setPictures }) {
    // Refs for file input and drag-and-drop area
    const inputRef = useRef();
    const dropAreaRef = useRef();

    // Opens new tab to view image
    const handleSeeImage = (imageLink) => {
        // console.log("Going to "+imageLink)
        window.open(imageLink, '_blank');
    };

    // Function to delete a file upload
    const handleDelete = async (index, imageLink) => {
        const newUploads = [...pictures];
        newUploads.splice(index, 1);
        setPictures(newUploads);
        console.log("IMAGE LINK TO BE DELETED");
        console.log(imageLink);
        try {
            // Delete file from cloudenary
            const response = await axios.post(
                "https://brics-api.vercel.app/api/delete-file",
                { file: imageLink } 
            );
            // console.log(response.data);
        } catch (error) {
            // console.error("Error deleting file:", error);
        }
    };

    // Function to handle drag over
    const handleDragOver = (event) => {
        event.preventDefault();
    };

    // Function to trigger file input click
    const handleBrowseClick = () => {
        inputRef.current.click();
    };

    return (
        <div className="flex flex-col bg-white border shadow-sm rounded-lg w-full">
            {/* Drag and Drop Area */}
            <div className="w-full rounded-t-lg border border-dashed border-brics-blue bg-blue-50" ref={dropAreaRef}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={handleBrowseClick}
            >
                <div className="p-10 text-center w-full flex flex-col items-center space-y-2">
                    <img src={DropIcon} className="size-10" alt="Drag and drop icon" />
                    <input type="file" multiple style={{ display: 'none' }} onChange={handleUpload} ref={inputRef} />
                    <p>Drop images here or <b className="text-blue-500 cursor-pointer">browse</b>.</p>
                    <p className="text-gray-500">SVG, PNG, JPG, or GIF (max. 800x400px)</p>
                </div>
            </div>
            {/* File Uploading Progress Form */}
            {/* Body */}
            <div className="p-4 md:p-5 space-y-7">
                {/* Conditional rendering of uploaded files or placeholder */}
                {pictures && pictures.length > 0 ? (
                    // Mapping through uploaded files
                    pictures.map((file, index) => (
                        <div key={index}>
                            {/* Uploading File Content */}
                            <div className="mb-2 flex justify-between items-center">
                                <div className="flex items-center gap-x-3">
                                    <button type="button" onClick={() => handleSeeImage(file)} className='flex flex-col size-8 mr-1 ml-1 px-4 justify-center items-center font-semibold rounded-lg border hover:border-transparent hover:text-white hover:bg-brics-blue disabled:opacity-50 disabled:pointer-events-none'>
                                        <svg className="flex-shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                            <polyline points="17 8 12 3 7 8"></polyline>
                                            <line x1="12" x2="12" y1="3" y2="15"></line>
                                        </svg>
                                    </button>
                                    <div>
                                        {file.name ? (
                                            <div>
                                                <p className="text-sm font-medium text-gray-800">{file.name}</p>
                                                <p className="text-xs text-gray-500">{file.size}</p> 
                                            </div>
                                        ) : ( 
                                            <p className="text-sm font-medium text-gray-800">Image {index}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="inline-flex items-center gap-x-2">
                                    {/* Delete button */}
                                    <button className="text-gray-500 hover:text-gray-800" onClick={() => handleDelete(index,file)}>
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
                        </div>
                    ))
                ) : (
                    // Placeholder for no uploaded files
                    <div className="text-gray-500 text-center">Uploaded files will be shown here.</div>
                )}
            </div>
            {/* End Body */}
        </div>
    );
}