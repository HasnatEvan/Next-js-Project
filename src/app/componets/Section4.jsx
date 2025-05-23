'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Section4 = () => {
  // Animation variants for text and images
  const textVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const imageVariant1 = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  };

  const imageVariant2 = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, delay: 0.3 } },
  };

  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        {/* Text Content */}
        <motion.div
          className="md:w-1/2 space-y-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={textVariant}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Welcome to <span className="text-[#3972C1]">Stay Nest</span> — Your Ultimate Luxury Retreat
          </h2>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            Experience unparalleled comfort and style at Stay Nest, where every detail is crafted to ensure your stay is nothing short of extraordinary.
            Our elegantly furnished rooms blend modern amenities with classic charm, providing a serene oasis for rest and relaxation.
          </p>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            Whether you are traveling for business, a romantic getaway, or a family vacation, Stay Nest offers tailored services designed to meet your unique needs.
            From high-speed Wi-Fi and state-of-the-art meeting rooms to personalized concierge service, we strive to make your visit seamless and enjoyable.
          </p>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            Indulge in gourmet dining experiences at our in-house restaurant, unwind at our full-service spa, or take a refreshing dip in our pristine swimming pool.
            Located conveniently near key city attractions, Stay Nest is your gateway to adventure and relaxation combined.
          </p>
          <p className="text-gray-600 text-sm md:text-base italic">
            Discover why so many guests return time and again to Stay Nest — where comfort meets elegance and every stay feels like coming home.
          </p>
        </motion.div>

        {/* Overlapping Images */}
        <div className="md:w-1/2 relative w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px]">
          <motion.div
            className="absolute top-0 left-0 w-4/5 h-56 sm:h-64 md:h-72 rounded-xl overflow-hidden shadow-xl z-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={imageVariant1}
          >
            <Image
              src="/assets/banner/sectionimage1.jpg"
              alt="Luxury Room at Stay Nest"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
          <motion.div
            className="absolute top-36 left-10 sm:left-16 md:left-24 w-4/5 h-56 sm:h-64 md:h-72 rounded-xl overflow-hidden shadow-xl border-4 border-white z-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={imageVariant2}
          >
            <Image
              src="/assets/banner/sectionimage2.jpg"
              alt="Stay Nest Hotel Pool"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Section4;
