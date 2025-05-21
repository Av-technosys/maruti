import AdminUserTable from "@/components/adminUserTable";
import React from "react";

const ShowAllUsers = ({ userData }) => {
  return (
    <div>
      <AdminUserTable userData={userData} />
    </div>
  );
};

export default ShowAllUsers;
