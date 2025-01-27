import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// import Loading from "./Loading";
import BackBtn from "../components/BackBtn";
import ReservationStepper from "../components/Stepper";
import DragDropFiles from "../components/DragDropFiles";
import Loading from "./Loading";
import SnackBar from "../components/SnackBar";


export default function ReservationDetailsUser() {

  const [loading, setLoading] = useState(true);
  const [resLoading, setResLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [alertFileUp, setAlertFileUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [files, setFiles] = useState([]);

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
                
        //         }else{
        //             navigate("/unauthorized", { replace: true });
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
        //         navigate("/unauthorized", { replace: true });
        //       setUser(null);
        //       setIsLoggedIn(false);
        //     });
    
        //   setLoading(false);
        // };
    
        // fetchUserData();
        if(!window.localStorage.getItem("user") || !["student_org","faculty","admin1","admin2","admin3"].includes(JSON.parse(window.localStorage.getItem("user")).userClass)){
            navigate("/unauthorized", { replace: true });
            setIsLoggedIn(false);
            setUser(null);
          }else{
            setIsLoggedIn(true);
            setUser(JSON.parse(window.localStorage.getItem("user")));
          }
          setLoading(false);
    }, []); 
    
    function handleDrop(event) {
        event.preventDefault();
        setFiles((prevFiles) => {
            if (prevFiles) {
                return [...prevFiles, ...event.dataTransfer.files];
            } else {
                return [...event.dataTransfer.files];
            }
        });
    }

    function handleUpload(event) {
        setFiles((prevFiles) => {
            if (prevFiles) {
                return [...prevFiles, ...event.target.files];
            } else {
                return [...event.target.files];
            }
        });
    }

    const dragDropFilesProps = {
        handleDrop: handleDrop,
        handleUpload: handleUpload,
        files: files,
        setFiles: setFiles,
    };

    const location = useLocation();
    const {
        _id,
        rooms,
        startDate,
        eventName,
        userName,
        endDate,
        userEmail,
        timeStart,
        timeEnd,
        companyName,
        status,
        userPosition,
        contactNumber,
        files: locationFiles,
        description 
    } = location.state
    
    useEffect(() => {
        if (locationFiles) {
            setFiles(locationFiles); // Initialize files with locationFiles if it exists
        }
    }, [locationFiles]);

    const [showProofOfPayment, setShowProofOfPayment] = useState(false)
    const navigate = useNavigate();
    // const [roomNames, setRoomNames] = useState(null);
    const noFiles = !files || files.length === 0;

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

    const snackFileUp = {
        alertMessage: "File uploaded successfully!",
        alertIcon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg>
    }

    async function handleSubmit(e) {
        e.preventDefault();
        console.log("Handling upload....");

        try {
            setResLoading(true);
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
                    const uploadFileResponse = await axios.post(
                        "https://brics-api.vercel.app/api/upload-multiple",
                        filesToUpload, {withCredentials: true}
                    );
                    console.log("UPLOAD RESPONSE: ",uploadFileResponse.data);
                    setFiles(uploadFileResponse.data);

                    // Get the new files from the server response
                    const newFiles = uploadFileResponse.data;

                    // Update reservation's files using the controller
                    const updateReservationResponse = await axios.put(
                        `https://your-api-endpoint/update-reservation-files/${_id}`,
                        { files: newFiles }
                    );

                    // Show snackbar
                    setAlertFileUp(true);
                    setResLoading(false);
                    // Optionally, you can set a timeout to hide the Snackbar after a certain duration
                    setTimeout(() => {
                        setAlertFileUp(false);
                    }, 3000); // Hide after 3 seconds
                    // alert("File uploaded successfully!");
                }
            }

            setResLoading(false);
        } catch (error) {
            setResLoading(false);
            //console.log("Error sending data", error);
        }

    }
    return (
        <div>
            <Navbar />
            <div className="h-14"></div>
            <div className='mt-16 flex lg:m-10'>
                <div className="flex flex-row gap-3 items-center">
                    <BackBtn />
                    <div className="flex flex-col justify-start">
                        <p className="font-satoshi-bold h-full text-2xl text-brics-blue">{eventName}</p>
                        <div className="flex flex-row">
                            {
                                rooms &&
                                rooms.map((room, index) => (
                                    <div key={index}>
                                        {room.name}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
                <div className="w-full flex flex-col items-center">
                    <div className="font-satoshi my-10">
                        <ReservationStepper status={status} />
                    </div>
                    <div className="gap-10 lg:w-3/4 lg:flex lg:flex-col lg:items-center">
                        <p className="text-3xl text-brics-blue">Reservation Details</p>
                        <div className="w-full ">
                            <div className="flex flex-row w-full">
                                <div className="text-left w-2/4 flex flex-col">
                                    <div><strong>Name:</strong> {userName}</div>
                                    <div><strong>Email:</strong> {userEmail}</div>
                                    {
                                        companyName &&
                                        <div><strong>Organization:</strong> {companyName}</div>
                                    }
                                    <div><strong>Date:</strong> {startDate} - {endDate}</div>
                                    <div><strong>Time:</strong> {timeStart} - {timeEnd}</div>
                                </div>
                                <div className="text-left flex flex-col">
                                    {
                                        userPosition &&
                                        <div><strong>Position: </strong>{userPosition}</div>
                                    }
                                    {
                                        contactNumber &&
                                        <div><strong>Contact number: </strong> {contactNumber}</div>
                                    }
                                    <div><strong>Target Venue/s: </strong>
                                        <div>{
                                            (rooms) ?
                                            rooms.map((room, index) => (
                                                <p key={index} className={room.length < 20 ? "text-xs lg:text-xl" : "text-large"}>
                                                    {room.name}
                                                </p>
                                            ))
                                            :
                                            <div>ICSMH</div> 
                                        }</div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-left w-2/4 my-10">
                                <strong>Description:</strong> {description}
                            </div>


                            <div className="flex flex-row gap-3">
                                <button onClick={() => {setShowProofOfPayment(false)}} 
                                    className={
                                        "px-16 rounded-md py-1 text-white " + 
                                        (showProofOfPayment ? "bg-brics-blue" : "bg-custom-gray") +
                                        (noFiles ? " cursor-not-allowed opacity-50" : "")
                                    }
                                    disabled={noFiles}
                                >
                                    View LOI
                                </button>
                                <button onClick={() => {setShowProofOfPayment(true)}} className={"px-16 rounded-md py-1 text-white " + (showProofOfPayment ? "bg-custom-gray" : "bg-brics-blue")}>View POP</button>
                            </div>

                            <div className="my-10">
                                {
                                    showProofOfPayment ?
                                    <p className="font-satoshi-bold text-small text-start text-xl"> 
                                        Proof of payment 
                                    </p> :
                                    <p className="font-satoshi-bold text-small text-start text-xl"> 
                                        Letter of Intent 
                                    </p>
                                }
                                {console.log("resLoading:", resLoading)}
                                {console.log("showProofOfPayment:", showProofOfPayment)}
                                {console.log("files:", files)}
                                {console.log("files.length:", files ? files.length : "undefined")}
                                {console.log("status:", status)}
                                {console.log("status !== 'Rejected':", status !== "Rejected")}
                                {
                                    (showProofOfPayment || files.length === 0) &&
                                    !resLoading && status !== "Rejected" ? (
                                        <div className="flex justify-center">
                                            <div className="flex flex-col w-4/5 py-10 px-10">
                                                <div className="">
                                                    <p className="mb-5 font-satoshi-bold text-start">*Upload proof of payment</p>
                                                    <DragDropFiles {...dragDropFilesProps} />
                                                </div>
                                                <div className="mb-5 flex flex-row justify-between">
                                                    <button onClick={(e) => {handleSubmit(e)}} className="px-20 py-1 bg-brics-blue mt-5 text-white rounded-md">Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        files.map((file, index) => (
                                            <div key={index}>
                                                {
                                                    typeof file === 'string' && (
                                                        showProofOfPayment ?
                                                            !file.endsWith('.pdf') &&
                                                            <img className="w-80 rounded-md" src={file} alt="Proof of payment" />
                                                            :
                                                            file.endsWith('.pdf') &&
                                                            <object
                                                                type="application/pdf"
                                                                data={file}
                                                                width={800}
                                                                height={800}
                                                            >
                                                                Your browser either does not support PDF or the file uploaded by the user is not in a PDF format.
                                                            </object>
                                                    )
                                                }
                                            </div>
                                        ))                                        
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {alertFileUp && <SnackBar field={snackFileUp} />}
            <Footer />
        </div>
    );
}