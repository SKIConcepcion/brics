import React, { useState } from "react"
import FormField from "../components/FormField";
import { useLocation, useNavigate} from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loading from "./Loading";
import axios from 'axios';
/*
NOTES:
    - code input should be string masked by frontend
    - "Authenticate" button should lead to notif that says "transaction code sent" then to Transaction Code Input page.
    - "Resend code" hyperlink should refresh state and resend a code. Add timer for resending code to prevent spam? (eg. Resend code after 30s)
*/

export default function EmailAuth() {
    const location = useLocation();
    const navigate = useNavigate();
    const { email, userName, eventName, startDate, endDate, timeStart, timeEnd, position, contactNumber, organization, selectRoom, address, schedule, eventDesc, files } = location.state;
    const [authCode, setAuthCode] = useState(''); // for storing form value
    const [isLoading, setIsLoading] = useState(false);
    const [showVerified, setShowVerified] = useState(false);

    const obfuscateEmail = (email) =>{
        const [user,domain] = email.split('@');
        const [firstDomainChar, ...restDomainChars] = domain.split('.');
        return `${user[0]}***@**${firstDomainChar[0]}***.${restDomainChars[0]}***`;
    }
    const authCodeField = {
        label: "Email Verification Code", 
        guide: "",
        placeholder: "* * * * * *",
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"/><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"/></svg>,
    }

    const convertBase64 = (files) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(files);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    async function handleResendCode(e){
        const response = await axios.post(`https://brics-api.vercel.app/api/send-otp`, {email: email,});
        // console.log(response);
    }

    async function handleCreateInquiry(e){
        e.preventDefault();
        setIsLoading(true)
        const inquiry = {
            'eventName': eventName,
            'description': eventDesc,
            'type': 'Inquiry',
            'reservationDate': new Date().toISOString(),
            'startDate': startDate,
            'endDate': endDate,
            'timeStart': timeStart, 
            'timeEnd': timeEnd,    
            'userEmail': email,
            'contactNumber': contactNumber,
            'userName': userName,
            'userPosition': position,
            'companyName': organization,
            'status': "Awaiting Approval",
            'rooms': [selectRoom._id],
            'files': files,
            'otp': authCode
        }

        // console.log(inquiry);

        try{
            if(files){
                const base64s = [];
                for (let i = 0; i < files.length; i++) {
                    const base = await convertBase64(files[i]);
                    base64s.push(base);
                }

                const filesToUpload = {
                    files: base64s,
                };

                // console.log(base64s);
                if (base64s) {
                    const uploadFileResponse = await axios.post(
                        "https://brics-api.vercel.app/api/upload-multiple",
                        filesToUpload,
                    );
                    // console.log(uploadFileResponse);
                    inquiry.files = uploadFileResponse.data;
                    // alert("File uploaded successfully!");
                }
            }
            const responseInquiry = await axios.post("https://brics-api.vercel.app/api/reservations/create-reservation", inquiry, {withCredentials: true});
            // console.log(reponseInquiry);
            if(responseInquiry){
                const response = await axios.post(`https://brics-api.vercel.app/api/send-transaction-id`, {email: email,});
                setIsLoading(false)
                setShowVerified(true)
            }
        }catch(error){
            setIsLoading(false)
            // console.log(error);
        }
      }

    return (
        <div>
            <Navbar/>
                {isLoading ? (
                    <Loading />
                ) : (showVerified ? (
                    <div className="flex flex-col items-center h-[500px] mt-24 mb-15 py-05 px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col items-center mt-12 max-w-xl w-full space-y-0">
                            <svg className="size-40 text-brics-blue" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><path d="m16 19 2 2 4-4"/></svg>
                            <p className="mt-0 text-center text-2xl text-blue-900 w-full">
                            <span className="font-satoshi-bold">Success! You're email has been verified.</span>
                            <br/>
                            <span>We'll send you the status of your inquiry via email.</span>
                            </p>
                        </div>
                        <div>
                            <button
                            type="submit"
                            onClick={() => navigate(`/`)}
                            className="w-full flex justify-center mt-10 mb-10 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                            Go back to homepage
                            </button>
                        </div>
                    </div>
                ):(
                <div className="mt-24">
                    <div className='font-satoshi-bold text-brics-blue text-5xl mt-10'>Verify your Email</div>
                    <div className='h-[400px] flex flex-col justify-center items-center'>
                        <div className='mb-16'>
                            <p> Please enter the six-digit verification code we just emailed to </p>
                            <p> <span className="font-satoshi-bold">
                                {email && obfuscateEmail(email)}</span> to proceed. <span className="text-gray-600 font-medium underline"><button onClick={handleResendCode}>(Resend code.)</button></span> </p>
                        </div>
                        <div style={{boxShadow: "0px 0px 10px 10px rgba(37, 99, 235, 0.12)"}} className="w-[800px] gap-4 lg:rounded-md p-2 lg:flex lg:flex-col lg:justify-start">
                            <div className="w-full px-8 justify-start">
                                <FormField field={authCodeField} value={authCode} setValue={setAuthCode}/>
                            </div>
                            <button type="button" className="w-full py-3 px-4 inline-flex items-center gap-x-2 text-lg font-bold rounded-lg border border-transparent bg-brics-blue text-white text-center hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none justify-center" disabled={!authCode} onClick={handleCreateInquiry}>
                                Authenticate
                            </button>
                        </div>
                    </div>
                </div>
                ))}
            <Footer/>
        </div>
    )
}