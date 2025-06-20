import { userData } from "../../../db/schema";
import { db } from "../../../lib/db";
import ShowAllUsers from "./showAllUsers";

const Page = async () => {
  const data = await db.select().from(userData);
  return (
    <div className="  w-full px-6  py-6">
      <ShowAllUsers userData={data} />
    </div>
  );
};

export default Page;
