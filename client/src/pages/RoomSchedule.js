import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Schedule from "../components/Schedule";
import { AmenitiesIcon } from "../components/AmenitiesIcon";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from 'dayjs';
import axios from 'axios';
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Loading from "./Loading";
import SnackBar from "../components/SnackBar";
import Toast from '../components/Toast';

export default function RoomSchedule() {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [showErrorDates, setShowErrorDates] = useState(false);
    const [showError, setShowError] = useState(false);

    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        // const fetchUserData = async () => {
        // await axios
        //     .get("https://brics-api.vercel.app/api/sign-in/protected", {
        //     withCredentials: true,
        //     })
        //     .then((response) => {
        //     // console.log("User data fetched successfully:");
        //     if (response.data !== "Unauthorized") {
        //         // setIsLoggedIn(true);
        //         setUser(response.data);
        //     } else {
        //         // setIsLoggedIn(false);
        //         setUser(null);
        //     }
        //     })
        //     .catch((error) => {
        //     setUser(null);
        //     // setIsLoggedIn(false);
        //     });

        // setIsLoading(false);
        // };

        // fetchUserData();
        if(!window.localStorage.getItem("user")){
            setUser(null);
        }else{
            setUser(JSON.parse(window.localStorage.getItem("user")));
        }
        setIsLoading(false);
          
    }, []); 

    const location = useLocation();
    const navigate = useNavigate();
    const roomId = location.state && location.state.roomId;
    const [room, setRoom] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState("");
    const [showErrorToast, setShowErrorToast] = useState(false);
    
    // State for managing the currently displayed week
    const [currentWeek, setCurrentWeek] = useState(dayjs());
    const [schedules, setSchedules] = useState([]);
    const [reservations, setReservation] = useState([]);

    const [pictures, setPictures] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [index, setIndex] = useState(-1);

    const goToPreviousWeek = () => {
        setCurrentWeek(prevWeek => prevWeek.subtract(1, 'week'));
    };

    const goToNextWeek = () => {
        setCurrentWeek(prevWeek => prevWeek.add(1, 'week'));
    };

    
    useEffect(() => {
        async function fetchSchedules() {
            try {
                const response = await axios.get(`https://brics-api.vercel.app/api/rooms/get-reservations-schedules/${roomId}`,{withCredentials: true});
                //console.log("response", response);
                if (response.status === 200){
                    const scheduleData = response.data.schedules;
                    setSchedules(scheduleData)
                    const reservationData = response.data.reservations;
                    setReservation(reservationData)
                } else {
                    throw new Error('Failed to fetch schedules');
                }
            } catch (error) {
                //console.error('Error fetching schedules:', error);
            }
        }

        fetchSchedules();
    }, [roomId]);

    useEffect(() => {
        async function fetchRoom() {
            try {
                const response = await axios.get(`https://brics-api.vercel.app/api/rooms/get-room/${roomId}`,{withCredentials: true});
                //console.log("response", response);
                if (response.status === 200) {
                    const roomData = response.data;
                    setRoom(roomData);
                    setPictures(roomData.pictures);
                } else {
                    throw new Error('Failed to fetch room');
                }
            } catch (error) {
                //console.error('Error fetching room:', error);
            }
        }

        fetchRoom();
    }, [roomId]);
    
    useEffect(() => {
      const fetchImageDimensions = async () => {
        const imagesData = await Promise.all(
          pictures.map(
            (url, index) =>
              new Promise((resolve) => {
                const img = new Image();
                img.src = url;
                img.onload = () => {
                  const { width, height } = fitInsideContainer(img.width, img.height, 800, 600); // Set maxWidth and maxHeight here
                  resolve({ id: index, src: url, width, height });
                };
              })
          )
        );
        // console.log("Fetched image data:", imagesData);
        setPhotos(imagesData);
      };
  
      fetchImageDimensions();
    }, [pictures]);
  
    // Function to calculate dimensions to fit inside a container while maintaining aspect ratio
    const fitInsideContainer = (imgWidth, imgHeight, maxWidth, maxHeight) => {
      const aspectRatio = imgWidth / imgHeight;
      let width = maxWidth;
      let height = maxHeight;
      if (aspectRatio > 1) {
        height = maxWidth / aspectRatio;
      } else {
        width = maxHeight * aspectRatio;
      }
      return { width, height };
    };  

    if (!room) {
        return Loading();
    }

    const snackDates = {
        alertMessage: "Please add a start date and an end date.",
        alertIcon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
    }

    const snackError = {
        alertMessage: "Something went wrong. Please check your cart.",
        alertIcon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
    }

    // add room to cart
    const handleReserve = async (e) => {
        e.preventDefault();

        if (startDate && endDate && room) {
            const roomDetails = {
                roomId: room._id, 
                startDate: startDate,
                endDate: endDate,
                name: room.name,
                location: "Floor " + room.floorLevel + " " + room.building,
                pictures: room.pictures,
                reservationFee: room.reservationFee
            }

            try {
                setIsLoading(true);
                //console.log("roomDetails ", roomDetails);
                const response = await axios.post("https://brics-api.vercel.app/api/cart/rooms/add-room", { "email": user.email, "rooms": roomDetails},{withCredentials: true});
                //console.log("cart ", response);

                // navigate to reservation page
                navigate("/reservation");
            } catch(error) {
                setIsLoading(false);
                const errorMessage = error.response.data.message;
                //console.log(errorMessage);

                // alert(errorMessage);
                setShowError(true);
      
                // Optionally, you can set a timeout to hide the Snackbar after a certain duration
                setTimeout(() => {
                    setShowError(false);
                }, 3000); // Hide after 3 seconds
            }
        } else {
            //alert("Please add a start date and an end date.");
            setShowErrorDates(true);
          
//             setShowErrorToast(true);
            
        }

    };
    

    const handleCloseToast = () => {
        setShowErrorToast(false); // Close the reject toast
    };

    const computerAmen = {
        label: "Computer",
        value: room.computerCount || 0,
        icon: <svg className="m-auto size-10" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>
    }

    const micAmen = {
        label: "Microphone",
        value: room.mic || 0,
        icon: <svg className="m-auto size-10" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12"/><circle cx="17" cy="7" r="5"/></svg>
    }

    const speakerAmen = {
        label: "Speaker",
        value: room.speakers || 0,
        icon: <svg className="m-auto size-10" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><path d="M12 6h.01"/><circle cx="12" cy="14" r="4"/><path d="M12 14h.01"/></svg>
    }

    const projectorAmen = {
        label: "Projector",
        value: room.hasProjector || false,
        icon: <svg className="m-auto size-10" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 7 3 5"/><path d="M9 6V3"/><path d="m13 7 2-2"/><circle cx="9" cy="13" r="3"/><path d="M11.83 12H20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2.17"/><path d="M16 16h2"/></svg>
    }

    const podiumAmen = {
        label: "Podium",
        value: room.hasPodium || false,
        icon: <svg className="m-auto size-10" fill="currentColor" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19.79,7.13A1,1,0,0,0,19,6.75H8v-.5A2,2,0,0,1,9.46,4.33a1.5,1.5,0,0,0,1,.42h1a1.5,1.5,0,0,0,0-3h-1a1.49,1.49,0,0,0-1.17.57A4,4,0,0,0,6,6.25v.5H5a1,1,0,0,0-.79.38A1,1,0,0,0,4,8l.62,2.49A3,3,0,0,0,7.1,12.71l.78,7H7a1,1,0,0,0,0,2H17a1,1,0,0,0,0-2h-.88l.78-7a3,3,0,0,0,2.45-2.23L20,8A1,1,0,0,0,19.79,7.13ZM14.1,19.75H9.9l-.78-7h5.76ZM17.41,10a1,1,0,0,1-1,.76H7.56a1,1,0,0,1-1-.76L6.28,8.75H17.72Z"/></svg>
    }

    const wifiAmen = {
        label: "WiFi ",
        value: room.hasWifi || true,
        icon: <svg className="m-auto size-10" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.859a10 10 0 0 1 14 0"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/></svg>
    }

    if(isLoading){
        return Loading();
    }

    return (
        <div className="bg-backgroundColor h-full w-screen">
        <Navbar />
        <div className="h-20"></div>
        <div className="flex flex-col items-center px-2 mb-10 py-10" id="main">
            <div className="w-11/12">
                <PhotoAlbum layout="rows" photos={photos} onClick={({ index: current }) => setIndex(current)} 
                renderPhoto={({ photo, wrapperStyle, renderDefaultPhoto }) => (
                    <div style={{ position: "relative", ...wrapperStyle }}>
                      <div
                        style={{
                          borderRadius: "8px",
                          overflow: "hidden",
                        }}
                      >
                        {renderDefaultPhoto({ wrapped: true })}
                      </div>
                    </div>
                  )}/>
                <Lightbox
                    slides={photos}
                    open={index >= 0}
                    index={index}
                    close={() => setIndex(-1)}
                    plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
                />  
            </div>
            
            <div className="border-2 border-brics-blue items-start w-11/12 my-10 mx-10 rounded-lg p-3 text-left">
                <h3 className="text-2xl ml-5 font-bold">{room.name}</h3>
                <hr className="m-4">
                </hr>
                <div className="flex flex-row mx-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin mr-3"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    <p className="">Floor {room.floorLevel}<br></br><p className="mt-1"></p>{room.building}</p>
                <div className="flex flex-auto"></div>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users mr-3"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    <p className="mr-3">Seating Capacity<br></br><p className="mt-1 text-[#909090] font-bold">{room.seatingCapacity}</p></p>
                <div className="flex flex-auto"></div>    
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar mr-3"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
                    <p className="">Reservation Fee<br></br>
                    {room.reservationFee !== 0 ? 
                        <p className="mt-1 text-[#909090] font-bold">Php {room.reservationFee}.00</p> 
                        : <p className="mt-1 text-[#909090]font-bold">N/A</p>
                    }</p>
                <div className="flex flex-auto"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock-4 mr-3"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    <p className="">Computer Fee <br></br>
                        {room.computerFee !== 0 ? 
                        <p className="mt-1 text-[#909090] font-bold">Php {room.computerFee}.00</p> 
                        : <p className="mt-1 text-[#909090] font-bold">N/A</p>
                    }</p>
                </div>
                
            </div>
            
            <div className="w-11/12 flex flex-row justify-between">
                <div className="flex flex-col w-1/3 m-4">
                        <h3 className="text-left font-bold my-5 text-xl">Description</h3>
                        <p className="text-justify">
                            {room.roomDesc}
                        </p>
                </div>
                <div className="flex flex-col w-full md:w-3/4 m-4">
                    <h3 className="text-left font-bold my-5 text-xl">Amenities</h3>
                    <div className="flex flex-wrap justify-evenly">
                        <AmenitiesIcon field={computerAmen} />
                        <AmenitiesIcon field={micAmen} />
                        <AmenitiesIcon field={speakerAmen} />
                        <AmenitiesIcon field={projectorAmen} />
                        <AmenitiesIcon field={wifiAmen} />
                        <AmenitiesIcon field={podiumAmen} />
                    </div>
                </div>
            </div>
            {/* {console.log(user.userClass)} */}
            {user === undefined || user === null ? (
  <div className="flex justify-end mt-10">
                    <button
                        className="text-satoshi font-bold text-brics-blue bg-white border border-2 border-brics-blue text-sm py-4 px-12 rounded-lg hover:bg-brics-blue hover:text-white hover:border-transparent"
                        onClick={() => {
                            console.log(room);
                            navigate('/inquiry', { state: room})
                        }}
                    >
                        Inquire
                    </button>
                </div>
): (
  <div className="">
    <Schedule currentWeek={currentWeek} roomSchedules={schedules} roomReservations={reservations} userClass={user.userClass}/>
    <div className="px-40 items-center">
        <h3 className="text-3xl font-bold my-10">Select schedule</h3>
    </div>
    <div>
    <form className="w-full flex flex-col items-center">
            <div className="flex flex-row w-full justify-center items-center gap-10">
                <div className="flex flex-row justify-center item-center gap-3">
                    <div className="flex flex-col">
                        <label className="text-gray-800 text-bold" to="startDate">Start Date</label>
                        <input
                            id="startDate"
                            value={startDate}
                            onChange={(e) => {
                                setStartDate(e.target.value);
                            }}
                            type="date"
                            required
                            className="rounded-lg border-gray-300 text-gray-500"
                        ></input>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-800 text-bold" to="endDate">End Date</label>
                        <input
                            id="endDate"
                            value={endDate}
                            onChange={(e) => {
                                setEndDate(e.target.value);
                            }}
                            type="date"
                            required
                            className="rounded-lg border-gray-300 text-gray-500"
                        ></input>
                    </div>
                </div>
                <button
                    onClick={(e) =>
                        handleReserve(e)
                    }
                    className="bg-brics-blue px-12 text-white h-fit py-2 rounded-lg self-end"
                >
                    Add Reservation
                </button>
            </div>
        </form>
    </div>
</div>
)}
        </div>
        {showErrorDates && <SnackBar field={snackDates} />}
        {showError && <SnackBar field={snackError} />}

        <Footer />
        {showErrorToast && (
        <div className="fixed bottom-10 right-10">
            <Toast text="Please add a start date and an end date." onClose={handleCloseToast} success={false} />
        </div>
        )}
        </div> 
        
      );
}