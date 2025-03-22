import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { testConnection } from "./config/db";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.send("🎉 TypeScript Express Server is running!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await testConnection();
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
