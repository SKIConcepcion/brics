import { useEffect, useState } from "react";
import ReservationItemButton from "./ReservationItemButton";
import axios from "axios";
import { Link } from "react-router-dom";
import SnackBar from "../components/SnackBar";
import LoadingAnimation from "../components/LoadingAnimation";

export default function ReservationItem({
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
    recurrencePattern,
    userPosition,
    contactNumber,
    files,
    description,
    refresh,
    updateReservationStatus
},
) {
    const [isRejected, setIsRejected] = useState(false);
    const [isAccepted, setIsAccepted] = useState(false);
    const [isCanceled, setIsCanceled] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [pdfExists, setPdfExists] = useState(false);
    const [imageExists, setImageExists] = useState(false);
    const [adminUserEmail, setAdminUserEmail] = useState(null);
    const [showAccept, setShowAccept] = useState(false);
    const [showReject, setShowReject] = useState(false);
    const [showCancel, setShowCancel] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showFail, setShowFail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [disableButton, setDisableButton] = useState(false);
    const [showEditAlert, setShowEditAlert] = useState(false);

    const snackAccept = {
        alertMessage: "Reservation has been accepted!",
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

    const snackReject = {
        alertMessage: "Reservation has been rejected!",
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

    const snackCancel = {
        alertMessage: "Reservation has been canceled!",
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

    const snackConfirm = {
        alertMessage: "Reservation has been confirmed!",
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
                <circle cx="12" cy="12" r="10" />
                <path d="m15 9-6 6" />
                <path d="m9 9 6 6" />
            </svg>
        ),
    };

    useEffect(() => {
    //   const fetchUserData = async () => {
    //     await axios
    //       .get("https://brics-api.vercel.app/api/sign-in/protected", {
    //         withCredentials: true,
    //       })
    //       .then((response) => {
    //         console.log("User data fetched successfully:");
    //         setAdminUserEmail(response.data.email);
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //   };
    //   fetchUserData();
        setAdminUserEmail(JSON.parse(window.localStorage.getItem("user")).email);
    }, []); 


    useEffect(() => {
        // check if files exist
        if (files) {
            setImageExists(files.some((file) => !file.endsWith(".pdf")));
            setPdfExists(files.some((file) => file.endsWith(".pdf")));
        }
    }, [files, status]);

    const handleAccept = async (id) => {
        setDisableButton(true);
        setShowEditAlert(false);
        setIsLoading(true);

        const reservationId = id;
        if (adminUserEmail) {
            try {
                const response = await axios.put(
                    `https://brics-api.vercel.app/api/reservations/update-reservation-status/${reservationId}`,
                    {
                        userClass: "admin",
                        status: "Next",
                        actionMade: "Approved",
                        actionBy: adminUserEmail,
                    },
                    { withCredentials: true }
                );
                if (response.status === 200) {
                    setShowAccept(true);
                    setTimeout(() => {
                        setShowAccept(false);
                    }, 3000); // Hide after 3 seconds
                    // refresh();
                    updateReservationStatus(_id, response.data.status)
                    setIsAccepted(true);
                }
            } catch (error) {
                console.log(error);
            }
        }

        setIsLoading(false);
        setDisableButton(false);
    };

    const handleConfirm = async (id) => {
        setDisableButton(true);
        setShowEditAlert(false);
        console.log("Finalizing...");
        setIsLoading(true);

        const reservationId = id;
        if (adminUserEmail) {
            try {
                const response = await axios.put(
                    `https://brics-api.vercel.app/api/reservations/update-reservation-status/${reservationId}`,
                    {
                        userClass: "admin",
                        status: "Next",
                        actionMade: "Finalized",
                        actionBy: adminUserEmail,
                    },
                    { withCredentials: true }
                );
                if (response.status === 200) {
                    // refresh();
                    setIsConfirmed(true);
                    updateReservationStatus(_id, "Finalized")
                    setShowConfirm(true);
                    setTimeout(() => {
                        setShowConfirm(false);
                    }, 3000); // Hide after 3 seconds
                }
            } catch (error) {
                setIsLoading(false);
                setShowFail(true);

                setTimeout(() => {
                    setShowFail(false);
                }, 3000); // Hide after 3 seconds

                console.log(error);
            }
        }
        setIsLoading(false);
        setDisableButton(false);
    };

    const handleReject = async (id) => {
        setDisableButton(true);
        setShowEditAlert(false);
        setIsLoading(true);

        const reservationId = id;
        try {
            const response = await axios.put(
                `https://brics-api.vercel.app/api/reservations/update-reservation-status/${reservationId}`,
                {
                    userClass: "admin",
                    status: "Rejected",
                    actionMade: "Rejected",
                    actionBy: adminUserEmail,
                },
                { withCredentials: true }
            );
            if (response.status === 200) {
                setShowReject(true);
                setTimeout(() => {
                    setShowReject(false);
                }, 3000); // Hide after 3 seconds
                // refresh();
                updateReservationStatus(_id, "Rejected")
                setIsRejected(true);
            }
        } catch (error) {
            setShowFail(true);
            setTimeout(() => {
                setShowFail(false);
            }, 3000); // Hide after 3 seconds
            console.log(error);
        }
        
        setIsLoading(false);
        setDisableButton(false);
    };

    const handleCancel = async (id) => {
        setDisableButton(true);
        setShowEditAlert(false);
        setIsLoading(true);

        const reservationId = id;
        try {
            const response = await axios.put(
                `https://brics-api.vercel.app/api/reservations/update-reservation-status/${reservationId}`,
                {
                    userClass: "admin",
                    status: "Cancelled",
                    actionMade: "Cancelled",
                    actionBy: adminUserEmail,
                },
                { withCredentials: true }
            );
            if (response.status === 200) {
                console.log(response);
                updateReservationStatus(_id, "Cancelled")
                setIsCanceled(true);
                setShowCancel(true);
                setTimeout(() => {
                    setShowCancel(false);
                }, 3000); // Hide after 3 seconds
            }
        } catch (error) {
            setIsLoading(false);
            setShowFail(true);
            setTimeout(() => {
                setShowFail(false);
            }, 3000); // Hide after 3 seconds
            console.log(error);
        }

        setIsLoading(false);
        setDisableButton(false);
    };

    const statusColorMapping = {
        "Awaiting Approval": "#3B82F6",
        "Pending Payment": "#A855F7",
        Finalized: "#1E3A8A",
        Rejected: "#EF4444",
        Cancelled: "#EF4444",
    };

    const viewFile = (fileToView) => {
        if (fileToView === "loi") {
            handleViewLoi(files);
        } else if (fileToView === "pop") {
            handleViewPop(files);
        }
    }

    const handleViewLoi = (files) => {
        // open link
        for (let file of files) {
            if (file.endsWith(".pdf")) {
                window.open(file);
            }
        }
    };

    const handleViewPop = (files) => {
        // open link
        for (let file of files) {
            if (!file.endsWith(".pdf")) {
                window.open(file);
            }
        }
    };

    return (
        <div className={`flex rounded-md w-full cursor-pointer`}>
            <div
                className={`flex-none rounded-l-md px-2 py-9`}
                style={{ backgroundColor: statusColorMapping[status] }}
            ></div>
            <div
                className={`flex-1 border border-${statusColorMapping[status]} rounded-r-md flex`}
            >
                <div className="grid grid-flow-col w-full gap-1 mr-5 grid-cols-12">
                    <div className="col-span-2 flex-col ml-4 flex justify-center items-start">
                        <div className="font-bold">
                            {rooms ? (
                                rooms.map((room, index) => (
                                    <p
                                        key={index}
                                        className="font-xs text-left"
                                    >
                                        <Link
                                            to={`/reservation-details/${_id}`}
                                        >
                                            {room.name}
                                        </Link>
                                    </p>
                                ))
                            ) : (
                                <div>ICSMH</div>
                            )}
                        </div>
                        <div className="text-gray-500 text-xs">{startDate}</div>
                    </div>
                    <div className="flex col-span-2 flex-col ml-4 items-start justify-center">
                        <Link
                            to={`/reservation-details/${_id}`}
                            className="text-small text-left"
                        >
                            {eventName.length < 30
                                ? eventName
                                : eventName.slice(0, 33) + "..."}
                        </Link>
                        <div className="text-gray-500 text-left text-xs">
                            {userName}
                        </div>
                    </div>
                    <div className="flex col-span-1 flex-col ml-4 items-start justify-center">
                        <div className="text-gray-500 text-xs">Date Start</div>
                        <div className="font-bold text-xs">
                            {startDate
                                ? startDate
                                : recurrencePattern &&
                                  recurrencePattern.startDate}
                        </div>
                    </div>
                    <div className="flex col-span-1 flex-col ml-4 items-start justify-center">
                        <div className="text-gray-500 text-xs">Date End</div>
                        <div className="font-bold text-xs">
                            {endDate
                                ? endDate
                                : recurrencePattern &&
                                  recurrencePattern.endDate}
                        </div>
                    </div>
                    <div className="flex col-span-1/2 flex-col ml-4 items-start justify-center">
                        <div className="text-gray-500 text-xs">Time Start</div>
                        <div className="font-bold">{timeStart}</div>
                    </div>
                    <div className="flex col-span-1/2 flex-col ml-4 items-start justify-center">
                        <div className="text-gray-500 text-xs">Time End</div>
                        <div className="font-bold">{timeEnd}</div>
                    </div>
                    <div className="flex col-span-1 flex-col w-full ml-4 items-center justify-center">
                        <div className="text-gray-500 text-wrap text-xs">
                            Affiliation
                        </div>
                        <div className="font-bold text-xs lg:text-small text-wrap">
                            {companyName ? companyName : "N/A"}
                        </div>
                    </div>
                    {/* buttons */}
                    <div className="flex ml-2 overflow-hidden w-full col-span-3 items-center flex-row justify-end">
                        {isLoading && (
                            <LoadingAnimation isReservationItem={true} />
                        )}
                        { 
                            (status === "Awaiting Approval") ? (
                                <>
                                    <div className="flex flex-row items-center justify-between space-x-3 w-full ml-4">
                                        <>
                                        {
                                            (pdfExists || imageExists) && (!isLoading) &&
                                            <div className="flex-start">
                                                <select
                                                    value=""
                                                    style={{ borderRadius: "8px" }}
                                                    className="border-brics-blue text-2xs"
                                                    onChange={(e) => {
                                                        viewFile(e.target.value)
                                                    }}
                                                >
                                                    <option value="">
                                                        View file
                                                    </option>
                                                    {
                                                        pdfExists &&
                                                        <option value="loi">
                                                            View LOI
                                                        </option>
                                                    }
                                                    {
                                                        imageExists &&
                                                        <option value="pop">
                                                            View POP
                                                        </option>
                                                    }
                                                </select>
                                            </div>
                                        }
                                        </>

                                        <div className="flex gap-2 ml-auto">
                                            <ReservationItemButton
                                                bgColor="bg-brics-blue"
                                                setDisable={disableButton}
                                                buttonText="Approve"
                                                setValue={handleAccept}
                                                resId={_id}
                                                textColor="text-white"
                                                actionText={"Approve"}
                                                headerText={"Are you sure you want to approve this reservation?"}
                                                descriptionText={"This reservation will be moved to Pending Payment."}
                                                showEditAlert={showEditAlert}
                                                setShowEditAlert={setShowEditAlert}
                                            />
                                            <ReservationItemButton
                                                resId={_id}
                                                setDisable={disableButton}
                                                bgColor="bg-custom-red"
                                                buttonText="Reject"
                                                textColor="text-white"
                                                setValue={handleReject}
                                                actionText={"Reject"}
                                                headerText={"Are you sure you want to reject this reservation?"}
                                                descriptionText={"This reservation will be rejected."}
                                                showEditAlert={showEditAlert}
                                                setShowEditAlert={setShowEditAlert}
                                            />
                                        </div>
                                    </div>
                                    {showFail && <SnackBar field={snackFail} />}
                                </>
                            ) : status === "Finalized" ? (
                                <>
                                    <div className="flex flex-row items-center space-x-3 w-full ml-4 justify-between">
                                        {
                                            (pdfExists || imageExists) && (!isLoading) &&
                                            <div>
                                                <select
                                                    value=""
                                                    style={{ borderRadius: "8px" }}
                                                    className="border-brics-blue text-xs"
                                                    onChange={(e) => {
                                                        viewFile(e.target.value)
                                                    }}
                                                >
                                                    <option value="">
                                                        View file
                                                    </option>
                                                    {
                                                        pdfExists &&
                                                        <option value="loi">
                                                            View LOI
                                                        </option>
                                                    }
                                                    {
                                                        imageExists &&
                                                        <option value="pop">
                                                            View POP
                                                        </option>
                                                    }
                                                </select>
                                            </div>
                                        }

                                        <div style={{marginLeft: "auto"}}>
                                            <ReservationItemButton
                                                setDisable={disableButton}
                                                bgColor="bg-custom-red"
                                                buttonText="Cancel"
                                                setValue={handleCancel}
                                                resId={_id}
                                                textColor="text-white"
                                                actionText={"Yes"}
                                                headerText={"Are you sure you want to cancel this reservation?"}
                                                descriptionText={"This reservation will be cancelled."}
                                                showEditAlert={showEditAlert}
                                                setShowEditAlert={setShowEditAlert}
                                            />
                                        </div>
                                    </div>

                                    {showFail && <SnackBar field={snackFail} />}
                                </>
                            ) : status === "Pending Payment" ? (
                                <>
                                    <div className="flex flex-row items-center space-x-3 w-full justify-between ml-4">
                                        <>
                                            {
                                            (pdfExists || imageExists) && (!isLoading) &&
                                                <div className="flex-start">
                                                    <select
                                                        value=""
                                                        style={{ borderRadius: "8px" }}
                                                        className="border-brics-blue text-xs"
                                                        onChange={(e) => {
                                                            viewFile(e.target.value)
                                                        }}
                                                    >
                                                        <option value="">
                                                            View file
                                                        </option>
                                                        {
                                                            pdfExists &&
                                                            <option value="loi">
                                                                View LOI
                                                            </option>
                                                        }
                                                        {
                                                            imageExists &&
                                                            <option value="pop">
                                                                View POP
                                                            </option>
                                                        }
                                                    </select>
                                                </div>
                                            }
                                        </>
                                        <div className="flex gap-2 ml-auto">
                                            <ReservationItemButton
                                                setDisable={disableButton}
                                                bgColor="bg-brics-blue"
                                                buttonText="Finalize"
                                                setValue={handleConfirm}
                                                resId={_id}
                                                textColor="text-white"
                                                actionText={"Finalize"}
                                                headerText={"Are you sure you want to finalize this reservation?"}
                                                descriptionText={"This reservation will be finalized."}
                                                showEditAlert={showEditAlert}
                                                setShowEditAlert={setShowEditAlert}
                                            />
                                            <ReservationItemButton
                                                setDisable={disableButton}
                                                bgColor="bg-custom-red"
                                                buttonText="Cancel"
                                                setValue={handleCancel}
                                                resId={_id}
                                                textColor="text-white"
                                                actionText={"Yes"}
                                                headerText={"Are you sure you want to cancel this reservation?"}
                                                descriptionText={"This reservation will be cancelled."}
                                                showEditAlert={showEditAlert}
                                                setShowEditAlert={setShowEditAlert}
                                            />
                                        </div>
                                    </div>
                                    {showFail && <SnackBar field={snackFail} />}
                                </>
                            ) : (
                                <>
                                    <div className="flex flex-row items-center space-x-3 w-full justify-between ml-4">
                                        {
                                            (pdfExists || imageExists) && (!isLoading) &&
                                            <div className="flex-start">
                                                <select
                                                    value=""
                                                    style={{ borderRadius: "8px" }}
                                                    className="border-brics-blue text-xs"
                                                    onChange={(e) => {
                                                        viewFile(e.target.value)
                                                    }}
                                                >
                                                    <option value="">
                                                        View file
                                                    </option>
                                                    {
                                                        pdfExists &&
                                                        <option value="loi">
                                                            View LOI
                                                        </option>
                                                    }
                                                    {
                                                        imageExists &&
                                                        <option value="pop">
                                                            View POP
                                                        </option>
                                                    }
                                                </select>
                                            </div>
                                        }
                                    </div>
                                </>
                            )
                        }
                        { isRejected ? (
                            <div className="flex flex-col justify-center">
                                {showReject && <SnackBar field={snackReject} />}
                            </div>
                        ) : isAccepted ? (
                            <div className="flex flex-col justify-center">
                                {showAccept && <SnackBar field={snackAccept} />}
                            </div>
                        ) : isCanceled ? (
                            <div className="flex flex-col justify-center">
                                {showCancel && <SnackBar field={snackCancel} />}
                            </div>
                        ) : isConfirmed ? (
                            <div className="flex flex-col justify-center">
                                {showConfirm && (
                                    <SnackBar field={snackConfirm} />
                                )}
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}
