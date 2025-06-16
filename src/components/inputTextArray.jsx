import React, { useState } from "react";
import InputText from "./inputText";
import { isLogedInUserAdmin } from "@/const";

const InputTextArray = ({
  value,
  setValue,
  label,
  isAdmin = false,
  required = false,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (isLogedInUserAdmin ? false : isAdmin) return;

    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!value.includes(inputValue.trim())) {
        setValue([...value, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const removeValue = (valueToRemove) => {
    if (isLogedInUserAdmin ? false : isAdmin) return;
    setValue(value.filter((value) => value !== valueToRemove));
  };

  return (
    <div className="space-y-2 w-full">
      <InputText
        required={required}
        isAdmin
        label={label}
        placeholder="Type and press Enter"
        onChange={handleChange}
        value={inputValue}
        onKeyDown={handleKeyDown}
      />

      <div className="flex flex-wrap gap-2 mt-2">
        {value?.map((val, idx) => (
          <div
            key={idx}
            className="flex items-center bg-white border px-3 py-1 rounded-full text-sm"
          >
            <span className=" text-sm font-medium">{val}</span>
            <button
              onClick={() => removeValue(val)}
              className="ml-2 cursor-pointer text-red-500 hover:text-red-700"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputTextArray;
