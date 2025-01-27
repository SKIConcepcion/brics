import React from "react";
import { useState } from "react";
import axios from "axios";
import { PencilRuler, Trash2 } from "lucide-react";
import Alert from "./Alert";
import SnackBar from "./SnackBar";
import { useNavigate } from "react-router-dom";

export default function ScheduleCard({ schedule, room }) {
  const [showDeleteScheduleAlert, setShowDeleteScheduleAlert] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();
  const handleDeleteScheduleAction = async () => {
    try {
      await axios.delete(
        `https://brics-api.vercel.app/api/schedule/delete-schedule/${schedule._id}`
      );
      setSnackbarMessage("Schedule deleted successfully");
      setSnackbarOpen(true);
      // set delay and refresh
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      setSnackbarMessage("Failed to delete schedule");
      setSnackbarOpen(true);
    }
    setShowDeleteScheduleAlert(false);
  };

  const handleEditScheduleAction = () => {
    navigate(`/edit-sched`, { state: { room: room, schedule: schedule } }); 
  };

  return (
    <div
      className="w-full h-16 flex justify-between items-center border border-blue-500 rounded-lg bg-white shadow"
      style={{ padding: "17px 40px", gap: "32px" }}
    >
      <span className="font-bold w-1/6">
        {new Date(
          `1970-01-01T${String(schedule.timeStart).padStart(5, "0")}:00`
        ).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })}{" "}
        -
        {new Date(
          `1970-01-01T${String(schedule.timeEnd).padStart(5, "0")}:00`
        ).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
      </span>
      <span className="w-1/6">{schedule.eventName}</span>
      <div className="flex gap-4  w-1/4 justify-start align-middle">
        {["Mo", "Tu", "We", "Th", "Fr"].map((day, index) => (
          <div
            key={index}
            className={`h-9 w-9 rounded-full flex items-center justify-center align-middle text-white text-m font-bold ${
              schedule.recurrencePattern.dayOfWeek.includes(index)
                ? "bg-blue-500"
                : "bg-gray-300"
            }`}
          >
            <span>{day}</span> {/* Remove the p-1 and w-1/6 classes */}
          </div>
        ))}
      </div>
      <span className="w-1/6">
        {new Date(
          schedule.recurrencePattern.startDate.split("T")[0]
        ).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </span>
      <span className="w-1/6">
        {new Date(
          schedule.recurrencePattern.endDate.split("T")[0]
        ).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </span>
      <button
        onClick={() => {
          handleEditScheduleAction();
        }}
      >
        <PencilRuler />
      </button>
      <button
        onClick={() => {
          setShowDeleteScheduleAlert(true);
        }}
      >
        <Trash2 />
      </button>
      {showDeleteScheduleAlert && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <Alert
            actionText="Delete"
            headerText="Are you sure you want to delete this schedule?"
            descriptionText="This action cannot be undone."
            onCancel={() => setShowDeleteScheduleAlert(false)}
            onAction={handleDeleteScheduleAction}
            hasCheckboxes={false}
          />
        </div>
      )}
      {snackbarOpen && (
        <SnackBar
          field={{
            alertMessage: snackbarMessage,
            alertIcon: null, // replace with your icon if you have one
          }}
        />
      )}
    </div>
  );
}
