import { Router } from "express";
import {
  registerUser,
  loginUser,
  deleteUserByEmail,
} from "../controllers/auth.controller";
import { validate } from "../middleware/validate.middleware";
import { registerSchema, loginSchema } from "../validators/auth.validator";

const router = Router();

router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);
router.delete("/user/:email", deleteUserByEmail);

export default router;
