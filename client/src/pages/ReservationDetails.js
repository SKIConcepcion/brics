import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/SideBar";
import BackBtn from "../components/BackBtn";
import ReservationStepper from "../components/Stepper";
import Loading from "./Loading";

export default function ReservationDetails() {
  const { id } = useParams();
  const [reservationDetails, setReservationDetails] = useState(null);
  const [showProofOfPayment, setShowProofOfPayment] = useState(false);
  const [roomNames, setRoomNames] = useState([]);
  const navigate = useNavigate();
  const [pdfExists, setPdfExists] = useState(false);
  const [imageExists, setImageExists] = useState(false);

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAccepted, setIsAccepted] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    useEffect(() => {
    //   const fetchUserData = async () => {
    //     await axios
    //       .get("https://brics-api.vercel.app/api/sign-in/protected", {
    //         withCredentials: true,
    //       })
    //       .then((response) => {
    //         // console.log("User data fetched successfully:");
    //         if (response.data != "Unauthorized") {
    //           if(response.data.userClass == "student_org" || response.data.userClass == "faculty"){
    //             navigate("/unauthorized", { replace: true });
    //           }
    //           setIsLoggedIn(true);
    //           setUser(response.data);
    //         } else {
    //           navigate("/unauthorized", { replace: true });
    //           setIsLoggedIn(false);
    //           setUser(null);
    //         }
    //       })
    //       .catch((error) => {
    //           navigate("/unauthorized", { replace: true });
    //           setUser(null);
    //           setIsLoggedIn(false);
    //       });

    //   setLoading(false);
    // };

    // fetchUserData();
    if(!window.localStorage.getItem("user") || ["student_org","faculty"].includes(JSON.parse(window.localStorage.getItem("user")).userClass)){
      navigate("/unauthorized", { replace: true });
      setIsLoggedIn(false);
      setUser(null);
    }else{
      setIsLoggedIn(true);
      setUser(JSON.parse(window.localStorage.getItem("user")));
    }
    setLoading(false);
  }, []);

  // get reservation details
  useEffect(() => {
    const getReservationDetails = async () => {
      try {
        const response = await axios.get(
          `https://brics-api.vercel.app/api/reservations/get-reservation/${id}`,
          { withCredentials: true }
        );
        const newData = response.data;
        setReservationDetails(newData);

        // check if pdf or image exists in the file
        if (newData) {
          console.log(newData.files.some((file) => file.endsWith(".pdf")));
          setPdfExists(newData.files.some((file) => file.endsWith(".pdf")));
          setImageExists(newData.files.some((file) => !file.endsWith(".pdf")));
        }
      } catch (error) {
        //console.log(error);
      }
    };
    getReservationDetails();
  }, [id]);

  // get room names
  useEffect(() => {
    const getRoomNames = async () => {
      const newRoomNames = [];
      for (let roomId of reservationDetails.rooms) {
        try {
          const response = await axios.get(
            `https://brics-api.vercel.app/api/rooms/get-room/${roomId}`
          );
          console.log(response);
          newRoomNames.push(response.data.name);
        } catch (error) {
          //console.log(error);
        }
      }
      setRoomNames(newRoomNames);
    };

    if (reservationDetails) {
      getRoomNames();
    }
  }, [reservationDetails]);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `https://brics-api.vercel.app/api/reservations/delete-reservation/${id}`,
        { withCredentials: true }
      );
      //console.log(response);
      navigate("/reservation-management");
    } catch (error) {
      //console.log(error);
    }
  };
  const handleAccept = async () => {
    if (user && user.email) {
      try {
        const response = await axios.put(
          `https://brics-api.vercel.app/api/reservations/update-reservation-status/${id}`,
          {
            userClass: "admin",
            status: "Pending Payment",
            actionMade: "Approved",
            actionBy: user.email,
          },
          { withCredentials: true }
        );

        if (response.status === 200) {
          setIsAccepted(true);
        }
        console.log(response);
        navigate("/reservation-management");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleFinalize = async () => {
    if (user && user.email) {
      try {
        const response = await axios.put(
          `https://brics-api.vercel.app/api/reservations/update-reservation-status/${id}`,
          {
            userClass: "admin",
            status: "Finalized",
            actionMade: "Finalized",
            actionBy: user.email,
          },
          { withCredentials: true }
        );
        console.log(response);
        navigate("/reservation-management");

        if (response.status === 200) {
          setIsConfirmed(true);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <Sidebar />
      {reservationDetails ? (
        <div>
          <div className="flex mt-3" style={{ marginLeft: "295px" }}>
            <div className="flex flex-row gap-3 items-center">
              <BackBtn />
              <div className="flex flex-col justify-start">
                <p className="text-3xl font-bold text-brics-blue">
                  {reservationDetails.eventName}
                </p>
                <div className="flex flex-row">
                  {roomNames &&
                    roomNames.length > 0 &&
                    roomNames.map((roomName, index) => (
                      <div key={index}>{roomName}</div>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col items-center">
            <div className="font-satoshi my-10" style={{ marginLeft: "380px" }}>
              <ReservationStepper status={reservationDetails.status} />
            </div>
            <div>
              <p
                style={{ marginLeft: "200px" }}
                className="text-3xl text-brics-blue"
              >
                Reservation Details
              </p>
            </div>
            <div
              style={{ marginLeft: "480px" }}
              className="gap-10 mx-10 lg:w-3/4 lg:px-20 lg:mt-10 lg:flex lg:flex-col lg:items-center px-20"
            >
              <div className="w-full">
                <div className="flex flex-row w-full">
                  <div className="text-left w-2/4 flex flex-col">
                    <div>
                      <strong>Event name:</strong>{" "}
                      {reservationDetails.eventName}
                    </div>
                    <div>
                      <strong>Inquiry type:</strong> {reservationDetails.type}
                    </div>
                    <div>
                      <strong>Email:</strong> {reservationDetails.userEmail}
                    </div>
                    {/* <div>
                                            <strong>Organization:</strong>
                                            {reservationDetails.companyName}
                                        </div> */}
                    <div>
                      <strong>Date:</strong> {reservationDetails.startDate} -{" "}
                      {reservationDetails.endDate}
                    </div>
                    <div>
                      <strong>Time:</strong> {reservationDetails.timeStart} -{" "}
                      {reservationDetails.timeEnd}
                    </div>
                  </div>
                  <div className="text-left flex flex-col">
                    {reservationDetails.userPosition && (
                      <div>
                        <strong>Position: </strong>
                        {reservationDetails.userPosition}
                      </div>
                    )}

                    {reservationDetails.contactNumber && (
                      <div>
                        <strong>Contact number: </strong>{" "}
                        {reservationDetails.contactNumber}
                      </div>
                    )}
                    <div>
                      <strong>Target Venue/s: </strong>
                      {roomNames &&
                        roomNames.length > 0 &&
                        roomNames.map((roomName, index) => (
                          <div key={index}>{roomName}</div>
                        ))}
                    </div>
                  </div>
                </div>
                <div className="text-left w-2/4 my-10">
                  <strong>Description:</strong> {reservationDetails.description}
                </div>
                <div className="flex flex-row gap-3">
                  {pdfExists === true && (
                    <button
                      onClick={() => {
                        setShowProofOfPayment(false);
                      }}
                      className={
                        "px-16 rounded-md py-1 text-white " +
                        (showProofOfPayment
                          ? "bg-brics-blue"
                          : "bg-custom-gray")
                      }
                    >
                      View LOI
                    </button>
                  )}
                  {imageExists && (
                    <button
                      onClick={() => {
                        setShowProofOfPayment(true);
                      }}
                      className={
                        "px-16 rounded-md py-1 text-white " +
                        (showProofOfPayment
                          ? "bg-custom-gray"
                          : "bg-brics-blue")
                      }
                    >
                      View POP
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      handleDelete(e);
                    }}
                    className={"px-16 rounded-md py-1 text-white bg-red-500"}
                  >
                    Delete
                  </button>
                  {reservationDetails.status === "Awaiting Approval" && (
                    <button
                      onClick={handleAccept}
                      className="px-16 rounded-md py-1 text-white bg-purple-500"
                    >
                      Accept
                    </button>
                  )}
                  {reservationDetails.status === "Pending Payment" && (
                    <button
                      onClick={handleFinalize}
                      className="px-16 rounded-md py-1 text-white bg-blue-900"
                    >
                      Finalize
                    </button>
                  )}
                </div>
                <div className="my-10">
                  {showProofOfPayment && imageExists ? (
                    <p className="font-satoshi-bold text-small text-start text-xl">
                      Proof of payment
                    </p>
                  ) : !showProofOfPayment && pdfExists ? (
                    <p className="font-satoshi-bold text-small text-start text-xl">
                      Letter of Intent
                    </p>
                  ) : null}

                  {showProofOfPayment
                    ? reservationDetails.files &&
                      reservationDetails.files.length > 0 &&
                      reservationDetails.status !== "Rejected" &&
                      reservationDetails.files.map((file, index) => (
                        <div key={index}>
                          {!file.endsWith(".pdf") && (
                            <img
                              className="w-80 rounded-md"
                              src={file}
                              alt="Proof of payment"
                            />
                          )}
                        </div>
                      ))
                    : reservationDetails.files &&
                      reservationDetails.files.length > 0 &&
                      reservationDetails.files.map((file, index) => (
                        <div key={index}>
                          {file.endsWith(".pdf") && (
                            <object
                              type="application/pdf"
                              data={file}
                              width={800}
                              height={800}
                            >
                              Your browser either does not support PDF or the
                              file uploaded by the user is not in a PDF format.
                            </object>
                          )}
                        </div>
                      ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Loading />
        </div>
      )}
    </div>
  );
}