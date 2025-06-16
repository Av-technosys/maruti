"use client";
import * as motion from "motion/react-client";

import PInputOTP from "@/components/enterOTP";
import CustomInputNumber from "@/components/inputNumber";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const [phone, setPhone] = useState("+91");
  const [countryCode, setCountryCode] = useState("");
  const [localNumber, setLocalNumber] = useState("");
  const [email, setEmail] = useState("");
  const [mobileChecked, setMobileChecked] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleMobileSubmit = async () => {
    if (!phone || phone === "") {
      setErrorMessage("Please enter a valid email");
      return;
    }
    setLoading(true);
    // const res = await fetch("/api/check-email", {
    //   method: "POST",
    //   body: JSON.stringify({ email }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    // const data = await res.json();

    const wait = await new Promise((resolve) => setTimeout(resolve, 2000));
    setMobileChecked(true);
    // if (data.found) {
    //   setEmailValid(true);
    // } else {
    //   setEmailValid(false);
    //   setErrorMessage("Email not found");
    // }
    setLoading(false);
  };

  const handleOTPSubmit = () => {
    // alert(`Verifying OTP: ${otp}`);
    setErrorMessage("");
    if (otp == "123456") {
      router.push("/admin");
      return;
    }
    setErrorMessage("Invalid OTP");
  };

  return (
    <div
      style={{
        backgroundImage: "url('/login.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className=" w-full px-4 md:px-24  items-center flex gap-2 min-h-screen  h-full"
    >
      <div className=" max-w-md rounded-2xl h-fit xl:max-w-2xl w-full flex  justify-center flex-col overflow-y-auto  bg-white py-8 px-4 xl:px-8 border">
        <h1 className="  text-4xl font-semibold mb-4">Admin Login </h1>
        <p className=" text-base mxl:text-md font-extralight mb-12 text-gray-500">
          Sign in effortlessly using your mobile number and receive a secure
          One-Time Password (OTP) instantly to access your account.{" "}
        </p>

        <div>
          {!mobileChecked && (
            <CustomInputNumber
              label={"Enter your Mobile number"}
              phone={phone}
              setPhone={setPhone}
              setCountryCode={setCountryCode}
              setLocalNumber={setLocalNumber}
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
            onClick={mobileChecked ? handleOTPSubmit : handleMobileSubmit}
            className={cn(
              " bg-gray-600 w-full hover:bg-gray-700 mb-12  font-semibold text-white  rounded-full py-4",
              loading ? "opacity-50 !cursor-not-allowed" : "cursor-pointer"
            )}
          >
            <p className=" text-md">
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
            </p>
          </Button>

          {/* <div className=" flex items-center gap-1 justify-center  text-center text-gray-600">
            Login as{" "}
            <Link href={"/admin/login"}>
              <p className=" hover:underline text-blue-600">Admin</p>
            </Link>
          </div> */}
        </div>

        {/* {!emailChecked && (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 border rounded mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          </>
        )} */}

        {/* {emailChecked && emailValid && (
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
        )} */}

        {/* {errorMessage && <p className="text-red-600">{errorMessage}</p>} */}
      </div>
    </div>
  );
}
