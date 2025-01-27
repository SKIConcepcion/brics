import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/SideBar";
import BackBtn from "../components/BackBtn";
import Loading from "../pages/Loading";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Link } from "react-router-dom";

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
  }
  .fc-toolbar-title {
    fontFamily: "Satoshi-bold";
    color: #3b82f6; // Change the color of the title
    font-weight: bold; // Make the title bold
    font-size: 2rem; // Adjust the font size of the title
  }
  .event-finalized {
    background-color: #3b82f6;
    color: #fff;
  }
  
  .event-default {
    background-color: #63b3ed;
    color: #fff;
  }

  .fc-day-today {
    background-color: #3b82f6 !important;
    color: #fff !important;
  }
`;

export default function AdminCalendar() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  const [user, setUser] = useState(null);
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
      const fetchUserData = async () => {
        if(!window.localStorage.getItem("user")){
        await axios
          .get("https://brics-api.vercel.app/api/sign-in/protected", {
            withCredentials: true,
          })
          .then((response) => {
            // console.log("User data fetched successfully:");
            if (response.data !== "Unauthorized") {
              if(response.data.userClass === "student_org" || response.data.userClass === "faculty"){
                navigate("/unauthorized", { replace: true });
              }
              // setIsLoggedIn(true);
              setUser(response.data);
              window.localStorage.setItem("user",JSON.stringify(response.data));
            } else {
              navigate("/unauthorized", { replace: true });
              // setIsLoggedIn(false);
              setUser(null);
            }
          })
          .catch((error) => {
            navigate("/unauthorized", { replace: true })
            setUser(null);
            // setIsLoggedIn(false);
          });
        }else{
          setUser(JSON.parse(window.localStorage.getItem("user")));
        }
        setIsLoading(false);
      };

      fetchUserData();
      // if(!window.localStorage.getItem("user") || ["student_org","faculty"].includes(JSON.parse(window.localStorage.getItem("user")).userClass)){
      //   navigate("/unauthorized", { replace: true });
      //   setUser(null);
      // }else{
      //     setUser(JSON.parse(window.localStorage.getItem("user")));
      // }
      // setIsLoading(false);
    }, []); 

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  // const [room, setRoom] = useState(null); // state to store room details
  const [reservations, setReservations] = useState([]); // state to store reservations
  const [loading, setLoading] = useState(true); //  loading state
  // const [schedules, setSchedules] = useState([]); // state to store schedules
  // Function for rendering

  function renderEventContent(eventInfo) {
    // Format the start time as a string in the format "HH:mm"
    const startTime = eventInfo.event.start.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      meridiem: "short",
      hour12: true,
    });

    // Format the end time as a string in the format "HH:mm"
    const endTime = eventInfo.event.end.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      meridiem: "short",
      hour12: true,
    });

    // Get the room names
    const roomNames = eventInfo.event.extendedProps.rooms.join(", ");

    // if(isLoading){
    //   return Loading();
    // }

    return (
      <div className="flex flex-col">
        <b>{startTime}-{endTime}</b>
        <i>{eventInfo.event.title}</i>
        <p>{roomNames}</p>
      </div>
    );
  }

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
    const getReservations = async () => {
      try {
        const response = await axios.get(
          "https://brics-api.vercel.app/api/reservations/get-all-reservations", {withCredentials: true}
        );
        const reservations = response.data; // access reservations from response data

        const finalizedReservations = reservations.filter(
          (reservation) => reservation.status === "Finalized"
        );

        // Map over reservations to create events
        const events = finalizedReservations.map((reservation) => ({
          title: reservation.eventName,
          start: new Date(`${reservation.startDate}T${reservation.timeStart}`),
          end: new Date(`${reservation.endDate}T${reservation.timeEnd}`),
          rooms: reservation.rooms.map((room) => room.name), // add the room names here
        }));

        setReservations(events);
        // console.log(events);
        setLoading(false); // set loading to false after reservations are set
      } catch (error) {
        // console.error("There was an error!", error);
        setLoading(false); // also set loading to false if there was an error
      }
    };

    getReservations();
    
  }, []);

  const MarginLeft = screenWidth < 1024 ? "40px" : "295px";
  // render room details
  return (
    <div>
      <Sidebar />
      {isLoading ? (
                <div style={{marginLeft: MarginLeft }}>
                    <Loading />
                </div>
            ) : (
    <div className="flex" style={{ height: 1080 }}>
      <div
        className="flex-col w-full mr-10 mt-3 h-full justify-center items-center"
        style={{ marginLeft: MarginLeft }}
      >
        <div className="flex w-full justify-between">
          <div className="flex">
            <BackBtn />
            <h1 className="text-3xl font-bold text-brics-blue ml-2 mt-4">
              Calendar
            </h1>
          </div>
          <Link to="/admin-calendar/rooms">
            <button className="mt-4 ml-4 bg-brics-blue text-white rounded-lg px-4 py-1 ">
              Rooms Calendar
            </button>
          </Link>
        </div>
        {/* <div className="flex w-full h-full bg-slate-300 mt-5 p-5"> */}
        {/* Create a calendar component for the current month with dropdown on the month selected with the calendar created*/}
        <div style={{ fontFamily: "Satoshi-regular" }}>
          <StyleWrapper>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            weekends={true}
            events={reservations}
            eventClassNames={(info) =>
              info.event.extendedProps.status === "Finalized"
                ? "event-finalized"
                : "event-default"
            }
            headerToolbar={{
              start: 'title',
              center: '',
              end: 'prev,next'
            }}
            eventContent={renderEventContent}
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
