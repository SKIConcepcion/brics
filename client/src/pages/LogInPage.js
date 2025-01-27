import React from "react"; // Removed useContext and useState since they are not used
import transparent_wide from "../assets/icon_transparent_newcolor.png";
import bigPic from "../assets/physciv2.jpg";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import BackBtn from "../components/BackBtn";

function Notice() {
  const navigate = useNavigate();

  const gradientOverlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.5), rgba(255, 255, 255, 0.5))',
    zIndex: 1,
    pointerEvents: 'none', // Makes sure the overlay doesn't interfere with any interactions
  };

  const linkHoverStyle = `
    .hover-underline-animation {
      position: relative;
      display: inline-block;
      color: #3b82f6;
      font-weight: bold;
      cursor: pointer;
      text-decoration: none; /* Remove the initial underline */
    }
    
    .hover-underline-animation::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 2px;
      bottom: 0;
      left: 0;
      background-color: #3b82f6;
      transform: scaleX(0);
      transform-origin: bottom right;
      transition: transform 0.25s ease-out;
    }
    
    .hover-underline-animation:hover::after {
      transform: scaleX(1);
      transform-origin: bottom left;
    }
  `;

  return (
    <div className="relative">
      <style>{linkHoverStyle}</style>
      <div className="absolute top-0 left-0 z-10">
        <BackBtn />
      </div>

      <form>
        <div className="flex flex-row h-screen relative">
          <div className="flex h-full w-3/5 relative">
            <img
              src={bigPic}
              alt="Email Logo"
              className="object-cover w-full h-full"
            />
            <div style={gradientOverlayStyle}></div>
          </div>

          <div className="flex flex-col items-center justify-center w-2/5 py-5 px-4 sm:px-6">
            <div className="mt-24 max-w-xl w-full space-y-0">
              <img src={transparent_wide} alt="Logo" className="mx-auto h-40" />
            </div>

            <div className="text-center text-4xl text-blue-500 p-12 font-bold">
              Welcome to Booking and Reservation System of Institute of Computer Science
            </div>
            <div className="mt-6 text-center text-lg text-gray-500">
              This app is currently in alpha phase.
            </div>

            <div className="m-14">
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => {
                    window.location.href = "https://brics-api.vercel.app/api/sign-in/google";
                  }}
                  className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-8 py-6 text-sm font-medium text-gray-800 hover:bg-brics-blue hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  <svg
                    className="w-6 mr-2"
                    width="800px"
                    viewBox="-0.5 0 48 48"
                    version="1.1"
                  >
                    <title>Google-color</title>
                    <desc>Created with Sketch.</desc>
                    <defs></defs>
                    <g
                      id="Icons"
                      stroke="none"
                      strokeWidth="1"
                      fill="none"
                      fillRule="evenodd"
                    >
                      <g
                        id="Color-"
                        transform="translate(-401.000000, -860.000000)"
                      >
                        <g
                          id="Google"
                          transform="translate(401.000000, 860.000000)"
                        >
                          <path
                            d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                            id="Fill-1"
                            fill="#FBBC05"
                          ></path>
                          <path
                            d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                            id="Fill-2"
                            fill="#EB4335"
                          ></path>
                          <path
                            d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                            id="Fill-3"
                            fill="#34A853"
                          ></path>
                          <path
                            d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                            id="Fill-4"
                            fill="#4285F4"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                  <span>Continue with UP Email (up.edu.ph)</span>
                </button>
              </div>
              <div className="p-10">
                <span>
                  No account yet?{" "}
                  <span
                    className="hover-underline-animation"
                    onClick={() => navigate("/sign-up")}
                  >
                    Sign up here.
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Notice;
