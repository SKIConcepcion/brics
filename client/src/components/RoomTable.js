import React from "react";
import { Link } from "react-router-dom";

// Define your amenities here...

export default function Table({ room }) {
  const computerAmen = {
    label: "Computer",
    icon: (
      <svg
        className="flex-shrink-0 size-5"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="14" x="2" y="3" rx="2" />
        <line x1="8" x2="16" y1="21" y2="21" />
        <line x1="12" x2="12" y1="17" y2="21" />
      </svg>
    ),
  };

  const projectorAmen = {
    label: "Projector",
    icon: (
      <svg
        className="flex-shrink-0 size-5"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 7 3 5" />
        <path d="M9 6V3" />
        <path d="m13 7 2-2" />
        <circle cx="9" cy="13" r="3" />
        <path d="M11.83 12H20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2.17" />
        <path d="M16 16h2" />
      </svg>
    ),
  };

  const micAmen = {
    label: "Mic",
    icon: (
      <svg
        className="flex-shrink-0 size-5"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12" />
        <circle cx="17" cy="7" r="5" fill="none" />
      </svg>
    ),
  };

  const wifiAmen = {
    label: "WiFi",
    icon: (
      <svg
        className="flex-shrink-0 size-5"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 20h.01" />
        <path d="M2 8.82a15 15 0 0 1 20 0" />
        <path d="M5 12.859a10 10 0 0 1 14 0" />
        <path d="M8.5 16.429a5 5 0 0 1 7 0" />
      </svg>
    ),
  };

  const podiumAmen = {
    label: "Podium",
    icon: (
      <svg
        className="flex-shrink-0 size-5"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19.79,7.13A1,1,0,0,0,19,6.75H8v-.5A2,2,0,0,1,9.46,4.33a1.5,1.5,0,0,0,1,.42h1a1.5,1.5,0,0,0,0-3h-1a1.49,1.49,0,0,0-1.17.57A4,4,0,0,0,6,6.25v.5H5a1,1,0,0,0-.79.38A1,1,0,0,0,4,8l.62,2.49A3,3,0,0,0,7.1,12.71l.78,7H7a1,1,0,0,0,0,2H17a1,1,0,0,0,0-2h-.88l.78-7a3,3,0,0,0,2.45-2.23L20,8A1,1,0,0,0,19.79,7.13ZM14.1,19.75H9.9l-.78-7h5.76ZM17.41,10a1,1,0,0,1-1,.76H7.56a1,1,0,0,1-1-.76L6.28,8.75H17.72Z" />
      </svg>
    ),
  };

  const speakerAmen = {
    label: "Speaker",
    icon: (
      <svg
        className="flex-shrink-0 size-5"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="16" height="20" x="4" y="2" rx="2" />
        <path d="M12 6h.01" />
        <circle cx="12" cy="14" r="4" />
        <path d="M12 14h.01" />
      </svg>
    ),
  };

  return (
    <Link
      to={`/room/${room.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div style={{ width: 340, fontFamily: "Satoshi" }}>
        <div className="-mt-14 w-full h-full px-4 py-2 flex flex-col items-start gap-2 inline-flex border border-gray-300 rounded-lg">
          <div className="self-stretch mt-14 justify-between items-center inline-flex">
            <div className="text-justify text -gray-700 text-l font-bold break-words">
              {room.name}
            </div>
          </div>
          <div className="font font-medium text-neutral-700 text-gray-700">
            ₱{room.reservationFee}
          </div>
          <div className="self-stretch h-0.5 bg-gray-200 rounded-lg"></div>
          <div className="self-stretch py-1.5 px-0 justify-between items-center inline-flex">
            <div className="h-7 justify-between items-center flex">
              <div className="justify-center items-center gap-2 flex">
                {room.computerCount > 0 && (
                  <>
                    {computerAmen.icon}
                    <div className="text-justify text-black text-sm font-medium line-clamp-1">
                      {room.computerCount}
                    </div>
                  </>
                )}
                {room.hasWifi && wifiAmen.icon}
                {room.hasProjector && projectorAmen.icon}
                {room.mic > 0 && micAmen.icon}
                {room.speakers > 0 && speakerAmen.icon}
                {room.hasPodium && podiumAmen.icon}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
