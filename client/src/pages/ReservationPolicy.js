import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ReservationPolicy() {
    return(
        <div className="bg-backgroundColor h-full">
            <Navbar />
            <h1 className="mt-20 text-brics-blue text-5xl pt-9 font-bold">Reservation Policies</h1>
            <div className="items-center px-40 py-20">
                <div className="text-left">
                    <label className="text-xl lg:text-large" style={{ fontFamily: 'Satoshi-regular'}}><b>Reservation Process</b></label>
                    <p className="text-lg text-justify leading-loose mt-3" style={{ fontFamily: 'Satoshi-regular'}}>The reservation process is streamlined through the BRICS website. Users can request room reservations, which are then reviewed by the admin team based on room availability. Upon review, reservations may be either approved or rejected, ensuring fair and efficient allocation of resources.</p>
                </div>
                <div className="text-left mt-10">
                    <label className="text-xl lg:text-large" style={{ fontFamily: 'Satoshi-regular'}}><b>Reservation Fees</b></label>
                    <p className="text-lg text-justify leading-loose mt-3" style={{ fontFamily: 'Satoshi-regular'}}>Users should note that reservation fees may apply, depending on factors such as duration, and room type. Additional charges may also occur for extended use, special requests, or equipment rental. Please be aware that all reservation fees, once paid, are non-refundable in any circumstances. This policy applies to all reservations made through the website, regardless of the reason for cancellation or changes to the reservation.</p>
                </div>
                <div className="text-left mt-10">
                    <label className="text-xl lg:text-large" style={{ fontFamily: 'Satoshi-regular'}}><b>User Responsibilities</b></label>
                    <p className="text-lg text-justify leading-loose mt-3">Users are responsible for adhering to the reservation process outlined on the platform. This includes compliance with reservation rules, regulations, and facility policies. Timely arrival and departure from reserved rooms are expected, and any damages or misuse of equipment during reservations will be the responsibility of the user.</p>
                </div>
                <div className="text-left mt-10">
                    <label className="text-xl lg:text-large" style={{ fontFamily: 'Satoshi-regular'}}><b>Reservation Documentation</b></label>
                    <p className="text-lg text-justify leading-loose mt-3" style={{ fontFamily: 'Satoshi-regular'}}>To facilitate reservation approval, users must provide necessary documentation, such as Letter of Intent (LOI) and proof of payment, through the website's upload feature within the specified timeframe.</p>
                </div>
                <div className="text-left mt-10">
                    <label className="text-xl lg:text-large" style={{ fontFamily: 'Satoshi-regular'}}><b>Reservation Confirmation</b></label>
                    <p className="text-lg text-justify leading-loose mt-3" style={{ fontFamily: 'Satoshi-regular'}}>Upon approval, users will receive confirmation of their reservation via email, and confirmed reservations will be reflected in their reservation history on the platform.</p>
                </div>
                <div className="text-left mt-10">
                    <label className="text-xl lg:text-large" style={{ fontFamily: 'Satoshi-regular'}}><b>Reservation Status Tracking</b></label>
                    <p className="text-lg text-justify leading-loose mt-3" style={{ fontFamily: 'Satoshi-regular'}}>Users can track the status of their reservation requests through the website, with updates communicated via email or through the website dashboard.</p>
                </div>
                <div className="text-left mt-10">
                    <label className="text-xl lg:text-large" style={{ fontFamily: 'Satoshi-regular'}}><b>Reservation Reports</b></label>
                    <p className="text-lg text-justify leading-loose mt-3" style={{ fontFamily: 'Satoshi-regular'}}>For analytical purposes and to improve reservation processes, the admin team can generate reports regarding reservation activities and user demographics through the BRICS website.</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}