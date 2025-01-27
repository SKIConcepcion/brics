import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {Minus} from 'lucide-react'

export default function Dater(props) {

  const valueStart = props.valueStart;
  const setValueStart = props.setValueStart;

  const valueEnd = props.valueEnd;
  const setValueEnd = props.setValueEnd;

  const [startDate, setStartDate] = useState(valueStart);
  const [endDate, setEndDate] = useState(valueEnd);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    setValueStart(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    setValueEnd(date);
  };

  return (
    <div className="flex flex-row justify-center space-x-2">
      <DatePicker
        selected={startDate}
        onChange={handleStartDateChange}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        placeholderText="Start Date"
        className="border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-600 focus:outline-none focus:ring focus:ring-blue-300 w-full"
      />
      <div className='flex inline-flex justify-center mt-1'><Minus color='gray'/></div>
      <DatePicker
        selected={endDate}
        onChange={handleEndDateChange}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        placeholderText="End Date"
        className="border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-600 focus:outline-none focus:ring focus:ring-blue-300 w-full"
      />
    </div>
  );
};

