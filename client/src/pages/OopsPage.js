import React, { useState } from "react"; //Use State for the drop down
import { useNavigate } from "react-router-dom";
import Oops from "../assets/2.png";

function OopsPage() {
  const navigate = useNavigate();

  return (
    <div className=" flex flex-col items-center bg-white-500 py-05 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-0">
        <img src={Oops} alt="Oops" className="mx-auto h-45" />

        <p className="mt-0 text-center text-2xl w-full">
          <span className="font-bold">Oop! </span>
          Something went wrong. Please go back to the homepage.
        </p>
      </div>
      <form className="mt-8 space-y-6"></form>

      <div>
        <button
          type="submit"
          onClick={() => navigate(`/`)}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brics-blue hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Go back to homepage
        </button>
      </div>
    </div>
  );
}

export default OopsPage;
