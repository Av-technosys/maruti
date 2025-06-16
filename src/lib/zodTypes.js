const { z } = require("zod");

export const userDataSchema = z.object({
  mobileNumberOfUnitHolder: z.array(
    z.string().min(1, "Mobile Number is required")
  ),
  emailIDOfUnitHolder: z.array(z.string().min(1, "Email ID is required")),
  contactPersonUnitHolder: z.array(
    z.string().min(1, "Contact Person is required")
  ),
  typeOfLoanPledge: z.string().min(1, "Type of Loan Pledge is required"),
  accountNameUnitHolder: z.string().min(1, "Account Name is required"),
  bankNameUnitHolder: z.string().min(1, "Bank Name is required"),
  addressUnitHolder: z.string().min(1, "Address is required"),
  IfscUnitHolder: z.string().min(1, "IFSC Code is required"),
  linkCancelledChequeUnitHolder: z
    .string()
    .min(1, "Cancelled Cheque is required"),
  nameOfLesseeLessee: z.string().min(1, "Lessee Name is required"),
  dateOfLeaveAndLicenceDocumentLessee: z.string().min(1, "Date is required"),
  validityOfLeaseAndLicenseDocumentLessee: z
    .string()
    .min(1, "Validity is required"),
  leseeNatureOfBusiness: z.string().min(1, "Nature of Business is required"),
  linkOfLesseeAgreement: z.string().min(1, "Agreement is required"),
});
