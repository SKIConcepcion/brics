import React, { useState } from "react";

export default function FormField(props) {
  const { label, guide, placeholder, icon, type, validate, errorMessage } = props.field;
  const value = props.value;
  const setValue = props.setValue;
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (validate) {
      setIsValid(validate(newValue));
    }
  };
  
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row w-full justify-between mb-2">
        <label className="text-small font-bold lg:text-large">{label}</label>
        <p className="text-gray-500 text-small lg:text-md"><i>{guide}</i></p>
      </div>
      <div className="text-start">
        {icon && <div className="size-2 translate-y-3 pl-2 absolute">{icon}</div>}
        <input
          type={type}
          value={value}
          onChange={handleChange}
          required
          className={`w-full h-11 border rounded-md ${icon ? 'pl-8' : ''} px-3 ${isValid ? '' : 'border-red-500'}`}
          placeholder={placeholder}
        />
        {!isValid && <p className="text-red-500 text-sm">{errorMessage}</p>}
      </div>
    </div>
  );
}
