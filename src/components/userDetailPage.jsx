"use client";
import { DatePicker } from "@/components/datePicker";
import FileUpload from "@/components/fileUpload";
import { TCaretDown } from "@/components/icons";
import InputText from "@/components/inputText";
import InputTextArray from "@/components/inputTextArray";
import { SelectOption } from "@/components/selectOption";
import { cn } from "@/lib/utils";
import { userDataSchema } from "@/lib/zodTypes";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

const UserDetail = ({ existingUserDetails = null, isNewUser = false }) => {
  const [userData, setUserData] = useState({
    isNewUser: isNewUser,
    id: existingUserDetails?.id || uuidv4(),
    nameOfUnitHolder: existingUserDetails?.nameOfUnitHolder || "",
    emailIDOfUnitHolder: existingUserDetails?.emailIDOfUnitHolder || [],
    mobileNumberOfUnitHolder:
      existingUserDetails?.mobileNumberOfUnitHolder || [],
    contactPersonUnitHolder: existingUserDetails?.contactPersonUnitHolder || [],
    linkPanUnitHolder: existingUserDetails?.linkPanUnitHolder || "",
    linkGstCertificateUnitHolder:
      existingUserDetails?.linkGstCertificateUnitHolder || "",

    existingBuilding: existingUserDetails?.existingBuilding || "",
    existingUnitNumber: existingUserDetails?.existingUnitNumber || "",
    existingFloor: existingUserDetails?.existingFloor || "",

    newBuildingUnitNumber: existingUserDetails?.newBuildingUnitNumber || "",
    newBuildingFloorNumber: existingUserDetails?.newBuildingFloorNumber || "",

    areaInExistingBuilding: existingUserDetails?.areaInExistingBuilding || "",
    ninetyPercentADDIArea: existingUserDetails?.ninetyPercentADDIArea || "",
    areaTotal: existingUserDetails?.areaTotal || "",
    areaInNewBuilding: existingUserDetails?.areaInNewBuilding || "",

    carParingFloor: existingUserDetails?.carParingFloor || "",
    carParkingNumber: existingUserDetails?.carParkingNumber || "",
    linkBackSideNumberPlate: existingUserDetails?.linkBackSideNumberPlate || "",

    nameOfBankPledge: existingUserDetails?.nameOfBankPledge || "",
    addressOfBankPledge: existingUserDetails?.addressOfBankPledge || "",
    dateOfNocByAwclPledge:
      existingUserDetails?.dateOfNocByAwclPledge || JSON.stringify(new Date()),
    typeOfLoanPledge: existingUserDetails?.typeOfLoanPledge || "",
    linkNocByCompanyPledge: existingUserDetails?.linkNocByCompanyPledge || "",
    linkSanctionLetterPledge:
      existingUserDetails?.linkSanctionLetterPledge || "",

    accountNameUnitHolder: existingUserDetails?.accountNameUnitHolder || "",
    bankNameUnitHolder: existingUserDetails?.bankNameUnitHolder || "",
    addressUnitHolder: existingUserDetails?.addressUnitHolder || "",
    accountNumberUnitHolder: existingUserDetails?.accountNumberUnitHolder || "",
    IfscUnitHolder: existingUserDetails?.IfscUnitHolder || "",
    linkCancelledChequeUnitHolder:
      existingUserDetails?.linkCancelledChequeUnitHolder || "",

    nameOfLesseeLessee: existingUserDetails?.nameOfLesseeLessee || "",
    dateOfLeaveAndLicenceDocumentLessee:
      existingUserDetails?.dateOfLeaveAndLicenceDocumentLessee ||
      JSON.stringify(new Date()),
    validityOfLeaseAndLicenseDocumentLessee:
      existingUserDetails?.validityOfLeaseAndLicenseDocumentLessee ||
      JSON.stringify(new Date()),
    leseeNatureOfBusiness: existingUserDetails?.leseeNatureOfBusiness || "",
    linkOfLesseeAgreement: existingUserDetails?.linkOfLesseeAgreement || "",

    nameOfDepositoryParticipantDemat:
      existingUserDetails?.nameOfDepositoryParticipantDemat || "",
    DpidDemat: existingUserDetails?.DpidDemat || "",
    dematClientID: existingUserDetails?.dematClientID || "",
    linkHoldingAttachmentDemat:
      existingUserDetails?.linkHoldingAttachmentDemat || "",

    physicalShareCertificateNumber:
      existingUserDetails?.physicalShareCertificateNumber || "",
    folioNumberPhysicalShare:
      existingUserDetails?.folioNumberPhysicalShare || "",
    distinctiveNumberPhysicalShare:
      existingUserDetails?.distinctiveNumberPhysicalShare || "",
    linkOfShareCertificate: existingUserDetails?.linkOfShareCertificate || "",

    shareHolderData: [
      {
        id: "1",
        name: existingUserDetails?.shareHolderData[0]?.name || "",
        linkPAN: existingUserDetails?.shareHolderData[0]?.linkPAN || "",
        linkAadhar: existingUserDetails?.shareHolderData[0]?.linkAadhar || "",
        linkOfPerson:
          existingUserDetails?.shareHolderData[0]?.linkOfPerson || "",
      },
      {
        id: "2",
        name: existingUserDetails?.shareHolderData[1]?.name || "",
        linkPAN: existingUserDetails?.shareHolderData[1]?.linkPAN || "",
        linkAadhar: existingUserDetails?.shareHolderData[1]?.linkAadhar || "",
        linkOfPerson:
          existingUserDetails?.shareHolderData[1]?.linkOfPerson || "",
      },
      {
        id: "3",
        name: existingUserDetails?.shareHolderData[2]?.name || "",
        linkPAN: existingUserDetails?.shareHolderData[2]?.linkPAN || "",
        linkAadhar: existingUserDetails?.shareHolderData[2]?.linkAadhar || "",
        linkOfPerson:
          existingUserDetails?.shareHolderData[2]?.linkOfPerson || "",
      },
    ],
  });

  const [openBoxCode, setOpenBoxCode] = useState(null);

  // useEffect(() => {
  //   console.log(userData);
  // }, [userData]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleSave() {
    setLoading(true);
    try {
      userDataSchema.parse(userData);

      const response = await fetch("/api/create-profile", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const message = await response.json();

      if (message?.message === "Successfully created new User") {
        console.log("User successfully created");
        toast.success(message?.message);
        router.push("/admin");
      } else {
        toast.error(message?.message || "Something went wrong");
      }
    } catch (error) {
      if (error.errors?.length > 0) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const per90 = Number(userData.areaInExistingBuilding) * 0.9;

    setUserData((prev) => ({
      ...prev,
      ninetyPercentADDIArea: per90,
    }));

    setUserData((prev) => ({
      ...prev,
      areaTotal: Number(userData.areaInExistingBuilding) + Number(per90),
    }));
  }, [userData.areaInExistingBuilding]);

  return (
    <div className=" mt-12  flex flex-col w-full max-w-[92rem] mx-auto  gap-8">
      <div className=" flex flex-col lg:flex-row gap-6">
        <div className=" w-full flex flex-col gap-6">
          <Card
            openBoxCode={openBoxCode}
            setOpenBoxCode={setOpenBoxCode}
            code="N"
            title="Name & Contact Details of Unit Holder"
          >
            <div className=" py-4">
              <div className=" flex flex-col sm:flex-row gap-4 w-full px-4 pb-4 sm:pt-4 ">
                <InputText
                  label="Name of Unit Holder"
                  isAdmin
                  placeholder="Full Name"
                  value={userData.nameOfUnitHolder}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      nameOfUnitHolder: e.target.value,
                    }))
                  }
                />
                <InputTextArray
                  required
                  isAdmin
                  label="Email Id"
                  value={userData.emailIDOfUnitHolder}
                  setValue={(value) =>
                    setUserData((prev) => ({
                      ...prev,
                      emailIDOfUnitHolder: value,
                    }))
                  }
                />
              </div>
              <div className="  flex flex-col sm:flex-row gap-6 sm:mt-6 w-full px-4 ">
                <InputTextArray
                  required
                  isAdmin
                  label="Contact Persons"
                  value={userData.contactPersonUnitHolder}
                  setValue={(value) =>
                    setUserData((prev) => ({
                      ...prev,
                      contactPersonUnitHolder: value,
                    }))
                  }
                />
                <InputTextArray
                  required
                  isAdmin
                  label={"Mobile Number"}
                  value={userData.mobileNumberOfUnitHolder}
                  setValue={(value) =>
                    setUserData((prev) => ({
                      ...prev,
                      mobileNumberOfUnitHolder: value,
                    }))
                  }
                />
              </div>
              <div className=" grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 w-full px-4 ">
                <FileUpload
                  userId={userData.id}
                  label="PAN card"
                  name={userData.linkPanUnitHolder}
                  docName="panCard"
                  onUploaded={(value) =>
                    setUserData((prev) => ({
                      ...prev,
                      linkPanUnitHolder: value,
                    }))
                  }
                />
                <FileUpload
                  userId={userData.id}
                  label="GST Certificate"
                  name={userData.linkGstCertificateUnitHolder}
                  docName="gstCertificate"
                  onUploaded={(value) =>
                    setUserData((prev) => ({
                      ...prev,
                      linkGstCertificateUnitHolder: value,
                    }))
                  }
                />
              </div>
            </div>
          </Card>
          <Card
            openBoxCode={openBoxCode}
            setOpenBoxCode={setOpenBoxCode}
            code="U"
            title="Unit Basic Details"
          >
            <div className=" py-4">
              <div className="  flex flex-col sm:flex-row gap-4 w-full px-4 pb-4 sm:pt-4 ">
                <InputText
                  isAdmin
                  label="Existing Building"
                  placeholder="Existing Building Number"
                  value={userData.existingBuilding}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      existingBuilding: e.target.value,
                    }))
                  }
                />
                <InputText
                  isAdmin
                  label="Existing Unit No"
                  placeholder="Existing Unit No"
                  value={userData.existingUnitNumber}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      existingUnitNumber: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="  flex flex-col sm:flex-row gap-4 sm:mt-6 w-full px-4 ">
                <InputText
                  isAdmin
                  label="Existing Floor"
                  placeholder="Existing Floor"
                  value={userData.existingFloor}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      existingFloor: e.target.value,
                    }))
                  }
                />
                <div className=" w-full"></div>
              </div>
            </div>
          </Card>
          <Card
            openBoxCode={openBoxCode}
            setOpenBoxCode={setOpenBoxCode}
            code="NB"
            title="New Building Details"
          >
            <div className=" py-4">
              <div className="  flex flex-col sm:flex-row gap-4 w-full px-4 pb-4 sm:pt-4 ">
                <InputText
                  label="New Building Unit No"
                  placeholder="New Building Unit No"
                  value={userData.newBuildingUnitNumber}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      newBuildingUnitNumber: e.target.value,
                    }))
                  }
                />
                <InputText
                  label="New Building Floor No"
                  placeholder="Existing Unit No"
                  value={userData.newBuildingFloorNumber}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      newBuildingFloorNumber: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </Card>
          <Card
            openBoxCode={openBoxCode}
            setOpenBoxCode={setOpenBoxCode}
            code="A"
            title="Area Details "
          >
            <div className=" py-4">
              <div className="  flex flex-col sm:flex-row gap-4 w-full px-4 pb-4 sm:pt-4 ">
                <InputText
                  isAdmin
                  label="Area in Existing Building"
                  placeholder="Area in Existing Building"
                  value={userData.areaInExistingBuilding}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      areaInExistingBuilding: e.target.value,
                    }))
                  }
                />
                <InputText
                  isAdmin
                  label="90% Addl Area"
                  placeholder="90% Addl Area"
                  value={userData.ninetyPercentADDIArea}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      ninetyPercentADDIArea: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="  flex flex-col sm:flex-row gap-4 w-full px-4  pb-4  sm:pt-4 ">
                <InputText
                  isAdmin
                  label="Total Area"
                  placeholder="Total Area"
                  value={userData.areaTotal}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      areaTotal: e.target.value,
                    }))
                  }
                />
                <InputText
                  isAdmin
                  label="Area in new building"
                  placeholder="Area in new building"
                  value={userData.areaInNewBuilding}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      areaInNewBuilding: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </Card>
          <Card
            openBoxCode={openBoxCode}
            setOpenBoxCode={setOpenBoxCode}
            code="C"
            title="Car Parking in New Building"
          >
            <div className=" py-4">
              <div className="  flex flex-col sm:flex-row gap-4 w-full px-4 pb-4 sm:pt-4 ">
                <InputText
                  label="Floor"
                  placeholder="Car Parking Floor"
                  value={userData.carParingFloor}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      carParingFloor: e.target.value,
                    }))
                  }
                />
                <InputText
                  label="Parking No"
                  placeholder="Car Parking No"
                  value={userData.carParkingNumber}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      carParkingNumber: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="  flex flex-col sm:flex-row gap-4 w-full px-4 pb-4   sm:pt-4 ">
                <FileUpload
                  userId={userData.id}
                  label="Photo of backside number plate of vehicle"
                  name={userData.linkBackSideNumberPlate}
                  docName="backSideNumberPlate"
                  onUploaded={(value) =>
                    setUserData((prev) => ({
                      ...prev,
                      linkBackSideNumberPlate: value,
                    }))
                  }
                />
              </div>
            </div>
          </Card>
          <Card
            openBoxCode={openBoxCode}
            setOpenBoxCode={setOpenBoxCode}
            code="BP"
            title="Bank Pledge / Mortgage Details to be given by owner"
          >
            <div className=" py-4">
              <div className="  flex flex-col sm:flex-row gap-4 w-full px-4 pb-4 sm:pt-4 ">
                <InputText
                  label="Name of Bank "
                  placeholder="Bank Name"
                  value={userData.nameOfBankPledge}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      nameOfBankPledge: e.target.value,
                    }))
                  }
                />
                <InputText
                  label="Address"
                  placeholder="Bank Address"
                  value={userData.addressOfBankPledge}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      addressOfBankPledge: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="  flex flex-col sm:flex-row gap-4 w-full px-4 pb-4 sm:pt-4 ">
                <DatePicker
                  label="Date of NOC by AWCL"
                  value={JSON.parse(userData.dateOfNocByAwclPledge)}
                  setValue={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      dateOfNocByAwclPledge: JSON.stringify(e),
                    }))
                  }
                />
                <SelectOption
                  required
                  label="Type of Loan Term Loan or Working Capital"
                  placeholder="Type of Loan"
                  value={userData.typeOfLoanPledge}
                  setValue={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      typeOfLoanPledge: e,
                    }))
                  }
                />
              </div>
              <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4 w-full px-4 pb-4 sm:pt-4 ">
                <FileUpload
                  userId={userData.id}
                  label="NOC issued by Company"
                  name={userData.linkNocByCompanyPledge}
                  docName="nocByCompanyPledge"
                  onUploaded={(value) =>
                    setUserData((prev) => ({
                      ...prev,
                      linkNocByCompanyPledge: value,
                    }))
                  }
                />
                <FileUpload
                  userId={userData.id}
                  label="Sanction letter copy"
                  name={userData.linkSanctionLetterPledge}
                  docName="sanctionLetterCopy"
                  onUploaded={(value) =>
                    setUserData((prev) => ({
                      ...prev,
                      linkSanctionLetterPledge: value,
                    }))
                  }
                />
              </div>
            </div>
          </Card>
        </div>
        <div className=" w-full flex flex-col gap-6">
          <Card
            openBoxCode={openBoxCode}
            setOpenBoxCode={setOpenBoxCode}
            code="B"
            title="Unit Holder Bank Details"
          >
            <div className=" py-4">
              <div className="  flex flex-col sm:flex-row gap-4 w-full px-4 pb-6 sm:pb-4 pt-4 ">
                <InputText
                  required
                  label="Account Name"
                  placeholder="Account Name"
                  value={userData.accountNameUnitHolder}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      accountNameUnitHolder: e.target.value,
                    }))
                  }
                />
                <InputText
                  required
                  label="Bank Name"
                  placeholder="Bank Name"
                  value={userData.bankNameUnitHolder}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      bankNameUnitHolder: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="  flex flex-col sm:flex-row gap-4 w-full px-4 pb-4 sm:pt-4 ">
                <InputText
                  required
                  label="Address"
                  placeholder="Address"
                  value={userData.addressUnitHolder}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      addressUnitHolder: e.target.value,
                    }))
                  }
                />
                <InputText
                  required
                  label="Account No."
                  placeholder="Account No."
                  value={userData.accountNumberUnitHolder}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      accountNumberUnitHolder: e.target.value,
                    }))
                  }
                />
              </div>
              <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4 w-full px-4 pb-4 sm:pt-4 ">
                <InputText
                  required
                  label="IFS Code"
                  placeholder="IFS Code"
                  value={userData.IfscUnitHolder}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      IfscUnitHolder: e.target.value,
                    }))
                  }
                />
                <FileUpload
                  userId={userData.id}
                  label="Cancelled Cheque"
                  required
                  name={userData.linkCancelledChequeUnitHolder}
                  docName="cancelledCheque"
                  onUploaded={(value) =>
                    setUserData((prev) => ({
                      ...prev,
                      linkCancelledChequeUnitHolder: value,
                    }))
                  }
                />
              </div>
            </div>
          </Card>
          <Card
            openBoxCode={openBoxCode}
            setOpenBoxCode={setOpenBoxCode}
            code="L"
            title="Details of Lessee if Unit Given on lease "
          >
            <div className=" py-4">
              <div className="  flex flex-col sm:flex-row gap-4 w-full px-4 pb-4 sm:pt-4 ">
                <InputText
                  required
                  label="Name of Lessee"
                  placeholder="Name of Lessee"
                  value={userData.nameOfLesseeLessee}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      nameOfLesseeLessee: e.target.value,
                    }))
                  }
                />
                <DatePicker
                  required
                  label="Date of Leave & License Document"
                  placeholder="Date of Leave & License Document"
                  value={JSON.parse(
                    userData.dateOfLeaveAndLicenceDocumentLessee
                  )}
                  setValue={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      dateOfLeaveAndLicenceDocumentLessee: JSON.stringify(e),
                    }))
                  }
                />
              </div>
              <div className="  flex flex-col sm:flex-row gap-4 w-full px-4 pb-4 sm:pt-4 ">
                <DatePicker
                  required
                  label="Validity of Leave & License Document"
                  placeholder="Validity of Leave & License Document"
                  value={JSON.parse(
                    userData.validityOfLeaseAndLicenseDocumentLessee
                  )}
                  setValue={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      validityOfLeaseAndLicenseDocumentLessee:
                        JSON.stringify(e),
                    }))
                  }
                />
                <InputText
                  required
                  label="Lesee's Nature of Business"
                  placeholder="Lesee's Nature of Business"
                  value={userData.leseeNatureOfBusiness}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      leseeNatureOfBusiness: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="  flex flex-col sm:flex-row gap-4 w-full px-4 pb-4  sm:pt-4">
                <FileUpload
                  userId={userData.id}
                  required
                  label="Lease Agreement "
                  name={userData.linkOfLesseeAgreement}
                  docName="leaseAgreement"
                  onUploaded={(value) =>
                    setUserData((prev) => ({
                      ...prev,
                      linkOfLesseeAgreement: value,
                    }))
                  }
                />
              </div>
            </div>
          </Card>
          <Card
            openBoxCode={openBoxCode}
            setOpenBoxCode={setOpenBoxCode}
            code="D"
            title="Demat Information "
          >
            <div className=" py-4">
              <div className="  flex flex-col sm:flex-row gap-4 w-full px-4 pb-4 sm:pt-4 ">
                <InputText
                  isAdmin
                  label="Name of Depository Participant"
                  placeholder="Name of Depository Participant"
                  value={userData.nameOfDepositoryParticipantDemat}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      nameOfDepositoryParticipantDemat: e.target.value,
                    }))
                  }
                />
                <InputText
                  isAdmin
                  label="DP ID"
                  placeholder="DP ID"
                  value={userData.DpidDemat}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      DpidDemat: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="  grid grid-cols-1 sm:grid-cols-2 gap-4 w-full px-4 pb-4 sm:pt-4 ">
                <InputText
                  isAdmin
                  label="Demat Client ID"
                  placeholder="Demat Client ID"
                  value={userData.dematClientID}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      dematClientID: e.target.value,
                    }))
                  }
                />
                <FileUpload
                  userId={userData.id}
                  label="Holding Statement"
                  name={userData.linkHoldingAttachmentDemat}
                  docName="holdingStatement"
                  onUploaded={(value) =>
                    setUserData((prev) => ({
                      ...prev,
                      linkHoldingAttachmentDemat: value,
                    }))
                  }
                />
              </div>
            </div>
          </Card>
          <Card
            openBoxCode={openBoxCode}
            setOpenBoxCode={setOpenBoxCode}
            code="P"
            title="If Physical Shares then following details to be given"
          >
            <div className=" py-4">
              <div className="  flex flex-col sm:flex-row gap-4 w-full px-4 pb-4 sm:pt-4 ">
                <InputText
                  label="Share Certificate No"
                  placeholder="Share Certificate No"
                  value={userData.physicalShareCertificateNumber}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      physicalShareCertificateNumber: e.target.value,
                    }))
                  }
                />
                <InputText
                  label="Folio No"
                  placeholder="Folio No"
                  value={userData.folioNumberPhysicalShare}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      folioNumberPhysicalShare: e.target.value,
                    }))
                  }
                />
              </div>
              <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4 w-full px-4 pb-4 sm:pt-4 ">
                <InputText
                  label="Distinctive No"
                  placeholder="Distinctive No"
                  value={userData.distinctiveNumberPhysicalShare}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      distinctiveNumberPhysicalShare: e.target.value,
                    }))
                  }
                />

                <FileUpload
                  userId={userData.id}
                  label="Photocopy of Share Certificate"
                  name={userData.linkOfShareCertificate}
                  docName="photocopyOfShareCertificate"
                  onUploaded={(value) =>
                    setUserData((prev) => ({
                      ...prev,
                      linkOfShareCertificate: value,
                    }))
                  }
                />
              </div>
            </div>
          </Card>
          <Card
            code=""
            openBoxCode={openBoxCode}
            setOpenBoxCode={setOpenBoxCode}
            title="Shareholders Name"
          >
            {userData.shareHolderData?.map((holderData, index) => {
              return (
                <div key={index} className=" py-4 px-4">
                  <p className=" border-b-2 font-medium border-gray-300">
                    {index + 1} st Holder
                  </p>
                  <div className=" grid grid-cols-1 sm:grid-cols-2 gap-6 w-full  py-4 ">
                    <InputText
                      label="Name"
                      isAdmin
                      placeholder="Full Name"
                      value={holderData.name}
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          shareHolderData: prev.shareHolderData.map(
                            (value, idx) => {
                              if (index === idx) {
                                return {
                                  ...value,
                                  name: e.target.value,
                                };
                              }
                              return value;
                            }
                          ),
                        }))
                      }
                    />

                    <FileUpload
                      userId={userData.id}
                      label="PAN Card"
                      name={holderData.linkPAN || ""}
                      docName={`shareholder-${index}-panCard`}
                      onUploaded={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          shareHolderData: prev.shareHolderData.map(
                            (value, idx) => {
                              if (index === idx) {
                                return {
                                  ...value,
                                  linkPAN: e,
                                };
                              }
                              return value;
                            }
                          ),
                        }))
                      }
                    />
                    <FileUpload
                      userId={userData.id}
                      label="Adhar Card"
                      docName={`shareholder-${index}-adharCard`}
                      name={holderData.linkAadhar || ""}
                      onUploaded={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          shareHolderData: prev.shareHolderData.map(
                            (value, idx) => {
                              if (index === idx) {
                                return {
                                  ...value,
                                  linkAadhar: e,
                                };
                              }
                              return value;
                            }
                          ),
                        }))
                      }
                    />
                    <FileUpload
                      userId={userData.id}
                      label="Photo"
                      docName={`shareholder-${index}-photo`}
                      name={holderData.linkOfPerson || ""}
                      onUploaded={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          shareHolderData: prev.shareHolderData.map(
                            (value, idx) => {
                              if (index === idx) {
                                return {
                                  ...value,
                                  linkOfPerson: e,
                                };
                              }
                              return value;
                            }
                          ),
                        }))
                      }
                    />
                  </div>
                </div>
              );
            })}
          </Card>
        </div>
      </div>

      <SaveBtn loading={loading} onClick={handleSave} />
    </div>
  );
};

