import { useEffect, useState  } from "react";

import RoomCard from '../components/RoomCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchBoxCards from '../components/SearchBoxCards';
import SortFilterCards from '../components/SortFilterCards';
import Amenities from '../components/Amenities';
import PaginationCards from "../components/PaginationCards";
import axios from "axios";
import { handleDownloadPDF } from "../components/DownloadPDF";
import Loading from "./Loading";
import Toast from '../components/Toast';


// function to convert MongoDB-specific types to regular JavaScript types
const convertMongoTypes = (obj) => {
  const newObj = {};
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      // check if the value is an object and has MongoDB-specific keys
      if (
        typeof value === "object" &&
        ("$numberInt" in value ||
          "$numberLong" in value ||
          "$numberDouble" in value)
      ) {
        // convert MongoDB-specific types to regular JavaScript types
        newObj[key] =
          parseInt(value.$numberInt) ||
          parseInt(value.$numberLong) ||
          parseFloat(value.$numberDouble);
      } else {
        newObj[key] = value;
      }
    }
  }
  return newObj;
};

export default function BrowsingRoom() {

  const [isLoading, setIsLoading] = useState(true);
  const [showLoggedInToast, setShowLoggedInToast] = useState(false);
  
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

      //   // setIsLoading(false);
      // };
      // fetchUserData();
      if(!window.localStorage.getItem("user")){
        setIsLoggedIn(false);
        setUser(null);
      }else{
        setIsLoggedIn(true);
        // Check if the toast has been shown before
        const hasShownToast = window.localStorage.getItem("hasShownLoggedInToast");
        if (!hasShownToast) {
          // If the toast hasn't been shown, set the state to show it
          setShowLoggedInToast(true);
          // Also, set a flag in localStorage to indicate that the toast has been shown
          window.localStorage.setItem("hasShownLoggedInToast", "true");
        }
        setUser(JSON.parse(window.localStorage.getItem("user")));
      }
    }, []); 
  

  // console.log("In browsing room user",user);
    const [rooms, setRooms] = useState([]);
    const [sortBy, setSortBy] = useState("name");
    const [order, setOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    const handleCloseToast = () => {
      setShowLoggedInToast(false); // Close the success toast
    };

// Function to handle sorting
const sortRooms = (rooms, sortBy, order) => {
  let sortedRooms = [...rooms];
  switch (sortBy) {
      case "reservationFee":
      case "computerFee":
      case "seatingCapacity":
      case "mic":
      case "speakers":
      case "computerCount":
          sortedRooms = sortedRooms.sort((a, b) => {
              if (order === "asc") {
                  return a[sortBy] - b[sortBy];
              } else {
                  return b[sortBy] - a[sortBy];
              }
          });
          break;
      case "name":
          sortedRooms = sortedRooms.sort((a, b) => {
              if (order === "asc") {
                  return a.name.localeCompare(b.name);
              } else {
                  return b.name.localeCompare(a.name);
              }
          });
          break;
      default:
          break;
  }
  return sortedRooms;
};

     // get all rooms
     useEffect(() => {
        const getRooms = async () => {
            try {
                const response = await axios.get("https://brics-api.vercel.app/api/rooms/get-all-rooms", {withCredentials: true});
                let rooms = response.data.map(convertMongoTypes);
                // console.log(rooms);
                // on first page reload, sorts room by default (name, asc)
                rooms = sortRooms(rooms, sortBy, order);
                setRooms(rooms);
                setIsLoading(false);
            } catch (error) {
                // console.log(error);
                setIsLoading(false);
            }
        };

        getRooms();
    }, [sortBy, order]);

    // Filter rooms based on search query
    const filteredRooms = rooms.filter(room =>
        room.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // useEffect(() => {
    //     setRooms(sortRooms());
    // }, [sortBy, order]);   
    
    // Update sorted rooms when sortBy or order changes
    useEffect(() => {
      let sortedRooms = sortRooms(rooms, sortBy, order);
      setRooms(sortedRooms);
    }, [sortBy, order]);

     // Handle page change
    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    const cardsPerPage = 9;
    const totalPages = Math.ceil(rooms.length / cardsPerPage);
    
    const link = '/room-schedule'; //"TODO: Fetch usertype and create a condition to switch the link between 'Inquiry' and 'Room Schedule'"

    if(isLoading){
      return Loading();
    }
    return (
        <div>
          <Navbar />
          <div className="flex flex-col items-center mt-20">
          <div className= "max-w-[100%] w-full">
            <div className="max-w-[100%] w-full px-16">
              <div className="flex justify-between items-center">
                <div className="text-left text-brics-blue text-5xl py-14 pt-9 font-bold">Rooms</div>
                <div className="flex justify-between items-center">
                  <div className="min-w-[130px] ml-3 mr-2">
                    <SearchBoxCards setSearchQuery={setSearchQuery} />
                  </div>
                  <div className="min-w-[100px] w-60 ml-1">
                    <SortFilterCards sortBy={sortBy} setSortBy={setSortBy} order={order} setOrder={setOrder} />
                  </div>
                  <div>
                    <button className="text-white text-sm bg-brics-blue border border-brics-blue ml-3 py-1 px-8 rounded-full flex flex-row hover:bg-white hover:text-brics-blue hover:border hover:border-brics-blue" onClick={handleDownloadPDF}><svg class="lucide lucide-download size-5 mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>Download Rooms PDF</button>
                  </div>
                </div>
              </div>
              <div className="mr-70 pb-10">
                <Amenities />
              </div>
              <div className="container mx-auto flex flex-wrap justify-center items-stretch" style={{ display: 'flex', justifyContent: 'space-around' }}>
                {filteredRooms.length === 0 && searchQuery !== '' ? (
                 <div className="text-center text-[24px] flex justify-center items-center mb-10" style={{ display:'container', fontFamily: 'Satoshi-bold', paddingBottom: '20px',minHeight:'400px',minWidth: '100%' }}>
                    No Results Found.
                    </div>
                ) : (
                  <div className="grid gap-x-20 gap-y-8 grid-cols-3" style={{ display: 'grid', gridAutoRows: 'auto', gap: '80px', justifyItems: 'space-around', alignItems: 'start', paddingBottom: '80px' }}>
                    {filteredRooms.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage).map((room, index) => (
                      <RoomCard key={index} room={room} link={link + "/" + room._id} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          
          <div className="pb-10">
            <PaginationCards currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
          </div>
      
          <style jsx>{`
            @media (max-width: 820px) {
              .grid {
                grid-template-columns: repeat(1, minmax(0, 1fr));
                gap: 20px;
              }
            }
            @media (min-width: 821px) and (max-width: 1024px) {
              .grid {
                grid-template-columns: repeat(2, minmax(0, 1fr));
                gap: 40px;
              }
            }
            @media (min-width: 1025px) {
              .grid {
                grid-template-columns: repeat(3, minmax(0, 1fr));
                gap: 90px;
              }
            }
          `}</style>
          </div>
          <Footer />
          {showLoggedInToast && (
                <div className="fixed bottom-10 right-10">
                    <Toast text={"You are now logged in as " + user.nickname} onClose={handleCloseToast}  />
                </div>
            )}

        </div>
      );
      
}