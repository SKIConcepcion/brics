import React from "react";
import empty from "../assets/1.png";

const EmptyState = ({ message, linkText, link }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <img src={empty} alt="Empty Icon" className="mx-auto h-80" />
      <p className="text-lg text-gray-500 mb-2">{message}</p>
      <a href={link} className="text-blue-500 text-decoration-none font-bold">
        {linkText}
      </a>
    </div>
  );
};

export default EmptyState;