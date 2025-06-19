"use client";

import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import Label from "./label";
import { TFile } from "./icons";
import Link from "next/link";
import PLink from "./PLink";

const FileUpload = ({
  userId,
  onUploaded,
  docName,
  name,
  label,
  required = false,
}) => {
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", docName);
      formData.append("userId", userId);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.url) {
        onUploaded(data.url);
      } else {
        setError(data.error || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className=" space-y-0.5 w-full">
      <Label required={required}>{label}</Label>
      <div className=" mt-2 flex items-center gap-1">
        <TFile className=" shrink-0 text-gray-600" size={20} />
        <PLink
          href={name}
          target="_blank"
          className=" line-clamp-1 select-none hover:bg-gray-100 hover:text-gray-900 duration-200 text-sm flex items-center gap-1 w-fit text-gray-600 border py-0.5 px-2.5 cursor-pointer rounded-md"
        >
          {name}
        </PLink>
      </div>
      <input
        type="file"
        name="file"
        accept="application/pdf"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      <Button
        variant="link"
        onClick={triggerFileSelect}
        className={cn(
          "text-gray-600 text-sm font-semibold px-0 py-1.5 rounded ",
          uploading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
        )}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload File"}
      </Button>

      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
};

export default FileUpload;
