import { useEffect, useMemo, useState } from "react";
import RoomReservationList from "../components/RoomReservationList";
import DragDropFiles from "../components/DragDropFiles";
import Navbar from "../components/Navbar";
import FormField from "../components/FormField";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
import SnackBar from "../components/SnackBar";
import EmptyState from "../components/EmptyState";
import { useInternalMessage } from "antd/es/message/useMessage";


/*
STATES
    reservationData - this is a list of rooms that the user has selected "added to cart"
    setReservationData - used to delete a room from the list when user clicks "delete" from the action column
    discount - specifies if the user is a student. can be set to NULL when the user is not a student
    files - this stores the files the user has uploaded to the drag and drop field 

FUNCTIONS
    handleDrop - adds the file uploaded by the user to the files state (when user drops a file)
    handleUpload - also add the file uploaded by the user to the files state (when user choose the browse method)
    handleDelete - deletes a room from the list when user clicks delete from the actions column

OBJECTS
    dragDropFilesProps - object that stores the props to the dragDropFiles component 
*/

export default function Reservation() {
    const [cart, setCart] = useState([]);
    const discount = window.globalUserClass;
    const type = "Reservation"; 
    const status = "Awaiting Approval";
    const [userEmail, setUserEmail] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // get cart
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        // fetch user data
    //     const fetchUserData = async () => {
    //         await axios
    //             .get("https://brics-api.vercel.app/api/sign-in/protected", {
    //                 withCredentials: true,
    //             })
    //             .then((response) => {
                   
    //                 //console.log(response);
    //                 setUserEmail(response.data.email);
    //             })
    //             .catch((error) => {
    //                 navigate("/unauthorized", { replace: true })
    //                 //console.error("Error fetching user data:", error);
    //             });
    //     };

    //     // setIsLoading(false);
    //   fetchUserData();
      if(!window.localStorage.getItem("user")){
        navigate("/unauthorized", { replace: true })
      }else{
        //   setIsLoggedIn(true);
          setUserEmail(JSON.parse(window.localStorage.getItem("user")).email);
      }
    }, []); 

    function handleDrop(event) {
        event.preventDefault();
        setFiles((prevFiles) => {
            if (prevFiles) {
                return [...prevFiles, ...event.dataTransfer.files];
            } else {
                return event.dataTransfer.files;
            }
        });
    }

    function handleUpload(event) {
        setFiles((prevFiles) => {
            if (prevFiles) {
                return [...prevFiles, ...event.target.files];
            } else {
                return event.target.files;
            }
        });
    }
    
    useEffect(() => {
        const getCart = async () => {
            if (userEmail) {
                try {
                    const response = await axios.get(
                        `https://brics-api.vercel.app/api/cart/rooms/${userEmail}`,
                        {withCredentials: true}
                    );
                    //console.log(response);
                    setCart(response.data);
                    setIsLoading(false);
                    //console.log(cart);
                } catch (error) {
                    //console.log(error);
                }
            }
        };
        getCart();
    }, [userEmail])
        
    const [eventName, setEventName] = useState("");
    const [description, setDescription] = useState("");
    const [timeStart, setTimeStart] = useState("");
    const [timeEnd, setTimeEnd] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [files, setFiles] = useState(null);
    const [alertFileUp, setAlertFileUp] = useState(false);
    const [alertRoomDel, setAlertRoomDel] = useState(false);
    const navigate = useNavigate();

    const eventNameField = {
        label: "Event name",
    };

    const startDateField = {
        label: "Start date",
        type: "date",
    };

    const endDateField = {
        label: "End date",
        type: "date",
    };

    const descriptionField = {
        label: "Description",
    };
    const timeStartField = {
        label: "Start time",
        type: "time",
    };
    const timeEndField = {
        label: "End time",
        type: "time",
    };

    const snackRoomDel = {
        alertMessage: "Room deleted successfully!",
        alertIcon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg>
    }

    const snackFileUp = {
        alertMessage: "File uploaded successfully!",
        alertIcon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg>
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

    async function handleSubmit(e) {
        e.preventDefault();

        const reservation = 
            {
                eventName: eventName,
                description: description,
                type: type,
                reservationDate: new Date(),
                startDate: startDate,
                endDate: endDate,
                timeStart: timeStart,
                timeEnd: timeEnd,
                userEmail: userEmail,
                status: status,
                isDeleted: false,
                rooms: cart.map((item) => {
                    return {
                        "_id": item.roomId,
                        "name": item.name
                    }
                }),
                files: [],
            }

        try {
            setIsLoading(true);
            // reference: https://github.com/ksekwamote/upload_image_react/blob/main/client/src/components/UploadImage.jsx
            if (files) {
                const base64s = [];
                for (let i = 0; i < files.length; i++) {
                    const base = await convertBase64(files[i]);
                    base64s.push(base);
                }

                const filesToUpload = {
                    files: base64s,
                };

                if (base64s) {
                    const uploadFileResponse = await axios.post(
                        "https://brics-api.vercel.app/api/upload-multiple",
                        filesToUpload,
                    );
                    //console.log(uploadFileResponse);
                    reservation.files = uploadFileResponse.data;

                    // Show snackbar
                    setAlertFileUp(true);
                    setIsLoading(false);
                    // Optionally, you can set a timeout to hide the Snackbar after a certain duration
                    setTimeout(() => {
                        setAlertFileUp(false);
                    }, 3000); // Hide after 3 seconds
                    // alert("File uploaded successfully!");
                }
            }

            //console.log("reservation", reservation);
            // const response = await axios.post(
            //     "https://brics-api.vercel.app/api/reservations/create-reservation",
            //     reservation, {withCredentials: true}
            // );

            let response = null;
            if (reservation) {
                response = await axios.post(
                    "https://brics-api.vercel.app/api/reservations/create-reservation",
                    reservation, {withCredentials: true}
                );
            }

            // delete all rooms from cart
            for (let item of cart) {
                try {
                    const result = await axios.delete("https://brics-api.vercel.app/api/cart/rooms/delete-room", { data: { "email": userEmail, "roomId": item.roomId }, withCredentials: true});
                    //console.log(result);
                } catch (error) {
                    //console.log(error);
                }

            }
            
            setIsLoading(false);

            navigate(`/reservation-details-user`, {state: {
                _id:response.data._id,
                rooms: response.data.rooms,
                startDate: response.data.startDate,
                endDate: response.data.endDate,
                timeStart: response.data.timeStart,
                timeEnd: response.data.timeEnd,
                eventName: response.data.eventName,
                userName: response.data.userEmail,
                userEmail: response.data.userEmail,
                status: response.data.status,
                files: response.data.files,
                description: response.data.description
            }});
        } catch (error) {
            //console.log("Error sending data", error);
        }
    }

    const handleDelete = async (currentRoomId) => {
        if (userEmail) {
            //console.log(userEmail);
            //console.log(currentRoomId);
            try {
                setIsLoading(true);
                const result = await axios.delete("https://brics-api.vercel.app/api/cart/rooms/delete-room", { data: { "email": userEmail, "roomId": currentRoomId }, withCredentials: true})
                //console.log(result);

                // alert("Room deleted successfully!");

                // delete from the cart state
                const newCart = cart.filter(item => item.roomId !== currentRoomId);
                setCart(newCart);

                setAlertRoomDel(true);
                setIsLoading(false);
                setTimeout(() => {
                    setAlertRoomDel(false);
                }, 3000);
            } catch (error) {
                //console.log(error);
            }
        }
    }

    const dragDropFilesProps = {
        handleDrop: handleDrop,
        handleUpload: handleUpload,
        files: files,
        setFiles: setFiles,
    };

    return (
        <div>
            <Navbar />
            <div className="flex flex-col items-center space-y-10 mt-32 mb-10">
                <h1 className="lg:text-4xl text-3xl font-satoshi-bold mt-2 text-brics-blue">
                    Process Reservation
                </h1>
                {/* {reservationData.length > 0 ? ( */}
                {isLoading  ? (
                    <Loading/>
                ) : (cart && cart.length > 0) ? (
                    <form className="w-full">
                        <div className="w-full flex-col flex items-center">
                            <div className="w-full space-y-8 flex flex-col items-center">
                                <RoomReservationList
                                    data={cart}
                                    discount={discount}
                                    handleDelete={handleDelete}
                                />
                                <div className="w-full px-72">
                                    <div className="grid grid-cols-2 gap-3">
                                        <FormField
                                            value={eventName}
                                            setValue={setEventName}
                                            field={eventNameField}
                                        />
                                        <FormField
                                            value={description}
                                            setValue={setDescription}
                                            field={descriptionField}
                                        />
                                        <FormField
                                            value={timeStart}
                                            setValue={setTimeStart}
                                            field={timeStartField}
                                        />
                                        <FormField
                                            value={timeEnd}
                                            setValue={setTimeEnd}
                                            field={timeEndField}
                                        />
                                        <FormField
                                            value={startDate}
                                            setValue={setStartDate}
                                            field={startDateField}
                                        />
                                        <FormField
                                            value={endDate}
                                            setValue={setEndDate}
                                            field={endDateField}
                                        />
                                    </div>
                                </div>
                                <div className="w-2/3 space-y-5 flex flex-col items-start">
                                    <p>
                                        Before proceeding, attach the request for
                                        reservation and LOR below.
                                    </p>
                                    <DragDropFiles {...dragDropFilesProps} />
                                </div>
                            </div>
                            <div className="w-2/3 pt-3 flex justify-center lg:justify-end">
                                <button
                                    onClick={(e) => handleSubmit(e)}
                                    className="bg-brics-blue text-white rounded-md py-2 px-32"
                                >
                                    Reserve
                                </button>
                            </div>
                        </div>
                    </form>
                ) : (
                    <EmptyState
                            message="Your reservation cart is empty. Pick a room from our list!"
                            linkText="Go to Rooms"
                            link="/browsing-room"
                        />
                )}
                {/* ) : (
                    <div className="text-2xl">Nothing to show.</div>
                )} */}
            </div>
            {alertRoomDel && <SnackBar field={snackRoomDel} />}
            {alertFileUp && <SnackBar field={snackFileUp} />}
        </div>
    );
}
