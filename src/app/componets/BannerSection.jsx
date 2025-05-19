'use client';

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const BannerSection = () => {
    return (
        <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[800px] xl:h-[600px]">
            {/* Swiper Slider */}
            <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                loop={true}
                className="w-full h-full"
            >
                <SwiperSlide>
                    <Image
                        src="/assets/banner/banner1.jpg"
                        alt="Banner 1"
                        fill
                        className="object-cover"
                        priority
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Image
                        src="/assets/banner/banner2.jpg"
                        alt="Banner 2"
                        fill
                        className="object-cover"
                        priority
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Image
                        src="/assets/banner/banner3.jpg"
                        alt="Banner 3"
                        fill
                        className="object-cover"
                        priority
                    />
                </SwiperSlide>
            </Swiper>

            {/* Overlay Content */}
            <div className="absolute inset-0 bg-black/50 z-10 flex flex-col justify-center items-center text-center text-white px-4">
                <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold drop-shadow-lg">
                    Discover Your Perfect Stay
                </h1>
                <p className="text-sm sm:text-lg md:text-xl mt-2 max-w-xl drop-shadow">
                    Book top-rated hotels with the best prices, comfort, and convenience.
                </p>
                <button className="mt-4 bg-[#3972C1] hover:bg-[#2f5ea4] text-white px-6 py-2 rounded shadow-md text-sm sm:text-base">
                    Book Now
                </button>
            </div>
        </div>
    );
};

export default BannerSection;
