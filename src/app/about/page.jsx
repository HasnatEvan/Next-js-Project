import React from 'react';
import {
  FaHotel,
  FaSearch,
  FaLock,
  FaUsers,
  FaCheckCircle,
  FaStar,
  FaGlobe,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaRegSmile
} from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="bg-white text-gray-800 px-4 sm:px-6 lg:px-20 py-10 lg:py-20 w-full">


      {/* Section Wrapper */}
      <div className="max-w-6xl mx-auto space-y-16">

        {/* Introduction */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 flex items-center gap-2"><FaHotel className="text-[#3972C1]" /> Who We Are</h2>
          <p className="text-base sm:text-lg leading-relaxed">
            Welcome to our hotel booking platform — your trusted gateway to comfort, luxury, and reliability. Whether you're a traveler,
            a business professional, or someone looking for a weekend getaway, we’re here to help you find the perfect place to stay.
          </p>
          <p className="text-base sm:text-lg leading-relaxed mt-4">
            Our website connects you with a wide selection of hotels across Bangladesh and beyond. Booking a room should be easy, secure, and convenient — and we make that possible.
          </p>
        </section>

        {/* Mission */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 flex items-center gap-2"><FaRegSmile className="text-[#3972C1]" /> Our Mission</h2>
          <p className="text-base sm:text-lg leading-relaxed">
            To transform how people book hotels online by making the process simple, fast, and affordable. We deliver a stress-free experience from browsing to booking.
          </p>
          <p className="text-base sm:text-lg leading-relaxed mt-4">
            For hotel owners, we offer a powerful admin dashboard to showcase and manage their listings with ease.
          </p>
        </section>

        {/* Vision */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 flex items-center gap-2"><FaGlobe className="text-[#3972C1]" /> Our Vision</h2>
          <p className="text-base sm:text-lg leading-relaxed">
            To become the most reliable hotel booking solution in Bangladesh and a leading platform across South Asia. We dream of a future where every traveler books with confidence and comfort.
          </p>
        </section>

        {/* What We Offer */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 flex items-center gap-2"><FaCheckCircle className="text-[#3972C1]" /> What We Offer</h2>
          <ul className="list-disc pl-6 text-base sm:text-lg space-y-2 leading-relaxed">
            <li><FaSearch className="inline-block text-[#3972C1] mr-2" /> Verified hotels, guest houses, and resorts</li>
            <li><FaLock className="inline-block text-[#3972C1] mr-2" /> Secure and instant online booking</li>
            <li><FaUsers className="inline-block text-[#3972C1] mr-2" /> User dashboard for booking management</li>
            <li><FaHotel className="inline-block text-[#3972C1] mr-2" /> Admin tools for hotel owners</li>
            <li><FaStar className="inline-block text-[#3972C1] mr-2" /> Customer reviews and ratings</li>
            <li><FaCheckCircle className="inline-block text-[#3972C1] mr-2" /> Affordable pricing and exclusive deals</li>
            <li><FaGlobe className="inline-block text-[#3972C1] mr-2" /> Multi-device access: mobile, tablet, desktop</li>
          </ul>
        </section>

        {/* Why Choose Us */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 flex items-center gap-2"><FaStar className="text-[#3972C1]" /> Why Choose Us?</h2>
          <ul className="list-disc pl-6 text-base sm:text-lg space-y-2 leading-relaxed">
            <li>Fast search filters for perfect room matches</li>
            <li>Customer-first support team available 24/7</li>
            <li>Trusted by thousands of users and partners</li>
            <li>Secure payment systems & data protection</li>
            <li>Responsive, modern interface design</li>
            <li>Continuous improvements and new features</li>
          </ul>
        </section>

        {/* Our Story */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Our Story</h2>
          <p className="text-base sm:text-lg leading-relaxed">
            We started in 2023 when we noticed a lack of easy, trustworthy hotel booking options in Bangladesh. Our team set out to create a better platform for both travelers and hotel owners.
          </p>
          <p className="text-base sm:text-lg leading-relaxed mt-4">
            Today, we're proud to support hundreds of monthly users and empower local hotel businesses through smart digital tools.
          </p>
        </section>

        {/* Meet the Team */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Meet the Team</h2>
          <p className="text-base sm:text-lg leading-relaxed">
            Our dedicated team includes passionate developers, designers, and customer support experts who work together to deliver a seamless user experience from start to finish.
          </p>
        </section>

        {/* Contact Info */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Contact Us</h2>
          <p className="text-base sm:text-lg leading-relaxed">
            Got questions or business inquiries? We're always happy to hear from you.
          </p>
          <div className="text-base sm:text-lg leading-relaxed mt-4 flex flex-col gap-2">
            <span><FaEnvelope className="inline-block text-[#3972C1] mr-2" /> Email: <a href="mailto:support@hotelbooking.com" className="text-[#3972C1] underline">support@hotelbooking.com</a></span>
            <span><FaPhoneAlt className="inline-block text-[#3972C1] mr-2" /> Phone: +880-1234-567890</span>
            <span><FaMapMarkerAlt className="inline-block text-[#3972C1] mr-2" /> Address: 123 Hotel Street, Dhaka, Bangladesh</span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
