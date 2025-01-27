import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Accordion from "../components/Accordion";

export default function Faq() {
    return(
        <div className="bg-backgroundColor h-full flex-col justify-center items-center">
            <Navbar />
            <h1 className="text-3xl mt-28 font-bold text-brics-blue" style={{ fontFamily: 'Satoshi-bold'}}>Frequently Asked Questions</h1>
            <div className="max-w-[100%] w-full flex-col justify-center items-center p-20">
                <div className="max-w-[1177px] w-full p-4 rounded-lg flex inline-flex shadow border border-gray-200">
                    <Accordion 
                    title={"What type of rooms can I reserve through the BRICS website?"}
                    answer={"The BRICS website allows users to reserve various types of rooms available within the Institute of Computer Science (ICS), including lecture halls, and computer laboratories."}
                    isFirst={true}/>
                </div>  
                <div className="max-w-[1177px] w-full p-4 rounded-lg flex inline-flex shadow border border-gray-200">
                    <Accordion 
                    title={"Are there any fees associated with room reservations?"}
                    answer={"Yes, there may be reservation fees associated with certain room bookings, depending on factors such as duration, and room type. Please refer to the reservation policies for more details."}
                    isFirst={false}/>
                </div>  
                <div className="max-w-[1177px] w-full p-4 rounded-lg flex inline-flex shadow border border-gray-200">
                    <Accordion 
                    title={"Are there any restrictions on the duration of room reservations?"}
                    answer={"Users must reserve one week before the date of their event or when they plan to use the room. Reservations can typically be made up to a week in advance, as specified by the reservation system."}
                    isFirst={false}/>
                </div>  
                <div className="max-w-[1177px] w-full p-4 rounded-lg flex inline-flex shadow border border-gray-200">
                    <Accordion 
                    title={"How can I track the status of my reservation request?"}
                    answer={"The BRICS website allows users to reserve various types of rooms available within the Institute of Computer Science (ICS), including lecture halls, and computer laboratories."}
                    isFirst={false}/>
                </div>  
                <div className="max-w-[1177px] w-full p-4 rounded-lg flex inline-flex shadow border border-gray-200">
                    <Accordion 
                    title={"What type of rooms can I reserve through the BRICS website?"}
                    answer={<ul class="list-disc ml-10">
                        <li className="text-lg text-justify leading-loose mt-3">Student organizations and faculty members can track the status of their reservation requests by logging in to their accounts and accessing the reservation tracking feature, which provides real-time updates on the status of pending requests. </li>
                        <li className="text-lg text-justify leading-loose mt-3">Guests can track their reservation requests by entering the transaction ID provided to them in their emails after they click the 'Track Reservation' button. This transaction ID allows guests to access real-time updates on the status of their pending requests.</li>
                    </ul>}
                    isFirst={false}/>
                </div>  
            </div>
            <Footer />
        </div>
    );
}
