import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Stepper from "../components/Stepper";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import DragDropFiles from "../components/DragDropFiles";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import LoadingAnimation from "../components/LoadingAnimation";



export default function ReservationRejected() {
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [reservationDetails, setReservationDetails] = useState(null);
    const [targetVenues, setTargetVenues] = useState([]);
    const [showProofOfPayment, setShowProofOfPayment] = useState(false)
    const [searched, setSearched] = useState(false);
    const [invalidInput, setInvalidInput] = useState(false);
    const [files, setFiles] = useState(null);
    const [showGuestInfo, setShowGuestInfo] = useState(false);
    const [showSuccessToast, setShowSuccessToast] = useState(false);


    useEffect(() => {
        // const fetchUserData = async () => {
      
        //   await axios
        //     .get("https://brics-api.vercel.app/api/sign-in/protected", {
        //       withCredentials: true,
        //     })
        //     .then((response) => {
        //       //console.log("User data fetched successfully:");
              
        //       if (response.data.success !== false) {
                
        //         if(response.data.userClass === "student_org" || response.data.userClass === "faculty"){
        //           navigate("/unauthorized", { replace: true });
        //         }
        //         // setIsLoggedIn(true);
        //         setUser(response.data);
        //       } 
        //     })
        //     .catch((error) => {
        //       setUser(null);
        //     //   setIsLoggedIn(false);
        //     });
    
        // //   setIsLoading(false);
          
        // };
    
        // fetchUserData();
        if(!window.localStorage.getItem("user") || !["student_org","faculty"].includes(JSON.parse(window.localStorage.getItem("user")).userClass)){
            setUser(null);
        }else{
            setUser(JSON.parse(window.localStorage.getItem("user")));
        }
          
      }, []); 

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

    const handleCloseToast = () => {
        setShowSuccessToast(false); // Close the success toast
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // upload file to cloudinary
        // reference: https://github.com/ksekwamote/upload_image_react/blob/main/client/src/components/UploadImage.jsx
        if (files) {
            const base64s = [];
            for (var i = 0; i < files.length; i++) {
                var base = await convertBase64(files[i]);
                base64s.push(base);
            }

            const filesToUpload = {
                "files": base64s,
            };

            if (base64s) {
                setIsProcessing(true);
                //console.log("files to upload, ", filesToUpload);
                const uploadFileResponse = await axios.post(
                    "https://brics-api.vercel.app/api/upload-multiple",
                    filesToUpload
                );
                // console.log(uploadFileResponse);

                axios.put(`https://brics-api.vercel.app/api/reservations/update-reservation-files/${reservationDetails.transactionId}`,{
                    files: uploadFileResponse.data
                })
                
                // alert("File uploaded successfully!");
                //console.log(uploadFileResponse);

                //alert("File uploaded successfully!");
                setIsProcessing(false);
                setShowSuccessToast(true);

            }
        }
    }

    const fetchRoomNames = async (roomIds) => {
        const roomRequests = roomIds.map(async (roomId) => {
            try {
                const response = await axios.get(`https://brics-api.vercel.app/api/rooms/get-room/${roomId}`);
                return response.data.name;
            } catch (error) {
                //console.log(error);
                return null;
            }
        });
    
        const roomNames = await Promise.all(roomRequests);
        return roomNames.filter(Boolean); // Remove null values if any
    };
    
    const fetchDetails = async (transactionId) => {
        try {
            const response = await axios.get(`https://brics-api.vercel.app/api/reservations/get-reservation-guest/${transactionId}`);
            const newReservationDetails = response.data;
            //console.log(response);
            if (response) {
                setReservationDetails(newReservationDetails);
    
                if (newReservationDetails) {
                    const roomNames = await fetchRoomNames(newReservationDetails.rooms);
                    setTargetVenues(roomNames);

                }
            }
        } catch (error) {
            //console.log(error);
            //console.log('invalid input');
            setInvalidInput(true);
            setReservationDetails(null);
        }
    };


    const handleSearch = (transactionId) => {
        // Fetch reservation details using the transaction ID
        setInvalidInput(false);
        setSearched(true);
        fetchDetails(transactionId);
    };

    return (
        <div className="bg-backgroundColor h-full flex-col justify-center items-center">
            <Navbar />
            <div className="min-h-screen">
            <h1 className="mt-20 text-brics-blue text-5xl pt-9 font-bold">Track Reservation</h1>
            <div  className="mt-10 px-10"><SearchBar onSearch={handleSearch}/></div>
            
            {/* Reservation Details Body */}
            {searched ? ( 
                invalidInput ? (
                    <div class="flex justify-center mt-20 mb-20">
                        <div class="w-[1760px] text-center text-stone-900 text-[22px] font-medium font-satoshi leading-[50px] tracking-tight">Invalid transaction ID.
                        </div>
                    </div>
                ):(
                    reservationDetails? (
                        reservationDetails.type !== 'Reservation' ? (
                            reservationDetails.status === 'Rejected' ? (
                            <div class="flex justify-center mt-20 mb-20">
                                <div class="w-[1760px] text-center text-stone-900 text-[22px] font-medium font-satoshi leading-[50px] tracking-tight">We regret to inform you that your reservation request has been declined. <br/>We apologize for any inconvenience this may cause.
                                    <br/>
                                    <br/>Please note that you are welcome to submit a new reservation request at any time. <br/>If you have any questions or need further assistance, feel free to contact us.
                                    <br/>
                                    <br/>Thank you for your understanding.
                                </div>
                            </div>
                            ) : (
                                <div>
                                    {/* Event name and room name */}
                                    <div class="max-w-[1250px] w-full mt-20 px-10 gap-8 flex justify-start items-start inline-flex">
                                        <div class="flex-col justify-start items-start inline-flex">
                                            <div class="text-blue-500 text-3xl font-bold font-satoshi leading-[54px]">{reservationDetails && reservationDetails.eventName}</div>
                                            
                                            <div class="flex flex-row text-gray-500 text-xl font-medium font-satoshi leading-9">
                                            {
                                                targetVenues.map((venue, index) => (
                                                    <div key={index}>
                                                        {venue}
                                                        {targetVenues.length > 1 && index !== targetVenues.length - 1 && ';'}
                                                    </div>
                                                ))
                                            }
                                            </div>

                                        </div>
                                    </div>  
                                    
                                    {/* Stepper Section */}
                                    <div className="max-w-[100%] w-full flex justify-center">
                                        <div className='mt-20 mb-20 ml-20' >
                                            <Stepper status={reservationDetails && reservationDetails.status} />
                                        </div>
                                    </div>
            
                                    {/* Divider */}
                                    <div class="flex justify-center mb-50 px-10">
                                        <div class="w-[1177px] h-[2.63px] bg-gray-300"></div>
                                    </div>
                                    <div>
                                        <p className="mt-20 text-3xl text-brics-blue">Reservation Details</p>
                                    </div>
                                    <div>
                                        <div className="w-full">
                                            <div className="flex flex-col justify-center items-center">
                                                <div className="flex flex-row w-3/4 mt-20 justify-around">
                                                    <div className="text-left w-2/4 flex flex-col">
                                                        <div><strong>Name:</strong> {reservationDetails.userName}</div>
                                                        <div><strong>Email:</strong> {reservationDetails.userEmail}</div>
                                                        <div><strong>Organization:</strong> {reservationDetails.companyName}</div>
                                                        <div><strong>Date:</strong> {reservationDetails.startDate} - {reservationDetails.endDate}</div>
                                                        <div><strong>Time:</strong> {reservationDetails.timeStart} - {reservationDetails.timeEnd}</div>
                                                    </div>
                                                    <div className="text-left flex w-1/6 flex-col">
                                                        <div><strong>Position: </strong>{reservationDetails.userPosition}</div>
                                                        <div><strong>Contact number: </strong> {reservationDetails.contactNumber}</div>
                                                        <div><strong>Target Venue/s: </strong> {
                                                            targetVenues &&
                                                            targetVenues.map((venue, index) => (
                                                                <div key={index}>
                                                                    {venue}
                                                                </div>
                                                            ))
                                                        }</div>
                                                    </div>
                                                </div>
                                                <div className="max-w-[100%] w-3/4 flex justify-center my-10">
                                                    <div style={{justifyContent:'flex-start'}} className="flex flex-col w-5/6 justify-start">
                                                        <div className="flex justify-start">
                                                            <strong className="text-left">Purpose of reservation: </strong>
                                                        </div>
                                                        <div className="flex justify-start text-left    ">
                                                            {reservationDetails.description}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* conditional rendering */}
                                            {reservationDetails.status === 'Finalized' ? (
                                                <div>
                                                    <div className="flex justify-center">
                                                        <div className="flex w-2/3 flex-row gap-3">
                                                            <button onClick={() => {setShowProofOfPayment(false)}} 
                                                                className={
                                                                    "px-16 rounded-md py-1 text-white " + 
                                                                    (showProofOfPayment ? "bg-brics-blue" : "bg-custom-gray") +
                                                                    (reservationDetails.files.every(file => !file.endsWith('.pdf')) ? " cursor-not-allowed opacity-50" : "")
                                                                }
                                                                disabled={reservationDetails.files.every(file => !file.endsWith('.pdf'))}
                                                            >
                                                                View LOI
                                                            </button>
                                                            <button onClick={() => {setShowProofOfPayment(true)}} 
                                                                className={
                                                                    "px-16 rounded-md py-1 text-white " + 
                                                                    (showProofOfPayment ? "bg-custom-gray" : "bg-brics-blue")
                                                                }
                                                            >
                                                                View POP
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-center">
                                                        <div className="flex w-2/3 flex-col justify-center my-20">
                                                            <p className="font-satoshi-bold text-small text-start text-xl mb-5">Proof of payment</p>
                                                            {
                                                                showProofOfPayment ?
                                                                reservationDetails && reservationDetails.files.length > 0 && reservationDetails.files.map((file, index) => (
                                                                    <div key={index} className="flex">
                                                                        {
                                                                            !file.endsWith('.pdf') &&
                                                                            <img className="w-80 rounded-md" src={file} alt="Proof of payment"/>
                                                                        }
                                                                    </div>
                                                                ))
                                                                :
                                                                reservationDetails && reservationDetails.files.length > 0 && reservationDetails.files.map((file, index) => (
                                                                    <div key={index}>
                                                                        {
                                                                            file.endsWith('.pdf') &&
                                                                            <object
                                                                                type="application/pdf"
                                                                                data={file}
                                                                                width={800}
                                                                                height={800}
                                                                            >
                                                                                Your browser either does not support PDF or the file uploaded by the user is not in a PDF format.
                                                                            </object>
                                                                        }
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            ):(
                                                reservationDetails.status === 'Pending Payment' ? (
                                                    <div className="flex justify-center">
                                                        <div className="flex flex-col w-2/3 py-10 px-10">
                                                            <div className="mb-5">
                                                                <p className="mb-5 font-satoshi-bold text-start">*Upload proof of payment</p>
                                                                <DragDropFiles {...dragDropFilesProps} />
                                                            </div>
                                                            <div className="flex flex-row justify-between">
                                                                <button className="px-10 py-1 bg-red-500 text-white rounded-md">Cancel reservation</button>
                                                                <button onClick={(e) => {handleSubmit(e)}} className="px-20 py-1 bg-brics-blue text-white rounded-md">Submit</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ):(
                                                    // filler lang pang catch kapag ang status ay awaiting approval
                                                    <div className="my-10"></div>
                                                )
                                            )}
                                            
                                            
                                        </div>
                                    </div>
                                </div>
                            )
                        ):(
                            <div class="flex justify-center mt-20 mb-20">
                                <div class="w-[1760px] text-center text-stone-900 text-[22px] font-medium font-satoshi leading-[50px] tracking-tight">Please log in to your account to track your reservation.
                                </div>
                            </div>
                        )
                    ):(
                        <div className="flex justify-center">
                            {Loading()}
                        </div>
                    )
                )
            ):(
                <div class="flex justify-center mt-20 mb-20">
                    <div class="w-[1760px] text-center text-stone-900 text-[22px] font-medium font-satoshi leading-[50px] tracking-tight">Please enter the transaction ID sent to your email to track your reservation status.
                    </div>
                </div>
            )
            }
            </div>
            {/* Render the success toast */}
            {showSuccessToast && (
                <div className="fixed top-20 right-10">
                    <Toast text="File Uploaded Successfully" onClose={handleCloseToast} />
                </div>
            )}
            {/* Render the processing toast */}
            {isProcessing && (
                <div className="fixed top-20 right-10">
                    <LoadingAnimation text="Uploading files..."/>
                </div>
            )}
            
            <Footer />
        </div>
    );
}