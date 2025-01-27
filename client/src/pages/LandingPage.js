import React, { useContext, useEffect, useRef, useState} from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Carousel from "../components/LandingCarousel";
import "../styles/LandingPage.css";
import LOGO from "../assets/logo-landing.png";
import ICS from "../assets/ics.jpg";
import { motion } from "framer-motion";
import axios from "axios";
import Loading from "./Loading";
import Toast from '../components/Toast';

import { useNavigate } from "react-router-dom";
import LandingCarousel from "../components/LandingCarousel";

export default function LandingPage() {
//   const { user, setUser } = useContext(UserContext);
  // console.log("User in Landing",user);
  // console.log("isLogged in Landing",isLogged);
//   const userClass = window.globalUserClass;
  
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  


  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoggedInToast, setShowLoggedInToast] = useState(false);
    useEffect(() => {
      // const fetchUserData = async () => {
      //   await axios
      //     .get("https://brics-api.vercel.app/api/sign-in/protected", {
      //       withCredentials: true,
      //     })
      //     .then((response) => {
      //       // console.log("User data fetched successfully:");
      //       if (response.data.success !== false) { 
      //         if(response.data.userClass == "admin1" || response.data.userClass == "admin2" || response.data.userClass == "admin3"){
      //           navigate("/reservation-management", { replace: true });
      //         }
      //         setIsLoggedIn(true);
      //         setShowLoggedInToast(true);
      //         setUser(response.data);
      //       } else {
      //         setIsLoggedIn(false);
      //         setUser(null);
      //       }
      //     })
      //     .catch((error) => {
      //       setUser(null);
      //       setIsLoggedIn(false);
      //     });
        
      //   setIsLoading(false);
      // };

      // fetchUserData();
      if(!window.localStorage.getItem("user")){
        setIsLoggedIn(false);
        setUser(null);
      }else{
        setIsLoggedIn(true);
        // Check if the toast has been shown before
        const hasShownToast = window.localStorage.getItem("hasShownLoggedInToast");
        if (!hasShownToast) {
          // If the toast hasn't been shown, set the state to show it
          setShowLoggedInToast(true);
          // Also, set a flag in localStorage to indicate that the toast has been shown
          window.localStorage.setItem("hasShownLoggedInToast", "true");
        }
        setUser(JSON.parse(window.localStorage.getItem("user")));
      }
    }, []); 

  // const images = [ICS, ICS, ICS];

  const sectionRef = useRef(null);
  const scrollToSection = (sectionId) => {
    const sectionRef = document.getElementById(sectionId);
    if (sectionRef) {
        const headerOffset = 100; 
        const elementPosition = sectionRef.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
};

  const handleCloseToast = () => {
    setShowLoggedInToast(false); // Close the success toast
  };
  
  const [showToTopButton, setShowToTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowToTopButton(true);
      } else {
        setShowToTopButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-backgroundColor h-full w-screen"
      id="top"
    >
      <Navbar />
      <div className="flex flex-row items-center px-2 my-10 py-10" id="main">
        <div className="flex flex-col ml-10 mr-10">
          <div className="flex flex-row" id="logo-top">
            <motion.img
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              src={LOGO}
              className="size-16 mr-3"
              alt="BRICS Logo"
            />
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="text-[#3B82F6] text-6xl font-bold mb-6"
            >
              <motion.span
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                B
              </motion.span>
              <motion.span
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
              >
                R
              </motion.span>
              <motion.span
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 1 }}
              >
                I
              </motion.span>
              <motion.span
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
              >
                C
              </motion.span>
              <motion.span
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 1 }}
              >
                S
              </motion.span>
            </motion.h1>
          </div>
          <div className="flex flex-col place-self-center" id="brics-top">
          <motion.h1
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl font-medium text-left mb-4 mt-9"
          >
            The Booking and Reservation System of Institute of Computer Science
          </motion.h1>            
          <motion.p
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="text-lg text-left font-medium mb-4"
          >
            For booking lecture halls and computer laboratories
          </motion.p>
            <button className="mt-9 text-white bg-[#3B82F6] p-3 w-32 text-lg font-bold rounded-lg" onClick={() => scrollToSection('process-section')}>See Process</button>
          </div>
        </div>
        <div className="w-2/5 mr-10 rounded-lg">
          <LandingCarousel />
        </div>
      </div>

      <div className="items-center pl-2 pr-8 mt-20 w-screen" id="reservation">
            <h2 className="text-3xl text-[#3B82F6] mb-20 font-bold" id="process-section">Reservation Process</h2>
            <div className="pt-5 pb-14 place-content-center flex flex-row-reverse">
              <button id="diamond-btn" 
                      className="uppercase p-5 order-6" 
                      onClick={() => scrollToSection('section-1')}>
                        <div className="rotate-45">
                          <div className="rounded-full bg-white w-5 h-5 mx-auto mb-5 text-sm text-brics-blue">1</div>
                          Browse Venues
                        </div>
              </button>
              <button id="diamond-btn" 
                      className="uppercase p-5 order-5" 
                      onClick={() => scrollToSection('section-2')}>
                        <div className="rotate-45">
                          <div className="rounded-full bg-white w-5 h-5 mx-auto mb-5 text-sm text-brics-blue">2</div>
                          Submit Request
                        </div>
              </button>
              <button id="diamond-btn" 
                      className="uppercase p-5 order-4" 
                      onClick={() => scrollToSection('section-3')}>
                        <div className="rotate-45">
                          <div className="rounded-full bg-white w-5 h-5 mx-auto mb-5 text-sm text-brics-blue">3</div>
                          Wait for Approval
                        </div>
              </button>
              <button id="diamond-btn" 
                      className="uppercase p-5 order-3" 
                      onClick={() => scrollToSection('section-4')}>
                        <div className="rotate-45">
                          <div className="rounded-full bg-white w-5 h-5 mx-auto mb-5 text-sm text-brics-blue">4</div>
                          Upload Payment
                        </div>
              </button>
              <button id="diamond-btn" 
                      className="uppercase p-5 order-2" 
                      onClick={() => scrollToSection('section-5')}>
                        <div className="rotate-45">
                          <div className="rounded-full bg-white w-5 h-5 mx-auto mb-5 text-sm text-brics-blue">5</div>
                          Wait for Confirmation
                        </div>
              </button>
              <button id="diamond-btn" 
                      className="uppercase p-5 order-1" 
                      onClick={() => scrollToSection('section-6')}>
                        <div className="rotate-45">
                          <div className="rounded-full bg-white w-5 h-5 mx-auto mb-5 text-sm text-brics-blue">6</div>
                          Venue Secured
                        </div>
              </button>
            </div>
            <div className="flex justify-center items-center">

            <div className="mx-16 mb-20 w-3/5 mt-20">
              <div className="text-left mb-16 p-12 rounded-lg shadow-md">
              <svg class="lucide lucide-square-dashed-mouse-pointer size-24 float-left mr-5 text-brics-blue" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3a2 2 0 0 0-2 2"/><path d="M19 3a2 2 0 0 1 2 2"/><path d="m12 12 4 10 1.7-4.3L22 16Z"/><path d="M5 21a2 2 0 0 1-2-2"/><path d="M9 3h1"/><path d="M9 21h2"/><path d="M14 3h1"/><path d="M3 9v1"/><path d="M21 9v2"/><path d="M3 14v1"/></svg>
              {/* <img src={ICS} className="float-left size-24 rounded-md ml-10 mr-10 place-self-center mr-5" alt="Photo of the Physical Sciences Building" /> */}
                <h3 className="text-xl text-[#3B82F6] font-bold" id="section-1">Browse Venues</h3>
                <p className="text-justify">Begin by browsing through the available venues and checking the information such as seating capacity, amenities (projectors, speakers, computer count, podium, and microphones), availability on date and time, price, and images of the venue.</p>
              </div>
              <div className="text-left mb-10 p-12 rounded-lg shadow-md">
              <svg class="lucide lucide-send size-24 float-left mr-5 text-brics-blue" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
              {/* <img src={ICS} className="float-left size-24 rounded-md ml-10 mr-10 place-self-center mr-5" alt="Photo of the Physical Sciences Building" /> */}
                <h3 className="text-xl text-[#3B82F6] font-bold" id="section-2">Submit Request</h3>
                <p className="text-justify">Upon finding the venue that accommodates the user’s needs, the next step is to determine the time and date of the reservation before sending the reservation request. A letter of intent should also be uploaded along with the request. Users can also track the reservation process by going to the reservations screen page and selecting the reservation that the user wishes to inspect.</p>
              </div>
              <div className="text-left mb-16 p-12 rounded-lg shadow-md">
              <svg class="lucide lucide-bookmark-check size-24 float-left mr-5 text-brics-blue" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z"/><path d="m9 10 2 2 4-4"/></svg>
              {/* <img src={ICS} className="float-left size-24 rounded-md ml-10 mr-10 place-self-center mr-5" alt="Photo of the Physical Sciences Building" /> */}
                <h3 className="text-xl text-[#3B82F6] font-bold" id="section-3">Wait for Approval</h3>
                <p className="text-justify">After the user has sent a reservation request to their preferred room/s, this would then be reflected in the admin’s console where the user would have to wait for review and approval from the administrator of the system.</p>
              </div>
              <div className="text-left mb-16 p-12 rounded-lg shadow-md">
              <svg class="lucide lucide-file-up size-24 float-left mr-5 text-brics-blue" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M12 12v6"/><path d="m15 15-3-3-3 3"/></svg>
              {/* <img src={ICS} className="float-left size-24 rounded-md ml-10 mr-10 place-self-center mr-5" alt="Photo of the Physical Sciences Building" /> */}
                <h3 className="text-xl text-[#3B82F6] font-bold" id="section-4">Upload Payment</h3>
                <p className="text-justify">Upon approval from the system administrator, the reservation status would then proceed to the second step in which the user would have to upload proof of payment in order to finalize booking for the selected room/s.</p>
              </div>
              <div className="text-left mb-16 p-12 rounded-lg shadow-md">
              <svg class="lucide lucide-loader size-24 float-left mr-5 text-brics-blue" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/><path d="m16.2 16.2 2.9 2.9"/><path d="M12 18v4"/><path d="m4.9 19.1 2.9-2.9"/><path d="M2 12h4"/><path d="m4.9 4.9 2.9 2.9"/></svg>
              {/* <img src={ICS} className="float-left size-24 rounded-md ml-10 mr-10 place-self-center mr-5" alt="Photo of the Physical Sciences Building" /> */}
                <h3 className="text-xl text-[#3B82F6] font-bold" id="section-5">Wait for Confirmation</h3>
                <p className="text-justify">Once the user has successfully uploaded the proof of payment, they would then have to wait for the system administration to either confirm or reject the reservation. In the event that the admin rejects the reservation request, then the user can simply submit a new reservation request at any time.</p>
              </div>
              <div className="text-left mb-16 p-12 rounded-lg shadow-md">
              <svg class="lucide lucide-calendar-check size-24 float-left mr-5 text-brics-blue" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="m9 16 2 2 4-4"/></svg>
              {/* <img src={ICS} className="float-left size-24 rounded-md ml-10 mr-10 place-self-center mr-5" alt="Photo of the Physical Sciences Building" /> */}
                <h3 className="text-xl text-[#3B82F6] font-bold" id="section-6">Venue Secured</h3>
                <p className="text-justify">Once the system administration approves the reservation request, then the venue is officially reserved for the user on the given date and time during the request process.</p>
              </div>
            </div>
          </div>
        </div>
        <div className={`fixed bottom-16 right-16 ${showToTopButton ? '' : 'hidden'}`}>
          <button className="bg-brics-blue hover:bg-[white] float-right rounded-full p-3 m-5 shadow-lg"
                  onClick={() => scrollToSection('top')}>
          <svg className="text-white size-10 lucide lucide-arrow-up-to-line hover:text-brics-blue" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3h14"/><path d="m18 13-6-6-6 6"/><path d="M12 7v14"/></svg>
          </button>
        </div>
          <Footer />
          {showLoggedInToast && (
                <div className="fixed bottom-10 right-10">
                    <Toast text={"You are now logged in as " + user.nickname} onClose={handleCloseToast}  />
                </div>
            )}
        </motion.div>
      );
}
