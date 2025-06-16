import { cookies, headers } from "next/headers";
import UserDetail from "@/components/userDetailPage";
import { getUserById, getUserByPhoneNumber } from "../../lib/useHelper";
import { verifyToken } from "@/lib/jwt";

export default async function Home() {
  // Getting next headers
  // const headersList = headers();

  // console.log("headersList : ", headersList);
  // const userId = headersList.get("x-user-id");
  // const userName = headersList.get("x-user-name");

  // console.log("User ID:", userId);
  // console.log("User Name:", userName);

  const phoneNumber = (await headers()).get("x-user-phone");
  console.log("Phone Number: ", phoneNumber);

  if (!phoneNumber) {
    return (
      <div className=" h-screen flex justify-center items-center">
        <p className=" text-3xl font-semibold text-neutral-600">
          Something is wrong please try login again
        </p>
      </div>
    );
  }

  // const cookiesStore = await cookies();
  // const token = cookiesStore.get("token")?.value;
  // const tokenData = await verifyToken(token);
  // const phoneNumbe = tokenData?.phone;

  // console.log(tokenData);
  const data = await getUserByPhoneNumber(phoneNumber);
  return (
    <div className=" bg-white    min-h-screen py-6 px-6  w-full">
      <p className=" text-3xl font-semibold text-neutral-600 text-center">
        SHIV SHAKTI BUSINESS CENTRE
      </p>
      <p className=" text-xl font-semibold text-neutral-600 text-center">
        (SSBC)
      </p>
      <UserDetail existingUserDetails={data} />
    </div>
  );
}
