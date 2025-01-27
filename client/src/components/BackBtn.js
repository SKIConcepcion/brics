import React from "react";

export default function BackBtn() {
  const goBack = () => {
    window.history.back();
  };

  return (
    <div>
      <button
        onClick={goBack}
        type="button"
        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-brics-blue hover:bg-brics-blue hover:text-white disabled:opacity-50 disabled:pointer-events-none"
      >
        <svg
          className="size-10"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </svg>
      </button>
    </div>
  );
}
