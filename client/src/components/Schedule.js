import React, { useEffect, useState } from "react";
import dayjs from 'dayjs';

export const Schedule = ({currentWeek: initialWeek, roomSchedules, roomReservations, userClass}) => {
    const [currentWeek, setCurrentWeek] = useState(dayjs(initialWeek).startOf('week').add(1, 'day'));
    console.log("ROOM SCHEDULES: ", roomSchedules);
    console.log("ROOM RESERVATIONS: ", roomReservations);
    console.log("CURRENT WEEK: ", currentWeek);

    const goToPreviousWeek = () => {
        setCurrentWeek(prevWeek => prevWeek.subtract(1, 'week'));
    };

    const goToNextWeek = () => {
        setCurrentWeek(prevWeek => prevWeek.add(1, 'week'));
    };

    useEffect(() => {
        setCurrentWeek(dayjs(currentWeek).startOf('week').add(1, 'day'));
    }, [initialWeek]);

    const [times, setTimes] = useState(Array.from({ length: 16 }, (_, i) => `${i + 6}:00`));

    useEffect(() => {
        setTimes(Array.from({ length: 16 }, (_, i) => `${i + 6}:00`));
    }, [currentWeek]);

    const [scheduleGrid, setScheduleGrid] = useState(Array.from({ length: 16 }, () => Array.from({ length: 6 }, () => null)));

    useEffect(() => {
        setScheduleGrid(Array.from({ length: 16 }, () => Array.from({ length: 6 }, () => null)));
    }, [currentWeek]);

    useEffect(() => {
        const newGrid = Array.from({ length: 16 }, () => Array.from({ length: 6 }, () => null));

        roomSchedules.forEach((schedule) => {
            const startHour = parseInt(schedule.timeStart.split(':')[0]);
            const dayOfWeek = schedule.recurrencePattern?.dayOfWeek;

            if (dayOfWeek) {
                dayOfWeek.forEach((day) => {
                    if (startHour >= 6 && startHour < 22 && day >= 1 && day <= 6) {
                        newGrid[startHour - 6][day - 1] = schedule;
                    }
                });
            }
        });

        roomReservations.forEach((reservation) => {
            const startHour = parseInt(reservation.timeStart.split(':')[0]);
            const startDate = dayjs(new Date(reservation.startDate)); // Convert to dayjs object
            const endDate = dayjs(new Date(reservation.endDate));
    
            // Check if reservation overlaps with the current week
            if (
                startDate.startOf('day').isBefore(currentWeek.endOf('week')) &&
                endDate.startOf('day').isAfter(currentWeek.startOf('week'))
            ) {
                for (let i = 0; i < 7; i++) {
                    const currentDay = currentWeek.startOf('week').add(i, 'day');
                    if (
                        startDate.isBefore(currentDay.endOf('day')) &&
                        endDate.isAfter(currentDay.startOf('day'))
                    ) {
                        if (startHour >= 6 && startHour < 22 && i >= 1 && i <= 6) {
                            newGrid[startHour - 6][i - 1] = reservation;
                        }
                    }
                }
            }
        });

        setScheduleGrid(newGrid);
    }, [currentWeek, roomSchedules, roomReservations]);

    const scheduleTileStyle = {
        width: '170px',
        height: '40px',
    };

    return (
        <div className="w-11/12 m-4">
            <div className="flex justify-center items-center mb-4">
                <button className="px-2 py-1 bg-blue-500 text-white rounded-md mr-3" onClick={goToPreviousWeek}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left">
                        <path d="m15 18-6-6 6-6"/>
                    </svg>
                </button>
                <span className="font-semibold">
                    {dayjs(currentWeek).format('MMMM D')} - {dayjs(currentWeek).add(5, 'days').format(' MMMM D')}
                </span>
                <button className="px-2 py-1 bg-blue-500 text-white rounded-md ml-3" onClick={goToNextWeek}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right">
                        <path d="m9 18 6-6-6-6"/>
                    </svg>
                </button>
            </div>

            <div>
                <table>
                    <thead>
                        <tr>
                            <th className="border border-gray-500 px-1 py-3 text-sm">Time</th>
                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => (
                                <th key={index} className="border border-gray-500 px-1 py-3 text-sm">{day}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {times.map((time, index) => (
                            <tr key={index}>
                                <td className="border border-gray-500 px-10 py-30 text-center">{time}</td>
                                {scheduleGrid[index].map((schedule, dayIndex) => (
                                    <td key={`${index}-${dayIndex}`} className="border border-gray-500 text-sm">
                                        <div
                                            className={`schedule-cell ${schedule ? 'bg-brics-blue text-white' : 'bg-gray-50'} rounded-sm p-1 text-bold flex justify-center items-center`}
                                            style={scheduleTileStyle}
                                        >
                                            {schedule && userClass === "student_org" ? "Unavailable" : schedule?.eventName}
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Schedule;
