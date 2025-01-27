import React, { useState, useEffect } from 'react';
import Sidebar from '../components/SideBar';
import { Table } from '../components/Table';
import { SearchBox } from '../components/SearchBox';
import PaginationAdmin from '../components/PaginationAdmin';
import Toast from '../components/Toast';
import Alert from '../components/Alert';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Loading from "../pages/Loading";
import EmptyState from '../components/EmptyState';
import BackBtn from '../components/BackBtn';
import LoadingAnimation from '../components/LoadingAnimation';

export default function UserAccounts() {
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1); // Current page number
    const entriesPerPage = 15; // Number of entries to show per page
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [jsonData, setJsonData] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Set loading state to true
    const [searchText, setSearchText] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [user, setUser] = useState(null);

    
//   const [user, setUser] = useState(null);
    //   const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // const fetchUserData = async () => {
    //   await axios
    //     .get("https://brics-api.vercel.app/api/sign-in/protected", {
    //       withCredentials: true,
    //     })
    //     .then((response) => {
    //       // console.log("User data fetched successfully:");
    //       if (response.data !== "Unauthorized") {
    //         // setIsLoggedIn(true);
    //         setUser(response.data);
    //       } else {
    //         navigate("/unauthorized", { replace: true });
    //         // setIsLoggedIn(false);
    //         setUser(null);
    //       }
    //     })
    //     .catch((error) => {
    //         navigate("/unauthorized", { replace: true });
    //       setUser(null);
    //     //   setIsLoggedIn(false);
    //     });

    // //   setIsLoading(false);
    // };
    
    // fetchUserData();
    if(!window.localStorage.getItem("user") || ["student_org","faculty"].includes(JSON.parse(window.localStorage.getItem("user")).userClass)){
        navigate("/unauthorized", { replace: true });
        setUser(null);
    }else{
        setUser(JSON.parse(window.localStorage.getItem("user")));
    }
  }, []); 


    useEffect(() => {
        const getApprovedAccounts = async () => {
            try {
                const response = await axios.get('https://brics-api.vercel.app/api/users/filter-users', {
                    params: { userStatus: "Approved" }, withCredentials: true
                });
                setJsonData(response.data); // Set the fetched data to state
                setIsLoading(false); // Set loading state to false
            } catch (error) {
                // console.error('Error fetching user data:', error);
            }
        };
        getApprovedAccounts();
    }, [user]);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const MarginLeft = screenWidth < 1024 ? '40px' : '295px';

    const columns = ["Name", "Email Address", "Classification", "Affiliation/Institute", "College", "Action"];

    const mappedData = jsonData
        .filter(item => (item.userStatus === "Approved" && ['faculty','student_org'].includes(item.userClass) ))
        .map(item => ({
            _id: item._id,
            Date: item.dateCreated,
            Name: `${item.firstName} ${item.lastName}`,
            "Email Address": item.email,
            Classification: item.userClass === "faculty" ? "Faculty" : "Student Org",
            College: item.college,
            "Affiliation/Institute": item.affiliation ? `${item.affiliation} - ${item.institution}` : item.institution,
        }));

    const filteredData = mappedData.filter((item) =>
        Object.values(item).some(
            (value) =>
                typeof value === 'string' && value.toLowerCase().includes(searchText.toLowerCase())
        )
    );

    const goToEditAccount = (userId) => {
        navigate(`/edit-account?accountId=${userId}`);
    };

    const handleDelete = (userId) => {
        setSelectedUserId(userId);
        setShowDeleteAlert(true);
    };

    const handleCancelDelete = () => {
        setShowDeleteAlert(false);
    };

    const handleAction = async (userId) => {
        setShowDeleteAlert(false);
        setIsProcessing(true);
        try {
            await axios.delete(`https://brics-api.vercel.app/api/users/delete-user/${userId}`, { withCredentials: true });
            setJsonData(prevData => prevData.filter(user => user._id !== userId));
            setShowToast(true);
        } catch (error) {
            // Handle error if needed
        } finally {
            setIsProcessing(false);
        }
    };

    const handleCloseToast = () => {
        setShowToast(false);
    };

    const renderActions = (row) => {
        return (
            <div className="flex">
                <button className="text-blue-900 mr-4 font-bold" onClick={() => goToEditAccount(row._id)}>Edit</button>
                <button className="text-grey-600" onClick={() => handleDelete(row._id)}>Delete</button>
            </div>
        );
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const totalPages = Math.ceil(mappedData.length / entriesPerPage);

    const countObjects = (data) => {
        return data.length;
    };

    const numberOfObjects = countObjects(mappedData);

    return (
        <div>
            <Sidebar />
            {isLoading ? (
                <div style={{ marginLeft: MarginLeft }}>
                    <Loading />
                </div>
            ) : (
                <div className="flex-col">
                    <div className='flex mt-5 items-center justify-between' style={{ marginLeft: MarginLeft }}>
                        <div className='flex'>
                            <div className='flex justify-center items-center'>
                                <BackBtn />
                            </div>
                            <div className='flex-col ml-5'>
                                <h1 className="text-3xl font-bold text-brics-blue text-left">User Accounts</h1>
                                <h2 className="text-lg text-gray-500 text-left">Edit/Delete created accounts</h2>
                            </div>
                        </div>
                        <div style={{ marginRight: '2rem' }}>
                            <SearchBox setSearchText={setSearchText} />
                        </div>
                    </div>
                    <div className='flex flex-col mt-5' style={{ marginLeft: MarginLeft, marginRight: '30px', marginBottom: '30px' }}>
                        {numberOfObjects === 0 ? (
                            <EmptyState
                                message="Oh no! The table seems empty. No current accounts have been submitted."
                                linkText="Go to Registration Requests page"
                                link="/registration-requests"
                            />
                        ) : (
                            <>
                                <Table columns={columns} data={filteredData} renderActions={renderActions} currentPage={currentPage} entriesPerPage={entriesPerPage} />

                                {filteredData.length > entriesPerPage && (
                                    <div className="flex justify-center mt-5"> {/* Centering container */}
                                        <PaginationAdmin totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
                                    </div>
                                )}

                            </>
                        )}

                        {isProcessing && (
                            <div className="fixed bottom-10 right-10">
                                <LoadingAnimation text="Processing..." />
                            </div>
                        )}
                        {showDeleteAlert && (
                            <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
                                <Alert
                                    actionText="Delete"
                                    headerText="Are you sure you want to delete this user?"
                                    descriptionText="This can't be undone."
                                    onCancel={handleCancelDelete}
                                    onAction={() => handleAction(selectedUserId)}
                                />
                            </div>
                        )}

                        {showToast && (
                            <div className="fixed bottom-10 right-10">
                                <Toast text="An account has been deleted" onClose={handleCloseToast} />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
