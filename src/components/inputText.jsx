import React from "react";
import { Input } from "./ui/input";
import Label from "./label";
import { cn } from "@/lib/utils";

const InputText = ({
  label = "",
  placeholder = "",
  onChange = () => {},
  value = "",
  onKeyDown = () => {},
  className = "",
  isAdmin = false,
  required = false,
}) => {
  const isLogedInUserAdmin = true;
  const disabled = isLogedInUserAdmin ? false : isAdmin;
  return (
    <div className={cn(" space-y-0.5 w-full", className, isAdmin ? "" : "")}>
      <Label required={required} disabled={disabled}>
        {label}
      </Label>
      <Input
        disabled={disabled}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default InputText;
