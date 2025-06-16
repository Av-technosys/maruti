import UserDetail from "@/components/userDetailPage";
import { getUserById } from "../../../../lib/useHelper";

const Page = async ({ searchParams }) => {
  const id = (await searchParams)?.id;
  let userData = null;
  if (id) {
    userData = await getUserById(id);
  }
  return (
    <div className=" mt-12 flex flex-col gap-8">
      <UserDetail
        isNewUser={id ? false : true}
        existingUserDetails={userData}
      />
    </div>
  );
};

export default Page;
