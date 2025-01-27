import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/SideBar";
import BackBtn from "../components/BackBtn";
import { MapPin, UsersRound, Computer, CircleDollarSign } from "lucide-react";
import ScheduleTile from "../components/ScheduleTile";
import SnackBar from "../components/SnackBar";
import Alert from "../components/Alert";
import AmenitiesIcon from "../components/AmenitiesIcon";
import { useNavigate } from "react-router-dom";
import Loading from "../pages/Loading";
// import PhotoViewer from '../components/PhotoViewer.js';

export default function RoomDetails() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const { id } = useParams(); // get room id from URL parameters
  // console.log("ROOM ID:", id);
  const [room, setRoom] = useState(null); // state to store room details
  const [loading, setLoading] = useState(true); //  loading state
  const [isLoading, setIsLoading] = useState(true);
  const [schedules, setSchedules] = useState([]); // state to store schedules
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const navigate = useNavigate();

  const handleDeleteClick = () => {
    setShowDeleteAlert(true);
  };

  const handleDeleteAction = async () => {
    try {
      await axios.delete(
        `https://brics-api.vercel.app/api/rooms/delete-room/${id}`, {withCredentials: true,}
      );
      setSnackbarMessage("Room deleted successfully");
      setSnackbarOpen(true);
      navigate("/room-management");
    } catch (error) {
      setSnackbarMessage("Failed to delete room");
      setSnackbarOpen(true);
    }
  };

  const computerAmen = room && {
    label: "Computer",
    // value: room.computerCount,
    value: 2,
    icon: (
      <svg
        className="m-auto size-10"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="14" x="2" y="3" rx="2" />
        <line x1="8" x2="16" y1="21" y2="21" />
        <line x1="12" x2="12" y1="17" y2="21" />
      </svg>
    ),
  };

  const micAmen = room && {
    label: "Microphone",
    value: room.mic,
    icon: (
      <svg
        className="m-auto size-10"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12" />
        <circle cx="17" cy="7" r="5" />
      </svg>
    ),
  };

  const speakerAmen = room && {
    label: "Speaker",
    value: room.speakers,
    icon: (
      <svg
        className="m-auto size-10"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <rect width="16" height="20" x="4" y="2" rx="2" />
        <path d="M12 6h.01" />
        <circle cx="12" cy="14" r="4" />
        <path d="M12 14h.01" />
      </svg>
    ),
  };

  const projectorAmen = room && {
    label: "Projector",
    value: room.hasProjector,
    icon: (
      <svg
        className="m-auto size-10"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 7 3 5" />
        <path d="M9 6V3" />
        <path d="m13 7 2-2" />
        <circle cx="9" cy="13" r="3" />
        <path d="M11.83 12H20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2.17" />
        <path d="M16 16h2" />
      </svg>
    ),
  };

  const podiumAmen = room && {
    label: "Podium",
    value: room.hasPodium,
    icon: (
      <svg
        className="m-auto size-10"
        fill="currentColor"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M19.79,7.13A1,1,0,0,0,19,6.75H8v-.5A2,2,0,0,1,9.46,4.33a1.5,1.5,0,0,0,1,.42h1a1.5,1.5,0,0,0,0-3h-1a1.49,1.49,0,0,0-1.17.57A4,4,0,0,0,6,6.25v.5H5a1,1,0,0,0-.79.38A1,1,0,0,0,4,8l.62,2.49A3,3,0,0,0,7.1,12.71l.78,7H7a1,1,0,0,0,0,2H17a1,1,0,0,0,0-2h-.88l.78-7a3,3,0,0,0,2.45-2.23L20,8A1,1,0,0,0,19.79,7.13ZM14.1,19.75H9.9l-.78-7h5.76ZM17.41,10a1,1,0,0,1-1,.76H7.56a1,1,0,0,1-1-.76L6.28,8.75H17.72Z" />
      </svg>
    ),
  };

  const wifiAmen = room && {
    label: "WiFi ",
    value: room.hasWifi,
    icon: (
      <svg
        className="m-auto size-10"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 20h.01" />
        <path d="M2 8.82a15 15 0 0 1 20 0" />
        <path d="M5 12.859a10 10 0 0 1 14 0" />
        <path d="M8.5 16.429a5 5 0 0 1 7 0" />
      </svg>
    ),
  };

  // Function for rendering
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const getRoomDetails = async () => {
      try {
        const response = await axios.get(
          `https://brics-api.vercel.app/api/rooms/get-room/${id}`, {withCredentials: true,}
        );
        const room = response.data;
        setRoom(room);
        setLoading(false); // set loading to false after room details are fetched
      } catch (error) {
        // console.error("There was an error!", error);
      }
    };

    getRoomDetails();
  }, [id]);

  useEffect(() => {
    const getSchedules = async () => {
      try {
        // get schedules
        const response = await axios.get(
          `https://brics-api.vercel.app/api/schedule/get-schedule-by-room-id/${id}`, {withCredentials: true,}
        );
        const schedules = response.data.schedules; // access schedules from response data

        setSchedules(schedules);
        setIsLoading(false);
        // console.log(schedules);
      } catch (error) {
        setIsLoading(false);
        // console.error("There was an error!", error);
      }
    };

    getSchedules();
  }, [id]);

  // if (loading) {
  //   // if loading is true, render loading message
  //   return <Loading />;
  // }

  const MarginLeft = screenWidth < 1024 ? "40px" : "295px";
  // render room details
  return (
    <div>
      <Sidebar />
      {loading ? (
        <div style={{marginLeft: MarginLeft }}>
              <Loading />
          </div>
      ) : (
      <div className="flex" style={{ height: 1080 }}>
      <div
        className="flex-col w-full mr-10 h-full justify-center items-center"
        style={{ marginLeft: MarginLeft }}
      >
        <div className="flex  mt-3 mb-6 justify-between">
          <div className="flex">
            <BackBtn />
            <div className="flex-col ml-5 mt-3">
              <h1
                className="text-3xl font-bold text-brics-blue"
              >
                {room.name}
              </h1>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <button
              className="bg-brics-blue text-white text-sm rounded-lg px-4 py-1 h-8"
              style={{ fontFamily: "Satoshi-regular" }}
              onClick={() => navigate("/edit-room", { state: { room } })}
            >
              Edit Room
            </button>
            <button
              className="bg-red-500 text-white text-sm rounded-lg px-4 py-1 h-8"
              style={{ fontFamily: "Satoshi-regular" }}
              onClick={handleDeleteClick}
            >
              Delete Room
            </button>
          </div>
        </div>
        <div className=" flex justify-center items-center flex-wrap gap-16">
          {room.pictures.map((picture, index) => (
            <div
              key={index}
              className="w-96 bg-cover bg-center relative border rounded-lg"
              style={{ backgroundImage: `url(${picture})` }}
            >
              <div style={{ paddingTop: "66.66%" }}></div>
            </div>
          ))}
        </div>
        {/* <div className=' flex justify-center items-center flex-wrap my-5' style={{gap: '32px', flex: '1 0 0'}}>
                    {dummyPictures.map((picture, index) => (
                        <div key={index} className="w-80 bg-cover bg-center relative" style={{ backgroundImage: `url(${picture})` }}>
                            <div style={{ paddingTop: '66.66%' }}></div>
                        </div>
                    ))}
                </div> */}

        <div className="flex flex-col border border-blue-500 rounded-lg border-opacity-100 my-5">
          <h1
            style={{ fontFamily: "Satoshi-regular", fontSize: 24, fontWeight: 800 }}
            className="px-2 my-5"
          >
            {room.name}
          </h1>
          <div className="flex justify-center">
            <hr className="border-gray-200 w-3/4" />
          </div>
          <div className="flex justify-between mx-4">
            <div className="flex w-64 align-middle justify-center">
              <MapPin size="50" className="mt-3 ml-2" />
              <div>
                <h1
                  style={{
                    fontFamily: "Satoshi-regular",
                    fontSize: 12,
                    fontWeight: 400,
                  }}
                  className="px-2 my-5"
                >
                  Floor {room.floorLevel}, {room.building}, {room.landmark}
                </h1>
              </div>
            </div>
            <div className="flex w-64 align-middle justify-center">
              <CircleDollarSign size="30" className="mt-5 ml-2" />
              <div className="flex flex-col my-5">
                <h1
                  style={{
                    fontFamily: "Satoshi-regular",
                    fontSize: 12,
                    fontWeight: 400,
                  }}
                  className="px-2"
                >
                  Reservation Fee
                </h1>
                <h1
                  style={{
                    fontFamily: "Satoshi-regular",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                  className="px-2"
                >
                  {room.reservationFee} PHP / Hour
                </h1>
              </div>
            </div>
            <div className="flex w-64 align-middle justify-center">
              <Computer size="30" className="mt-5 ml-2" />
              <div className="flex flex-col my-5">
                <h1
                  style={{
                    fontFamily: "Satoshi-regular",
                    fontSize: 12,
                    fontWeight: 400,
                  }}
                  className="px-2"
                >
                  Computer Fee
                </h1>
                <h1
                  style={{
                    fontFamily: "Satoshi-regular",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                  className="px-2"
                >
                  {room.computerFee} PHP / Hour
                </h1>
              </div>
            </div>
            <div className="flex w-64 align-middle justify-center">
              <UsersRound size="30" className="mt-5 ml-2" />
              <div className="flex flex-col my-5">
                <h1
                  style={{
                    fontFamily: "Satoshi-regular",
                    fontSize: 12,
                    fontWeight: 400,
                  }}
                  className="px-2"
                >
                  Seating Capacity
                </h1>
                <h1
                  style={{
                    fontFamily: "Satoshi-regular",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                  className="px-2"
                >
                  {room.seatingCapacity} people
                </h1>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between my-5 p-5">
            <div className="flex flex-col w-1/3 pr-2">
              <h1
                style={{
                  fontFamily: "Satoshi-regular",
                  fontSize: 24,
                  fontWeight: 600,
                  padding: 10,
                }}
              >
                {" "}
                Room Description{" "}
              </h1>
              <p>{room.roomDesc}</p>
            </div>
            <div className="flex flex-col w-2/3 ">
              <h1
                style={{
                  fontFamily: "Satoshi-regular",
                  fontSize: 24,
                  fontWeight: 600,
                  padding: 10,
                }}
              >
                {" "}
                Amenities{" "}
              </h1>
              {loading ? (
                <p>Loading amenities...</p> // replace this with your loading spinner or message
              ) : (
                <div className="flex flex-row flex-wrap justify-start -mt-5 w-full">
                  <div className="transform scale-75">
                    <AmenitiesIcon field={computerAmen} />
                  </div>
                  <div className="transform scale-75">
                    <AmenitiesIcon field={micAmen} />
                  </div>
                  <div className="transform scale-75">
                    <AmenitiesIcon field={speakerAmen} />
                  </div>
                  <div className="transform scale-75">
                    <AmenitiesIcon field={projectorAmen} />
                  </div>
                  <div className="transform scale-75">
                    <AmenitiesIcon field={podiumAmen} />
                  </div>
                  <div className="transform scale-75">
                    <AmenitiesIcon field={wifiAmen} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col border rounded-md border-blue-500 border-opacity-100 my-5 p-5">
          <div className="flex w-full justify-between align-middle content-center">
            <h1
              style={{
                fontFamily: "Satoshi-regular",
                fontSize: 24,
                fontWeight: 600,
                padding: 10,
              }}
            >
              {" "}
              Class Schedules{" "}
            </h1>
            <button
              className="bg-brics-blue text-white text-sm rounded-lg px-4 py-1 h-8"
              style={{ fontFamily: "Satoshi-regular" }}
              onClick={() => navigate("/add-sched", { state: { room } })}
            >
              Add Schedule
            </button>
          </div>
          {isLoading ? (
            <Loading />
          ) : (
              schedules.every(schedule => schedule.isDeleted) ? (
                <div className="text-center text-xl text-blue-500">
                  This room has no schedules.
                </div>
              ) : (
                schedules.map((schedule, index) => {
                  if (!schedule.isDeleted) {
                    return <ScheduleTile key={index} schedule={schedule} room={room} />;
                  }
                  return null;
                })
              )
            )}
        </div>
        {showDeleteAlert && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
            <Alert
              actionText="Delete"
              headerText="Are you sure you want to delete this room?"
              descriptionText="This action cannot be undone."
              onCancel={() => setShowDeleteAlert(false)}
              onAction={handleDeleteAction}
              hasCheckboxes={false}
            />
          </div>
        )}
        {snackbarOpen && (
          <SnackBar
            field={{
              alertMessage: snackbarMessage,
              alertIcon: null, // replace with your icon if you have one
            }}
          />
        )}
      </div>
      </div>
      )}
    </div>
  );
}
