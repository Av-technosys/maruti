// app/api/upload/route.js
import { NextResponse } from "next/server";
import r2 from "@/lib/r2";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");
  const reqFileName = formData.get("name") || "file";

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const cookeisData = await req.cookies.get("data");
  const data = JSON.parse(cookeisData.value);
  const fileExt = file.name.split(".").pop();
  const fileName = `${data.id}-${reqFileName}.${fileExt}`;
  // const fileName =

  try {
    await r2
      .putObject({
        Bucket: "av-maruti",
        Key: `uploads/${fileName}`,
        Body: buffer,
        ContentType: file.type,
      })
      .promise();

    const fileUrl = `https://pub-af744d4df22040299c57ef471a38829f.r2.dev/uploads/${fileName}`;

    return NextResponse.json({ success: true, url: fileUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
