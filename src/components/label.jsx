import { cn } from "@/lib/utils";
import React from "react";

const Label = ({ children, disabled = false, required = false }) => {
  return (
    <div className={cn(" font-medium", disabled ? " text-gray-400" : null)}>
      {children}
      {required && <span className=" text-red-500"> *</span>}
    </div>
  );
};

export default Label;
