import { useEffect, useState } from "react"

/*
STATES
    total - should be computed in the reservatoin section, not here
    windowWidth - a value that holds the screen's width. used to change layout dynamically based on the screen size
*/
export default function RoomReservationList(props) {
    const { data, discount, handleDelete } = props;
    const [total, setTotal] = useState(0);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // compute for total amount 
    useEffect(() => {
        let newTotal = 0;
        if (data) {
            data.forEach(element => {
                newTotal += element.reservationFee;
            });
            if (discount) {
                newTotal -= 300;
            }
            setTotal(newTotal);
        }
    }, [data, discount]);

    return (
        <div className="w-full flex flex-col items-center space-y-10">
            {
                windowWidth > 1050 ?
                <div className="border rounded-lg lg:w-2/3 p-5 px-14 flex flex-row justify-around">
                    <div className="flex flex-col items-start justify-between h-full">
                        <div className="text-brics-blue font-bold mb-5 text-lg">Rooms to Reserve</div>
                        <div className="flex flex-col justify-evenly h-full">
                            {data && data.map((item, index) => {
                                return (
                                    <div className="flex items-center space-x-3 mb-5" key={index}>
                                        <img className="w-32 h-20 rounded-md" src={item.pictures[0]} alt="" />
                                        <div className="flex flex-col">
                                            <div className="font-satoshi-bold text-left">{item.name}</div>
                                            <div className="text-black">{item.location}</div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div> 
                    <div>
                        <div className="text-brics-blue font-bold text-lg lg:block hidden">Dates</div>
                        <div className="flex flex-col justify-evenly h-full">
                            {data && data.map((item, index) => {
                                return (
                                    <div key={index} className="mb-6">
                                        {
                                            item.startDate === item.endDate ? <div>{item.startDate}</div> :
                                            <div>
                                                {item.startDate} - {item.endDate}
                                            </div>
                                        }
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div>
                        <div className="text-brics-blue font-bold text-lg lg:block hidden">Amount to Pay</div>
                        <div className="flex flex-col justify-evenly h-full">
                            {data && data.map((item, index) => {
                                return (
                                    <div key={index} className="mb-6">
                                        ₱ {item.reservationFee}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div>
                        <div className="text-brics-blue font-bold text-lg lg:block hidden">Actions</div>
                        <div className="flex flex-col justify-evenly h-full">
                            {data && data.map((item, index) => {
                                return (
                                    <div className="text-red-500 font-bold mb-6" key={index}>
                                        <div className="cursor-pointer" onClick={() => handleDelete(item.roomId)}>Delete</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                :
                <div className="w-full sm:w-2/3">
                    <div className="px-5 text-brics-blue font-bold w-full text-left">
                        <p>Rooms to reserve</p>
                    </div>
                    <div className="px-5 flex flex-col gap-2">
                        {data && data.map((item, index) => {
                            return (
                                <div key={index} className="border p-4 rounded-lg">
                                    <div className="text-left font-bold text-large">{item.name}</div>
                                    <div className="flex flex-row w-full space-x-2">
                                        <div className="w-2/4">
                                            <img className="rounded-md sm:w-60 sm:h-36 w-32 h-20" src={item.imageLink} alt={item.name + " image"} />
                                        </div>
                                        <div className="w-2/4 flex flex-col text-left justify-between">
                                            <div>
                                                <div className="text-xs sm:text-xl">{item.location}</div>
                                                {
                                                    item.startDate === item.endDate ?
                                                    <div className="text-xs sm:text-xl"><span className="font-bold">Date: </span>{item.startDate}</div>
                                                    :
                                                    <div className="text-xs sm:text-xl"><span className="font-bold">Dates: </span>{item.startDate} - {item.endDate}</div>
                                                }
                                            </div>
                                            <div className="flex flex-row justify-between text-xs">
                                                <div className="font-bold text-xs sm:text-xl">₱ {item.amount}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </div>
            }
            
            <div className="border rounded-lg w-full lg:w-2/3 p-5 px-14 flex flex-col items-end">
                {
                    discount && 
                    <div>
                        <p><span className="font-satoshi-bold">Discount</span>: Student -₱ 300</p>
                    </div>
                }
                <div>
                    <p><span className="font-satoshi-bold">Total:</span> ₱ {total}</p>
                </div>
            </div>
        </div>
    )
}