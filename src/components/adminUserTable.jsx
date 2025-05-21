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

const AdminUserTable = ({ userData }) => {
  return (
    <div className=" max-w-5xl mx-auto w-full h-full">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Room Number</TableHead>
            <TableHead>Adhar card</TableHead>
            <TableHead>Pan card</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userData.map((item) => {
            return (
              <TableRow>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.roomNumber}</TableCell>
                <TableCell>
                  {item?.adharImage && (
                    <Link target="_blank" href={item.adharImage}>
                      Click here
                    </Link>
                  )}
                </TableCell>
                <TableCell>
                  {item?.panImage && (
                    <Link target="_blank" href={item.panImage}>
                      Click here
                    </Link>
                  )}
                </TableCell>
                {/* <TableCell className="text-right">$250.00</TableCell> */}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminUserTable;
