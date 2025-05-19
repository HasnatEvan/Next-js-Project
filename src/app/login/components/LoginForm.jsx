"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaEnvelope, FaLock, FaSpinner } from "react-icons/fa";
import { useState } from "react";

const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.ok) {
        toast.success("Login successful!");
        router.push("/");
      } else {
        toast.error(res?.error || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="relative group">
        <label className="block text-gray-700 mb-1">Email</label>
        <FaEnvelope className="absolute left-3 top-9 text-gray-400 pointer-events-none group-focus-within:text-[#3972C1] group-focus-within:scale-110" />
        <input
          type="email"
          name="email"
          placeholder="example@mail.com"
          required
          className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#3972C1]"
          disabled={loading}
        />
      </div>

      <div className="relative group">
        <label className="block text-gray-700 mb-1">Password</label>
        <FaLock className="absolute left-3 top-9 text-gray-400 pointer-events-none group-focus-within:text-[#3972C1] group-focus-within:scale-110" />
        <input
          type="password"
          name="password"
          placeholder="••••••••"
          required
          className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#3972C1]"
          disabled={loading}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full flex justify-center items-center gap-2 bg-[#3972C1] text-white py-2 rounded-md hover:bg-[#2f5ea4] ${loading ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
      >
        {loading && <FaSpinner className="animate-spin text-white text-lg" />}
        Login
      </button>
    </form>
  );
};

export default LoginForm;
