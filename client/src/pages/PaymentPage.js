import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RoomReservationList from "../components/RoomReservationList";
import DragDropFiles from "../components/DragDropFiles";
import BackBtn from "../components/BackBtn";
import axios from "axios";
import Toast from "../components/Toast";
import LoadingAnimation from "../components/LoadingAnimation";

const PaymentPage = () => {
    const discount = "student";    // set to NULL if no discount
    const [total, setTotal] = useState(0);
    const [files, setFiles] = useState(null);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);


    const reservationData = [
        {
            roomName: "PC Lab 1",
            roomId: "6631e484ee8d829c0daf4043",
            location: "PhySci 3rd Floor",
            imageLink:
                "https://upload.wikimedia.org/wikipedia/commons/a/a5/Contemporary_Computer_Lab.jpg",
            startDate: "March 2, 2024",
            endDate: "March 3, 2024",
            amount: 2500,
        },
        {
            roomName: "ICS C-100",
            roomId: "6631e38bee8d829c0daf4042",
            location: "PhySci 3rd Floor",
            imageLink:
                "https://upload.wikimedia.org/wikipedia/commons/a/a5/Contemporary_Computer_Lab.jpg",
            startDate: "March 2, 2024",
            endDate: "March 3, 2024",
            amount: 2500,
        },
    ]

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

    const handleCloseToast = () => {
        setShowSuccessToast(false); // Close the success toast
    };

    function handleUpload(event) {
        setFiles((prevFiles) => {
            if (prevFiles) {
                return [...prevFiles, ...event.target.files];
            } else {
                return event.target.files;
            }
        });
    }

    const dragDropFilesProps = {
        handleDrop: handleDrop,
        handleUpload: handleUpload,
        files: files,
        setFiles: setFiles,
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
                files: base64s,
            };

            if (base64s) {
                setIsProcessing(true);
                const uploadFileResponse = await axios.post(
                    "https://brics-api.vercel.app/api/upload-multiple",
                    filesToUpload
                );
                // console.log(uploadFileResponse);
                //alert("File uploaded successfully!");
                setIsProcessing(false);
                setShowSuccessToast(true);
            }
        }
    }

    // compute for total amount 
    useEffect(() => {
        let newTotal = 0;
        reservationData.forEach(element => {
            newTotal += element.amount;
        });
        if (discount) {
            newTotal -= 300;
        }
        setTotal(newTotal);
    }, [reservationData, discount]);

    return (
        <div>
            <Navbar />
            <div className="text-2xl mt-10 flex flex-row items-center gap-3 mx-10">
                <BackBtn />
                <p className="text-brics-blue font-satoshi-bold">Upload Payment</p>
            </div>
            <hr class="h-px mx-32 my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            <div className="mx-48 border border-brics-blue p-10 rounded-md">
                <div className="grid-cols-5 grid mb-5">
                    <div className="col-span-2">
                        <div className="text-start">
                            <p className="text-brics-blue font-satoshi-bold text-xl">Rooms to reserve</p>
                        </div>
                    </div>
                    <div className="col-span-2 font-satoshi-bold text-xl">
                        <p className="text-brics-blue">Dates</p>
                    </div>
                    <div className="col-span-1">
                        <div className="text-brics-blue text-end font-satoshi-bold text-xl">
                            <p>Amount to pay</p>
                        </div>
                    </div>
                </div>
                {
                    reservationData &&
                    reservationData.map((item, index) => (
                        <div className="grid-cols-5 grid mb-5 items-center" key={index}>
                            <div className="col-span-2">
                                <div className="text-start">
                                    <div className="flex flex-row gap-3">
                                        <div>
                                            <img className="w-44 rounded-md" src={item.imageLink} alt="Room" />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <div>{item.roomName}</div>
                                            <div><strong>Location: </strong>{item.location}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-2 text-xl">
                                <p className=" text-black flex flex-col justify-center">
                                    {item.startDate} - {item.endDate}
                                </p>
                            </div>
                            <div className="col-span-1">
                                <div className="text-end text-xl">
                                    ₱ {item.amount}
                                </div>
                            </div>
                        </div>
                    ))
                }
                <div className="text-end text-xl">
                    {
                        discount && 
                        <div>
                            <p><strong>Discount</strong>: Student -₱ 300</p>
                            <p><strong>Total: </strong> ₱ {total}</p>
                        </div>
                    }
                </div>
            </div>
            <div className="mx-48 py-10">
                <div className="mb-5">
                    <p className="mb-5 font-satoshi-bold text-start">*Upload proof of payment</p>
                    <DragDropFiles {...dragDropFilesProps} />
                </div>
                <div className="flex flex-row justify-between">
                    <button className="px-10 py-1 bg-red-500 text-white rounded-md">Cancel reservation</button>
                    <button onClick={(e) => {handleSubmit(e)}} className="px-20 py-1 bg-brics-blue text-white rounded-md">Submit</button>
                </div>
            </div>
            {/* Render the success toast */}
            {isProcessing && (
                <div className="fixed bottom-10 right-10">
                    <LoadingAnimation text="Processing..."/>
                </div>
            )}
            {showSuccessToast && (
                <div className="fixed bottom-10 right-10">
                    <Toast text="File Uploaded Successfully" onClose={handleCloseToast} />
                </div>
            )}
        </div>
    );
}
 
export default PaymentPage;