import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ReservationFilter from "../components/ReservationFilter";
import ReservationItemUser from "../components/ReservationItemUser";
import StatusIndicator from "../components/Status";
import Loading from "./Loading";
import EmptyState from "../components/EmptyState";
// import Footer from "../components/Footer";
// import ReservationFilter from "../components/ReservationFilter";
import { Link, useNavigate } from "react-router-dom";

export default function TrackReservation() {
    // const { email } = location.state;
    const [reservations, setReservations] = useState(null);
    const [searchResults, setSearchResults] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [dateSorter, setDateSorter] = useState("");
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [resLoading, setResLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        // const fetchUserData = async () => {
        //   await axios
        //     .get("https://brics-api.vercel.app/api/sign-in/protected", {
        //       withCredentials: true,
        //     })
        //     .then((response) => {
        //       // console.log("User data fetched successfully in Nav bar:");
        //       if (response.data.success !== false) {
        //         setIsLoggedIn(true);
        //         setUser(response.data);
        //       } else {
        //         setIsLoggedIn(false);
        //         setUser(null);
        //       }
        //     })
        //     .catch((error) => {
        //       setUser(null);
        //       setIsLoggedIn(false);
        //     });
        // };
        // fetchUserData();
        if(!window.localStorage.getItem("user")){
            navigate("/unauthorized", { replace: true });
            setUser(null);
            setIsLoggedIn(false);

        }else{
            setIsLoggedIn(true);
            setUser(JSON.parse(window.localStorage.getItem("user")));
        }
      }, []); 

    // get all reservations
    useEffect(() => {
        const getReservations = async () => {
            try {
                const response = await axios.get(`https://brics-api.vercel.app/api/reservations/get-all-reservations-user/${user.email}`, { withCredentials: true });
                const newReservations = response.data;

                const roomResponse = await axios.get(
                    "https://brics-api.vercel.app/api/rooms/get-all-rooms"
                );
                const newRooms = roomResponse.data;

                if (newReservations && roomResponse) {
                    newReservations.forEach((reservation) => {
                        const reservationRooms = reservation.rooms;
                        if (reservationRooms.length > 0) {
                            reservationRooms.forEach((room, index) => {
                                for (let newRoom of newRooms) {
                                    if (newRoom._id === room) {
                                        reservation.rooms[index] = newRoom.name;
                                        break;
                                    }
                                }
                            });
                        }
                    });
                }
                setReservations(newReservations);
                setSearchResults(newReservations);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                // console.log(error);
            }
        }

        getReservations();

    }, [user])

    // for search, filter and sorting
    useEffect(() => {
        if (reservations) {
            setResLoading(true);
            const updatedReservations = reservations.filter(
                reservation =>
                    reservation.eventName.toLowerCase().includes(searchQuery.toLowerCase())
                    && reservation.status.includes(statusFilter)
            );

            // sort if applicable
            if (dateSorter === "earliest_first") {
                updatedReservations.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
            } else if (dateSorter === "latest_first") {
                updatedReservations.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
            }

            setSearchResults(updatedReservations);
            setResLoading(false);
        }
    }, [searchQuery, statusFilter, dateSorter, reservations]);

    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [isDateOpen, setIsDateOpen] = useState(false);

    const toggleStatus = () => {
        setIsStatusOpen(!isStatusOpen);
    };

    const toggleDate = () => {
        setIsDateOpen(!isDateOpen);
    }

    const handleStatus = (criteria) => {
        setStatusFilter(criteria);
        setIsStatusOpen(false);
    };

    const handleDate = (criteria) => {
        setDateSorter(criteria);
        setIsDateOpen(false);
    };

    //
    const facultyStatusOptions = [
        { optionText: "Awaiting Approval", optionValue: "Awaiting Approval" },
        { optionText: "Rejected/Cancelled", optionValue: "Rejected" },
        { optionText: "Finalized", optionValue: "Finalized" }
    ];

    const generalStatusOptions = [
        { optionText: "Awaiting Approval", optionValue: "Awaiting Approval" },
        { optionText: "Pending Payment", optionValue: "Pending Payment" },
        { optionText: "Rejected/Cancelled", optionValue: "Rejected" },
        { optionText: "Finalized", optionValue: "Finalized" }
    ];

    const statusOptions = user?.userClass === "faculty" ? facultyStatusOptions : generalStatusOptions;

    return (
        <div className="bg-backgroundColor w-full">
            <Navbar />
            {isLoading ? (
                <Loading/>
            ):(
            <div className="min-h-screen p-5 m-5 w-full">
                <div className="flex flex-row items-center gap-3 my-8 lg:text-start lg:w-full">
                    <div className="text-brics-blue mt-16 font-satoshi-bold text-3xl">Track Reservation</div>
                </div>
                <div className="flex flex-col items-center gap-4 lg:w-full">
                    <div className="flex flex-row items-left gap-4 lg:w-full">
                        <div className="grid grid-flow-col w-1/3 gap-2 mb-10">
                            <input className="w-full border-brics-blue" type="text" onChange={(e) => { setSearchQuery(e.target.value) }} placeholder="Search" style={{ borderRadius: "8px" }} />
                        </div>
                        <div className="grid grid-flow-col w-full gap-2 mb-10">
                            <ReservationFilter toggleDropdown={toggleStatus} isOpen={isStatusOpen} handleSort={handleStatus} filterLabel={"Filter by Status"} filterOptions={statusOptions} />
                        </div>
                        <div className="grid grid-flow-col w-full gap-2 mb-10">
                            <ReservationFilter toggleDropdown={toggleDate} isOpen={isDateOpen} handleSort={handleDate} filterLabel={"Sort by Date"} filterOptions={[
                                { optionText: "Earliest first", optionValue: "earliest_first" },
                                { optionText: "Latest first", optionValue: "latest_first" }
                            ]} />
                        </div>
                    </div>
                    <div className="lg:w-full mb-14 flex flex-row justify-between">
                        <div className="grid grid-cols-4 lg:flex lg:flex-row lg:gap-8 lg:justify-start lg:w-full">
                            <div className="cols-span-1 flex">
                                <StatusIndicator status="awaiting_approval" label="Awaiting Approval" />
                            </div>
                            {user?.userClass !== "faculty" && (
                                <div className="cols-span-1 flex">
                                    <StatusIndicator status="pending" label="Pending Payment" />
                                </div>
                            )}
                            <div className="cols-span-1 flex">
                                <StatusIndicator status="rejected" label="Rejected/Cancelled" />
                            </div>
                            <div className="cols-span-1 flex">
                                <StatusIndicator status="finalized" label="Finalized" />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row w-full">
                        <div className="w-full">
                            {  resLoading ? (
                                <Loading/>
                            ) : (
                                searchResults ?
                                    (
                                        searchResults.length > 0 ?
                                            searchResults.map((item, index) => {
                                                return (
                                                    <div className="mb-6" key={index}>
                                                        <ReservationItemUser {...item} />
                                                    </div>
                                                )
                                            }
                                            ) : <EmptyState
                                                message="You don't have any reservations to track. Create your first reservation now!"
                                                linkText="Go to Rooms"
                                                link="/browsing-room"
                                                />
                                    ) : <div className="flex ml-[570px] absolute top-0 flex-row">...</div>
                            )
                            }
                        </div>
                    </div>
                </div>
            </div>
            )}
            <Footer />
        </div>
    );
}