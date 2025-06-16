import { relations } from "drizzle-orm";
import { jsonb, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

const userData = pgTable("userData", {
  // Name & Contact Details of Unit Holder
  id: uuid("id").defaultRandom().primaryKey(),
  nameOfUnitHolder: varchar("name_of_unit_holder"),
  emailIDOfUnitHolder: varchar("email_id_of_unit_holder").array(),
  mobileNumberOfUnitHolder: varchar("mobile_number_of_unit_holder").array(),
  contactPersonUnitHolder: varchar("contact_person_unit_holder").array(),
  linkPanUnitHolder: varchar("link_pan__unit_holder"),
  linkGstCertificateUnitHolder: varchar("link_gst_certificate_unit_holder"),

  // Unit Basic Details:
  existingBuilding: varchar("existing_building"),
  existingUnitNumber: varchar("existing_unit_number"),
  existingFloor: varchar("existing_floor"),

  // New Building Details:
  newBuildingUnitNumber: varchar("new_building_unit_number"),
  newBuildingFloorNumber: varchar("new_building_floor_number"),

  // Area Details
  areaInExistingBuilding: varchar("area_in_existing_building"),
  ninetyPercentADDIArea: varchar("ninety_percent_addi_area"),
  areaTotal: varchar("area_total"),
  areaInNewBuilding: varchar("area_in_new_building"),

  // Car Parking in newbuilding
  carParingFloor: varchar("car_paring_floor"),
  carParkingNumber: varchar("car_parking_number"),
  linkBackSideNumberPlate: varchar("link_back_side_number_plate"),

  // Bank Pledge / Mortgage Details to be given by owner
  nameOfBankPledge: varchar("name_of_bank_pledge"),
  addressOfBankPledge: varchar("address_of_bank_pledge"),
  dateOfNocByAwclPledge: varchar("date_of_noc_by_awcl_pledge"),
  typeOfLoanPledge: varchar("type_of_loan_pledge"),
  linkNocByCompanyPledge: varchar("link_noc_by_company_pledge"),
  linkSanctionLetterPledge: varchar("link_sanction_letter_pledge"),

  // Unit Holder Bank Details
  accountNameUnitHolder: varchar("account_name_unit_holder"),
  bankNameUnitHolder: varchar("bank_name_unit_holder"),
  addressUnitHolder: varchar("address_unit_holder"),
  accountNumberUnitHolder: varchar("account_number_unit_holder"),
  IfscUnitHolder: varchar("ifsc_unit_holder"),
  linkCancelledChequeUnitHolder: varchar("link_cancelled_cheque_unit_holder"),

  // Details of Lessee if Unit Given on lease
  nameOfLesseeLessee: varchar("name_of_lessee_lessee"),
  dateOfLeaveAndLicenceDocumentLessee: varchar(
    "date_of_leave_and_licence_document_lessee"
  ),
  validityOfLeaseAndLicenseDocumentLessee: varchar(
    "validity_of_lease_and_license_document_lessee"
  ),
  leseeNatureOfBusiness: varchar("lessee_nature_of_business"),
  linkOfLesseeAgreement: varchar("link_of_lessee_agreement"),

  // Demat Information
  nameOfDepositoryParticipantDemat: varchar(
    "name_of_depository_participant_demat"
  ),
  DpidDemat: varchar("dp_id_demat"),
  dematClientID: varchar("demat_client_id"),
  linkHoldingAttachmentDemat: varchar("link_holding_attachment_demat"),

  // If Physical Shares then following details to be given
  physicalShareCertificateNumber: varchar("physical_share_certificate_number"),
  folioNumberPhysicalShare: varchar("folio_number_physical_share"),
  distinctiveNumberPhysicalShare: varchar("distinctive_number_physical_share"),
  linkOfShareCertificate: varchar("link_of_share_certificate"),

  shareHolderData: jsonb("shareHolderData").array(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export { userData };
