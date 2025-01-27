import React, { useState, useEffect } from 'react';
import Sidebar from '../components/SideBar';
import TextArea from '../components/TextArea';
import FormField  from '../components/FormField';
import DragDropImage from '../components/DragDropImage';
import BackBtn from '../components/BackBtn';
import SnackBar from '../components/SnackBar';
import CollapseBtn from '../components/CollapseBtn';
import IconBtn from '../components/IconBtn';
import RoomDropDown from '../components/RoomDropDown';
import Loading from './Loading';
import Alert from '../components/Alert';

import axios from "axios";
import { useNavigate, useLocation } from 'react-router-dom';

export default function EditRoom() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const room = state ? state.room : null; // Get the room object from navigation state
  
  // States for rendering
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  

    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
      // const fetchUserData = async () => {
      //   await axios
      //     .get("https://brics-api.vercel.app/api/sign-in/protected", {
      //       withCredentials: true,
      //     })
      //     .then((response) => {
      //       // console.log("User data fetched successfully:");
      //       if (response.data != "Unauthorized") {
      //         if(response.data.userClass == "student_org" || response.data.userClass == "faculty"){
      //           navigate("/unauthorized", { replace: true });
      //         }
      //         setIsLoggedIn(true);
      //         setUser(response.data);
      //       } else {
      //         navigate("/unauthorized", { replace: true });
      //         setIsLoggedIn(false);
      //         setUser(null);
      //       }
      //     })
      //     .catch((error) => {
      //       navigate("/unauthorized", { replace: true });
      //       setUser(null);
      //       setIsLoggedIn(false);
      //     });

      //   // setIsLoading(false);
      // };

      // fetchUserData();
      if(!window.localStorage.getItem("user") || ["student_org","faculty"].includes(JSON.parse(window.localStorage.getItem("user")).userClass)){
        navigate("/unauthorized", { replace: true });
        setIsLoggedIn(false);
        setUser(null);
      }else{
          setUser(JSON.parse(window.localStorage.getItem("user")));
      }
    }, []); 

    // States for form values
    const [roomName, setRoomName] = useState('');
    const [buildingName, setBuildingName] = useState('');
    const [floorLevel, setFloorLevel] = useState('');
    const [landmark, setLandmark] = useState('');
    const [seatCapacity, setSeatCapacity] = useState('');
    const [reservationFee, setReservationFee] = useState('');
    const [roomDesc, setRoomDesc] = useState('');
    const [files, setFiles] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFail, setShowFail] = useState(false);
    const [showImg, setShowImg] = useState(false);
    const [showImgSize, setShowImgSize] = useState(false);
    const [imgSizeAlert, setImgSizeAlert] = useState('');
    const [compAm, setCompAm] = useState(0);
    const [projAm, setProjAm] = useState(false);
    const [micAm, setMicAm] = useState(0);
    const [wifiAm, setWifiAm] = useState(false);
    const [podiumAm, setPodiumAm] = useState(false);
    const [speakerAm, setSpeakerAm] = useState(0);
    const [acronym, setAcronym] = useState('Sample Acronym');
    const [acroBldg, setAcroBldg] = useState('Sample Bldg Acro');
    const [computerFee, setCompFee] = useState('');
    const [rooms, setRooms] = useState('');
    const [selectRoom, setSelectRoom] = useState();
    const [isLoading, setIsLoading] = useState(false); 
    const [showEditAlert, setShowEditAlert] = useState(false);
    const [newFiles, setNewFiles] = useState('');

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

  // Gets rooms to display in dropdown
  useEffect(() => {
    if (room) handleRoomSelect(room);
    const getRooms = async () => {
      try {
        const response = await axios.get(
          "https://brics-api.vercel.app/api/rooms/get-all-rooms", {withCredentials: true}
        );
        const newRooms = response.data;
        // console.log(newRooms);
        setRooms(newRooms);
      } catch (error) {
        // console.log(error);
      }
    };
    getRooms();
  }, []);

  // Condition for rendering when screen width is small
  const MarginLeft = screenWidth < 1024 ? "40px" : "295px";

    // Handlers for uploading images
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
        const filesToAdd = event.target.files;
        let totalSize = 0;

        // Traverse through selected files
        for (let i = 0; i < filesToAdd.length; i++){
            const file = filesToAdd[i];
            const fileSize = file.size; // Get size of current file in bytes

            // Check if the size of the current file exceeds 10mb
            if (fileSize > 10 * 1024 * 1024) {
                setImgSizeAlert(`File ${file.name} exceeds the maximum size limit of 10MB`);
                setShowImgSize(true);

                setTimeout(() => {
                    setShowImgSize(false);
                }, 3000); // Hide after 3 seconds
                return; // Exit function without adding any files
            }
            totalSize += fileSize;
        }

        // Check if the total size of all images exceeds 25mb
        if (totalSize > 25 * 1024 * 1024) {
            setImgSizeAlert(`Total size of uploaded images exceeds the maximum limit of 25MB`);
            setShowImgSize(true);

            setTimeout(() => {
                setShowImgSize(false);
            }, 3000);
            return; // Exit function without adding any files
        }

        // if within constraints, then proceed to add file
        setFiles(prevFiles => {
            if (prevFiles) {
                return [...prevFiles, ...event.target.files]
            } else {
                return event.target.files
            }
        });
    }

    const convertBase64 = (files) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(files);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    // Event handler for selecting a room to edit
    const handleRoomSelect = (room) => {
        setSelectRoom(room); // Set selected room
        console.log(room);
        // Use room object to populate form fields
        setRoomName(room.name);
        setBuildingName(room.building);
        setFloorLevel(room.floorLevel);
        setLandmark(room.landmark);
        setSeatCapacity(room.seatingCapacity);
        setReservationFee(room.reservationFee);
        setCompAm(room.computerCount);
        setCompFee(room.computerFee);
        setMicAm(room.mic);
        setSpeakerAm(room.speakers);
        setProjAm(room.hasProjector);
        setPodiumAm(room.hasPodium);
        setWifiAm(room.hasWifi);
        setFiles(room.pictures);
        setRoomDesc(room.roomDesc);
    }

    // Event handler function for cancel button
    const handleCancel = () => {
        setShowEditAlert(false);
        // Clear form fields and uploaded files
        setRoomName('');
        setBuildingName('');
        setFloorLevel('');
        setLandmark('');
        setSeatCapacity('');
        setReservationFee('');
        setCompFee('');
        setCompAm('');
        setMicAm('');
        setSpeakerAm('');
        setProjAm(false);
        setWifiAm(false);
        setPodiumAm(false);
        setRoomDesc('');
        setFiles([]);
        setAcronym('Sample Acronym');
        setAcroBldg('Sample Bld Acro');
        setSelectRoom('Select a room to edit');
    };

    const handleEditAlert = () =>{
        if (files.length === 0) {
            setShowImg(true);
            
            setTimeout(() => {
                setShowImg(false);
            }, 3000); // Hide after 3 seconds
            return; // Exit the function if no images are uploaded
        }

        setShowEditAlert(true);
    }
    
    // Event handler function for create room button using create-room api
    async function handleEditRoom (e){
        setShowEditAlert(false);
        // console.log('Edit Room button clicked');
        e.preventDefault();

        //Show loading screen
        setIsLoading(true);

        const room = {
            "name": roomName,
            "acronym": acronym,
            "roomDesck": roomDesc,
            "building": buildingName,
            "landmark": landmark,
            "acroBldg": acroBldg,
            "floorLevel": floorLevel,
            "seatingCapacity": seatCapacity,
            "reservationFee": reservationFee,
            "computerCount": compAm,
            "computerFee": computerFee,
            "mic": micAm,
            "speakers": speakerAm,
            "hasProjector": projAm,
            "hasPodium": podiumAm,
            "hasWifi": wifiAm,
            "pictures": files,
            "isDeleted": false,
        }

        try {
            // console.log("TRY HERE");
            if(files){
              const base64s = [];
              // console.log("TESTING HERE");
              // Looping through each file
              for (let i = 0; i < files.length; i++){
                if(typeof files[i] === 'string'){
                  // console.log("Already exists");
                } else {
                  const base = await convertBase64(files[i]);
                  base64s.push(base);
                }
              }

              const filesToUpload={files: base64s}
              // console.log("TESTING HERE BASE64");

              // Remove the last n objects from the files array
              const updatedFiles = files.slice(0, -base64s.length);

              // Upload files if any
              if (base64s){
                const uploadFileResponse = await axios.post(
                  "https://brics-api.vercel.app/api/upload-multiple",
                  filesToUpload
                );
                // console.log("UPLOAD RES DATA");
                console.log(uploadFileResponse.data);

                // Append new images to existing image array
                room.pictures = [...updatedFiles, ...uploadFileResponse.data];
                // console.log("FINAL PICTURES");
                // console.log(room.pictures);
              }
            }
            const response = await axios.put(`https://brics-api.vercel.app/api/rooms/update-room/${selectRoom._id}`, room, {withCredentials: true});
            // console.log("DEBUGGING")
            // console.log(response);

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
        } catch (error) {
            setIsLoading(false);

            // Show Snackbar
            setShowFail(true);
    
            // Optionally, you can set a timeout to hide the Snackbar after a certain duration
            setTimeout(() => {
                setShowFail(false);
            }, 3000); // Hide after 3 seconds
            // console.log(error);
        }
    };

  // Form field constants
  const buildingNameField = {
    label: "Building",
    guide: null,
    placeholder: "e.g. Physical Sciences Building",
    icon: null,
  };

  const floorLevelField = {
    label: "Floor Level",
    guide: null,
    placeholder: "e.g. 1",
    icon: null,
  };

  const landmarkField = {
    label: "Landmark",
    guide: null,
    placeholder: "e.g. Francisco O. Santos Hall",
    icon: null,
  };

  const seatingCapField = {
    label: "Seating Capacity",
    guide: null,
    placeholder: "e.g. 128",
    icon: null,
  };

    const resFeeField = {
        label: "Reservation Fee", 
        guide: null,
        placeholder: "e.g. 1500.00",
        icon: null
    }

    const comFeeField = {
        label: "Computer Fee", 
        guide: null,
        placeholder: "e.g. 20.00",
        icon: null
    }

  const roomDescField = {
    label: "Room Description",
    guide: null,
    placeholder: "e.g. ICS Mega hall is so nice!",
    icon: null,
  };
  
  const roomNameField = {
    label: "Room Name",
    guide: null,
    placeholder: "e.g. ICS Mega hall",
    icon: null,
  };

    const dragDropImageProps = {
        handleDrop: handleDrop,
        handleUpload: handleUpload,
        pictures: files,
        setPictures: setFiles
    }

  const snackSuccess = {
    alertMessage: "Room has been edited!", //add room name here
    alertIcon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  };

    const snackFail = {
        alertMessage: "Oh no, something went wrong!",
        alertIcon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
    }

    const snackImage = {
        alertMessage: "You need to upload at least one image!",
        alertIcon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
    }

    const snackImageSize = {
        alertMessage: imgSizeAlert,
        alertIcon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
    }

  const computerAmen = {
    label: "Computer",
    placeholder: "e.g. 20",
    icon: (
      <svg
        className="flex-shrink-0 size-5"
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

  const projectorAmen = {
    label: "Projector",
    icon: (
      <svg
        className="flex-shrink-0 size-5"
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

  const micAmen = {
    label: "Mic",
    placeholder: "e.g. 2 or 0 if none",
    icon: (
      <svg
        className="flex-shrink-0 size-5"
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

  const wifiAmen = {
    label: "WiFi ",
    icon: (
      <svg
        className="flex-shrink-0 size-5"
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

  const podiumAmen = {
    label: "Podium",
    icon: (
      <svg
        className="flex-shrink-0 size-5"
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

  const speakerAmen = {
    label: "Speaker",
    placeholder: "e.g. 1",
    icon: (
      <svg
        className="flex-shrink-0 size-5"
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
        <rect width="16" height="20" x="4" y="2" rx="2" />
        <path d="M12 6h.01" />
        <circle cx="12" cy="14" r="4" />
        <path d="M12 14h.01" />
      </svg>
    ),
  };

    return (
        <div>
            <Sidebar />
            {isLoading ? (
                <div style={{marginLeft: MarginLeft }}>
                  <Loading />
                </div>
            ) : (
            <div className="flex-col">
                {/* Page header */}
                <div className='flex mt-3' style={{marginLeft: MarginLeft }}>
                    {/* <button type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-brics-blue hover:bg-brics-blue hover:text-white disabled:opacity-50 disabled:pointer-events-none">
                        <svg className='size-10' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                    </button> */}
                    <BackBtn/>
                    <div className='flex-col ml-5'>
                        <h1 className="text-3xl font-bold text-brics-blue text-left">Edit Room</h1>
                        <h2 className="text-lg text-gray-500 text-left">Enter information about room</h2>
                    </div>
                </div>
                {/* End of Page Header */}
                {/* Start of Form */}
                <div className='flex flex-col mt-3 mb-6' style={{marginLeft: MarginLeft }}>
                    <div className='flex justify-between'>
                        <form id="formMain" className='flex flex-col w-3/5'>
                            <div className='flex flex-col'>
                                <h2 className='font-bold text-left mb-2'> Room </h2>
                                <RoomDropDown 
                                    field={rooms} 
                                    value={selectRoom} 
                                    setValue={setSelectRoom}
                                    onRoomSelect={handleRoomSelect} />
                                {/* <FormField field={roomNameField} value={roomName} setValue={setRoomName}/> */}
                            </div>
                            <div className='mt-3'>
                                <FormField field={roomNameField} value={roomName} setValue={setRoomName}/>
                            </div>
                            <div className="flex mt-3">
                                <div className='mr-3 w-2/3'>
                                    <FormField field={buildingNameField} value={buildingName} setValue={setBuildingName}/>
                                </div>
                                <div className='w-1/3'>
                                    <FormField field={floorLevelField} value={floorLevel} setValue={setFloorLevel}/>
                                </div>
                            </div>
                            <div className="flex mt-3">
                                <div className='mr-3 w-2/3'>
                                    <FormField field={landmarkField} value={landmark} setValue={setLandmark}/>
                                </div>
                                <div className='w-1/3'>
                                    <FormField field={seatingCapField} value={seatCapacity} setValue={setSeatCapacity}/>
                                </div>
                            </div>
                            <div className="flex mt-3">
                                <div className='mr-3 w-1/2'>
                                    <FormField field={resFeeField} value={reservationFee} setValue={setReservationFee}/>
                                </div>
                                <div className='w-1/2'>
                                    <FormField field={comFeeField} value={computerFee} setValue={setCompFee}/>
                                </div>
                            </div>
                            <div className='flex flex-col mt-3 h-48'>
                                <TextArea field={roomDescField} value={roomDesc} setValue={setRoomDesc}/>
                            </div>
                            <div className='flex flex-col'>
                                <h2 className='font-bold text-left mt-3 mb-2'> Amenities </h2>
                                <div className='flex w-full mb-1'>
                                    <CollapseBtn field={computerAmen} value={compAm} setValue={setCompAm}/>
                                    <CollapseBtn field={micAmen} value={micAm} setValue={setMicAm}/>
                                    <CollapseBtn field={speakerAmen} value={speakerAm} setValue={setSpeakerAm}/>
                                    <IconBtn label={projectorAmen.label} icon={projectorAmen.icon} value={projAm} setValue={setProjAm}/>
                                    <IconBtn label={wifiAmen.label} icon={wifiAmen.icon} value={wifiAm} setValue={setWifiAm}/>
                                    <IconBtn label={podiumAmen.label} icon={podiumAmen.icon} value={podiumAm} setValue={setPodiumAm}/>
                                </div>
                                <div className="flex w-full pl-1 text-gray-500 text-left italic text-xs">
                                    Computer, Mic, and Speaker amenities show how many units are available of that type of amenity. 
                                    <br />
                                    Projector, Wifi, and Podium amenities show if that amenity is available.
                                </div>
                            </div>
                        </form>
                        <div className='flex flex-col w-2/5 ml-6 mr-6 space-y-3'>
                                <DragDropImage {...dragDropImageProps}/>
                        </div>
                    </div>
                    <div className='flex w-full justify-between mt-3 mb-10'>
                        <button type="button" onClick={handleCancel} className="w-full mr-6 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-white text-gray-500 text-center border-gray-500 hover:bg-white hover:border-brics-blue hover:text-brics-blue disabled:opacity-50 disabled:pointer-events-none justify-center">
                            Cancel
                        </button>
                        <button type="submit" onClick={handleEditAlert} className="w-full mr-6 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-brics-blue text-white text-center hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none justify-center">
                            Edit Room
                        </button>
                        {/* Snackbar */}
                        {showSuccess && <SnackBar field={snackSuccess} />}
                        {showFail && <SnackBar field={snackFail} />}
                        {showImg && <SnackBar field={snackImage} />}
                        {showImgSize && <SnackBar field={snackImageSize} />}
                        {showEditAlert && (
                            <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
                                <Alert 
                                    actionText="Edit" 
                                    headerText="Are you sure you want to edit this room?"  
                                    descriptionText="Your current changes will be saved."
                                    onCancel={handleCancel}
                                    onAction={(e)=>handleEditRoom(e)}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            )}
        </div>
    );
}