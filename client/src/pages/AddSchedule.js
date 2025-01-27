import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Sidebar from '../components/SideBar';
import TextArea from '../components/TextArea';
import FormField  from '../components/FormField';
import BackBtn from '../components/BackBtn';
import SnackBar from '../components/SnackBar';
import DayBtn from '../components/DayBtn';
import RoomDropDown from '../components/RoomDropDown';
import DragDropFiles from '../components/DragDropFiles';
import axios from "axios";
import Loading from './Loading';

export default function AddSchedule() {
    // States for rendering
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    // States for form values
    const [rooms, setRooms] = useState('');
    const [selectRoom, setSelectRoom] = useState('');
    const [eventName, setEventName] = useState('');
    const [eventDesc, setEventDesc] = useState('');
    const [timeStart, setTimeStart] = useState('');
    const [timeEnd, setTimeEnd] = useState('');
    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');
    const [weekday, setWeekday] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFail, setShowFail] = useState(false);
    const [showConflict, setShowConflict] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
    //   const fetchUserData = async () => {
    //     await axios
    //       .get("https://brics-api.vercel.app/api/sign-in/protected", {
    //         withCredentials: true,
    //       })
    //       .then((response) => {
    //         //console.log("User data fetched successfully:");
    //         if (response.data.success !== false) {
    //           if(response.data.userClass === "student_org" || response.data.userClass === "faculty"){
    //             navigate("/unauthorized", { replace: true });
    //           }
    //           // setIsLoggedIn(true);
    //           setUser(response.data);
    //         } else {
    //           navigate("/unauthorized");
    //           // setIsLoggedIn(false);
    //           setUser(null);
    //         }
    //       })
    //       .catch((error) => {
    //         navigate("/unauthorized");
             
    //         setUser(null);
    //         // setIsLoggedIn(false);
    //       });

    //     // setIsLoading(false);
    //   };
    //   fetchUserData();
    if(!window.localStorage.getItem("user") || ["student_org","faculty"].includes(JSON.parse(window.localStorage.getItem("user")).userClass)){
        navigate("/unauthorized", { replace: true });
        setUser(null);
    }else{
        setUser(JSON.parse(window.localStorage.getItem("user")));
    }
    }, []); 

    // Function for rendering
    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Gets rooms to display in dropdown
    useEffect(()=>{
        const getRooms = async () => {
            try{
                const response = await axios.get("https://brics-api.vercel.app/api/rooms/get-all-rooms",{withCredentials: true});
                const newRooms = response.data;
                //console.log(newRooms);
                setRooms(newRooms);
                setIsLoading(false);
            } catch (error){
                //console.log(error);
                // An error occured snackbar
            }
        }
        getRooms();
    },[]);

    // Condition for rendering when screen width is small
    const MarginLeft = screenWidth < 1024 ? '40px' : '295px';

    // Event Handler for selecting a room
    const handleRoomSelect = (room) => {
        setSelectRoom(room);
    }

    // Event handler for cancel button
    const handleCancel = () => {
        // Clear forms
        setSelectRoom('');
        setEventName('');
        setEventDesc('');
        setTimeStart('');
        setTimeEnd('');
        setDateStart('');
        setDateEnd('');
        setWeekday([]);
    }

    // Event handler for creating a new schedule
    async function handleCreateSchedule(e){
        //console.log('Create schedule button has been clicked.');
        //console.log(weekday);

        e.preventDefault();
        setIsLoading(true);

        const classSched = {
            "eventName": eventName,
            "description": eventDesc,
            "type": "Class Schedule",
            "reservationDate": new Date().toISOString(),
            "recurrencePattern": {
              "frequency": "weekly",
              "interval": 1,
              "dayOfWeek": weekday,
              "startDate": dateStart,
              "endDate": dateEnd
            },
            "timeStart": timeStart,
            "timeEnd": timeEnd,
            "userEmail": user.email,
            "isDeleted": false,
            "rooms": [selectRoom._id]
          }
        // console.log(classSched);

        try{
            const response = await axios.post('https://brics-api.vercel.app/api/schedule/create-schedule', classSched,{withCredentials: true});
            if(response.status===200){
                // Clear fields
                handleCancel();

                // Remove loading screen
                setIsLoading(false);
            
                // Show Snackbar
                setShowSuccess(true);

                // Optionally, you can set a timeout to hide the Snackbar after a certain duration
                setTimeout(() => {
                    setShowSuccess(false);
            }, 3000); // Hide after 3 seconds
            }  
        }catch(error){
            setIsLoading(false);
        //   console.log(error.status);
            if(error.response.status===409){
              setShowConflict(true);
              setTimeout(() => {
                setShowConflict(false);
              }, 3000); // Hide after 3 seconds
            }else{
              setShowFail(true);

              setTimeout(() => {
                  setShowFail(false);
              }, 3000); // Hide after 3 seconds
            //console.log(error);
        }}
    };

    // Form field constraints
    const eventNameField = {
        label: "Event Title/Course Title",
        guide: null,
        placeholder: "e.g. CMSC 128 Lecture",
        icon: null
    }

    const eventDescField = {
        label: "Event Description",
        guide: null,
        placeholder: "e.g. CMSC 128 Lecture is fun!",
        icon: null
    }

    const timeStartField = {
        label: "From Time",
        guide: null,
        icon: null,
        type: "time"
    }

    const timeEndField = {
        label: "To Time",
        guide: null,
        icon: null,
        type: "time"
    }

    const dateStartField = {
        label: "From Date",
        guide: null,
        icon: null,
        type: "date",
    }

    const dateEndField = {
        label: "To Date",
        guide: null,
        icon: null,
        type: "date"
    }

    const snackSuccess = {
        alertMessage: "New schedule has been added!", // add room name here
        alertIcon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg>
    }

    const snackFail = {
        alertMessage: "Oh no, something went wrong!",
        alertIcon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
    }

    const snackConflict = {
      alertMessage: "Schedule conflict! This time slot is already taken.",
      alertIcon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
    }

    // Drag & Drop CSV File
    const [files, setFiles] = useState(null);

    function handleDrop(event) {
        event.preventDefault();
        setFiles(prevFiles => {
            if (prevFiles) {
                return [...prevFiles, ...event.dataTransfer.files]
            } else {
                return event.dataTransfer.files
            }
        });
    }

    function handleUpload(event) {
        setFiles(prevFiles => {
            if (prevFiles) {
                return [...prevFiles, ...event.target.files]
            } else {
                return event.target.files
            }
        });
    }

    const dragDropFilesProps = {
        handleDrop: handleDrop,
        handleUpload: handleUpload,
        files: files,
        setFiles: setFiles
    }

    return(
        <div>
            <Sidebar/>
            {isLoading ? (
                <div style={{marginLeft: MarginLeft }}>
                    <Loading />
                </div>
            ) : (
            <div className='flex-col'>
                {/* Page header */}
                <div className='flex mt-3' style={{marginLeft: MarginLeft }}>
                    {/* <button type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-brics-blue hover:bg-brics-blue hover:text-white disabled:opacity-50 disabled:pointer-events-none">
                        <svg className='size-10' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                    </button> */}
                    <BackBtn/>
                    <div className='flex-col ml-5'>
                        <h1 className="text-3xl font-bold text-brics-blue text-left">Add Class Schedule</h1>
                        <h2 className="text-lg text-gray-500 text-left">Enter information about event/class</h2>
                    </div>
                </div>
                {/* End of Page Header */}
                {/* Start of Form */}
                <div className='flex flex-col mt-3 mr-10'style={{marginLeft: MarginLeft }}>
                    <div className='flex flex-col w-full'>
                        <h2 className='font-bold text-left mb-2'> Room </h2>
                        <RoomDropDown 
                            field={rooms} 
                            value={selectRoom} 
                            setValue={setSelectRoom}
                            onRoomSelect={handleRoomSelect} />
                        <div className='mt-3'>
                            <FormField field={eventNameField} value={eventName} setValue={setEventName}/>
                        </div>
                    </div>
                    <div className='flex w-full mt-3'>
                        <div className='flex w-1/2'> 
                            <TextArea field={eventDescField} value={eventDesc} setValue={setEventDesc}/>
                        </div>
                        <div className='flex flex-col w-1/2 ml-6'>
                            <div className='flex space-x-3'>
                                <FormField field={timeStartField} value={timeStart} setValue={setTimeStart}/>
                                <FormField field={timeEndField} value={timeEnd} setValue={setTimeEnd}/>
                            </div>
                            <div className='flex mt-3 space-x-3'>
                                <FormField field={dateStartField} value={dateStart} setValue={setDateStart}/>
                                <FormField field={dateEndField} value={dateEnd} setValue={setDateEnd}/>
                            </div>
                            <h2 className='font-bold text-left mt-3 mb-2'> Weekdays (Select none if one-time event) </h2>
                            <div className='flex mt-3 space-x-3'>
                                <DayBtn icon={"Mo"} value={weekday} setValue={setWeekday}/>
                                <DayBtn icon={"Tu"} value={weekday} setValue={setWeekday}/>
                                <DayBtn icon={"We"} value={weekday} setValue={setWeekday}/>
                                <DayBtn icon={"Th"} value={weekday} setValue={setWeekday}/>
                                <DayBtn icon={"Fr"} value={weekday} setValue={setWeekday}/>
                                <DayBtn icon={"Sa"} value={weekday} setValue={setWeekday}/>
                            </div>
                        </div>
                    </div>
                    <div className="px-8 text-left mt-5 flex flex-col items-start">
                        <p className="text-xl font-bold mb-2">Attach files here (optional)</p>
                        <DragDropFiles {...dragDropFilesProps}/>
                    </div>
                    <div className='flex w-full justify-between mt-3 mb-10'>
                        <button type="button" onClick={handleCancel} className="w-full mr-6 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-white text-gray-500 text-center border-gray-500 hover:bg-white hover:border-brics-blue hover:text-brics-blue disabled:opacity-50 disabled:pointer-events-none justify-center">
                            Cancel
                        </button>
                        <button type="submit" onClick={(e)=>handleCreateSchedule(e)} className="w-full mr-6 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-brics-blue text-white text-center hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none justify-center">
                            Create Schedule
                        </button>
                        {/* Snackbar */}
                        {showSuccess && <SnackBar field={snackSuccess} />}
                        {showFail && <SnackBar field={snackFail} />}
                        {showConflict && <SnackBar field={snackConflict}/>}
                    </div>
                </div>
                {/* End of Form */}
            </div>
            )}
        </div>
    );
}