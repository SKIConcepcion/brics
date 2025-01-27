import React, { useState, useEffect } from "react";
import DoughnutChart from "../components/DoughnutChart";
import BarChart from "../components/BarChart";
import Sidebar from "../components/SideBar";
import DatePicker from "../components/DatePicker";
import { ChevronRight } from "lucide-react";
import axios from "axios";
import Loading from "./Loading.js";
import { acronym } from "../components/Colleges.js";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { GenerateReportPDF } from "../components/GenerateReportPDF.js";
import { useNavigate } from "react-router-dom";

export default function ReportSummary() {
  const [studentPopulationMap, setStudentPopulationMap] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [facultyPopulationMap, setFacultyPopulationMap] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [loading, setLoading] = useState(true);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const dateLastMonth = new Date();
  dateLastMonth.setMonth(dateLastMonth.getMonth() - 1);

  const [userBarDataset, setUserBarDataset] = useState([]);
  const [reservationsBarDataSet, setReservationsBarDataset] = useState([]);

  const date = new Date();

  //STATES FOR FETCHES
  const [reservationData, setReservationData] = useState([]);
  const [startDateReservations, setStartDateReservations] = useState(
    dateLastMonth.toISOString().split("T")[0]
  );

  const [endDateReservations, setEndDateReservations] = useState(
    date.toISOString().split("T")[0]
  );

  const [userData, setUserData] = useState([]);
  const [startDateUser, setStartDateUser] = useState(
    dateLastMonth.toISOString().split("T")[0]
  );
  const [endDateUser, setEndDateUser] = useState(
    date.toISOString().split("T")[0]
  )
  
  const[userFilters, setUserFilters] = useState({startDate: startDateUser, endDate: endDateUser});
  const[reservationFilters, setReservationFilters] = useState({startDate: startDateReservations, endDate: endDateReservations});

  const [roomsData, setRoomsData] = useState([]);

  const [roomsBarDataSetName, setRoomsBarDataSetName] = useState([]);

  useEffect(() => {
    
    setUserFilters({startDate: startDateUser, endDate: endDateUser});
    setReservationFilters({startDate: startDateReservations, endDate: endDateReservations});
  }, [startDateUser, endDateUser, startDateReservations, endDateReservations]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] =useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // await axios
        // .get("https://brics-api.vercel.app/api/sign-in/protected", {
        //   withCredentials: true,
        // })
        // .then((response) => {
        //   // console.log("User data fetched successfully:");
        //   if (response.data != "Unauthorized") {
        //     if(response.data.userClass == "student_org" || response.data.userClass == "faculty"){
        //       navigate("/unauthorized", { replace: true });
        //     }
           
        //     setIsLoggedIn(true);
        //     setUser(response.data);
        //   } else {
        //     navigate("/unauthorized")
        //     setIsLoggedIn(false);
        //     setUser(null);
        //   }
        // })
        // .catch((error) => {
        //   navigate("/unauthorized")
        //   setUser(null);
        //   setIsLoggedIn(false);
        // });
        if(!window.localStorage.getItem("user") || ["student_org","faculty"].includes(JSON.parse(window.localStorage.getItem("user")).userClass)){
          navigate("/unauthorized", { replace: true });
          setIsLoggedIn(false);
          setUser(null);
        }else{
          setIsLoggedIn(true);
          setUser(JSON.parse(window.localStorage.getItem("user")));
        }

        const reportResponse = await axios.get(
          "https://brics-api.vercel.app/api/generate-report",
          {
            params: {
              userClass: "admin",
              ...reservationFilters,
            }, withCredentials: true
          }
        );
        // console.log("API Response for Reservations:", reservationResponse.data); // Log API response
      

        const roomResponse = await axios.get(
          "https://brics-api.vercel.app/api/rooms/get-all-rooms",
          {withCredentials: true}
        );
        // console.log("API Response for Rooms:", roomResponse.data); // Log API response
        setRoomsData(roomResponse.data); // Set the fetched data to state
        


        // const responseUser = await axios.get(
        //   "https://brics-api.vercel.app/api/users/generate-report",
        //   {
        //     params: {
        //       userClass: "admin",
        //       ...userFilters
        //     }, withCredentials: true
        //   }
        // );
        // console.log("API Response for Users:", responseUser.data); // Log API response
        setUserData(reportResponse.data.user); // Set the fetched data to state
        

        // Set the fetched data to state
        setLoading(false);
        setReservationData(reportResponse.data.reservation); // Set the fetched data to state
       
        setReservationsBarDataset(reportResponse.data.reservation.userClassRoomCounts);
        setUserBarDataset(reportResponse.data.user.collegeCounts);
        setRoomsBarDataSetName(roomResponse.data.map(room => room.name));
        //setIsLoading(false); // Set loading state to false
      } catch (error) {
        setLoading(true);
        // console.error("Error fetching user data:", error);
      }

      // if (
      //   reservationData != [] &&
      //   userData != [] &&
      //   userBarDataset != [] &&
      //   reservationsBarDataSet != [] &&
      //   roomsData != []&&
      //   roomsBarDataSetName != []
      // ) {

      //   setLoading(false);
      // } else {
      //   setLoading(true);
      // }
    };
      setLoading(true);
  //  const interval = setInterval(() => {
      fetchData();
    
  //  }, 10); // Fetch data every 0.5

  //  return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [
    userFilters,
    reservationFilters,
  ]); // Empty dependency array to run the effect only once

  // Function for rendering
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Condition for rendering when screen width is small
  const MarginLeft = screenWidth < 1024 ? "40px" : "295px";

  const reserveDoughnutData = {
    title: "RESERVATIONS",
    labels: ["Awaiting Approval", "Pending Payment", "Finalized", "Rejected"],
    datasets: [
      {
        data: [
          reservationData.awaitingApprovalCount,
          reservationData.pendingPaymentCount,
          reservationData.finalizedCount,
          reservationData.rejectedCount,
        ],

        backgroundColor: ["#4285F4", "#AA46BB", "#2B3A67", "#DB4437"],
        borderWidth: 2,
        radius: "70%",
      },
    ],
  };

  const userDoughnutData = {
    title: "USERS",
    labels: ["Student Organizations", "Faculty"],
    datasets: [
      {
        data: [userData.studentOrgCount, userData.facultyCount],
        backgroundColor: ["#4285F4 ", "#AA46BB"],
        borderWidth: 2,
        radius: "70%",
      },
    ],
  };

  function userBarDataCleaner(type) {
    const data = []
    const collegeNames = Object.keys(acronym);
    for(let i = 0; i < collegeNames.length; i++) {
      if(collegeNames[i] in userBarDataset){
        data.push(userBarDataset[collegeNames[i]][type]);
      }else{
        data.push(0);
      }

    }
   return data;

  }

  useEffect(() => {
    setStudentPopulationMap(userBarDataCleaner("student_org"));
    setFacultyPopulationMap(userBarDataCleaner("faculty"));
  }, [userBarDataset]);

  const userBarData = {
    labels: Object.keys(acronym).map((item) => acronym[item]),
    datasets: [
      {
        label: "Student",
        backgroundColor: "#4285F4",
        borderColor: "#4285F4",
        borderWidth: 1,
        data: studentPopulationMap,
      },

      {
        label: "Faculty",
        backgroundColor: "#AA46BB",
        borderColor: "#AA46BB",
        borderWidth: 1,
        data: facultyPopulationMap,
      },
    ],
  };

  const userBarOptions = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          beginAtZero: true,
          stepSize: 1
        }
        
      },
      
    },
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  function reservationBarDataCleaner(type) {
    const data = []
    const roomNames = roomsBarDataSetName;
    for(let i = 0; i < roomNames.length; i++) {
      if(roomNames[i] in reservationsBarDataSet){
        data.push(reservationsBarDataSet[roomNames[i]][type]);
      }else{
        data.push(0);
      }

    }
   return data;

  }

  //"#4285F4", "#AA46BB", "#2B3A67"
  const barData = {
    labels: roomsData.map((item) => item.acronym),
    datasets: [
      {
        label: "Student",
        backgroundColor: "#4285F4",
        borderColor: "#4285F4",
        borderWidth: 1,
        data: reservationBarDataCleaner("student_org")
      },

      {
        label: "Faculty",
        backgroundColor: "#AA46BB",
        borderColor: "#AA46BB",
        borderWidth: 1,
        data:  reservationBarDataCleaner("faculty")
      },
      {
        label: "Guest",
        backgroundColor: "#2B3A67",
        borderColor: "#2B3A67",
        borderWidth: 1,
        data: reservationBarDataCleaner("guest"),
      },
    ],
  };

  const barOptions = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          beginAtZero: true,
          stepSize: 1
        }
      },
    },
    plugins: {
      legend: {
        
        position: "bottom",
      },
    },
  };

  function downloadReport() {
    const charts = [
      document.getElementById('doughnutChartUsers'),
      document.getElementById('doughnutChartReservations'),
      document.getElementById('barUsers'),
      document.getElementById('barReservations'),
    ];

    // console.log(charts)

    let chartIMG =[];
    const chartTocanvas = () => {
      
      charts.forEach((chart) => {
      const canvas = chart.querySelector('canvas');
      const imageData = canvas.toDataURL('image/png');
      chartIMG.push(imageData);
      });

      return chartIMG;

    }
    let data ={
      startDateUser: startDateUser,
      endDateUser: endDateUser,
      startDateReservation: startDateReservations,
      endDateReservation: endDateReservations,
      userReport: userData,
      reservationReport: reservationData,
      chartImages: chartTocanvas()
    }

    GenerateReportPDF(data);
  }
  
  return (
    <div>
      <Sidebar />
      {loading ? (
        <div style={{marginLeft: MarginLeft }}>
            <Loading />
        </div>
      ) : (
        // {/* Body */}
        <div className="sm:flex-col flex-row mr-10">
          {/* Page header */}
          <div
            className="flex flex-row justify-between mt-5 "
            style={{ marginLeft: MarginLeft }}
          >
            <div className="flex-col">
              <h1
                className="text-3xl font-bold text-brics-blue"
                
              >
                Report Summary
              </h1>
            </div>
            <button className="bg-blue-500 text-white rounded-md py-2 px-16 w-max"
            onClick={()=>{
            downloadReport();
            }}>
              Download Report
            </button>
          </div>
          {/* End of Page Header */}

          {/* Start of Summary Cards */}
          <div className="flex flex-row mt-5" style={{ marginLeft: MarginLeft }}>
            {/* Start of Reservation Summary Card */}
            <div className="border border-gray-300 rounded-lg p-4 flex flex-col flex-1 mr-5 w-1/2" >
              <div className="flex flex-row mt-5">
                <div className="flex flex-col w-1/2">
                  <div className="" id="doughnutChartReservations" >
                    <DoughnutChart data={reserveDoughnutData} />
                  </div>
                  {/* Buttons */}
                  <div className="flex flex-row justify-around items-center mt-5">
                    <div className="flex flex-row items-center">
                      <button className="text-xs mr-1 text-blue-500"
                       onClick={()=> navigate("/registration-requests")}>
                        Approve Requests
                      </button>
                      <ChevronRight color="blue" size={12} />
                    </div>
                    <div className="flex flex-row items-center">
                      <button className="text-xs mr-1 text-blue-500"
                      onClick={()=> navigate("/room-management")}>
                        View Rooms
                      </button>
                      <ChevronRight color="blue" size={12} />
                    </div>
                  </div>
                </div>
                {/* Filter part */}
                <div className="flex-1 w-1/2">
                  <p
                    className="text-s text-gray-500 text-left mb-3"
                  >
                    FILTER
                  </p>
                  <DatePicker
                    valueStart={startDateReservations}
                    setValueStart={setStartDateReservations}
                    valueEnd={endDateReservations}
                    setValueEnd={setEndDateReservations}
                  ></DatePicker>

                  {/* Total Reservation*/}
                  <div className="flex flex-col mt-5 border rounded-lg p-5">
                    <div className="font-bold text-gray-500 text-left">
                      Total Reservations
                    </div>

                    <div className="font-bold text-blue-500 text-5xl">
                      {reservationData.totalReservations}
                    </div>
                  </div>

                  {/* Most reserved space */}
                  <div className="flex flex-col mt-5 border rounded-lg p-5 ">
                    <div className="font-bold text-gray-500 text-xs text-left">
                      Most Reserved Space
                    </div>

                    <div className="font-bold text-blue-500">
                      <div className="p-1 text-xs">
                      {reservationData.mostReservedSpace}
                      </div>
                    
                      <div className="text-gray-500 text-l">
                        {reservationData.totalReservationsMostReserved}
                      </div>
                    </div>
                  </div>

                  {/* Least reserved space */}
                  <div className="flex flex-col mt-5 border rounded-lg p-5">
                    <div className="font-bold text-gray-500 text-xs text-left">
                      Least Reserved Space
                    </div>

                    <div className="font-bold text-blue-500">
                    <div className="p-1 text-xs">
                      {reservationData.leastReservedSpace}
                      </div>
                      <div className="text-gray-500 text-s">
                        {" "}
                        {reservationData.totalReservationsLeastReserved}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 mt-5" id="barReservations">
                <BarChart data={barData} options={barOptions}  />
              </div>
            </div>
            {/* End of Reservation Summary Card */}

            {/* Start of User Summary Card */}
            <div className="border border-gray-300 rounded-lg p-4 flex flex-col flex-1 w-1/2">
              <div className="flex flex-row mt-5">
                <div className="flex flex-col w-1/2">
                  <div className="" id="doughnutChartUsers">
                    <DoughnutChart data={userDoughnutData} />
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-row justify-around items-center mt-5">
                    <div className="flex flex-row items-center">
                      <button className="text-xs mr-1 text-blue-500"
                        onClick={()=> navigate("/user-accounts")}>
                        View Users
                      </button>
                      <ChevronRight color="blue" size={12} />
                    </div>
                    <div className="flex flex-row items-center">
                      <button className="text-xs mr-1 text-blue-500"
                      onClick={()=> navigate("/registration-requests")}>
                        View Requests
                      </button>
                      <ChevronRight color="blue" size={12} />
                    </div>
                  </div>
                </div>

                {/* Filter part */}
                <div className="flex-1 w-1/2">
                  <p
                    className="text-s text-gray-500 text-left mb-3"
                  >
                    FILTER
                  </p>

                  <DatePicker
                    valueStart={startDateUser}
                    setValueStart={setStartDateUser}
                    valueEnd={endDateUser}
                    setValueEnd={setEndDateUser}
                  ></DatePicker>

                  {/* Total Users*/}
                  <div className="flex flex-col mt-5 border rounded-lg p-5">
                    <div className="font-bold text-gray-500 text-left">
                      Total Users
                    </div>

                    <div className="font-bold text-blue-500 text-5xl">
                      {userData.totalUsers}
                    </div>
                  </div>

                  {/* Most Reservation User Type */}
                  <div className="flex flex-col mt-5 border rounded-lg p-5">
                    <div className="font-bold text-gray-500 text-xs text-left">
                      Most Reservation User Type
                    </div>
                    <div className="flex flex-col w-full justify-content gap-1">
                      <div className="font-bold text-blue-500 text-xs gap-1">
                   
                        {
                          userData.mostReservations.class === "student_org"
                            ? "Student Organization"
                            : "Faculty"
                      
                        }
                      </div>

                      <div className="font-bold text-gray-500 text-l">
                        {userData.mostReservations.count}
                      </div>
                    </div>
                  </div>

                  {/* Least Reservation User Type */}
                  <div className="flex flex-col mt-5 border rounded-lg p-5">
                    <div className="font-bold text-gray-500 text-xs text-left">
                      Least Reservation User Type
                    </div>

                    <div className="flex flex-col w-full justify-content gap-1">
                      <div className="font-bold text-blue-500 text-xs gap-1">
                      {
                          userData.leastReservations.class === "student_org"
                            ? "Student Organization"
                            : "Faculty"
                      
                        }
                      </div>

                      <div className="font-bold text-gray-500 text-s">
                        {userData.leastReservations.count}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 mt-5" id="barUsers">
                <BarChart data={userBarData} options={userBarOptions} />
              </div>
            </div>
            {/* End of User Summary Card */}
          </div>
          {/* End of Summary Cards */}
        </div>
      )}
    </div>
  );
}