'use client';

import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: "Ayesha Rahman",
    role: "Traveler",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    text: "Amazing experience! The rooms were spotless, and the staff was super friendly. Highly recommend this hotel.",
  },
  {
    name: "Imran Hossain",
    role: "Business Traveler",
    photo: "https://randomuser.me/api/portraits/men/45.jpg",
    text: "Perfect location and excellent amenities. Made my business trip very comfortable.",
  },
  {
    name: "Sara Ahmed",
    role: "Vacationer",
    photo: "https://randomuser.me/api/portraits/women/52.jpg",
    text: "Loved the swimming pool and the restaurant. Great place to relax and enjoy.",
  },
];

const cardVariants = {
  offscreen: {
    y: 50,
    opacity: 0,
    scale: 0.9,
  },
  onscreen: (custom) => ({
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      bounce: 0.2,
      duration: 0.8,
      delay: custom * 0.3,  // stagger delay based on index
    },
  }),
};

const Section3 = () => {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-12">What Our Guests Say</h2>
        <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-3">
          {testimonials.map(({ name, role, photo, text }, idx) => (
            <motion.div
              key={idx}
              className="bg-gray-50 p-8 rounded-2xl shadow-md flex flex-col justify-between
                         hover:shadow-xl hover:scale-[1.03] transition-transform duration-300 cursor-pointer"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              custom={idx}  // pass index for stagger delay
            >
              <FaQuoteLeft className="text-[#3972C1] text-3xl mb-6" />
              <p className="text-gray-700 italic mb-8 flex-grow">{text}</p>
              <div className="flex items-center gap-5">
                <img
                  src={photo}
                  alt={name}
                  className="w-16 h-16 rounded-full border-2 border-[#3972C1] object-cover"
                />
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900 text-lg">{name}</h4>
                  <p className="text-sm text-gray-500">{role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section3;
