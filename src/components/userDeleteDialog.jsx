"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { deleteUser } from "../../lib/useHelper";

export function UserDeleteDialog({ isOpen, setIsOpen, user }) {
  const [isLoading, setIsLoading] = useState(false);
  async function handleDeleteUser(id) {
    if (id === undefined) return;
    if (id === null) return;
    setIsLoading(true);
    try {
      await deleteUser(id);
    } catch (error) {}
    setIsLoading(false);
    setIsOpen(false);
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <form>
        {/* <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger> */}
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            {/* <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription> */}
          </DialogHeader>
          <div className="grid gap-4">
            <div className=" flex items-center gap-2">
              <Label htmlFor="name-1">Name - </Label>
              <p className=" capitalize">{user?.name}</p>
              {/* <Input id="name-1" name="name" defaultValue="Pedro Duarte" /> */}
            </div>
            {/* <div className="grid gap-3">
              <Label htmlFor="username-1">Username</Label>
              <Input id="username-1" name="username" defaultValue="@peduarte" />
            </div> */}
          </div>
          <DialogFooter>
            {/* <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose> */}
            <Button
              disabled={isLoading}
              onClick={() => handleDeleteUser(user?.id)}
              type="submit"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
