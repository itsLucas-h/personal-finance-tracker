import multer from "multer";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../config/s3";
import path from "path";
import { randomUUID } from "crypto";

const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const uploadToS3 = async (
  file: Express.Multer.File,
  userId: number
): Promise<string> => {
  const fileExt = path.extname(file.originalname);
  const filename = `${userId}/${Date.now()}-${randomUUID()}${fileExt}`;

  const params = {
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: filename,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  const command = new PutObjectCommand(params);
  await s3.send(command);

  return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${filename}`;
};
