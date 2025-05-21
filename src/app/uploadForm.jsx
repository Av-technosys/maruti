"use client";

import FileUpload from "@/components/fileUpload";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";

export default function UploadForm({ data }) {
  const userData = JSON.parse(data);

  const [adharImage, setAdharImage] = useState(userData?.adharImage);
  const [panImage, setPanImage] = useState(userData?.panImage);
  const [loading, setLoading] = useState(false);

  const [bankLoanDetails, setBankLoanDetails] = useState(
    userData?.bankLoanDetails || {
      name: "",
      address: "",
    }
  );

  async function handleSaveProfile() {
    setLoading(true);
    const request = await fetch("/api/save-profile", {
      method: "POST",
      body: JSON.stringify({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        roomNumber: userData.roomNumber,
        adharImage,
        panImage,
        bankLoanDetails,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setLoading(false);
    alert("Profile Saved");
  }

  return (
    <div className=" w-full max-w-xl mt-12 p-6 mx-auto">
      <ShowDataFiled label={"Name"} value={userData?.name} />
      <ShowDataFiled label={"Email"} value={userData?.email} />
      <ShowDataFiled label={"Room Number"} value={userData?.roomNumber} />
      <div className=" flex mb-4 flex-col gap-1">
        <p className=" font-semibold text-md">AdharCard</p>
        {/* {value && <p className=" text-xl font-semibold">{value}</p>} */}

        <div className=" max-w-xl">
          {adharImage && (
            <img src={adharImage} className=" w-full h-full mb-1" />
          )}
          <FileUpload onUploaded={setAdharImage} name="adharImage" />
        </div>
      </div>
      <div className=" flex mb-4 flex-col gap-0.5">
        <p className=" font-semibold text-md">PAN Card</p>

        <div className=" max-w-xl">
          {panImage && <img src={panImage} className=" w-full h-full mb-1" />}
          <FileUpload onUploaded={setPanImage} name="panImage" />
        </div>
      </div>

      <BankLoanDetails data={bankLoanDetails} setData={setBankLoanDetails} />

      <Button
        className={
          " bg-green-600 font-semibold  cursor-pointer hover:bg-green-700"
        }
        disabled={loading}
        onClick={handleSaveProfile}
        type="submit"
      >
        {loading ? (
          <>
            <Loader2Icon className="animate-spin" />
            <p>Please wait</p>
          </>
        ) : (
          <p>Save</p>
        )}
      </Button>
    </div>
  );
}

function ShowDataFiled({ label, value }) {
  return (
    <div className=" flex mb-4  items-center gap-2">
      <p className="text-md font-semibold">
        {label}
        {": "}
      </p>
      {value && <p className=" ">{value}</p>}
    </div>
  );
}
function BankLoanDetails({ data, setData }) {
  return (
    <div className=" mt-8">
      <h2 className=" text-2xl mb-2 font-semibold">Bank Loan Details</h2>
      <InputField
        name="Name"
        placeholder="Bank Name"
        value={data.name}
        setData={(e) => setData((prev) => ({ ...prev, name: e.target.value }))}
      />
      <InputField
        name="Address"
        placeholder="Branch Address"
        value={data.nocDate}
        setData={(e) =>
          setData((prev) => ({ ...prev, address: e.target.value }))
        }
      />
    </div>
  );
}

function InputField({ value, name, setData, placeholder }) {
  return (
    <div className=" mb-3">
      <p className=" font-semibold">{name}</p>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        className=" px-2 py-1.5 rounded-md border"
        onChange={setData}
      />
    </div>
  );
}
