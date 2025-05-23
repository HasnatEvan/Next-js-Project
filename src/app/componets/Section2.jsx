'use client';

import React from 'react';
import { FaWifi, FaUtensils, FaSwimmer, FaDumbbell } from 'react-icons/fa';
import { motion } from 'framer-motion';

const features = [
    { icon: <FaWifi className="text-4xl text-[#3972C1]" />, title: "Free Wi-Fi", desc: "Stay connected with high-speed internet." },
    { icon: <FaUtensils className="text-4xl text-[#3972C1]" />, title: "Restaurant", desc: "Delicious meals served all day." },
    { icon: <FaSwimmer className="text-4xl text-[#3972C1]" />, title: "Swimming Pool", desc: "Relax in our rooftop pool." },
    { icon: <FaDumbbell className="text-4xl text-[#3972C1]" />, title: "Fitness Center", desc: "Stay fit during your stay." },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const Section2 = () => {
    return (
        <div className="w-full bg-gray-100 py-16 px-6">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Why Stay With Us?</h2>
                <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
                    Experience world-class hospitality with our top-notch amenities designed to make your stay truly memorable.
                </p>
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                    {features.map((feature, index) => (
                        <motion.div 
                          key={index} 
                          className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow text-center"
                          variants={itemVariants}
                        >
                            <div className="mb-4 flex justify-center">{feature.icon}</div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">{feature.title}</h3>
                            <p className="text-gray-500 text-sm">{feature.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Section2;
