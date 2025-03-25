import { Controller } from "../types/express";
import { uploadToS3 } from "../utils/s3Uploader";

export const handleFileUpload: Controller = async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "No file provided." });
      return;
    }

    const fileUrl = await uploadToS3(req.file, req.user!.id);

    res.status(201).json({
      message: "File uploaded successfully.",
      url: fileUrl,
    });
  } catch (error) {
    console.error("❌ S3 Upload Error:", error);
    next(error);
  }
};
