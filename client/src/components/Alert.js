import React from "react";

export const Alert = ({
  actionText,
  headerText,
  descriptionText,
  onCancel,
  onAction,
  message,
  setMessage,
  hasMessage,
  hasCheckboxes,
  messagePlaceholder,
  checkboxOptions,
  renderCheckbox,
}) => {
  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  return (
    <div
      className="w-1/4 mx-auto bg-blue-900 text-white rounded-lg p-4 dark:bg-blue-800/80 dark:text-white"
      role="alert"
    >
      <div className="flex items-start px-5 py-2">
        <div className="flex-shrink-0 text-white">
          <svg
            className="w-6 h-6 mt-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 16v-4"></path>
            <path d="M12 8h.01"></path>
          </svg>
        </div>
        <div className="ml-3 text-left w-full">
          <h3 className="font-semibold text-white">{headerText}</h3>
          <div className="mt-2 text-sm">{descriptionText}</div>
          {hasCheckboxes && (
            <div className="mt-4">
              {checkboxOptions.map((option) => renderCheckbox(option))}
            </div>
          )}
          {hasMessage && (
            <div className="mt-4">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={messagePlaceholder}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 text-black"
                rows={5}
              />
            </div>
          )}

          <div className="mt-4">
            <div className="flex space-x-3">
              <button
                type="button"
                className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-500 text-white hover:bg-blue-600 hover:text-white disabled:opacity-50 disabled:pointer-events-none p-2"
                onClick={onAction}
              >
                {actionText}
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white-600 hover:text-blue-100 disabled:opacity-50 disabled:pointer-events-none"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Alert;
