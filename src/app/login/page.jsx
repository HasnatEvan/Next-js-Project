"use client";
import Link from "next/link";
import LoginForm from "./components/LoginForm";
import { FaTachometerAlt, FaHeart, FaGift, FaCog } from "react-icons/fa";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-100 px-4 text-black gap-10 md:gap-20">
      
      {/* Enhanced extra content */}
      <div className="order-1 md:order-2 max-w-md text-gray-700 space-y-6">
        <h3 className="text-2xl font-semibold text-[#3972C1] mb-4">
          Why Login to StayNest?
        </h3>

        <p className="text-sm text-gray-500">
          Enjoy these benefits by simply logging into your StayNest account:
        </p>

        <ul className="space-y-4">
          <li className="flex items-center gap-3">
            <FaTachometerAlt className="text-[#3972C1] text-xl" />
            <span>Instant access to your personalized dashboard</span>
          </li>
          <li className="flex items-center gap-3">
            <FaHeart className="text-[#3972C1] text-xl" />
            <span>Save and manage your favorite listings easily</span>
          </li>
          <li className="flex items-center gap-3">
            <FaGift className="text-[#3972C1] text-xl" />
            <span>Receive exclusive offers, deals, and notifications</span>
          </li>
          <li className="flex items-center gap-3">
            <FaCog className="text-[#3972C1] text-xl" />
            <span>Effortlessly manage your bookings and preferences</span>
          </li>
          <li className="flex items-center gap-3">
            <FaTachometerAlt className="text-[#3972C1] text-xl" />
            <span>Track your booking history and upcoming trips</span>
          </li>
          <li className="flex items-center gap-3">
            <FaHeart className="text-[#3972C1] text-xl" />
            <span>Access personalized travel recommendations</span>
          </li>
        </ul>

        <p className="text-sm text-gray-600">
          New to StayNest?{" "}
          <Link href="/register" className="text-[#3972C1] hover:underline font-medium">
            Create an account
          </Link>{" "}
          today and start enjoying personalized benefits tailored just for you!
        </p>
      </div>

      {/* Login form container */}
      <div className="order-2 md:order-1 max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-[#3972C1] mb-6">
          Login to Your Account
        </h2>
        <LoginForm />
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link href="/register" className="text-[#3972C1] hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
