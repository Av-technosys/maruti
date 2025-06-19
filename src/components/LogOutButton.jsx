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
        className=" w-fit ml-auto  py-2 px-4 rounded-md text-white  bg-red-500 hover:bg-red-600 duration-200 cursor-pointer font-medium"
      >
        Log Out
      </button>
    </div>
  );
};

export default LogOutButton;
