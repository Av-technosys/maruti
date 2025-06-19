"use client";
import * as motion from "motion/react-client";

import PInputOTP from "@/components/enterOTP";
import CustomInputNumber from "@/components/inputNumber";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { auth } from "./../../../firebase.js";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [phone, setPhone] = useState("+91");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [mobileChecked, setMobileChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    console.log(phone);
  }, [phone]);

  useEffect(() => {}, []);

  const handleSendOTP = async () => {
    if (!phone || phone.length < 10) {
      setErrorMessage("Please enter a valid phone number.");
      return;
    }

    setErrorMessage("");
    setLoading(true);

    try {
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message);
    }
    setMobileChecked(true);

    setLoading(false);
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length < 6) {
      setErrorMessage("Enter a valid OTP.");
      return;
    }

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        body: JSON.stringify({ otp, phoneNumber: phone }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
      if (data.error) {
        setErrorMessage(data.error);
        return;
      }

      router.push("/");
    } catch (err) {
      console.error(err);
      setErrorMessage("Incorrect OTP. Please try again.");
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('/login.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className=" w-full px-2 md:px-24  sm:items-center flex gap-2 min-h-screen  h-full"
    >
      {/* <div id="recaptcha-container"></div> */}
      <div className=" sm:max-w-md mt-20 rounded-2xl h-fit xl:max-w-2xl w-full flex  justify-center flex-col overflow-y-auto  bg-white py-6 sm:py-8 px-4 xl:px-8 border">
        <h1 className=" text-center sm:text-left text-3xl md:text-4xl font-semibold mb-4">
          Gala Holder's Log in.{" "}
        </h1>
        <p className=" text-center sm:text-left text-base mxl:text-md mb-12 text-gray-500">
          Sign in effortlessly using your mobile number and receive a secure
          One-Time Password (OTP) instantly to access your account.{" "}
        </p>

        <div>
          {!mobileChecked && (
            <CustomInputNumber
              label={"Enter your Mobile number"}
              phone={phone}
              setPhone={setPhone}
            />
          )}

          {mobileChecked && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
              }}
            >
              <PInputOTP label="Enter OTP" setOtp={setOtp} otp={otp} />
            </motion.div>
          )}

          <Button
            disabled={loading}
            size="xl"
            onClick={!mobileChecked ? handleSendOTP : handleVerifyOTP}
            className={cn(
              " bg-gray-600 w-full hover:bg-gray-700   font-semibold text-white  rounded-full py-4",
              loading ? "opacity-50 !cursor-not-allowed" : "cursor-pointer"
            )}
          >
            <div className=" text-md">
              {loading ? (
                <div className=" flex items-center gap-2">
                  <Loader2 className="ml-2 animate-spin" />
                  <p>Loading...</p>
                </div>
              ) : mobileChecked ? (
                "Verify OTP"
              ) : (
                "Send OTP"
              )}
            </div>
          </Button>

          <div className=" flex items-center gap-1 mt-6 sm:mt-12 justify-center  text-center text-gray-600">
            Login as{" "}
            <Link href={"/admin-login"}>
              <p className=" hover:underline text-blue-600">Admin</p>
            </Link>
          </div>
        </div>

        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
      </div>
    </div>
  );
}
