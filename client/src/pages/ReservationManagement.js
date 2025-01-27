import { useEffect, useState } from "react";
import ReservationItem from "../components/ReservationItem";
// import SearchBox from "../components/SearchBox";
import Sidebar from "../components/SideBar";
import BackBtn from "../components/BackBtn";
import StatusIndicator from "../components/Status";
import axios from "axios";
// import { Link } from "react-router-dom";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";

export default function ReservationManagement() {
    const [reservations, setReservations] = useState(null);
    const [searchResults, setSearchResults] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [dateSorter, setDateSorter] = useState("");
    const [documentsFilter, setDocumentsFilter] = useState("");
    const [reservationTypeFilter, setReservationTypeFilter] = useState("");
    const [roomList, setRoomList] = useState([]); // will be used for filtering by rooms
    const [roomFilter, setRoomFilter] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
        let updatedReservations = null;

    // const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const MarginLeft = screenWidth < 1024 ? "40px" : "295px";

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

                //   setIsLoggedIn(true);
                  setUser(response.data);
                  window.localStorage.setItem("user",JSON.stringify(response.data));
                } else {
                  navigate("/unauthorized")
                //   setIsLoggedIn(false);
                  setUser(null);
                }
              })
              .catch((error) => {
                navigate("/unauthorized")
                setUser(null);
                // setIsLoggedIn(false);
              });
            }else{
              setUser(JSON.parse(window.localStorage.getItem("user")));

            }
              setLoading(false);
          };

          fetchUserData();
        // console.log("User data:", JSON.parse(window.localStorage.getItem("user")));
        // if(!window.localStorage.getItem("user") || ["student_org","faculty"].includes(JSON.parse(window.localStorage.getItem("user")).userClass)){
        //     navigate("/unauthorized", { replace: true });
        //     // setIsLoggedIn(false);
        //     setUser(null);
        //   }else{
        //       setUser(JSON.parse(window.localStorage.getItem("user")));
        // }
        // setLoading(false);
    }, []);

    // get all reservations
    useEffect(() => {
        const getReservations = async () => {
            try {
                const response = await axios.get(
                    "https://brics-api.vercel.app/api/reservations/get-all-reservations",
                    {
                        withCredentials: true,
                    }
                );
                const newReservations = response.data;

                if (newReservations) {

                    // get unique names of rooms from the reservations
                    let roomNames = new Set();
                    newReservations.forEach(reservation => {
                        reservation.rooms.forEach(room => {
                            roomNames.add(room.name);
                        })
                    })
                    setRoomList([...roomNames]);

                    setReservations(newReservations);
                    setSearchResults(newReservations);
                }
            } catch (error) {
                //console.log(error);
            }
        };

        getReservations();
    }, []);

    // used to update the status of a single reservation on the frontend side
    const updateReservationStatus = (id, newStatus) => {
        // get the reservation with that id
        for (let reservation of reservations) {
            if (reservation._id === id) {
                reservation.status = newStatus;
                break;
            }
        }

        // update current list
        filterReservations();
    }

    const handleClearFilters = () => {
        setStatusFilter("");
        setReservationTypeFilter("");
        setRoomFilter("");
        setDocumentsFilter("");
        setDateSorter("");
        setSearchQuery("");
    }

    const filterReservations = () => {
        let updatedReservations = null;
        if (reservations) {
            if (documentsFilter === "With Proof of Payment") {
                updatedReservations = reservations.filter(
                    (reservation) =>
                        reservation.eventName
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()) &&
                        reservation.status.includes(statusFilter) &&
                        reservation.type.includes(reservationTypeFilter) &&
                        reservation.rooms.some((room) =>
                            room.name.includes(roomFilter)
                        ) &&
                        reservation.files &&
                        reservation.files.some((file) => !file.endsWith(".pdf"))
                );
            } else if (documentsFilter === "With Letter of Intent") {
                updatedReservations = reservations.filter(
                    (reservation) =>
                        reservation.eventName
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()) &&
                        reservation.status.includes(statusFilter) &&
                        reservation.type.includes(reservationTypeFilter) &&
                        reservation.rooms.some((room) =>
                            room.name.includes(roomFilter)
                        ) &&
                        reservation.files &&
                        reservation.files.some((file) => file.endsWith(".pdf"))
                );
            } else if (documentsFilter === "With LOI and POP") {
                updatedReservations = reservations.filter(
                    (reservation) =>
                        reservation.eventName
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()) &&
                        reservation.status.includes(statusFilter) &&
                        reservation.type.includes(reservationTypeFilter) &&
                        reservation.rooms.some((room) =>
                            room.name.includes(roomFilter)
                        ) &&
                        reservation.files &&
                        reservation.files.some((file) => file.endsWith(".pdf")) &&
                        reservation.files.some((file) => !file.endsWith(".pdf"))
                );
            } else {
                updatedReservations = reservations.filter(
                    (reservation) =>
                        reservation.eventName
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()) &&
                        reservation.status.includes(statusFilter) &&
                        reservation.type.includes(reservationTypeFilter) &&
                        reservation.rooms.some((room) =>
                            room.name.includes(roomFilter)
                        )
                );
            }

            // sort if applicable
            if (dateSorter === "earliest_first") {
                updatedReservations.sort(
                    (a, b) => new Date(a.startDate) - new Date(b.startDate)
                );
            } else if (dateSorter === "latest_first") {
                updatedReservations.sort(
                    (a, b) => new Date(b.startDate) - new Date(a.startDate)
                );
            }

            setSearchResults(updatedReservations);
        }
    }

    // for search, filter and sorting
    useEffect(filterReservations, [
        searchQuery,
        statusFilter,
        reservationTypeFilter,
        dateSorter,
        roomFilter,
        documentsFilter,
        // reservations
    ]);

    return (
        <div className="overflow-hidden">
            <Sidebar />
            {loading ? (
                <div style={{ marginLeft: MarginLeft }}>
                    <Loading />
                </div>
            ) : (
                <div>
                    {searchResults ? (
                        <div className="px-5">
                            <div className="flex flex-row items-center gap-3 my-8 lg:text-start lg:ml-72 lg:w-full">
                                <BackBtn />
                                <div className="text-brics-blue font-satoshi-bold text-3xl">
                                    Reservations
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <div className="grid grid-flow-col w-4/5 gap-2 mb-10 grid-cols-6">
                                    <div className="col-span-1">
                                        <input
                                            className="w-full border-brics-blue"
                                            type="text"
                                            onChange={(e) => {
                                                setSearchQuery(e.target.value);
                                            }}
                                            placeholder="Search"
                                            style={{ borderRadius: "8px" }}
                                        />
                                    </div>
                                    <div className="col-span-4 flex flex-row gap-3">
                                        <div className="col-span-1">
                                            <select
                                                style={{ borderRadius: "8px" }}
                                                className="border-brics-blue"
                                                onChange={(e) => {
                                                    setStatusFilter(
                                                        e.target.value
                                                    );
                                                }}
                                            >
                                                <option value="">
                                                    Filter by status
                                                </option>
                                                <option value="Awaiting Approval">
                                                    Awaiting Approval
                                                </option>
                                                <option value="Pending Payment">
                                                    Pending Payment
                                                </option>
                                                <option value="Finalized">
                                                    Finalized
                                                </option>
                                                <option value="Rejected">
                                                    Rejected
                                                </option>
                                                <option value="Cancelled">
                                                    Cancelled
                                                </option>
                                            </select>
                                        </div>
                                        <div className="col-span-1">
                                            <select
                                                style={{ borderRadius: "8px" }}
                                                className="border-brics-blue"
                                                onChange={(e) => {
                                                    setReservationTypeFilter(
                                                        e.target.value
                                                    );
                                                }}
                                            >
                                                <option value="">
                                                    Filter by Type
                                                </option>
                                                <option value="Inquiry">
                                                    Inquiry
                                                </option>
                                                <option value="Reservation">
                                                    Reservation
                                                </option>
                                            </select>
                                        </div>
                                        <div className="col-span-1">
                                            <select
                                                style={{ borderRadius: "8px" }}
                                                className="border-brics-blue"
                                                onChange={(e) => {
                                                    setDocumentsFilter(
                                                        e.target.value
                                                    );
                                                }}
                                            >
                                                <option value="">
                                                    Filter by Documents
                                                </option>
                                                <option value="With Proof of Payment">
                                                    With Proof of Payment
                                                </option>
                                                <option value="With Letter of Intent">
                                                    With Letter of Intent
                                                </option>
                                                <option value="With LOI and POP">
                                                    With LOI and POP
                                                </option>
                                            </select>
                                        </div>
                                        <div className="col-span-1">
                                            <select
                                                style={{ borderRadius: "8px" }}
                                                className="border-brics-blue"
                                                onChange={(e) => {
                                                    setRoomFilter(
                                                        e.target.value
                                                    );
                                                }}
                                            >
                                                <option value="">
                                                    Filter by Rooms
                                                </option>
                                                {roomList.map((room, index) => (
                                                    <option value={room}>
                                                        {room}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-span-1">
                                            <select
                                                style={{ borderRadius: "8px" }}
                                                className="border-brics-blue"
                                                onChange={(e) => {
                                                    setDateSorter(
                                                        e.target.value
                                                    );
                                                }}
                                            >
                                                <option value="">
                                                    Sort by date
                                                </option>
                                                <option value="earliest_first">
                                                    Earliest first
                                                </option>
                                                <option value="latest_first">
                                                    Latest first
                                                </option>
                                            </select>
                                        </div>
                                        <div className="col-span-1">
                                            <button
                                                className="py-2 x-10 px-3 border border-brics-blue rounded-full text-md bg-white hover:bg-gray-100 text-nowrap justify-center align-middle"
                                                onClick={handleClearFilters}
                                                style={{ borderRadius: "8px", height: "42px"}}
                                            >
                                                Clear Filters
                                            </button>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div className="lg:w-full mb-14 flex flex-row justify-between">
                                    <div className="grid grid-cols-4 lg:flex lg:flex-row lg:gap-8 lg:justify-start lg:w-full lg:ml-72">
                                        <div className="cols-span-1 flex">
                                            <StatusIndicator
                                                status="awaiting_approval"
                                                label="Awaiting Approval"
                                            />
                                        </div>
                                        <div className="cols-span-1 flex">
                                            <StatusIndicator
                                                status="pending"
                                                label="Pending Payment"
                                            />
                                        </div>
                                        <div className="cols-span-1 flex">
                                            <StatusIndicator
                                                status="finalized"
                                                label="Finalized"
                                            />
                                        </div>
                                        <div className="cols-span-1 flex">
                                            <StatusIndicator
                                                status="rejected"
                                                label="Rejected/Cancelled"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-row w-2/3 gap-10">
                                        <div>
                                            <span className="font-satoshi-bold">
                                                POP
                                            </span>{" "}
                                            - Proof of Payment
                                        </div>
                                        <div>
                                            <span className="font-satoshi-bold">
                                                LOI
                                            </span>{" "}
                                            - Letter of Intent
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-row w-full">
                                    <div className="w-full ml-64">
                                        {searchResults ? (
                                            searchResults.length > 0 ? (
                                                searchResults.map(
                                                    (item, index) => {
                                                        return (
                                                            <div
                                                                className="mb-6"
                                                                key={index}
                                                            >
                                                                <ReservationItem
                                                                    {...item}
                                                                    updateReservationStatus={updateReservationStatus}
                                                                />
                                                            </div>
                                                        );
                                                    }
                                                )
                                            ) : (
                                                <div>Data not available.</div>
                                            )
                                        ) : (
                                            <div
                                                style={{
                                                    marginLeft: MarginLeft,
                                                }}
                                            >
                                                <Loading />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div style={{ marginLeft: MarginLeft }}>
                            <Loading />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
