'use client';

import React from 'react';
import Image from 'next/image';

const Section1 = () => {
  return (
    <div className="relative h-[90vh] w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src="/assets/banner/img.jpg"
        alt="Hotel Background"
        fill
        className="object-cover"
        priority
      />

      {/* Gradient Black Shadow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight sm:leading-snug md:leading-normal lg:leading-relaxed max-w-4xl">
          Find Your Perfect Stay
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 max-w-3xl mx-auto px-2">
          Book luxurious hotels, cozy rooms, and get the best deals in town. Comfort, elegance, and convenience — all in one place.
        </p>
        <button className="bg-[#3972C1] hover:bg-[#2f5ea1] transition-colors text-white font-semibold px-6 py-3 rounded-full shadow-lg text-sm sm:text-base md:text-lg">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default Section1;
