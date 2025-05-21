"use client";

import React, { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "./ui/input-otp";

const PInputOTP = ({ otp, setOtp }) => {
  const handleChange = (value) => {
    setOtp(value);
  };

  return (
    <div>
      <InputOTP maxLength={6} value={otp} onChange={handleChange}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
};

export default PInputOTP;
