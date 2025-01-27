import React, { useState,useEffect } from 'react';
import LOGO from "../assets/logo_white.png";
import { useNavigate, useLocation } from 'react-router-dom';

import axios from 'axios';
// import Loading from '../pages/Loading';
import Cookies from 'js-cookie';
// import { set } from 'date-fns';


export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    // const [loading, setLoading] = useState(true);

    const [user, setUser] = useState(null);
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const fetchUserData = async () => {
            console.log(!window.localStorage.getItem("user"));
            if(!window.localStorage.getItem("user")){
                await axios
                .get("https://brics-api.vercel.app/api/sign-in/protected", {
                withCredentials: true,
                })
                .then((response) => {
                // console.log("User data fetched successfully in Nav bar:");
                if (response.data.success !== false) {
                    // setIsLoggedIn(true);
                    window.localStorage.setItem("user",JSON.stringify(response.data));
                    setUser(response.data);
                    console.log(user);
                } else {
                    // setIsLoggedIn(false);
                    setUser(null);
                }
                })
                .catch((error) => {
                    setUser(null);
                //   setIsLoggedIn(false);
                });

            //   setLoading(false);
            }else{
                setUser(JSON.parse(window.localStorage.getItem("user")));
            }
            
        };
        // console.log(user.userClass)

        fetchUserData();
        }, []);
  

    const handleLogout = async () => {
        await axios
            .get("https://brics-api.vercel.app/api/sign-in/logout", {
            withCredentials: true,
            })
            .then({})
            .catch((error) => {
            console.error("Error Logging out:", error);
            });
        setUser(null);
        // setIsLoggedIn(false);
        Cookies.remove("connect.sid");
        window.localStorage.removeItem("user");
        navigate("/");
    };

    // Function to check current path
    const isActive = (path) => {
        // console.log(location.pathname);
        return location.pathname === path;
    }


    return (
        <div>
            {/* <!-- Breadcrumb --> */}
            <div className=" sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 md:px-8 lg:hidden">
                <div className="flex justify-between items-center py-2" style={{ fontFamily: 'Satoshi-regular' }}>
                    {/* <!-- Breadcrumb --> */}
                    <ol className="ms-3 flex items-center whitespace-nowrap">
                    <li className="flex items-center text-base text-brics-blue font-bold">
                        
                        <svg className="flex-shrink-0 mx-3 overflow-visible size-2.5 text-gray-900" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </li>
                    <li className="text-base font-semibold text-gray-800 truncate" aria-current="page">
                        
                    </li>
                    </ol>
                    {/* <!-- End Breadcrumb --> */}

                    {/* <!-- Sidebar --> */}
                    <button type="button" className=" top-0 right-0 py-2 px-3 flex justify-center items-center gap-x-1.5 text-xs rounded-lg border border-gray-200 text-gray-500 hover:text-gray-600" data-hs-overlay="#application-sidebar" aria-controls="application-sidebar" aria-label="Sidebar">
                    <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8L21 12L17 16M3 12H13M3 6H13M3 18H13"/></svg>
                    <span className="sr-only">Sidebar</span>
                    </button>
                    {/* <!-- End Sidebar --> */}
                </div>
            </div>
            {/* <!-- End Breadcrumb --> */}

            {/* <!-- Sidebar --> */}
            <div id="application-sidebar" className="hs-overlay [--auto-close:lg]
            hs-overlay-open:translate-x-0
            -translate-x-full transition-all duration-300 transform
            w-[260px]
            hidden
            fixed inset-y-0 start-0 z-[60]
            bg-brics-blue 
            lg:block lg:translate-x-0 lg:end-auto lg:bottom-0
            ">
            <div className="px-8 pt-4" style={{ fontFamily: 'Satoshi-regular' }}>
                {/* <!-- Sidebar Header --> */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <img src={LOGO} className="w-10 h-auto ml-0 mr-2" alt="BRICS Logo" />
                        <button className="text-white text-2xl font-medium" onClick={()=>
                        {
                            navigate("/reservation-management")
                        }}>BRICS</button>
                    </div>
                    <div className="rounded-full bg-white py-0.5 px-2.5">
                        <p className="text-brics-blue text-xs font-bold">ADMIN</p>
                    </div>
                </div>
                {/* <!-- End of Sidebar Header --> */}
            </div>
            {/* <!-- Sidebar Menu --> */}
            <nav className="hs-accordion-group p-6 w-full flex flex-col flex-wrap" data-hs-accordion-always-open style={{ fontFamily: 'Satoshi-regular' }}>
                <ul className="space-y-1.5">
                    <li>
                        <button className={`flex w-full items-center gap-x-3.5 py-2 px-2.5 ${isActive("/admin-calendar") ? "bg-white text-brics-blue" : "bg-brics-blue text-white"} rounded-lg hover:bg-white hover:text-brics-blue`} onClick={() =>
                            {
                                navigate("/admin-calendar")
                            }}>
                        <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
                            Calendar
                        </button>
                    </li>

                    <li>
                        <button className={`flex w-full text-left items-center gap-x-3.5 py-2 px-2.5 ${isActive("/reservation-management") ? "bg-white text-brics-blue" : "bg-brics-blue text-white"} rounded-lg hover:bg-white hover:text-brics-blue`} onClick={() =>
                            {
                                navigate("/reservation-management")
                            }}>
                        <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><path d="m9 9.5 2 2 4-4"/></svg>
                            Reservations
                        </button>
                    </li>
                
                    <li className="hs-accordion" id="account-accordion">
                        <button type="button" className={`hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg ${isActive('/room-management') || isActive('/add-room') || isActive('/edit-room') || isActive('/add-sched') || isActive('/edit-sched') ? 'bg-white text-brics-blue' : 'bg-brics-blue text-white'} hover:bg-white hover:text-brics-blue`} >
                            <svg className="flex-shrink-0 mt-0.5 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"/><path d="M2 20h20"/><path d="M14 12v.01"/></svg>
                                Rooms
                            <svg className="hs-accordion-active:block ms-auto hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                            <svg className="hs-accordion-active:hidden ms-auto block size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                        </button>

                        <div id="account-accordion-child" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden">
                            <ul className="pt-2 ps-2">
                                <li>
                                    <button className={`flex w-full items-center gap-x-3.5 py-2 px-2.5 text-sm ${isActive("/room-management") ? "bg-white text-brics-blue" : "bg-brics-blue text-white"} rounded-lg hover:bg-white hover:text-brics-blue`} onClick={()=>
                                        {
                                            navigate("/room-management")
                                        }}>
                                        Manage Rooms
                                    </button>
                                </li>
                                <li>
                                    <button className={`flex w-full items-center gap-x-3.5 py-2 px-2.5 text-sm ${isActive("/add-room") ? "bg-white text-brics-blue" : "bg-brics-blue text-white"} rounded-lg hover:bg-white hover:text-brics-blue`} onClick={()=>
                                        {
                                            navigate("/add-room")
                                        }}>
                                        Add Room
                                    </button>
                                </li>
                                <li>
                                    <button className={`flex w-full items-center gap-x-3.5 py-2 px-2.5 text-sm ${isActive("/edit-room") ? "bg-white text-brics-blue" : "bg-brics-blue text-white"} rounded-lg hover:bg-white hover:text-brics-blue`} onClick={()=>
                                        {
                                            navigate("/edit-room")
                                        }}>
                                        Edit Room
                                    </button>
                                </li>
                                <li>
                                    <button className={`flex w-full items-center gap-x-3.5 py-2 px-2.5 text-sm ${isActive("/add-sched") ? "bg-white text-brics-blue" : "bg-brics-blue text-white"} rounded-lg hover:bg-white hover:text-brics-blue`} onClick={()=>
                                        {
                                            navigate("/add-sched")
                                        }}>
                                        Add Schedule
                                    </button>
                                </li>
                                <li>
                                    <button className={`flex w-full items-center gap-x-3.5 py-2 px-2.5 text-sm ${isActive("/edit-sched") ? "bg-white text-brics-blue" : "bg-brics-blue text-white"} rounded-lg hover:bg-white hover:text-brics-blue`} onClick={()=>
                                        {
                                            navigate("/edit-sched")
                                        }}>
                                        Edit Schedule
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </li>

                    <li className="hs-accordion" id="account-accordion">
                        <button type="button" className={`hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg ${isActive('/registration-requests') || isActive('/user-accounts') ? 'bg-white text-brics-blue' : 'bg-brics-blue text-white'} hover:bg-white hover:text-brics-blue`} >
                            <svg className="flex-shrink-0 mt-0.5 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="15" r="3"/><circle cx="9" cy="7" r="4"/><path d="M10 15H6a4 4 0 0 0-4 4v2"/><path d="m21.7 16.4-.9-.3"/><path d="m15.2 13.9-.9-.3"/><path d="m16.6 18.7.3-.9"/><path d="m19.1 12.2.3-.9"/><path d="m19.6 18.7-.4-1"/><path d="m16.8 12.3-.4-1"/><path d="m14.3 16.6 1-.4"/><path d="m20.7 13.8 1-.4"/></svg>
                                Users
                            <svg className="hs-accordion-active:block ms-auto hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                            <svg className="hs-accordion-active:hidden ms-auto block size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                        </button>

                        <div id="account-accordion-child" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden">
                            <ul className="pt-2 ps-2">
                                <li>
                                    <button className={`flex w-full items-center gap-x-3.5 py-2 px-2.5 text-sm ${isActive("/registration-requests") ? "bg-white text-brics-blue" : "bg-brics-blue text-white"} rounded-lg hover:bg-white hover:text-brics-blue`} onClick={()=>
                                        {
                                            navigate("/registration-requests")
                                        }}>
                                        Registration Requests
                                    </button>
                                </li>
                                <li>
                                    <button className={`flex w-full items-center gap-x-3.5 py-2 px-2.5 text-sm ${isActive("/user-accounts") ? "bg-white text-brics-blue" : "bg-brics-blue text-white"} rounded-lg hover:bg-white hover:text-brics-blue`} onClick={()=>
                                        {
                                            navigate("/user-accounts")
                                        }}>
                                        User Accounts
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </li>

                    <li className="hs-accordion" id="projects-accordion">
                        <button type="button" className={`hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg ${isActive('/report-summary') || isActive('/report-activity-log') ? 'bg-white text-brics-blue' : 'bg-brics-blue text-white'} hover:bg-white hover:text-brics-blue`}>
                            <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                                Reports
                            <svg className="hs-accordion-active:block ms-auto hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                            <svg className="hs-accordion-active:hidden ms-auto block size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                        </button>

                        <div id="projects-accordion-child" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden">
                            <ul className="pt-2 ps-2">
                                <li>
                                    <button className={`flex w-full items-center gap-x-3.5 py-2 px-2.5 text-sm ${isActive("/report-summary") ? "bg-white text-brics-blue" : "bg-brics-blue text-white"} rounded-lg hover:bg-white hover:text-brics-blue`} onClick={()=>
                                        {
                                            navigate("/report-summary")
                                        }}>
                                        Report Summary
                                    </button>
                                </li>
                                <li>
                                    <button className={`flex w-full items-center gap-x-3.5 py-2 px-2.5 text-sm ${isActive("/report-activity-log") ? "bg-white text-brics-blue" : "bg-brics-blue text-white"} rounded-lg hover:bg-white hover:text-brics-blue`} onClick={()=>
                                        {
                                            navigate("/report-activity-log")
                                        }}>
                                        Activity Log
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <button className="flex w-full items-center gap-x-3.5 py-2 px-2.5 bg-brics-blue text-sm text-white rounded-lg hover:bg-white hover:text-brics-blue" onClick={()=>
                        {
                            handleLogout();
                        }}>
                        <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                            Log Out
                        </button>
                    </li>
                </ul>
            </nav>
            {/* <!-- End of Sidebar Menu --> */}
            </div>
            {/* <!-- End of Sidebar --> */}
        </div>
    );
};

