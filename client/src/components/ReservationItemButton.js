import { useState } from "react";
import Alert from "./Alert";

export default function ReservationItemButton({
    textColor = " ",
    bgColor,
    buttonText,
    setValue,
    resId,
    setDisable,
    actionText,
    headerText,
    descriptionText,
    showEditAlert,
    setShowEditAlert
}) {
  const [showPrompt, setShowPrompt] = useState(showEditAlert);

  const activatePrompt = () => {
    setShowPrompt(true);
    setShowEditAlert(true);
  }

    return (
        <>
            <button disabled={setDisable} onClick={() => activatePrompt()} className={`text-xs px-1 w-16 hover:border hover:border-${bgColor} hover:text-black hover:bg-white py-1 rounded-md ` + textColor + " " + bgColor}>
                {buttonText} 
            </button>
          {showPrompt && showEditAlert && (
            <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
              <Alert
                actionText={actionText}
                headerText={headerText}
                descriptionText={descriptionText}
                onCancel={() => setShowEditAlert(false)}
                onAction={() => setValue(resId)}
              />
            </div>
          )}
        </>
    );
}
