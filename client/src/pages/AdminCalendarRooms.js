import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/SideBar";
import BackBtn from "../components/BackBtn";
import Loading from "../pages/Loading";
import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useNavigate } from "react-router-dom";


// needed for the style wrapper
import styled from "@emotion/styled";

export const StyleWrapper = styled.div`
  .fc-button.fc-button-primary {
    background-color: #fff;
    color: #3b82f6;
    border-radius: 10px;
    border: 2px solid #3b82f6;
    padding-left: 20px; 
    padding-right: 20px; 
    &:hover {
      background-color: #3b82f6;
      color: #fff;
      border-color: #3b82f6;
    }
  },
  .fc-button.fc-button-primary.fc-state-active {
    background-color: #3b82f6 !important;
    color: #fff !important;
    border-color: #3b82f6 !important;
  },
  .fc-toolbar-title {
    fontFamily: "Satoshi-bold";
    color: #3b82f6; // Change the color of the title
    font-weight: bold; // Make the title bold
    font-size: 2rem; // Adjust the font size of the title
  },
  .event-finalized {
    background-color: #3b82f6;
    color: #fff;
  },
  .event-default {
    background-color: #63b3ed;
    color: #fff;
  },
  .fc-day-today {
    background-color: #fff !important;
  }
`;

export default function AdminCalendarRoom() {
  const navigate = useNavigate();
  // const [isLoading, setIsloading] = useState(true);

  const [room, setRooms] = useState(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [loading, setLoading] = useState(true); //  loading state
  const [schedules, setSchedules] = useState([]); // state to store schedules
  const [selectedRoom, setSelectedRoom] = useState(""); // state to store selected room's ID

  const [user, setUser] = useState(null);
  // const [isLoggedIn, //setIsloggedIn] = useState(false);
  useEffect(() => {
    // const fetchUserData = async () => {
    //   await axios
    //     .get("https://brics-api.vercel.app/api/sign-in/protected", {
    //       withCredentials: true,
    //     })
    //     .then((response) => {
    //       // console.log("User data fetched successfully:");
    //       if (response.data !== "Unauthorized") {
    //         //setIsloggedIn(true);
    //         setUser(response.data);
    //       } else {
    //         navigate("/unauthorized", { replace: true });
    //         //setIsloggedIn(false);
    //         setUser(null);
    //       }
    //     })
    //     .catch((error) => {
    //       setUser(null);
    //       //setIsloggedIn(false);
    //     });

    //   setLoading(false);
    // };

    // fetchUserData();
    if(!window.localStorage.getItem("user") || ["student_org","faculty"].includes(JSON.parse(window.localStorage.getItem("user")).userClass)){
      navigate("/unauthorized", { replace: true });
      setUser(null);
    }else{
        setUser(JSON.parse(window.localStorage.getItem("user")));
    }
    setLoading(false);
  }, []); 

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  const convertMongoTypes = (obj) => {
    const newObj = {};
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        const value = obj[key];
        // check if the value is an object and has MongoDB-specific keys
        if (
          typeof value === "object" &&
          ("$numberInt" in value ||
            "$numberLong" in value ||
            "$numberDouble" in value)
        ) {
          // convert MongoDB-specific types to regular JavaScript types
          newObj[key] =
            parseInt(value.$numberInt) ||
            parseInt(value.$numberLong) ||
            parseFloat(value.$numberDouble);
        } else {
          newObj[key] = value;
        }
      }
    }
    return newObj;
  };

  function convertTo24Hour(time) {
    const [timePart, period] = time.split(" ");
    let [hours, minutes] = timePart.split(":");

    if (period === "PM" && hours !== "12") {
      hours = String(Number(hours) + 12);
    } else if (period === "AM" && hours === "12") {
      hours = "00";
    }

    return `${hours}:${minutes}`;
  }

  function renderEventContent(eventInfo) {
    // // Format the start time as a string in the format "HH:mm"
    // const startTime = eventInfo.event.start.toLocaleTimeString("en-US", {
    //   hour: "2-digit",
    //   minute: "2-digit",
    //   meridiem: "short",
    //   hour12: true,
    // });

    // // Format the end time as a string in the format "HH:mm"
    // const endTime = eventInfo.event.end.toLocaleTimeString("en-US", {
    //   hour: "2-digit",
    //   minute: "2-digit",
    //   meridiem: "short",
    //   hour12: true,
    // });

    return (
      <div className="flex flex-row items-center">
        {/* <b>
          {startTime}-{endTime}
        </b> */}
        <i
          style={{
            marginLeft: "5px",
            whiteSpace: "normal",
            overflow: "hidden",
          }}
        >
          {eventInfo.event.title}
        </i>
      </div>
    );
  }

  useEffect(() => {
    const getRooms = async () => {
      try {
        const response = await axios.get(
          "https://brics-api.vercel.app/api/rooms/get-all-rooms", {withCredentials: true,}
        );
        const rooms = response.data.map(convertMongoTypes);
        //console.log(rooms);
        setRooms(rooms);

        // Set selectedRoom to the ID of the first room
        if (rooms.length > 0) {
          setSelectedRoom(rooms[0]._id);
        }
      } catch (error) {
        //console.log(error);
      }
    };
    getRooms();
  }, []);

  useEffect(() => {
    const getSchedules = async () => {
      try {
        // get schedules
        const response = await axios.get(
          `https://brics-api.vercel.app/api/rooms/get-reservations-schedules/${selectedRoom}`, {withCredentials: true,}
        );
        //console.log(response.data);
        const { reservations, schedules } = response.data; // access reservations and schedules from response data

        // Transform reservations into the format that FullCalendar expects
        const reservationsData = reservations.map((reservation) => {
          // Pad the time strings with leading zeros
          const timeStart = reservation.timeStart.padStart(5, "0");
          const timeEnd = reservation.timeEnd.padStart(5, "0");

          return {
            start: new Date(`${reservation.startDate}T${timeStart}`),
            end: new Date(`${reservation.endDate}T${timeEnd}`),
            title: reservation.eventName,
          };
        });
        //console.log("Current Reservations", reservationsData);

        // Transform schedules into the format that FullCalendar expects
        const schedulesData = schedules.map((schedule) => {
          const { recurrencePattern } = schedule;

          // Convert times to 24-hour format
          const startTime = convertTo24Hour(schedule.timeStart);
          const endTime = convertTo24Hour(schedule.timeEnd);

          // Since all schedules are recurring, create a single event with the recurrence pattern
          return {
            title: schedule.eventName,
            daysOfWeek: recurrencePattern.dayOfWeek, // directly use the array of integers
            startTime: startTime,
            endTime: endTime,
            startRecur: recurrencePattern.startDate,
            endRecur: recurrencePattern.endDate,
          };
        });
        //console.log("Current Schedules", schedulesData);
        // Combine reservations and schedules
        const events = [...reservationsData, ...schedulesData];

        setSchedules(events);
        //console.log("Current Events", events);
      } catch (error) {
        //console.error("There was an error!", error);
      }
    };

    if (selectedRoom) {
      getSchedules();
    }
  }, [selectedRoom]); 

  const MarginLeft = screenWidth < 1024 ? "40px" : "295px";

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
        className="flex-col w-full mr-10 mt-3 justify-center items-center"
        style={{ marginLeft: MarginLeft }}
      >
        <div className="flex w-full space-x-4">
          <BackBtn />
          <h1 className="text-3xl font-bold text-brics-blue mt-4">
            Rooms Calendar
          </h1>
        </div>
        <div className="flex w-full my-4 align-middle">
          <h1 className="text-2xl font-bold text-brics-blue mt-4 mx-3">
            Room:{" "}
          </h1>
          {room && (
            <select
              className="mt-4"
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              style={{ borderRadius: "8px", borderColor: "brics-blue" }} // add this line
            >
              {room.map((room, index) => (
                <option key={index} value={room._id}>
                  {room.name}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* <div className="flex w-full h-full bg-slate-300 mt-5 p-5"> */}
        {/* Create a calendar component for the current month with dropdown on the month selected with the calendar created*/}
        <div style={{ fontFamily: "Satoshi-regular" }}>
          {/* insert a weekly calendar component */}
          <StyleWrapper>
            <FullCalendar
              plugins={[timeGridPlugin]}
              initialView="timeGridWeek"
              headerToolbar={{
                left: "prev,next",
                center: "title",
                right: "timeGridWeek,timeGridDay", // user can switch between the two
              }}
              slotDuration={{ hours: 1 }} // Display time slots every hour
              scrollTime="08:00:00" // Scroll to 8am initially
              events={schedules}
              eventContent={renderEventContent}
              weekends={false}
              height={800}
            />
          </StyleWrapper>
        </div>
        {/* </div> */}
      </div>
    </div>
    )}
    </div>
  );
}
