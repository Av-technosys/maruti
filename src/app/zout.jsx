"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";

const SendOTPComp = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [verifying, setVerifying] = useState(false);

  const widgetId = "3565756a5957313731353636"; // Replace with your widget ID
  const tokenAuth = "453077TYjvvJhJt682dbe65P1"; // Replace with real JWT token
  const phone = "918947015331"; // Dynamic or hardcoded

  // Initialize OTP Widget when script is loaded
  useEffect(() => {
    if (
      scriptLoaded &&
      typeof window !== "undefined" &&
      typeof window.initSendOTP === "function"
    ) {
      const configuration = {
        widgetId: widgetId,
        tokenAuth: tokenAuth,
        identifier: phone,
        exposeMethods: true,
        captchaRenderId: "",
        success: (data) => {
          console.log("OTP verified successfully:", data);
          setAccessToken(data["access_token"]); // Store JWT token
        },
        failure: (error) => {
          console.error("OTP verification failed:", error);
        },
      };

      window.initSendOTP(configuration);
    }
  }, [scriptLoaded]);

  // Retry until sendOtp is available
  const sendOTP = () => {
    console.log("Sending OTP...");
    const trySend = (retries = 5) => {
      if (
        typeof window !== "undefined" &&
        typeof window.sendOtp === "function"
      ) {
        window.sendOtp(
          phone,
          (data) => console.log("OTP sent successfully:", data),
          (error) => console.error("Error sending OTP:", error)
        );
      } else if (retries > 0) {
        console.log("sendOtp not available yet. Retrying...");
        setTimeout(() => trySend(retries - 1), 500);
      } else {
        console.warn("sendOtp function is not available after retries.");
      }
    };
    trySend();
  };

  // Verify token with MSG91 backend
  const verifyToken = async () => {
    if (!accessToken) {
      alert("No access token found. Verify OTP first.");
      return;
    }

    setVerifying(true);
    try {
      const response = await fetch(
        "https://control.msg91.com/api/v5/widget/verifyAccessToken",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            authkey: "453077A0QEIHipf682dbcd5P1", // Replace with MSG91 Authkey
            "access-token": accessToken,
          }),
        }
      );
      const data = await response.json();
      console.log("Backend verification response:", data);
      alert(`Verification status: ${data.type}`);
    } catch (error) {
      console.error("Error verifying token:", error);
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div>
      <Script
        src="https://verify.msg91.com/otp-provider.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log("OTP script loaded");
          setScriptLoaded(true);
        }}
      />

      <button onClick={sendOTP}>Send OTP</button>

      <br />

      <button onClick={verifyToken} disabled={!accessToken || verifying}>
        {verifying ? "Verifying..." : "Verify Access Token"}
      </button>
    </div>
  );
};

export default SendOTPComp;
