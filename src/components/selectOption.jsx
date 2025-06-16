import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { loanTypes } from "@/const/loanType";
import Label from "./label";
import { cn } from "@/lib/utils";

export function SelectOption({
  value,
  setValue,
  className = "",
  label = "",
  required = false,
}) {
  return (
    <div className={cn(" space-y-0.5 w-full", className)}>
      <Label required={required}>{label}</Label>
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select loan type" />
        </SelectTrigger>
        <SelectContent className={" max-h-96"}>
          <SelectGroup>
            <SelectLabel>Type of Loans</SelectLabel>
            {loanTypes.map((value) => {
              return (
                <SelectItem key={value} value={value}>
                  {value}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
