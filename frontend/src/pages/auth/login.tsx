import React, { useState } from "react";
import { useRouter } from "next/router";
import axios, { AxiosError } from "axios";
import Head from "next/head";

const LoginPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );
      localStorage.setItem("token", res.data.token);
      router.push("/dashboard");
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <Head>
        <title>Login | Finance Tracker</title>
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-1">
              Welcome Back
            </h1>
            <p className="text-gray-500 text-sm">Login to your account</p>
          </div>

          {error && (
            <div className="bg-red-100 text-red-600 px-4 py-2 rounded text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-md font-medium transition-all duration-200"
            >
              Sign In
            </button>
          </form>

          <div className="text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <a
              href="/auth/register"
              className="text-blue-600 hover:underline font-medium"
            >
              Register
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
