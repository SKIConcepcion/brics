import React, { useState, useEffect } from "react";
import Sidebar from "../components/SideBar";
import { SearchBox } from "../components/SearchBox";
import SortFilter from "../components/SortFilter";
import RoomCard from "../components/RoomCard2";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import BackBtn from "../components/BackBtn";

const convertMongoTypes = (obj) => {
  const newObj = {};
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (
        typeof value === "object" &&
        ("$numberInt" in value ||
          "$numberLong" in value ||
          "$numberDouble" in value)
      ) {
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

export default function RoomManagement() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("Room Name");
  const [order, setOrder] = useState("asc");
  const [isLoading, setIsLoading] = useState(true);

  const handleSort = (option) => {
    setSortOption(option);
  };

  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // const fetchUserData = async () => {
    //   await axios
    //     .get("https://brics-api.vercel.app/api/sign-in/protected", {
    //       withCredentials: true,
    //     })
    //     .then((response) => {
    //       if (response.data !== "Unauthorized") {
    //         if (response.data.userClass === "student_org" || response.data.userClass === "faculty") {
    //           navigate("/unauthorized", { replace: true });
    //         }
    //         setUser(response.data);
    //       } else {
    //         navigate("/unauthorized");
    //         setUser(null);
    //       }
    //     })
    //     .catch((error) => {
    //       navigate("/unauthorized");
    //       setUser(null);
    //     });

    //   setIsLoading(false);
    // };

    // fetchUserData();
    if(!window.localStorage.getItem("user") || ["student_org","faculty"].includes(JSON.parse(window.localStorage.getItem("user")).userClass)){
      navigate("/unauthorized", { replace: true });
      setUser(null);
    }else{
        setUser(JSON.parse(window.localStorage.getItem("user")));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const getRooms = async () => {
      try {
        const response = await axios.get(
          "https://brics-api.vercel.app/api/rooms/get-all-rooms", { withCredentials: true }
        );
        const rooms = response.data.map(convertMongoTypes);
        setRooms(rooms);
      } catch (error) {
        console.error(error);
      }
    };
    getRooms();
  }, []);

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

  const sortByProps = {
    label: "Sort by",
    options: ["Room Name", "Capacity", "Reservation Cost"],
  };

  return (
    <div>
      <Sidebar />
      {isLoading ? (
        <div style={{ marginLeft: MarginLeft }}>
          <Loading />
        </div>
      ) : (
        <div className="flex content-start">
          <div className="flex-col w-full mr-10" style={{ marginLeft: MarginLeft }}>
            <div className="flex flex-row items-center justify-between gap-3 my-8 lg:w-full">
              <div className="flex flex-row items-center gap-2">
                <BackBtn />
                <div className="text-3xl font-bold text-brics-blue">
                  Rooms
                </div>
              </div>
              <div className="flex gap-x-10">
                <SearchBox searchText={searchTerm} setSearchText={setSearchTerm} />
                <SortFilter sortBy={sortOption} setSortBy={setSortOption} order={order} setOrder={setOrder} />
              </div>
            </div>

            <div className="container mx-auto flex flex-wrap justify-center items-stretch overflow-hidden mt-10">
              <div className="flex flex-wrap w-full gap-10 mb-10">
                {rooms
                  .filter((room) =>
                    room.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .sort((a, b) => {
                    if (sortOption === 'name') {
                      return order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
                    } else if (sortOption === 'seatingCapacity') {
                      return order === 'asc' ? a.seatingCapacity - b.seatingCapacity : b.seatingCapacity - a.seatingCapacity;
                    } else if (sortOption === 'reservationFee') {
                      return order === 'asc' ? a.reservationFee - b.reservationFee : b.reservationFee - a.reservationFee;
                    }
                  })
                  .map((room, index) => {
                    return (
                      <Link
                        to={{
                          pathname: `/room/${room._id}`,
                          state: { room: room },
                        }}
                        key={index}
                      >
                        <RoomCard room={room} />
                      </Link>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center; /* Center cards horizontally */
        }
        .container .flex-wrap {
          justify-content: center; /* Center cards in the flex container */
        }
      `}</style>
    </div>
  );
}
