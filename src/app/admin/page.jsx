import { userData } from "../../../db/schema";
import { db } from "../../../lib/db";
import AddNewUserForm from "./addNewUser";
import ShowAllUsers from "./showAllUsers";

const Page = async () => {
  const data = await db.select().from(userData);
  return (
    <div className=" max-w-7xl mx-auto w-full p-6">
      <h1>Admin</h1>

      <p>Add new user</p>
      <AddNewUserForm />
      <ShowAllUsers userData={data} />
    </div>
  );
};

export default Page;
