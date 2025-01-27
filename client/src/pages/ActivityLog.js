import React, { useState, useEffect } from "react";
import Sidebar from "../components/SideBar";
import { Table } from "../components/Table";
import Pagination from "../components/Pagination";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dater from "../components/DatePicker";
import Loading from "../pages/Loading";
import BackBtn from "../components/BackBtn";
import EmptyState from "../components/EmptyState";
// import OopsPage from "../pages/OopsPage";
// import OhohPage from "../pages/OhohPage";

export default function ActivityLog() {
//   console.log("User is this in Activity Log", user);
//   console.log("User is Logged:", isLoggedIn);
  const currentDate = new Date();
  const formattedCurrentDate = currentDate.toISOString().split('T')[0];
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const entriesPerPage = 15; // Number of entries to show per page
  // const [selectedUserId, setSelectedUserId] = useState(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [jsonData, setJsonData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Set loading state to true
  const [startDate, setStartDate] = useState(formattedCurrentDate); // State for start date selected by user
  const [endDate, setEndDate] = useState(formattedCurrentDate); // State for end date selected by user

  const [user, setUser] = useState(null);


  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // const fetchUserData = async () => {
    //   await axios
    //     .get("https://brics-api.vercel.app/api/sign-in/protected", {
    //       withCredentials: true,
    //     })
    //     .then((response) => {
    //       if (response.data.success !== false) {
    //         if(response.data.userClass === "student_org" || response.data.userClass === "faculty"){
            
    //           navigate("/unauthorized", { replace: true });
    //         }
    //         // setIsLoggedIn(true);
    //         setUser(response.data);

    //       } else {
    //         navigate("/unauthorized", { replace: true });
    //         // setIsLoggedIn(false);
    //         setUser(null);
    //       }
    //     })
    //     .catch((error) => {
    //       navigate("/unauthorized", { replace: true });
    //       setUser(null);
    //       // setIsLoggedIn(false);
    //     });

    //   // setIsLoading(false);
      
    // };

    // fetchUserData();
    if(!window.localStorage.getItem("user") || ["student_org","faculty"].includes(JSON.parse(window.localStorage.getItem("user")).userClass)){
      navigate("/unauthorized", { replace: true });
      setUser(null);
    }else{
      setUser(JSON.parse(window.localStorage.getItem("user")));
    }
  }, []); 
  
  // get activity logs
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://brics-api.vercel.app/api/reservations/get-activity?startDate=${startDate}&endDate=${endDate}`,
          {withCredentials: true}
        );
        // console.log("Start Date: ", startDate);
        // console.log("End Date: ", endDate );
        // console.log("API Response:", response.data); // Log API response
        setJsonData(response.data); // Set the fetched data to state
        setIsLoading(false);
      } catch (error) {
        //console.error("Error fetching user data:", error);
        navigate("/error", { replace: true });
      }
    };

    fetchData(); // Fetch data when component mounts

    // Cleanup function to prevent memory leaks
    return () => {};
  }, [startDate, endDate]);

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

  const columns = [
    "Date",
    "Transaction ID",
    "Time",
    "Action by",
    "Action made",
  ];

  // Function to format date to YYYY-MM-DD format
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Function to handle date change
  const handleDateChange = (date, setValue) => {
    const formattedDate = formatDate(date);
    setValue(formattedDate);
  };

  const mappedData = jsonData.flatMap((item) => {
    if (item.transactionHistory.length>0){
      // console.log(item.transactionHistory);
      console.log("Invalid date:", item.transactionHistory.actionDate);
      return item.transactionHistory.map((transaction) => {
        // if (isNaN(actionDate)){
        //   console.error("Invalid date:", transaction.actionDate);
        // }
        const dateFormatOptions = {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        };
        const timeFormatOptions = {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        };
        return {
          Date: new Intl.DateTimeFormat("en-US", dateFormatOptions).format(
            new Date(transaction.actionDate)
          ),
          "Transaction ID": item._id,
          Time: new Intl.DateTimeFormat("en-US", timeFormatOptions).format(
            new Date(transaction.actionDate)
          ),
          "Action by": transaction.actionBy,
          "Action made": transaction.actionMade,
        };
      })
    } else {
      return [];
    }
  });

  // console.log("Mapped data: ", mappedData);

  // Filter mappedData based on selected date range
  const filteredData = mappedData.filter((entry) => {
    // Convert startDate and endDate to Date objects if they are not null
    const startDateObj = startDate ? new Date(startDate) : null;
    const endDateObj = endDate ? new Date(endDate) : null;

    // Convert entry.Date to a Date object
    const entryDate = new Date(entry.Date);
    return (
      (!startDateObj || entryDate >= startDateObj) &&
      (!endDateObj || entryDate <= endDateObj)
    );
  });

  // console.log("Filtered data: ", filteredData);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);


  // if(isLoading){
  //   return Loading();
  // }


  return (
    <div>
      <Sidebar />
      {isLoading ? (
        <div style={{marginLeft: MarginLeft }}>
            <Loading />
        </div>
      ) : (
        <div className="flex-col">
          <div
            className="flex mt-5 items-center justify-between"
            style={{ marginLeft: MarginLeft }}
          >
            <div className="flex">
              <div className="flex justify-center items-center">
                <BackBtn />
              </div>
              <div className="flex-col ml-5">
                <h1 className="text-4xl font-bold text-brics-blue text-left">
                  Activity Log
                </h1>
                <h2
                  className="text-lg text-brics-custom-gray text-left"
                  style={{ fontFamily: "Satoshi-regular" }}
                >
                  View & track activities of the system.
                </h2>
              </div>
            </div>
            <div style={{ marginRight: "2rem" }}>
              {/* Pass props to Dater component to manage selected dates */}
              <Dater
                valueStart={startDate}
                setValueStart={(date) => handleDateChange(date, setStartDate)}
                valueEnd={endDate}
                setValueEnd={(date) => handleDateChange(date, setEndDate)}
              />
            </div>
          </div>
          <div
            className="flex flex-col mt-5"
            style={{
              marginLeft: MarginLeft,
              marginRight: "30px",
              marginBottom: "30px",
            }}
          >
            {filteredData.length > 0 ? (
              <Table
                columns={columns}
                data={filteredData}
                currentPage={currentPage}
                entriesPerPage={entriesPerPage}
              />
            ) : (
              <EmptyState
                            message="Oh no! The data seems empty for the specified date range. You may adjust the date the show other data."
                            linkText="Go to reservations"
                            link="/reservation-management"
                        />
            )}
            {filteredData.length > entriesPerPage && (
              <div className="flex justify-center mt-5">
                <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
