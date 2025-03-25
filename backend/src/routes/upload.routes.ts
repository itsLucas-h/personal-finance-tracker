import { Router } from "express";
import { upload } from "../utils/s3Uploader";
import { protect } from "../middleware/auth.middleware";
import { handleFileUpload } from "../controllers/upload.controller";

const router = Router();

router.use(protect);

router.post("/", upload.single("file"), handleFileUpload);

export default router;
