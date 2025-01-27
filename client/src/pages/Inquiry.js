import FormField from "../components/FormField";
import DragDropFiles from "../components/DragDropFiles";
import DropdownField from "../components/DropdownField";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
import RoomDropDown from "../components/RoomDropDown";
import Footer from "../components/Footer";
import SnackBar from "../components/SnackBar";

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

/*
FIELDS:
    targetVenue - array of values (multiselect option)
    files - array of files (user can upload multiple dropdown files)

    NOTE: all states are updated whenever a user adds an input to the form fields
*/

export default function Inquiry() {
    const navigate = useNavigate();
    const state = useLocation() || { state: {} };
    
    // states to store form values
    const [userName, setUsername] = useState("");
    const [eventName, setEventName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [timeStart, setTimeStart] = useState("");
    const [timeEnd, setTimeEnd] = useState("");
    const [position, setPosition] = useState("");
    const [email, setEmail] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [organization, setOrganization] = useState("");
    const [address, setAddress] = useState("");
    const [schedule, setSchedule] = useState("");
    const [eventDesc, setEventDesc] = useState("");
    const [files, setFiles] = useState(null);
    const [rooms, setRooms] = useState("");
    const [selectRoom, setSelectRoom] = useState(state && state.state ? state.state.name : "Select a room");
    const [isLoading, setIsLoading] = useState(false);
    const [showErrorEmailToast, setShowErrorEmailToast] = useState(false);
    const [showErrorEndTime, setShowErrorEndTime] = useState(false);
    const [showErrorMinutes, setShowErrorMinutes] = useState(false);
    const [showErrorEndDate, setShowErrorEndDate] = useState(false);
    const [showErrorDates, setShowErrorDates] = useState(false);
    const [showCurrTime, setShowCurrTime] = useState(false);
    
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();

    const currentTime = `${currentHour}:${currentMinute}`;

    useEffect(() => {
        const getRooms = async () => {
          try {
            const response = await axios.get(
              "https://brics-api.vercel.app/api/rooms/get-all-rooms",
              { withCredentials: true }
            );
            const newRooms = response.data;
            setRooms(newRooms);
          } catch (error) {
            // Handle error
          }
        };
        getRooms();
    }, []);
    
      const handleDrop = (event) => {
        event.preventDefault();
        setFiles((prevFiles) => {
          if (prevFiles) {
            return [...prevFiles, ...event.dataTransfer.files];
          } else {
            return event.dataTransfer.files;
          }
        });
      };
    
      const handleRoomSelect = (room) => {
        if (room === null || room === undefined) {
          setSelectRoom("Select a room");
        } else {
          setSelectRoom(room);
        }
      };
    
      const handleUpload = (event) => {
        setFiles((prevFiles) => {
          if (prevFiles) {
            return [...prevFiles, ...event.target.files];
          } else {
            return event.target.files;
          }
        });
    }

    const validateEmail = () => {
        return EMAIL_REGEX.test(email);
    };

    async function handleInquire(event){
        event.preventDefault(); 

        /* Validate the email address inputted by guest user, should follow RFC 5322 Format */
        if(!validateEmail()){
            //alert("Email should be a valid email address!");
            setShowErrorEmailToast(true);
            return;
        }
        
        /* Validate the Time */
        if (timeStart > timeEnd || timeStart === timeEnd) {
            //alert("End time should not be earlier or equal to the Start time");
            setShowErrorEndTime(true);
            return;
        }

        if (timeStart.split(':')[1] !== '00' && timeEnd.split(':')[1] !== '00') {
            //alert("Minutes should be in '00', We only reserve by hour");
            setShowErrorMinutes(true);
            return;
        }

        if (timeStart === currentTime || timeEnd === currentTime) {
          // alert("Current time cannot be selected");
          setShowCurrTime(true);
          return;
        } 
        
        /* Validate the Date */
        if (endDate < startDate) {
            //alert("End date should not be earlier than the start date!");
            setShowErrorEndDate(true);
            return;
        }
      
        const currentDate = new Date().toISOString().split("T")[0];
       if (startDate < currentDate || endDate < currentDate) {
            //alert("Dates must not be before the current date!");
            setShowErrorDates(true);
            return;
        }
    
        setIsLoading(true);
        try {
            const response = await axios.post(
                `https://brics-api.vercel.app/api/send-otp`,
                { email: email }
            );
            setIsLoading(false);
            navigate("/email-auth", {
                state: {
                    email,
                    userName,
                    eventName,
                    startDate,
                    endDate,
                    timeStart,
                    timeEnd,
                    position,
                    contactNumber,
                    organization,
                    selectRoom,
                    address,
                    schedule,
                    eventDesc,
                    files,
                },
            });
        } catch (error) {
            setIsLoading(false);
        }
    };
    
      const dragDropFilesProps = {
        handleDrop: handleDrop,
        handleUpload: handleUpload,
        files: files,
        setFiles: setFiles,
      };
    
      const validateStr = (str) => str.trim() !== '';
    
      const validateContactNumber = (contactNumber) => {
        const numericRegex = /^[0-9]+$/;
        return numericRegex.test(contactNumber) && contactNumber.length === 11;
      };

  const nameField = {
    label: "Name",
    guide: "(First Name, MI. Last Name)",
    placeholder: "Juan Dela Cruz",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round"><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></svg>,
    validate: validateStr,
    errorMessage: "This is a required field"
  };

  const positionField = {
    label: "Position",
    guide: "(e.g. UP Student, LGO/NGO Rep)",
    placeholder: "UP Student",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-briefcase"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2" /></svg>,
    validate: validateStr,
    errorMessage: "This is a required field"
  }

  const startDateField = {
    label: "Start date",
    guide: "(Month Day, Year)",
    placeholder: "March 1, 2002",
    type: "date",
};
  
  const endDateField = {
    label: "End date",
    guide: "(Month Day, Year)",
    placeholder: "March 1, 2002",
    type: "date",
   };
  
  const startTimeField = {
      label: "Start time", 
      guide: "HH:00",
      placeholder: "24:02",
      type: "time",
  };

  const endTimeField = {
      label: "End time", 
      guide: "HH:00",
      placeholder: "24:02",
      type: "time",
  };

  const emailField = {
    label: "Email",
    guide: "(email@up.edu.ph)",
    placeholder: "jdlcruz@up.edu.ph",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
    validate: validateEmail,
    errorMessage: "Invalid format"
  };

  const contactField = {
    label: "Contact Number",
    guide: "(09061231234)",
    placeholder: "09061231234",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.65A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 13 13 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 13 13 0 0 0 2.81.7 2 2 0 0 1 1.72 2z"/></svg>,
    validate: validateContactNumber,
    errorMessage: "Contact number should be 11 digits long and contain only numeric characters"
  }

  const organizationField = {
    label: "Organization/Office",
    guide: "(UP College of Engineering)",
    placeholder: "UP College of Engineering",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-building"><path d="M3 22h18"/><path d="M6 18v-7"/><path d="M10 18v-7"/><path d="M14 18v-7"/><path d="M18 18v-7"/><path d="M6 13h12"/><path d="M6 8h12"/><path d="M9 22V5l3-2 3 2v17"/></svg>,
    validate: validateStr,
    errorMessage: "This is a required field"
  };
  
  const eventNameField = {
    label: "Event Name",
    guide: "(ex. BRICS Inquiries Workshop)",
    placeholder: "Event name",
    validate: validateStr,
    errorMessage: "This is a required field"
  };

  const eventDescField = {
    label: "Event Description",
    guide: "(ex. BRICS Inquiries Workshop is a workshop about inquiries)",
    placeholder: "Event Description",
    validate: validateStr,
    errorMessage: "This is a required field"
  };

  const snackEmail = {
    alertMessage: "Email should be a valid email address!",
    alertIcon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
  }

  const snackEndTime = {
      alertMessage: "End time should not be earlier or equal to the Start time.",
      alertIcon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
  }

  const snackMinutes = {
      alertMessage: "Minutes should be in '00', We only reserve by hour.",
      alertIcon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
  }

  const snackEndDate = {
    alertMessage: "End date should not be earlier than the start date!",
    alertIcon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
  }
  const snackDates = {
    alertMessage: "Dates must not be before the current date!",
    alertIcon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
  }

  const snackCurrTime = {
    alertMessage: "Current time cannot be selected!",
    alertIcon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
  }

  if (isLoading) return <Loading />;


  return (
    <div>
        <Navbar />
        <div className="flex flex-col items-center space-y-10 mb-10">
            <h1 className="mt-20 text-brics-blue text-5xl pt-9 font-bold">Reservation Inquiry</h1>
            <div className="w-full px-0 lg:px-56">
                <p className="text-xl px-2 mb-5">Interested in reserving one of our rooms? Inquire through the form below.</p>
                <form onSubmit={handleInquire}>
                    <div className="flex flex-col space-y-3">
                        <div className="flex flex-col xl:flex-row w-full space-y-3 xl:space-y-0">
                            <div className="w-full px-8">
                                <FormField field={nameField} value={userName} setValue={setUsername}/>
                            </div>
                            <div className="w-full px-8">
                                <FormField field={positionField} value={position} setValue={setPosition}/>
                            </div>
                        </div>
                        <div className="flex flex-col xl:flex-row w-full space-y-3 xl:space-y-0">
                            <div className="w-full px-8">
                                <FormField field={emailField} value={email} setValue={setEmail}/>
                            </div>
                            <div className="w-full px-8">
                                <FormField field={contactField} value={contactNumber} setValue={setContactNumber}/>
                            </div>
                        </div>
                        <div className="flex flex-col xl:flex-row w-full space-y-3 xl:space-y-0">
                            <div className="w-full px-8">
                                <FormField field={organizationField} value={organization} setValue={setOrganization} />
                            </div>
                            <div className="w-full px-8">
                                <h2 className='font-satoshi-bold text-left mb-2'> Target Venue </h2>
                                <RoomDropDown 
                                    field={rooms} 
                                    value={selectRoom} 
                                    setValue={setSelectRoom}
                                    onRoomSelect={handleRoomSelect} />
                                {/* <DropdownField field={targetVenueField} value={targetVenue} setValue={setTargetVenue}/> */}
                            </div>
                        </div>
                        <div className="flex flex-col xl:flex-row w-full space-y-3 xl:space-y-0">
                            <div className="w-full px-8">
                                <FormField field={startDateField} value={startDate} setValue={setStartDate} />
                            </div>
                            <div className="w-full px-8">
                                <FormField field={endDateField} value={endDate} setValue={setEndDate}/>
                            </div>
                        </div>
                        <div className="flex flex-col xl:flex-row w-full space-y-3 xl:space-y-0">
                            <div className="w-full px-8">
                                <FormField field={startTimeField} value={timeStart} setValue={setTimeStart} />
                            </div>
                            <div className="w-full px-8">
                                <FormField field={endTimeField} value={timeEnd} setValue={setTimeEnd}/>
                            </div>
                        </div>
                        <div className="w-full px-8">
                            <FormField field={eventNameField} value={eventName} setValue={setEventName}/>
                        </div>
                        <div className="w-full px-8">
                            <FormField field={eventDescField} value={eventDesc} setValue={setEventDesc}/>
                        </div>
                    </div>
                    <div className="px-8 text-left mt-5 flex flex-col items-start">
                        <p className="text-xl font-bold mb-2">Attach Letter of Intent (optional)</p>
                        <DragDropFiles {...dragDropFilesProps}/>
                    </div>
                    <div className="px-8 w-full flex lg:justify-start">
                        <div className="pt-3 w-full justify-center flex lg:justify-start">
                        < button type="submit" className="bg-brics-blue text-white rounded-md py-2 px-16 w-max" >Submit Inquiry</button>                        </div>
                    </div>
                </form>
            </div>
        </div>
        {showErrorEmailToast &&       
                  <SnackBar field={snackEmail} />
            
        }
        {showErrorEndTime && <SnackBar field={snackEndTime} />}
        {showErrorMinutes && <SnackBar field={snackMinutes} />}
        {showErrorEndDate && <SnackBar field={snackEndDate} />}
        {showErrorDates && <SnackBar field={snackDates} />}
        {showCurrTime && <SnackBar field={snackCurrTime}/>}
        <Footer />
    </div>
);
}