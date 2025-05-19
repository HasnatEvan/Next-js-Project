'use client';
import React from "react";
import RegisterForm from "./components/RegisterForm";
import { motion } from "framer-motion";

// Icons
import {
  FaTags,
  FaHotel,
  FaShieldAlt,
  FaHeadset,
  FaCheckCircle,
  FaCalendarCheck,
  FaClock,
} from "react-icons/fa";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 text-black">
      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl p-8">
        
        {/* Left Side Content - StayNest Info */}
        <motion.div
          className="flex-1 flex flex-col justify-center"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold text-[#3972C1] mb-2">Welcome to StayNest!</h2>
          <p className="text-gray-700 mb-4 text-lg">
            Book smarter, stay better. Your dream hotel is just a few clicks away.
          </p>

          <ul className="space-y-3 text-gray-700 mb-6">
            <li className="flex items-center gap-3">
              <FaTags className="text-[#3972C1]" />
              Special member-only hotel rates
            </li>
            <li className="flex items-center gap-3">
              <FaHotel className="text-[#3972C1]" />
              Thousands of verified hotels worldwide
            </li>
            <li className="flex items-center gap-3">
              <FaShieldAlt className="text-[#3972C1]" />
              Secure booking & instant confirmation
            </li>
            <li className="flex items-center gap-3">
              <FaHeadset className="text-[#3972C1]" />
              24/7 customer support you can rely on
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-[#3972C1] mb-2">Why StayNest?</h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-600" />
              Quick and easy registration process
            </li>
            <li className="flex items-center gap-2">
              <FaCalendarCheck className="text-green-600" />
              Flexible date & room selection
            </li>
            <li className="flex items-center gap-2">
              <FaClock className="text-green-600" />
              Last-minute booking? No problem!
            </li>
          </ul>
        </motion.div>

        {/* Right Side Content - Register Form */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <RegisterForm />
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
