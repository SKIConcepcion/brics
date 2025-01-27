import React from "react";
import Filter from "./Filter";

const ExampleComponent = () => {
  const options = ["Newsletter", "Purchases", "Downloads", "Team Account"];
  const icon = (
    <path d="m6 9 6 6 6-6"></path>
  );

  return (
    <div className="inline-flex">
      <button type="button" className="relative py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-s-md border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
        Split dropdown
      </button>
      <Filter label="Dropdown" icon={icon} options={options} />
    </div>
  );
};

export default ExampleComponent;
