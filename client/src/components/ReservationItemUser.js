import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ReservationItemUser({
    _id,
    rooms,
    startDate,
    eventName,
    userName,
    endDate,
    timeStart,
    timeEnd,
    companyName,
    status,
    recurrencePattern,
    userEmail,
    userPosition,
    contactNumber,
    files,
    description
}) {
    // const [fetchedRooms, setFetchedRooms] = useState(null);

    // // get room names in each ID
    // useEffect(() => {
    //     const newRooms = [];
    //     if (rooms.length > 0) { 
    //         rooms.forEach(element => {
    //             const getRoom = async () => {
    //                 try {
    //                     // console.log(element)
    //                     const response = await axios.get(`https://brics-api.vercel.app/api/rooms/get-room/${element}`)
    //                     const newRoom = response.data
    //                     newRooms.push(newRoom.name);
    //                 } catch (error) {
    //                     // console.log(error);
    //                 }
    //             }
    //             getRoom();
    //         }); 
    //     } else {
    //         newRooms.push("ICSMH") // default value
    //     }

    //     setFetchedRooms(newRooms);
    // }, [])

    const statusColorMapping = {
        "Awaiting Approval": "#3B82F6",
        "Pending Payment": "#A855F7",
        "Finalized": "#1E3A8A",
        "Rejected": "#EF4444",
        "Cancelled": "#EF4444",
    };

    const dataToPass = {
        _id,
        rooms,
        startDate,
        eventName,
        userName,
        endDate,
        userEmail,
        timeStart,
        timeEnd,
        companyName,
        status,
        recurrencePattern,
        userPosition,
        contactNumber,
        files,
        description
    }

    return (
        <div className={`flex rounded-md w-full`}>
            <div
                className={`flex-none rounded-l-md px-2 py-9`}
                style={{backgroundColor: statusColorMapping[status]}}
            ></div>
            <div className={`flex-1 border border-${statusColorMapping[status]} rounded-r-md flex`}>
                <div className="grid grid-flow-col w-full gap-1 mr-5 grid-cols-12">
                    <div className="col-span-2 flex-col ml-4 flex justify-center items-start">
                        <div className="font-bold">{
                            (rooms) ?
                            rooms.map((room, index) => (
                                <p key={index} className={room.length < 20 ? "text-xs lg:text-xl text-left" : "text-large text-left"}>
                                    <Link to={`/reservation-details-user`} state={dataToPass} >
                                        {room.name}
                                    </Link>
                                </p>
                            ))
                            :
                            <div>ICSMH</div> 
                        }</div>
                        <div className="text-gray-500 text-xs">{startDate}</div>
                    </div>
                    <div className="flex col-span-2 flex-col ml-4 items-center justify-center">
                        <div className="font-bold text-xl">
                            <Link to={`/reservation-details-user`} state={dataToPass} >
                                {eventName}
                            </Link>
                        </div>
                        <div className="text-gray-500 text-xs">
                            {userName}
                        </div>
                    </div>
                    <div className="flex col-span-1 flex-col ml-4 items-start justify-center">
                        <div className="text-gray-500 text-xs">Date Start</div>
                        <div className="font-bold text-xs">{
                            startDate ?
                            startDate
                            :
                            (
                                recurrencePattern &&
                                recurrencePattern.startDate
                            )
                        }</div>
                    </div>
                    <div className="flex col-span-1 flex-col ml-4 items-start justify-center">
                        <div className="text-gray-500 text-xs">Date End</div>
                        <div className="font-bold text-xs">{
                            endDate ?
                            endDate
                            :
                            (
                                recurrencePattern &&
                                recurrencePattern.endDate
                            )
                        }</div>
                    </div>
                    <div className="flex col-span-1/2 flex-col ml-4 items-start justify-center">
                        <div className="text-gray-500 text-xs">Time Start</div>
                        <div className="font-bold">{timeStart}</div>
                    </div>
                    <div className="flex col-span-1/2 flex-col ml-4 items-start justify-center">
                        <div className="text-gray-500 text-xs">Time End</div>
                        <div className="font-bold">{timeEnd}</div>
                    </div>
                    <div className="flex col-span-1 flex-col ml-4 items-start justify-center">
                        <div className="text-gray-500 text-xs">
                            Affiliation/Institute
                        </div>
                        <div className="font-bold text-xs lg:text-small">{companyName}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
