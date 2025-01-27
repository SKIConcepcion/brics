import ICS from "../assets/ics-logo.png";
import CAS from "../assets/cas-logo.png";
import { Link } from 'react-router-dom';
import React from 'react';

const Footer = () => (
    <>
        <style>{`
            .underline-hover {
                position: relative;
                display: inline-block;
            }

            .underline-hover::after {
                content: '';
                position: absolute;
                width: 0;
                height: 1px;
                display: block;
                margin-top: 2px;
                left: 0;
                background: white;
                transition: width 0.3s ease, right 0.3s ease;
            }

            .underline-hover:hover::after {
                width: 100%;
                left: 0;
            }
        `}</style>

        <footer className="bg-blue-500">
            <div className="mx-auto ml-3 w-full max-w-screen-2xl p-2 py-2 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <div className="flex">
                            <a href="https://ics.uplb.edu.ph/" className="flex items-center">
                                <img src={ICS} className="h-16 me-3" alt="ICS Logo" /> 
                            </a>
                            <a href="https://ics.uplb.edu.ph/" className="flex items-center">
                                <img src={CAS} className="h-16 me-3" alt="CAS Logo" />    
                            </a>
                        </div>
                        
                        <div className="sm:flex sm:flex-col sm:items-start sm:mt-3 text-left">
                            <span className="text-left block text-white text-2xl font-semibold mt-2 mb-3 sm:items-start">
                                Institute of Computer Science
                            </span>
                            <p className="text-white text-md flex items-center mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin mr-2">
                                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                                    <circle cx="12" cy="10" r="3"/>
                                </svg>
                                College of Arts and Sciences, UPLB Los Baños Laguna, Philippines 4031
                            </p>
                            <p className="text-white text-md flex items-center mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone mr-2">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                                </svg>
                                (049) 536 2302 | 63-49-536-2302
                            </p>
                            <p className="text-white text-md flex items-center mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail mr-2">
                                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                                </svg>
                                ics.uplb@up.edu.ph
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-8 sm:gap-6 sm:grid-cols-3 text-left">
                        <div>
                            <h2 className="mb-6 text-base font-bold text-white uppercase">QUICK LINKS</h2>
                            <ul className="text-white font-medium">
                                <li className="mb-2">
                                    <Link to="/browsing-room" className="underline-hover">Rooms</Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-base font-bold text-white uppercase">BRICS POLICIES</h2>
                            <ul className="text-white font-medium">
                                <li className="mb-2">
                                    <Link to="/reservation-policy" className="underline-hover">Reservation Policies</Link>
                                </li>
                                <li className="mb-2">
                                    <Link to="/privacy-policy" className="underline-hover">Privacy Policy</Link>
                                </li>
                                <li>
                                    <Link to="/faq" className="underline-hover">FAQs</Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-base font-bold text-white uppercase">SOCIAL MEDIA</h2>
                            <ul className="text-white font-medium">
                                <li className="mb-2">
                                    <a href="https://www.facebook.com/ICS.UPLB" className="underline-hover">Facebook</a>
                                </li>
                                <li className="mb-2">
                                    <a href="https://www.youtube.com/@ics-uplb" className="underline-hover">YouTube</a>
                                </li>
                                <li className="mb-2">
                                    <a href="https://twitter.com/ics_uplb" className="underline-hover">X</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-800 p-2">
                <p className="text-white font-light">Copyright © 2024 BRICS. All rights reserved.</p>
            </div>
        </footer>
    </>
);

export default Footer;
