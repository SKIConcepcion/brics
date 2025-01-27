import { React, useState, useEffect } from "react"; //Use State for the drop down
import Dropdown from "../components/Dropdown.js";
import titleLogo from "../assets/title_card_transparent.png";
import FormField from "../components/FormField.js";
import Toast from "../components/Toast.js";
import Axios from "axios";
import { optionsColleges, listDept } from "../components/Colleges.js";
import { useNavigate } from "react-router-dom";
import BackBtn from "../components/BackBtn.js";
function LogIn() {
  const navigate = useNavigate();
  //No instute for GS, SESAM,CPAD

  //STATES
  //For Users
  const [userType, setUserType] = useState("");
  const [selectedOption, setSelectedOption] = useState(""); // This will be changing for the DropDown

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  //For Name
  // const [nameState, setnameState] = useState(""); // This will be changing for the DropDown
  ///For email
  const [lastName, setlastnameState] = useState("");

  const [firstName, setfirstNameState] = useState("");
  //For Organization
  const [nickname, setnickNameState] = useState("");
  const [email, setemailState] = useState("");
  const [affiliation, setSelectedOrg] = useState("");
  const [affiliationAcro, setorgAcroState] = useState("");
  const [showError, setShowError] = useState(false);
  const [isRegistered, setisRegistered] = useState("");

  const [selectedOptionCollege, setSelectedOptionCollege] = useState(
    optionsColleges[0]
  ); // This will be changing for the DropDown

  useEffect(() => {
    setSelectedOptionInsti(listDept(selectedOptionCollege)[0]);
  }, [selectedOptionCollege]); // This tells React to call this function whenever selectedOptionCollege changes

  //For Insti/Dept
  const [selectedOptionInsti, setSelectedOptionInsti] = useState(
    listDept(selectedOptionCollege)[0]
  ); // This will be changing for the DropDown

  const handleChangeInsti = (event) => {
    setSelectedOptionInsti(event.target.value); // eventHandle for changing the selected option
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };
  //Functions for mutating the allowable lists
  //For disabling organization name field
  //NOT USED ANYMORE
  function disableOrg(disable) {
    const textFieldAff = document.getElementById("affiliation");
    const textFieldAffAcro = document.getElementById("affiliationAcro");
    textFieldAff.disabled = disable;
    textFieldAffAcro.disabled = disable;
  }

  //Fields for the User

  const lastNameField = {
    label: "Last Name",
    guide: "Dela Cruz",
    placeholder: "Dela Cruz",
    icon: null,
  };

  const firstNameField = {
    label: "First Name",
    guide: "Juan",
    placeholder: "Juan",
    icon: null,
  };

  const nickNameField = {
    label: "Nickame",
    guide: "Johnny",
    placeholder: "Johnny",
    icon: null,
  };

  const emailField = {
    label: "Email",
    guide: "jdcruz@up.edu.ph",
    placeholder: "jpcruz@up.edu.ph",
    icon: null,
  };
  const orgField = {
    label: "Organization",
    guide: "Organization Name",
    placeholder: "Organization Name",
    icon: null,
  };

  const orgAcroField = {
    label: "Organization Acronym",
    guide: "ON",
    placeholder: "ON",
    icon: null,
  };

  const collegeField = {
    label: "College",
    guide: "College",
    placeholder: "College",
    options: optionsColleges,
  };

  const instiField = {
    label: "Institute/Department",
    guide: "Institute",
    options: listDept(selectedOptionCollege),
  };

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleCloseToast = () => {
    setShowError(false);
  };

  async function submitResponse(e) {
    const objReturn = {
      // userId: "sampleUser",
      userClass: userType,
      userStatus: "Pending",
      lastName: lastName,
      firstName: firstName,
      nickname: nickname,
      email: email,
      college: selectedOptionCollege,
      institution: selectedOptionInsti,
      affiliation: affiliation,
      affiliationAcro: affiliationAcro,
      transactions: [],
      isDeleted: false,
    };

    e.preventDefault();
    if (
      userType === "" ||
      lastName === "" ||
      firstName === "" ||
      nickname === "" ||
      email === "" ||
      !isValidEmail(email)
    ) {
      // console.log(objReturn);
      setShowError(true);
      return;
    } else if (
      userType === "student_org" &&
      (affiliation === "" || affiliationAcro === "")
    ) {
      //Case where affiliation matters
      setShowError(true);
      return;
    }

    try {
      await Axios.post(
        "https://brics-api.vercel.app/api/users/create-user",
        objReturn
      );
    } catch (error) {}
    navigate(`/sign-up/notice`);
    var frm = document.querySelector("#formMain");
    frm.submit();
  }

  function isOrganization(userType) {
    if (userType === "student_org") {
      return (
        <div>
          <FormField
            field={orgField}
            value={affiliation}
            setValue={setSelectedOrg}
          ></FormField>

          <FormField
            field={orgAcroField}
            value={affiliationAcro}
            setValue={setorgAcroState}
          ></FormField>

          {/* //<Checkbox field={isRegisteredOSA} options={[true]} value={isRegistered} setValue={setisRegistered}></Checkbox> */}
        </div>
      );
    }
  }

  return (
    <div className="relative">
      <div className="absolute top-0 left-0 z-10 ">
        <BackBtn />
      </div>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* https://coderpad.io/blog/development/tailwind-css-icons-a-how-to-guide/ */}

          <img src={titleLogo} alt="Title Logo" className="mx-auto h-50" />
          <form className="mt-8 space-y-6" id="formMain">
            <div className="flex flex-row gap-10">
              <FormField
                field={lastNameField}
                value={lastName}
                setValue={setlastnameState}
              ></FormField>

              <FormField
                field={firstNameField}
                value={firstName}
                setValue={setfirstNameState}
              ></FormField>
            </div>

            <FormField
              field={nickNameField}
              value={nickname}
              setValue={setnickNameState}
            ></FormField>

            <FormField
              field={emailField}
              value={email}
              setValue={setemailState}
            ></FormField>

            <label
              htmlFor="optionsUser"
              className="block text-sm font-medium text-gray-700"
            >
              Register as:
            </label>
            {/* For the radio button  https://tw-elements.com/docs/react/forms/radio/*/}
            <div className="flex items-center justify-left space-x-16">
              <div className="space-x-2">
                <input
                  type="radio"
                  id="facultyOption"
                  checked={userType === "faculty"}
                  value="faculty"
                  onChange={(e) => handleUserTypeChange(e)}
                />
                <label htmlFor="optionF">Faculty</label>
              </div>

              <div className="space-x-2">
                <input
                  type="radio"
                  id="studOrgOption"
                  checked={userType === "student_org"}
                  value="student_org"
                  onChange={(e) => handleUserTypeChange(e)}
                />
                <label htmlFor="optionS">Student Organization</label>
              </div>
            </div>

            {isOrganization(userType)}

            {/* Dropdown for College*/}

            <div className="flex flex-col items-left justify-center">
              <Dropdown
                field={collegeField}
                value={selectedOptionCollege}
                setValue={setSelectedOptionCollege}
                //onChange={handleChangeCollege} //This is for when the list for the insi changes
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></Dropdown>
            </div>

            {/* Dropdown for Institute/Department*/}
            <div className="flex flex-col items-left justify-center">
              <Dropdown
                field={instiField}
                value={selectedOptionInsti}
                setValue={setSelectedOptionInsti}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></Dropdown>
            </div>
            <div className="text-gray-700 mb-4 font-satoshi-regular">
              By signing up, you agree to our{" "}
              <a
                href="/privacy-policy"
                target="_blank"
                className="text-blue-500 font-bold"
              >
                Privacy Policy
              </a>
              .
            </div>
            <div>
              <button
                onClick={(e) => submitResponse(e)}
                id="submitBtn"
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Create Account
              </button>
            </div>
            {showError && (
              <div className="fixed bottom-10 right-10">
                <Toast
                  text="There is an error with your response."
                  onClose={handleCloseToast}
                />
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
