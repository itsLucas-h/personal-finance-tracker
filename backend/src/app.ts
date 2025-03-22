import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

import { testConnection, sequelize } from "./config/db";
import { User } from "./models";

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

// Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, async () => {
  console.log(`⏳ Starting backend on port ${PORT}...`);

  // Test DB connection
  await testConnection();

  // Sync Sequelize models with DB
  try {
    console.log("⏳ Syncing database models...");
    await sequelize.sync();
    console.log("✅ All models synchronized successfully.");
  } catch (err) {
    console.error("❌ Failed to sync Sequelize models:", err);
  }

  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
