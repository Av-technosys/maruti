"use client";
import React, { useState } from "react";
import { insertUserMeta } from "../../../lib/useHelper";
import { cn } from "@/lib/utils";
import { AddNewUser } from "@/components/addNewUserDialog";

const AddNewUserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roomNumber, setRoomNumber] = useState("");

  return (
    <div className=" mt-12 w-full flex flex-col gap-4">
      {/* <InputFild
        value={name}
        onChange={(e) => setName(e.target.value)}
        label={"Name"}
      />
      <InputFild
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label={"Email"}
      />
      <InputFild
        value={roomNumber}
        onChange={(e) => setRoomNumber(e.target.value)}
        label={"Building Number"}
      />
      <button
        disabled={loading}
        onClick={handleSubmit}
        className={cn(
          " py-2 px-6 font-semibold cursor-pointer w-fit rounded-lg bg-blue-600 text-white",
          loading && "pointer-events-none opacity-50"
        )}
      >
        Add User
      </button> */}
    </div>
  );
};

export default AddNewUserForm;

function InputFild({ label, value, type, onChange }) {
  return (
    <div className=" flex flex-col">
      <label className=" font-semibold">{label}</label>
      <input
        className=" py-1.5 px-3 w-fit rounded-lg border"
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
