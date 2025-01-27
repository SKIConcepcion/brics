import LOGO from "../assets/logo-navbar.png";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../pages/Loading";
import Cookies from "js-cookie";
// import Toast from "./Toast";

export const Navbar = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const fetchUserData = async () => {
      if(!window.localStorage.getItem("user")){
        await axios
        .get("https://brics-api.vercel.app/api/sign-in/protected", {
          withCredentials: true,
        })
        .then((response) => {
          // console.log("User data fetched successfully in Nav bar:");
          if (response.data.success !== false) {
            setIsLoggedIn(true);
            window.localStorage.setItem("user",JSON.stringify(response.data));
            setUser(response.data);
          } else {
            setIsLoggedIn(false);
            setUser(null);
          }
        })
        .catch((error) => {
          setUser(null);
          setIsLoggedIn(false);
        });
      }else{
        setIsLoggedIn(true);
        setUser(JSON.parse(window.localStorage.getItem("user")));
      }
      

      setLoading(false);
    };
    fetchUserData();
    }, []); // Empty dependency array to run the effect only once


  const handleLogout = async () => {
    await axios
      .get("https://brics-api.vercel.app/api/sign-in/logout", {
        withCredentials: true,
      })
      .then({})
      .catch((error) => {
        // console.error("Error Logging out:", error);
      });
    setUser(null);
    setIsLoggedIn(false);
    Cookies.remove("connect.sid");
    window.localStorage.removeItem("user");
    navigate("/");
  };

  if (loading && (user === undefined || user === null)) {
    return Loading();
  }
  return (
    <div>
      <div className="fixed top-0 z-50 bg-brics-blue h-16 w-screen px-6 flex flex-row drop-shadow-2xl">
        <div
          className=" m-auto flex flex-row"
          onClick={() => {
            navigate("/");
          }}
        >
          <img
            src={LOGO}
            className="size-8 ml-6 mr-3 place-self-center"
            alt="BRICS Logo"
          />
          <button className="text-white tracking-wide text-xl font-bold mr-5">
            BRICS
          </button>
        </div>

        <div className="flex flex-row m-5 justify-left space-x-6">
          <button
            className="text-white text-sm"
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </button>
          <button
            className="text-white text-sm"
            onClick={() => {
              navigate("/browsing-room");
            }}
          >
            Rooms
          </button>
          <button
            className="text-white text-sm"
            onClick={() => {
              navigate("/reservation-policy");
            }}
          >
            Policies
          </button>
          {isLoggedIn === false ? (
            <button
              className="text-white text-sm"
              onClick={() => {
                navigate('/inquiry', { state: {}})
              }}
            >
              Inquire
            </button>
          ) : (
            <button
              className="text-white text-sm"
              onClick={() => {
                navigate("/reservation");
              }}
            >
              Reservations
            </button>
          )}
        </div>

        <div className="m-auto flex flex-auto">{/* empty space */}</div>

        <div className="mr-6 place-self-center flex flex-row">
          {isLoggedIn === false ? (
            <button
              className="text-white bg-[#60A5FA] rounded-lg px-3 py-1 mr-3 hover:bg-white hover:text-brics-blue"
              onClick={() => navigate("/guest-reservation-details")}
            >
              Track Reservation
            </button>
          ) : (
            <button
              className="text-white bg-[#60A5FA] rounded-lg px-3 py-1 mr-3 hover:bg-white hover:text-brics-blue"
              onClick={() => navigate("/track-reservation")}
            >
              Track Reservations
            </button>
          )}

          {isLoggedIn === true ? (
            <button
              className="text-white bg-brics-blue rounded-lg px-3 py-1 flex flex-row hover:bg-white hover:text-brics-blue"
              onClick={() => {
                handleLogout();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-user mr-1"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Log out
            </button>
          ) : (
            <button
              className="text-white bg-brics-blue rounded-lg px-3 py-1 flex flex-row hover:bg-white hover:text-brics-blue"
              onClick={() => {
                navigate("/log-in");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-user mr-1"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Log in
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
// )

export default Navbar;
