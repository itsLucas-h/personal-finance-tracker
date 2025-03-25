import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import { apiLimiter } from "./middleware/rateLimit.middleware";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import transactionRoutes from "./routes/transaction.routes";
import goalRoutes from "./routes/goal.routes";
import budgetRoutes from "./routes/budget.routes";
import reportRoutes from "./routes/report.routes";
import fileRoutes from "./routes/file.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(apiLimiter);

app.get("/", (_req: Request, res: Response) => {
  res.send("🎉 TypeScript Express Server is running!");
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/files", fileRoutes);

export default app;
