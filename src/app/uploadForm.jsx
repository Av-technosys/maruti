"use client";

import { DatePicker } from "@/components/datePicker";
import FileUpload from "@/components/fileUpload";
import { SelectOption } from "@/components/selectOption";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import { Loader2Icon, PencilIcon } from "lucide-react";
import { useState } from "react";
import * as motion from "motion/react-client";

export default function UploadForm({ data }) {
  const userData = JSON.parse(data);

  const [adharImage, setAdharImage] = useState(userData?.adharImage);
  const [panImage, setPanImage] = useState(userData?.panImage);
  const [loading, setLoading] = useState(false);

  const [bankPledge, setBankPledge] = useState({
    name: "N/A",
    address: "N/A",
    dateOfNocByAWCL: "",
    typeOfLoan: "N/A",
  });

  const [unitHolderBankDetals, setUnitHolderBankDetals] = useState({
    accountName: "N/A",
    bankName: "N/A",
    address: "N/A",
    accountNumber: "N/A",
    IFSC: "N/A",
  });
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
    <div className=" w-full max-w-2xl bg-white p-6 mx-auto">
      {/* <ShowDataFiled label={"Name"} value={userData?.name} /> */}

      <div className="text-2xl font-semibold flex mb-12  gap-2">
        <p className="">Hello </p>
        {userData?.name && <p className="  capitalize">{userData?.name} 👋 </p>}
      </div>

      <ShowDataFiled label={"Email"} value={userData?.email} />
      <ShowDataFiled label={"Building Number"} value={userData?.roomNumber} />

      <div className=" w-full mb-6 border rounded-md">
        <div className=" w-full border-b p-3">
          <p className="  font-medium">Bank Pledge / Mortgage Details</p>
        </div>
        <div className=" w-full flex flex-col px-4 py-3 pb-6 gap-6">
          <InputTextFild
            label="Name of Bank"
            value={bankPledge.name}
            setValue={(e) =>
              setBankPledge((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <InputTextFild
            label="Address"
            value={bankPledge.address}
            setValue={(e) =>
              setBankPledge((prev) => ({ ...prev, address: e.target.value }))
            }
          />
          <InputDateFild
            label="Date of Noc by AWCL"
            value={bankPledge.dateOfNocByAWCL}
            setValue={(newDate) =>
              setBankPledge((prev) => ({
                ...prev,
                dateOfNocByAWCL: newDate,
              }))
            }
          />

          <InputSelectFild
            label="Type of Loan"
            value={bankPledge.typeOfLoan}
            setValue={(e) =>
              setBankPledge((prev) => ({
                ...prev,
                typeOfLoan: e,
              }))
            }
          />
        </div>
      </div>
      <div className=" w-full border mb-6 rounded-md">
        <div className=" w-full border-b p-3">
          <p className="  font-medium">Unit Holder Bank Details</p>
        </div>
        <div className=" w-full  flex flex-col px-4 py-3 pb-6 gap-6">
          <InputTextFild
            label="Account Name"
            value={unitHolderBankDetals.accountName}
            setValue={(e) =>
              setUnitHolderBankDetals((prev) => ({
                ...prev,
                accountName: e.target.value,
              }))
            }
          />
          <InputTextFild
            label="Name of Bank"
            value={unitHolderBankDetals.bankName}
            setValue={(e) =>
              setUnitHolderBankDetals((prev) => ({
                ...prev,
                bankName: e.target.value,
              }))
            }
          />
          <InputTextFild
            label="Address"
            value={unitHolderBankDetals.address}
            setValue={(e) =>
              setUnitHolderBankDetals((prev) => ({
                ...prev,
                address: e.target.value,
              }))
            }
          />
          <InputTextFild
            label="Account No."
            value={unitHolderBankDetals.accountNumber}
            setValue={(e) =>
              setUnitHolderBankDetals((prev) => ({
                ...prev,
                accountNumber: e.target.value,
              }))
            }
          />
          <InputTextFild
            label="IFS Code"
            value={unitHolderBankDetals.IFSC}
            setValue={(e) =>
              setUnitHolderBankDetals((prev) => ({
                ...prev,
                IFSC: e.target.value,
              }))
            }
          />
        </div>
      </div>

      {/* <BankLoanDetails data={bankLoanDetails} setData={setBankLoanDetails} /> */}

      <Button
        size="xl"
        className={
          " bg-green-600 w-full px-6 py-3 rounded-full font-semibold  cursor-pointer hover:bg-green-700"
        }
        disabled={loading}
        onClick={handleSaveProfile}
        type="submit"
      >
        {loading ? (
          <div className=" flex items-center gap-2">
            <Loader2 className="ml-2 animate-spin" />
            <p>Loading...</p>
          </div>
        ) : (
          <p className=" text-md">Save</p>
        )}
      </Button>

      {/* <Button
        disabled={loading}
        size="xl"
        onClick={mobileChecked ? handleOTPSubmit : handleMobileSubmit}
        className={cn(
          " bg-purple-600 w-full hover:bg-purple-700 mb-12  font-semibold text-white  rounded-full py-4",
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
      </Button> */}
    </div>
  );
}

function ShowDataFiled({ label, value }) {
  return (
    <div className=" flex flex-col mb-6  gap-2">
      <p className="text-md font-semibold">{label}</p>
      {value && (
        <p className=" w-full overflow-x-auto bg-gray-100 py-2 px-4 capitalize cursor-not-allowed">
          {value}
        </p>
      )}
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

function InputTextFild({ value = "", setValue = () => {}, label = "" }) {
  const [isEdit, setIsEdit] = useState(true);
  return (
    <div className=" flex flex-col">
      <label className=" flex items-center gap-2 font-semibold">
        <p>{label}</p>
        <PencilIcon
          className=" cursor-pointer"
          size={18}
          onClick={() => setIsEdit((prev) => !prev)}
        />
      </label>

      {isEdit ? (
        <p className=" py-1.5">{value}</p>
      ) : (
        <input
          className=" py-1.5 px-3 w-fit rounded-lg border"
          value={value}
          onChange={setValue}
        />
      )}
    </div>
  );
}
function InputSelectFild({ value = "", setValue = () => {}, label = "" }) {
  const [isEdit, setIsEdit] = useState(true);
  return (
    <div className=" flex flex-col">
      <label className=" flex items-center gap-2 font-semibold">
        <p>{label}</p>
        <PencilIcon
          className=" cursor-pointer"
          size={18}
          onClick={() => setIsEdit((prev) => !prev)}
        />
      </label>

      {isEdit ? (
        <p className=" py-1.5">{value}</p>
      ) : (
        <div className=" w-full mt-1.5">
          <SelectOption value={value} setValue={setValue} />
        </div>
      )}
    </div>
  );
}

function InputDateFild({
  value = new Date(),
  setValue = () => {},
  label = "",
}) {
  const [isEdit, setIsEdit] = useState(true);

  function formatDateToDDMMYYYY(date) {
    return dayjs(date).format("DD-MM-YYYY");
  }

  return (
    <div className=" flex flex-col">
      <label className=" flex items-center gap-2 font-semibold">
        <p>{label}</p>
        <PencilIcon
          className=" cursor-pointer"
          size={18}
          onClick={() => setIsEdit((prev) => !prev)}
        />
      </label>

      {isEdit ? (
        <p className=" py-1.5">{formatDateToDDMMYYYY(value)}</p>
      ) : (
        <div className=" mt-1.5 w-full">
          <DatePicker value={value} setValue={setValue} />
        </div>
      )}
    </div>
  );
}
