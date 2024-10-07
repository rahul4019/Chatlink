import AWS from "aws-sdk";
import fs from "fs";
import { promisify } from "util";

// aws sdk configuration
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  region: process.env.AWS_REGION as string,
});

// upload the img to s3 bucket
export const s3Upload = async (file: Express.Multer.File) => {
  const fileContent = await promisify(fs.readFile)(file.path);

  const uploadParams = {
    Bucket: process.env.AWS_S3_BUCKET_NAME as string,
    Key: `profile_pictures/${file.filename}`, // images will be saved in profile_pictures directory
    Body: fileContent,
    ContentType: file.mimetype,
    // ACL: "public-read", // Make the file public
  };

  // Uploading files to the bucket
  const { Location } = await s3.upload(uploadParams).promise();

  // Delete the file from the local filesystem
  fs.unlinkSync(file.path);

  return Location; // This is the file URL on S3
};
