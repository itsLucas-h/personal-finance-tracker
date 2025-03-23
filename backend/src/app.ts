import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

import { testConnection, sequelize } from "./config/db";
import { User } from "./models";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";

console.log("📦 Loaded models:", Object.keys(User));

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (_req: Request, res: Response) => {
  res.send("🎉 TypeScript Express Server is running!");
});

// Register API routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`⏳ Starting backend on port ${PORT}...`);

  // Test database connection
  await testConnection();

  // Sync Sequelize models with DB
  try {
    await sequelize.sync();
    console.log("✅ All models synchronized successfully.");
  } catch (err) {
    console.error("❌ Failed to sync Sequelize models:", err);
  }

  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
