import request from "supertest";
import app from "../app";
import { connectTestDB } from "./setup";

beforeAll(async () => {
  await connectTestDB();
});

describe("Auth Routes", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "testauth@example.com",
      password: "password123",
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("user");
    expect(res.body.user.email).toBe("testauth@example.com");
  });
});
