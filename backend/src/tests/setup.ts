import { User } from "../models";
import { sequelize } from "../config/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const connectTestDB = async () => {
  await sequelize.sync({ force: true });
};

export const createTestUserAndToken = async () => {
  const hashedPassword = await bcrypt.hash("securepass123", 10);

  const user = await User.create({
    name: "Test User",
    email: "testuser@example.com",
    password: hashedPassword,
  });

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" }
  );

  return { user, token };
};

afterAll(async () => {
  await sequelize.close();
});
