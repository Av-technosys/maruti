import AdminUserTable from "@/components/adminUserTable";
import React from "react";

const ShowAllUsers = ({ userData }) => {
  return (
    <div className=" mt-6">
      <AdminUserTable userData={userData} />
    </div>
  );
};

export default ShowAllUsers;
