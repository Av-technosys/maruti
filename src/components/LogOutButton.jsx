"use client";
import { signout } from "@/helper/sighout";
import { useRouter } from "next/navigation";
import React from "react";

const LogOutButton = () => {
  const router = useRouter();
  async function handleLogout() {
    await signout();
    router.push("/login");
  }
  return (
    <div className=" ml-auto w-fit">
      <button
        onClick={handleLogout}
        className=" w-fit ml-auto  py-2 px-4 rounded-md mt-12 text-white  bg-red-500 font-medium"
      >
        LogOutButton
      </button>
    </div>
  );
};

export default LogOutButton;
