"use client";

import PInputOTP from "@/components/enterOTP";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [emailChecked, setEmailChecked] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleEmailSubmit = async () => {
    if (!email || email === "") {
      setErrorMessage("Please enter a valid email");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/check-email", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    setEmailChecked(true);
    if (data.found) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
      setErrorMessage("Email not found");
    }
    setLoading(false);
  };

  const handleOtpSubmit = () => {
    // alert(`Verifying OTP: ${otp}`);
    setErrorMessage("");
    if (otp == "123456") {
      router.push("/");
      return;
    }
    setErrorMessage("Invalid OTP");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Login with Email</h1>

      {!emailChecked && (
        <>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-2 border rounded mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            disabled={loading}
            onClick={handleEmailSubmit}
            className={cn(loading && "opacity-50 cursor-not-allowed")}
          >
            Check Email
          </Button>
        </>
      )}

      {emailChecked && emailValid && (
        <div className=" flex items-center flex-col gap-4">
          <p className="text-green-600 mb-2">Enter OTP below:</p>
          <PInputOTP setOtp={setOtp} otp={otp} />
          <Button
            onClick={handleOtpSubmit}
            className="w-full bg-green-600 hover:bg-green-700 cursor-pointer font-semibold text-white py-2 rounded"
          >
            Verify OTP
          </Button>
        </div>
      )}

      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
    </div>
  );
}
