import React, { useState, useEffect } from "react";
import Sidebar from "../components/SideBar";
import { Table } from "../components/Table";
import { SearchBox } from "../components/SearchBox";
import Pagination from "../components/Pagination";
import FormField from "../components/FormField";
import Dropdown from "../components/Dropdown";
import { optionsColleges, listDept } from "../components/Colleges";
import Checkbox from "../components/Checkbox";
import Toggle from "../components/Toggle";
import axios from "axios";
import Toast from "../components/Toast";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import BackBtn from "../components/BackBtn";

function getAccountIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("accountId");
}

export default function EditAccount() {
  const [showEditAlert, setShowEditAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();
  const accountId = getAccountIdFromUrl();
  const [isLoading, setIsLoading] = useState(true);
  const [showError, setShowError] = useState(false);
  const [userHasValue, setuserHasValue] = useState(false);
  const [isRegistered, setisRegistered] = useState();
  const [selectedOptionCollege, setSelectedOptionCollege] = useState();
  const [selectedOptionInsti, setSelectedOptionInsti] = useState();

  
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
      //       if (response.data != "Unauthorized") {
      //         if(response.data.userClass == "student_org" || response.data.userClass == "faculty"){
      //           navigate("/unauthorized", { replace: true });
      //         }
             
      //         setIsLoggedIn(true);
      //         setUser(response.data);
      //       } else {
      //         navigate("/unauthorized")
      //         setIsLoggedIn(false);
      //         setUser(null);
      //       }
      //     })
      //     .catch((error) => {
      //       navigate("/unauthorized")
      //       setUser(null);
      //       setIsLoggedIn(false);
      //     });

      //   // setIsLoading(false);
      // };
      fetcher();
      // fetchUserData();
      if(!window.localStorage.getItem("user") || ["student_org","faculty"].includes(JSON.parse(window.localStorage.getItem("user")).userClass)){
        navigate("/unauthorized", { replace: true });
        setIsLoggedIn(false);
        setUser(null);
      }else{
          setUser(JSON.parse(window.localStorage.getItem("user")));
      }
    }, []); 


  function fetcher() {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://brics-api.vercel.app/api/users/get-specific/" + accountId, {withCredentials: true}
        );
        //console.log("API Ye Response:", response.data); // Log API response
        // Set the fetched data to state
        setuserHasValue(true);
        setValueUsers(response.data);
        setIsLoading(false);
      } catch (error) {
        //console.error("Error fetching user data:", error);
        setIsLoading(false);
      } finally {
      }
    };
    fetchData();
  }

  function setValueUsers(jsonData) {
    setlastnameState(jsonData.lastName);
    setfirstNameState(jsonData.firstName);
    setnickNameState(jsonData.nickname);
    setemailState(jsonData.email);
    setSelectedOptionCollege(jsonData.college);
    setSelectedOptionInsti(jsonData.institution);
    setAffiliation(jsonData.affiliation);
    setAffiliationAcro(jsonData.affiliationAcro);
    setisRegistered(jsonData.isRegistered);
  }

  // States for rendering

  // States for rendering
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

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

  const [lastName, setlastnameState] = useState("");

  const collegeField = {
    label: "Collge",
    guide: "College",
    placeholder: "Johnny",
    options: optionsColleges,
  };

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const instiField = {
    label: "Institute/Department",
    guide: "Institute",
    options: listDept(selectedOptionCollege),
  };

  const lastNameField = {
    label: "Last Name",
    guide: "Dela Cruz",
    icon: null,
  };

  const [firstName, setfirstNameState] = useState();
  const firstNameField = {
    label: "First Name",
    guide: "Juan",
    icon: null,
  };

  const [nickname, setnickNameState] = useState();
  const nicknameField = {
    label: "Nickname",
    guide: "Johnny",
    icon: null,
  };

  const [email, setemailState] = useState();
  const emailField = {
    label: "Email",
    guide: "jdcruz@up.edu.ph",
    icon: null,
  };
  const [affiliation, setAffiliation] = useState();
  const affiliationField = {
    label: "Affiliation",
    guide: "Organization Name",
    icon: null,
  };

  const [affiliationAcro, setAffiliationAcro] = useState();
  const affiliationAcroField = {
    label: "Affiliation Acronym",
    guide: "ON",
    icon: null,
  };

  const isRegisteredOSA = {
    label: "Is registered?",
  };

  const handleCloseToast = () => {
    setShowError(false);
    setShowToast(false);
  };

  const handleCancelSave = () => {
    setShowEditAlert(false);
  };
  const handleUpdate = () => {
    setShowEditAlert(true);
  };

  async function submitEdits(e) {
    //console.log("edited");
    const user = {
      lastName: lastName,
      firstName: firstName,
      nickname: nickname,
      email: email,
      college: selectedOptionCollege,
      institution: selectedOptionInsti,
      affiliation: affiliation,
      affiliationAcro: affiliationAcro,
      isRegistered: isRegistered,
    };
    //console.log("Values to throw");
    //console.log(user);
    //e.preventDefault();
    if (
      lastName == "" ||
      firstName == "" ||
      nickname == "" ||
      email == "" ||
      !isValidEmail(email)
    ) {
      setShowError(true);
      return;
    }
    const objReturn = await axios.put(
      "https://brics-api.vercel.app/api/users/update-user/" + accountId,
      user, {withCredentials: true}
    );

    await axios.post(
      "https://brics-api.vercel.app/api/send-edit-notification",
      user, {withCredentials: true}
    );
    setShowEditAlert(false);
    setShowToast(true);
    //console.log(objReturn);
    setShowToast(true);
  }


  return (
    <div>
      <Sidebar />
      {isLoading ? (
        <div style={{marginLeft: MarginLeft }}>
          <Loading />
      </div>
      ) : (
        <div>
          <div className="flex-row ">
            <div
              className="flex mt-5 items-center justify-between"
              style={{ marginLeft: MarginLeft }}
            >
              <div className="flex">
                <div className="flex justify-center items-center">
                  <BackBtn />
                </div>
                <div className="flex-col ml-5">
                  <h1
                    className="text-4xl font-bold text-brics-blue text-left"
                    style={{ fontFamily: "Satoshi-regular" }}
                  >
                    Edit Account
                  </h1>
                  <h2
                    className="text-md text-brics-custom-gray text-left"
                    style={{ fontFamily: "Satoshi-regular" }}
                  >
                    Edit account information
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <form id="#formMain">
            <div
              className="flex flex-col mt-5 mr-10 p-10"
              c
              style={{ marginLeft: MarginLeft, marginBottom: "30px" }}
            >
              <div className="form flex-col">
                <div className="flex flex-row w-full gap-20  p-2">
                  <FormField
                    field={lastNameField}
                    type="text"
                    value={lastName}
                    setValue={setlastnameState}
                    onChange={(e) => setlastnameState(e.target.value)}
                  ></FormField>
                  <FormField
                    field={firstNameField}
                    type="text"
                    value={firstName}
                    setValue={setfirstNameState}
                    onChange={(e) => setfirstNameState(e.target.value)}
                  ></FormField>
                </div>

                <div className="flex flex-row w-full gap-20  p-2">
                  <FormField
                    field={nicknameField}
                    setValue={setnickNameState}
                    type="text"
                    value={nickname}
                    onChange={(e) => setnickNameState(e.target.value)}
                  ></FormField>
                  <FormField
                    field={emailField}
                    type="text"
                    value={email}
                    setValue={setemailState}
                    onChange={(e) => setemailState(e.target.value)}
                  ></FormField>
                </div>
                <div className="flex flex-row w-full gap-20 text-left  p-2">
                  <div className="flex flex-col w-full">
                    <div className="flex flex-col items-left justify-center">
                      <Dropdown
                        field={collegeField}
                        value={selectedOptionCollege}
                        setValue={setSelectedOptionCollege}
                        //onChange={handleChangeCollege} //This is for when the list for the insi changes
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      ></Dropdown>
                    </div>
                  </div>

                  <div className="flex flex-col w-full  p-2">
                    <div className="flex flex-col items-left justify-center">
                      <Dropdown
                        field={instiField}
                        value={selectedOptionInsti}
                        setValue={setSelectedOptionInsti}
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      ></Dropdown>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row w-full gap-20  p-2">
                  <div className="w-1/2">
                    <FormField
                      field={affiliationField}
                      type="text"
                      value={affiliation}
                      setValue={setAffiliation}
                      onChange={(e) => setAffiliation(e.target.value)}
                    ></FormField>
                  </div>
                  <div className="flex flex-row w-1/2 gap-20 ">
                    <FormField
                      field={affiliationAcroField}
                      type="text"
                      value={affiliationAcro}
                      setValue={setAffiliationAcro}
                      className="w-1/2"
                      onChange={(e) => setAffiliationAcro(e.target.value)}
                    ></FormField>

                    <div className="flex flex-col w-1/2">
                      <label className="text-small lg:text-large flex-col mb-2">
                        <div class="relative group inline-block">
                
                          <b className="flex flex-row text-left gap-2 " > 
                          
                          <svg class="h-8 w-8 text-blue-500 text-left"  width="10" height="10" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="12" y1="8" x2="12.01" y2="8" />  <rect x="4" y="4" width="16" height="16" rx="2" />  <polyline points="11 12 12 12 12 16 13 16" /></svg>
                           
                           
                           Is OSA Registered?</b>
                          <div class="w-64 absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition duration-200 ease-in-out z-10">
                            <div class="rounded-md bg-brics-blue text-white text-xs font-semibold p-2">
                              Checking this button means that the organization
                              is recognized by the Office of Student Affairs.
                            </div>
                          </div>
                        </div>
                      </label>
                      <Toggle
                        field={isRegisteredOSA}
                        value={isRegistered}
                        setValue={setisRegistered}
                      ></Toggle>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="gap-5"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginRight: "5.5rem",
              }}
            >
              <button
                type="button"
                className="bg-brics-blue text-white font-bold py-2 px-4 rounded"
                onClick={() => handleUpdate()}
              >
                Update
              </button>
              <button
                type="button"
                className="bg-white text-blue font-bold py-2 px-4 rounded"
                onClick={(event) => {
                  event.preventDefault();
                  fetcher();
                }}
              >
                Cancel
              </button>
            </div>
          </form>
          {showEditAlert && (
            <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
              <Alert
                actionText="Save"
                headerText="Are you sure you want to update the information of this user?"
                descriptionText="The current edit will be saved."
                onCancel={() => setShowEditAlert(false)}
                onAction={(e) => submitEdits(e)}
              />
            </div>
          )}

          {showToast && (
            <div className="fixed bottom-10 right-10">
              <Toast
                text="An account has been deleted"
                onClose={() => setShowToast(false)}
              />
            </div>
          )}
          {showError && (
            <div className="fixed bottom-10 right-10">
              <Toast
                text="There is an error with your response."
                onClose={() => setShowError(false)}
              />
            </div>
          )}
          {showEditAlert && (
            <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
              <Alert
                actionText="Save"
                headerText="Are you sure you want to edit this user?"
                descriptionText="The current edit will be saved"
                onCancel={handleCancelSave}
                onAction={(e) => submitEdits()}
              />
            </div>
          )}

          {showToast && (
            <div className="fixed bottom-10 right-10">
              <Toast
                text="An account has been edited"
                onClose={handleCloseToast}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
