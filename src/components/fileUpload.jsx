"use client";

import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";

const FileUpload = ({ onUploaded, name }) => {
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
      formData.append("name", name);

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
    <div className="space-y-4">
      <input
        type="file"
        name="file"
        accept="application/pdf"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      <button
        type="button"
        onClick={triggerFileSelect}
        className={cn(
          "bg-blue-600 text-white text-sm font-semibold px-3 py-1.5 rounded ",
          uploading ? "cursor-not-allowed" : "cursor-pointer"
        )}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Click here to upload PDF"}
      </button>

      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
};

export default FileUpload;
