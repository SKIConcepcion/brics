import React, { useState } from "react";

export const AmenitiesIcon = (props) => {
  const { label, value, icon } = props.field;

  return (
    <div
      className={`mb-3 content-center justify-center place-items-center justify-items-center border-2 w-32 h-32 rounded-lg ${
        value
          ? "border-[#3B82F6]"
          : "border-grey-800 bg-slate-300 text-slate-400"
      }`}
    >
      {icon}
      <label className="text-sm">
        <b>{label}</b>
      </label>
      {typeof value === "boolean" ? null : value !== 0 ? (
          <p className="text-[#909090] text-sm font-bold">
              {value === 1 ? `${value} unit` : `${value} units`}
          </p>
      ) : null}
    </div>
  );
};

export default AmenitiesIcon;
