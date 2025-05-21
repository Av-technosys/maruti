// lib/r2.js
import AWS from "aws-sdk";

const r2 = new AWS.S3({
  //   endpoint: "https://<account-id>.r2.cloudflarestorage.com", // Replace with your R2 endpoint
  endpoint: "https://47037a1eae92e626a968771db367d4cf.r2.cloudflarestorage.com", // Replace with your R2 endpoint
  accessKeyId: process.env.R2_ACCESS_KEY_ID,
  secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  signatureVersion: "v4",
  region: "auto",
});

export default r2;
