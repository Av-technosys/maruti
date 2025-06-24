"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import Link from "next/link";
import { Trash2Icon } from "lucide-react";
import { UserDeleteDialog } from "./userDeleteDialog";

const AdminUserTable = ({ userData }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [user, setUser] = React.useState(null);

  return (
    <div className="  w-full h-full">
      <UserDeleteDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        user={user}
      />
      <Table className={"border rounded-md"}>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader className={"bg-gray-100"}>
          <TableRow>
            <TableHead className={"font-semibold w-16"}>S No.</TableHead>
            <TableHead className={"font-semibold"}>Name</TableHead>
            <TableHead className={"font-semibold"}>Mobile Number</TableHead>
            <TableHead className={"font-semibold"}>Email</TableHead>
            <TableHead className={"font-semibold"}>Building Number</TableHead>
            {/* <TableHead>Adhar card</TableHead> */}
            <TableHead className={"font-semibold"}>Edit details</TableHead>
            <TableHead className={"font-semibold"}>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userData.map((item, idx) => {
            return (
              <TableRow key={idx}>
                <TableCell className="font-medium">{idx + 1}</TableCell>
                <TableCell className="font-medium">
                  {item.nameOfUnitHolder}
                </TableCell>
                <TableCell className="">
                  {item.mobileNumberOfUnitHolder[0]}
                </TableCell>
                <TableCell>{item.emailIDOfUnitHolder}</TableCell>
                <TableCell>{item.existingBuilding}</TableCell>
                <TableCell>
                  <Link
                    href={`/admin/user/?id=${item.id}`}
                    className=" hover:underline cursor-pointer hover:text-blue-500"
                  >
                    Click here
                  </Link>
                </TableCell>
                <TableCell>
                  <Trash2Icon
                    onClick={() => {
                      setIsDeleteDialogOpen(true);
                      setUser({
                        name: item.nameOfUnitHolder,
                        id: item.id,
                      });
                    }}
                    size={20}
                    className=" cursor-pointer hover:text-red-700 text-gray-900 hover:scale-110"
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminUserTable;
