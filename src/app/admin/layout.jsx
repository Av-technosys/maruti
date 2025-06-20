import LogOutButton from "@/components/LogOutButton";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div className=" max-w-6xl p-6 mx-auto w-full">
      <NavBar />
      {children}
    </div>
  );
};

export default Layout;

function NavBar() {
  return (
    <div className=" flex gap-2 items-center justify-between">
      <Link href="/admin" className=" text-4xl ">
        Admin
      </Link>
      <div className=" w-fit flex items-center gap-6 ml-auto">
        <Link
          href="/admin/user"
          size={"lg"}
          className=" w-fit bg-purple-600 py-2 px-4 rounded-md flex items-center gap-1 hover:bg-purple-700 cursor-pointer "
          variant="outline"
        >
          <PlusIcon color="white" className=" size-5" />
          <p className=" hover:text-white text-white font-semibold">Add User</p>
        </Link>

        <LogOutButton />
      </div>
    </div>
  );
}
