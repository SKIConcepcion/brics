import React from "react";

export const ErrorPrompt = ({
  ErrorHeader,
  ErrorDescription
}) => {

  return (
    <div className="flex justify-center items-center">
      <div className="w-96 mt-5 p-4 mb-4 text-md text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 max-w-md">
        <span className="font-bold">{ErrorHeader}</span> {ErrorDescription}
      </div>
    </div>
  )
};

export default ErrorPrompt;
