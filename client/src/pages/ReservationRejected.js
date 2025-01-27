import React from "react";
import Stepper from "../components/Stepper";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";


export default function ReservationRejected() {

    const reservationData = {
        "_id": { "$oid": "6625831dcd5b6e16bb0d67fc" },
        "reservationId": "guest_smdirige_2024-04-22T18:00:00.000+00:00",
        "eventName": "Seven Seven GSI Company Talks",
        "description": "Seven Seven GSI is Looking for Aspiring Developers in UPLB through a Company Talks Event",
        "type": "Inquiry",
        "reservationDate": { "$date": { "$numberLong": "1713808800000" } },
        "startDate": "2024-05-05",
        "endDate": "2024-05-05",
        "timeStart": "13:00",
        "timeEnd": "17:00",
        "userEmail": "smdirige@gmail.com",
        "contactNumber": "09564268426",
        "userName": "Sean Michael Dirige",
        "userPosition": "Human Resources Manager",
        "companyName": "Seven Seven GSI",
        "transactionId": "82362187209815",
        "status": "Rejected", // Example status
        "isDeleted": false,
        "transactionHistory": [
            {
                "actionMade": "Inquiry Sent",
                "actionBy": "smdirige@gmail.com",
                "actionDate": { "$date": { "$numberLong": "1713808800000" } }
            },
            {
                "actionMade": "Inquiry Approved",
                "actionBy": "admin3@up.edu.ph",
                "actionDate": { "$date": { "$numberLong": "1713981600000" } }
            }
        ],
        "files": null
    };

    const status = reservationData.status; // Example status
    const eventTitle = reservationData.eventName
    // Dapat siguro naka indicate din sa dummy data yung name ng room na ininquire/nireserve ng user

    return (
        <div className="bg-backgroundColor h-full flex-col justify-center items-center">
            <Navbar />
            <h1 className="text-5xl mt-20 font-black font-['Satoshi'] text-brics-blue">Track Reservation</h1>
                <div  className="mt-10 px-10"><SearchBar /></div>
                <div class="max-w-[1250px] w-full mt-20 px-10 gap-8 flex justify-start items-start inline-flex">
                    <div class="flex-col justify-start items-start inline-flex">
                        <div class="text-blue-500 text-3xl font-bold font-['Satoshi'] leading-[54px]">{eventTitle}</div>
                        <div class="text-gray-500 text-xl font-medium font-['Satoshi'] leading-9">PC LAB 9, MH</div>
                    </div>
                </div>
                <div className="max-w-[100%] w-full flex justify-center">
                    <div className='mt-20 mb-20 ml-20' >
                        <Stepper status={status} />
                    </div>
                </div>
                <div class="flex justify-center mb-50 px-10">
                    <div class="w-[1177px] h-[2.63px] bg-gray-300"></div>
                </div>
                <div class="flex justify-center mt-20 mb-20">
                    <div class="w-[1760px] text-center text-stone-900 text-[22px] font-medium font-['Satoshi'] leading-[50px] tracking-tight">We regret to inform you that your reservation request has been declined. <br/>We apologize for any inconvenience this may cause.
                        <br/>
                        <br/>Please note that you are welcome to submit a new reservation request at any time. <br/>If you have any questions or need further assistance, feel free to contact us.
                        <br/>
                        <br/>Thank you for your understanding.
                    </div>
                </div>
            <Footer />
        </div>
    );
}
