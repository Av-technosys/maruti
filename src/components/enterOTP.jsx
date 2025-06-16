"use client";

import React, { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "./ui/input-otp";

const PInputOTP = ({ otp, setOtp, label }) => {
  const handleChange = (value) => {
    setOtp(value);
  };

  return (
    <div className=" mx-auto flex flex-col justify-center mb-3">
      <p className=" font-medium">{label}</p>

      <div className="mx-auto w-fit">
        <InputOTP
          maxLength={6}
          value={otp}
          containerClassName={" justify-between w-full"}
          onChange={handleChange}
        >
          <InputOTPGroup>
            <InputOTPSlot className={" size-10 xl:size-12"} index={0} />
            <InputOTPSlot className={" size-10 xl:size-12"} index={1} />
            <InputOTPSlot className={" size-10 xl:size-12"} index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot className={" size-10 xl:size-12"} index={3} />
            <InputOTPSlot className={" size-10 xl:size-12"} index={4} />
            <InputOTPSlot className={" size-10 xl:size-12"} index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
    </div>
  );
};

export default PInputOTP;
