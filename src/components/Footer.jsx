import Image from 'next/image';
import Link from 'next/link';
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt
} from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-[#1F2937] text-white py-10 max-w-screen-xl mx-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
                
                {/* Logo and About */}
                <div className="text-center md:text-left">
                    <div className="flex justify-center md:justify-start mb-4">
                        <Image src="/assets/logo.png" alt="Logo" width={80} height={80} />
                    </div>
                    <p className="text-sm leading-relaxed max-w-sm mx-auto md:mx-0">
                        StayNest is your gateway to premium hotel experiences. Book top-rated hotels with ease and comfort.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="text-center md:text-left">
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/" className="hover:underline">Home</Link></li>
                        <li><Link href="/about" className="hover:underline">About</Link></li>
                        
                    </ul>
                </div>

                {/* Contact & Social */}
                <div className="text-center md:text-left">
                    <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="flex justify-center md:justify-start items-center gap-2"><FaMapMarkerAlt /> Dhaka, Bangladesh</li>
                        <li className="flex justify-center md:justify-start items-center gap-2"><FaPhoneAlt /> +880 123-456-789</li>
                        <li className="flex justify-center md:justify-start items-center gap-2"><FaEnvelope /> support@staynest.com</li>
                    </ul>

                    {/* Social Icons */}
                    <div className="flex justify-center md:justify-start gap-4 mt-4">
                        <a href="#" className="hover:text-blue-400"><FaFacebookF /></a>
                        <a href="#" className="hover:text-pink-400"><FaInstagram /></a>
                        <a href="#" className="hover:text-sky-400"><FaTwitter /></a>
                    </div>
                </div>
            </div>

            {/* Bottom Line */}
            <div className="text-center text-xs mt-10 border-t border-gray-600 pt-4 px-4">
                &copy; {new Date().getFullYear()} StayNest Hotels. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