export default UserDetail;

function Card({ children, title, code, openBoxCode, setOpenBoxCode }) {
  return (
    <div
      className={cn(
        " cursor-pointer h-fit border rounded-md overflow-hidden",
        openBoxCode == code && " ring-2 ring-purple-300"
      )}
    >
      <div
        onClick={() =>
          setOpenBoxCode((prev) => {
            if (prev != null && prev == code) {
              return null;
            } else {
              return code;
            }
          })
        }
        className=" flex gap-6 items-center justify-between bg-gray-50 border-b  px-4 py-3"
      >
        <p className="    gap-1 select-none text-sm font-semibold">
          {code && <span className=" text-red-400">{code}</span>}
          {code && <span> | </span>}
          {title}
        </p>
        <TCaretDown
          className={` ${openBoxCode == code && " rotate-180"} duration-200 `}
          color="#888"
          size={18}
        />
      </div>
      {openBoxCode == code && children}
    </div>
  );
}

function SaveBtn({ onClick = () => {}, loading = false }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={cn(
        " w-fit ml-auto bg-gray-600 py-2 px-4 rounded-md flex items-center gap-1 hover:bg-gray-700 cursor-pointer ",
        loading && "pointer-events-none opacity-50"
      )}
    >
      <p className=" hover:text-white  text-white font-semibold">Save</p>
    </button>
  );
}
