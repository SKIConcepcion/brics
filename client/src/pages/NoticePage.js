import React, { useState } from "react"; //Use State for the drop down
import { useNavigate } from "react-router-dom";
import emailNotice from "../assets/3.png";

function Notice() {
  const navigate = useNavigate();

  return (
    <div className=" flex flex-col items-center bg-white-500 py-05 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-0">
        <img src={emailNotice} alt="Email Logo" className="mx-auto h-45" />

        <p className="mt-0 text-center text-2xl text-gray-900 w-full">
          <span className="font-bold">Thank you! </span>We have received your
          account application. Kindly note that your account is pending approval
          from an administrator. Upon approval, you will receive a confirmation
          email. We appreciate your patience as we review and process your
          application.
        </p>
      </div>
      <form className="mt-8 space-y-6"></form>

      <div>
        <button
          type="submit"
          onClick={() => navigate(`/`)}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Go back to homepage
        </button>
      </div>
    </div>
  );
}

export default Notice;