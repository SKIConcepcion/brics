import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Alert from '../components/Alert';
import BackBtn from '../components/BackBtn';
import EmptyState from '../components/EmptyState';
import ErrorPrompt from '../components/ErrorPrompt';
import LoadingAnimation from '../components/LoadingAnimation';
import PaginationAdmin from '../components/PaginationAdmin';
import { RegistrationRequestTable } from '../components/RegistrationRequestTable';
import { SearchBox } from '../components/SearchBox';
import Sidebar from '../components/SideBar';
import Toast from '../components/Toast';
import Loading from './Loading';


export default function RegistrationRequest() {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [showRejectToast, setShowRejectToast] = useState(false);
    const [showRejectAlert, setShowRejectAlert] = useState(false);
    const [rejectMessage, setRejectMessage] = useState('');
    const [currentPage, setCurrentPage] = useState(1); // Current page number
    const entriesPerPage = 15; // Number of entries to show per page
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [jsonData, setJsonData] = useState([]);
    const [filteredDataRows, setFilteredDataRows] = useState([]);
    const [filteredDataChanged, setFilteredDataChanged] = useState(false);
    const [selectedReasons, setSelectedReasons] = useState([]); // State for selected rejection reasons
    const [isLoading, setIsLoading] = useState(true); // Set loading state to true
    const [searchText, setSearchText] = useState('');
    const [showErrorPrompt, setShowErrorPrompt] = useState(false);

    //for reject email functionality
    const [customReason, setCustomReason] = useState(''); // for customReason
    const [rejectionResolutions, setRejectionResolutions] = useState([]);

     // For approval and rejection specific loading state
     const [isProcessing, setIsProcessing] = useState(false);

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
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
    //           navigate("/unauthorized")
    //           setIsLoggedIn(false);
    //           setUser(null);
    //         }
    //       })
    //       .catch((error) => {
    //         navigate("/unauthorized")
    //         setUser(null);
    //         setIsLoggedIn(false);
    //       });

    //     setIsLoading(false);
    //   };

    //   fetchUserData();
      if(!window.localStorage.getItem("user") || ["student_org","faculty"].includes(JSON.parse(window.localStorage.getItem("user")).userClass)){
        navigate("/unauthorized", { replace: true });
        setIsLoggedIn(false);
        setUser(null);
      }else{
        setIsLoggedIn(true);
        setUser(JSON.parse(window.localStorage.getItem("user")));
      }
      setIsLoading(false);
    }, []); 

    useEffect(() => {
        const getPendingAccounts = async () => {
            try { 
                const response = await axios.get('https://brics-api.vercel.app/api/users/filter-users', {
                    params: {userStatus: "Pending"}, withCredentials: true
                });
                //console.log("Hello")
                setJsonData(response.data); // Set the fetched data to state
                setIsLoading(false); // Set loading state to false
            } catch (error) {
                setIsLoading(false); 
                //console.error('Error fetching user data:', error);
            }
        };
        getPendingAccounts();
    }, []); // Empty dependency array to run the effect only once

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

    //user_id will be hidden
    const columns = [ "Date", "Name", "Email Address", "Classification", "Affiliation/Institute", "Action"];

    const mappedData = jsonData
    .map(item => ({
        "User ID": item._id, // Map _id field to User ID column
        Date: item.dateCreated ? new Date(item.dateCreated).toLocaleDateString('en-CA') : 'N/A',
        Name: `${item.firstName} ${item.lastName}`,
        "Email Address": item.email,
        Classification: item.userClass === "faculty" ? "Faculty" : "Student Org",
        "Affiliation/Institute": item.affiliation ? `${item.affiliation} - ${item.institution}` : item.institution,
    }));

    const filteredData = mappedData.filter((item) =>
        Object.values(item).some(
            (value) =>
            typeof value === 'string' && value.toLowerCase().includes(searchText.toLowerCase())
        ));

    const filterRows = (userId) => {
        setFilteredDataChanged(true);
        setFilteredDataRows(mappedData.filter((item) =>
            Object.values(item).some(
                (value) =>
                typeof value === 'string' && value.toLowerCase().includes(searchText.toLowerCase())
            )
        ));
        setFilteredDataChanged(false);
    }

    const approveAccount = async (userId) => {
        setSelectedUserId(userId);
        sendApproveMessage();
    };

    const handleRemoveApprovedData = async (userId) => {
        await axios.put(`https://brics-api.vercel.app/api/users/update-user/${userId}`, { userStatus: "Approved"},{withCredentials: true});
        try {
            // await axios.put(`https://brics-api.vercel.app/api/users/update-user/${userId}`, { userStatus: "Approved"},{withCredentials: true});
            // Update state to remove the approved user from the table
            setJsonData(prevData => prevData.filter(user => user._id !== userId));
            setShowSuccessToast(true);
        } catch (error) {
            //console.error('Error approving account:', error);
        } finally {
            setIsProcessing(false);
        }

    }
        
    const sendApproveMessage = async () => {
        //event.preventDefault();
        try {
            const selectedUser = jsonData.find(user => user._id === selectedUserId);
            if (!selectedUser) {
                throw new Error('User not found');
            }
            setIsProcessing(true);
            const response = await fetch('https://brics-api.vercel.app/api/send-account-acceptance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: selectedUser.email, // Replace with email variable
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to send approval email');
            }
            handleRemoveApprovedData(selectedUserId);
            setShowSuccessToast(true);
            //console.log('Acceptance email sent successfully');
        } catch (error) {
            //console.error('Error sending email:', error);
        }
    }
    
    

    const rejectAccount = (userId) => {
        setSelectedUserId(userId); // Set the selectedUserId
        setShowRejectAlert(true);
    };

     // Function to handle custom reason change
     const handleCustomReasonChange = (newReason) => {
        setCustomReason(newReason);
    };

    // Updated handleRejectAction function
    const handleRejectAction = async (event) => {
        event.preventDefault();
        const rejectionReasons = [...selectedReasons];
        
        /**
         * @TODO Please utilize this condition to prompt user if no reason is specified
         * - You may implement a red error text on screen and such
         * - However, we will allow if either is present e.g. only customReason is present or only rejectionReasons are present
         */
        if (rejectionReasons.length === 0 && customReason == ""){
            setShowErrorPrompt(true);
            console.log("Reason must be specified.");
            setRejectMessage('');
            setSelectedReasons([]);
            return;
        }
        
        try {
            const selectedUser = jsonData.find(user => user._id === selectedUserId);
            if (!selectedUser) {
                throw new Error('User not found');
            }
            setIsProcessing(true);
            const response = await fetch('https://brics-api.vercel.app/api/send-account-rejection', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: selectedUser.email, // Replace with email variable
                    rejectionReasons: rejectionReasons,
                    rejectionResolutions: rejectionResolutions,
                    customReason: customReason
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to send rejection email');
            }
            handleRemoveData(selectedUserId);
            //console.log('Rejection email sent successfully');
            setShowRejectAlert(false);
            setShowErrorPrompt(false);
            setShowRejectToast(true);
        } catch (error) {
            //console.error('Error sending rejection email:', error);
            
        } finally {
            setRejectMessage(''); // Clear reject message
            setIsProcessing(false);

        }
    };

    //remove the data from the table
    const handleRemoveData = async (userId) => {

        //BE: add endpoint here for rejecting the account
        const objReturn = await axios.put(`https://brics-api.vercel.app/api/users/update-user/${userId}`,{userStatus:"Rejected"},{withCredentials: true});
        try {
            // await axios.put(`https://brics-api.vercel.app/api/users/update-user/${userId}`, { userStatus: "Rejected" },{ withCredentials: true});
            // Update state to remove the rejected user from the table
            setJsonData(prevData => prevData.filter(user => user._id !== userId));
            setShowRejectAlert(false);
            setShowRejectToast(true);
        } catch (error) {
            //console.error('Error rejecting account:', error);
        }
    };


    const handleCloseToast = () => {
        setShowSuccessToast(false); // Close the success toast
        setShowRejectToast(false); // Close the reject toast
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const renderActions = (row) => {
        return (
            <div className="flex">
                <button className="text-green-900 mr-4 font-bold" onClick={() => approveAccount(row["User ID"])}>
                    Approve
                </button>
                <button className="text-red-600" onClick={() => rejectAccount(row["User ID"])}>
                    Reject
                </button>
            </div>
        );
    };

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        const [reason, resolution] = value.split('|');
        if (checked) {
            setSelectedReasons(prevSelected => [...prevSelected, reason]);
            setRejectionResolutions(prevResolutions => [...prevResolutions, resolution]);

        } else {
            setSelectedReasons(prevSelected => prevSelected.filter(selReason => selReason !== reason));
            setRejectionResolutions(prevResolutions => prevResolutions.filter(res => res !== resolution));
        }
    };

    const renderCheckbox = (option) => {
        return (
            <label key={option.label} className="block">
                <input
                    type="checkbox"
                    value={option.value}
                    //checked={selectedReasons.includes(option.value)}
                    onChange={handleCheckboxChange}
                />
                {option.label}
            </label>
        );
    };

    const totalPages = Math.ceil(mappedData.length / entriesPerPage);

    const countObjects = (data) => {
        return data.length;
    };
    
    const numberOfObjects = countObjects(filteredData);

    return (
        <div>
            <Sidebar />
            {isLoading ? (
                <div style={{marginLeft: MarginLeft }}>
                    <Loading />
                </div>
            ) : (
            <div className="flex-col">
                <div className='flex mt-5 mb-4 items-center justify-between' style={{ marginLeft: MarginLeft }}>
                    <div className='flex'>
                        <div className='flex justify-center items-center'>
                            <BackBtn />
                        </div>
                        <div className='flex-col ml-5'>
                            <h1 className="text-3xl font-bold text-brics-blue text-left">Registration Request</h1>
                            <h2 className="text-lg text-gray-500 text-left">Accept/reject account creation requests</h2>
                        </div>
                    </div>
                    <div style={{ marginRight: '2rem' }}>
                        <SearchBox setSearchText={setSearchText} />
                    </div>
                </div>
                <div className='flex flex-col mt-7' style={{ marginLeft: MarginLeft, marginRight: '30px', marginBottom: '30px' }}>
                    {numberOfObjects === 0 ? (
                        <EmptyState
                            message="Oh no! The table seems empty. No current registration requests have been submitted."
                            linkText="Go to User Accounts page"
                            link="/user-accounts"
                        />
                    ) : (
                        <>
                            <RegistrationRequestTable columns={columns} filteredData={filteredData} filteredDataRows={filteredDataRows} renderActions={renderActions} currentPage={currentPage} entriesPerPage={entriesPerPage}></RegistrationRequestTable>
                            
                            {filteredData.length > entriesPerPage && (
                                <div className="flex justify-center mt-5"> {/* Centering container */}
                                   
                                        <PaginationAdmin totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
                                   
                                </div>
                            )}
                        </>
                    )}
                    
                    {showRejectAlert && (
                        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
                            <div style={{ width: "100%" }}>
                            <Alert 
                                actionText="Reject" 
                                headerText="Are you sure you want to reject this user?"  
                                descriptionText="This action cannot be undone."
                                onCancel={() => {
                                    setShowRejectAlert(false);
                                    setCustomReason(''); // Clear the custom reason
                                    setShowErrorPrompt(false);
                                }}
                                onAction={handleRejectAction}
                                message={customReason}
                                setMessage={handleCustomReasonChange}
                                hasMessage={true}
                                hasCheckboxes={true}
                                messagePlaceholder="Enter a custom reject message..."
                                checkboxOptions={[
                                    { value: "Non-UP email address|Change to UP email address", label: ' Suspicious email address' },
                                    { value: "Unverified individual under organization|Register UP email as OSAM account under your organization", label: ' Unverified individual under organization' },
                                    { value: "Unverified individual under faculty|If this was a mistake, see ICS Director to update your information", label: ' Unverified individual under faculty' },
                                    { value: "Unrecognized organization|Make sure organization is OSA-registered", label: ' Unrecognized organization' }
                                ]}
                                renderCheckbox={renderCheckbox} // Pass renderCheckbox function
                            />
                            {showErrorPrompt && (
                                <ErrorPrompt ErrorHeader="Error Rejecting!" ErrorDescription="Please select a reject reason or enter a custom error message"/>
                            )}
                            </div>

                        </div>
                    )}
                </div>
            </div>
            )}
            {/* Render the processing toast */}
            {isProcessing && (
                <div className="fixed bottom-10 right-10">
                    <LoadingAnimation text="Sending E-mail..."/>
                </div>
            )}
            {/* Render the success toast */}
            {showSuccessToast && (
                <div className="fixed bottom-10 right-10">
                    <Toast text="Account request has been approved" onClose={handleCloseToast} />
                </div>
            )}
    
            {/* Render the reject toast */}
            {showRejectToast && (
                <div className="fixed bottom-10 right-10">
                    <Toast text="Account request has been rejected" onClose={handleCloseToast} success={true}  />
                </div>
            )}
        </div>
    );
}    