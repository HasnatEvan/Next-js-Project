'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { AiFillHome } from "react-icons/ai";
import { FaPlusSquare, FaBoxes, FaTools, FaBookmark } from "react-icons/fa";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { HiMenu, HiX } from "react-icons/hi";
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import toast from 'react-hot-toast';
import useRole from '@/app/useRole';
import { FcAbout } from 'react-icons/fc';

const Navbar = () => {
  const [role, isLoading] = useRole();
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const handleLogout = async () => {
    await signOut();
    toast.success('Logged out successfully!');
  };

  const renderLinks = () => (
    <>
      <Link href="/" className="flex items-center gap-1 hover:underline text-sm">
        <AiFillHome size={18} />
        Home
      </Link>
      <Link href="/about" className="flex items-center gap-1 hover:underline text-sm">
        <FcAbout size={18} />
        About
      </Link>
      {role === 'admin' && (
        <>
          <Link href="/add-rooms" className="flex items-center gap-1 hover:underline text-sm">
            <FaPlusSquare size={18} />
            Add Rooms
          </Link>
          <Link href="/inventory" className="flex items-center gap-1 hover:underline text-sm">
            <FaBoxes size={18} />
            My Inventory
          </Link>
          <Link href="/manage-bookings" className="flex items-center gap-1 hover:underline text-sm">
            <FaTools size={18} />
            Manage Bookings
          </Link>
        </>
      )}
      {role === 'customer' && (
        <Link href="/my-bookings" className="flex items-center gap-1 hover:underline text-sm">
          <FaBookmark size={18} />
          My Bookings
        </Link>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md text-[#3972C1]">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center cursor-pointer">
            <Image src="/assets/logo.png" alt="Logo" width={45} height={60} />
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4">
          {!isLoading && renderLinks()}
        </div>

        {/* Desktop Auth Button */}
        <div className="hidden md:flex items-center gap-3">
          {status === 'authenticated' ? (
            <>
              <div className="relative group">
                <Image
                  src={session?.user?.image || "/default-user.png"}
                  alt="User"
                  width={30}
                  height={30}
                  className="rounded-full border cursor-pointer"
                />
                <span className="absolute bottom-[-26px] left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                  {session?.user?.name || "User"}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 bg-red-500 text-white px-3 py-1.5 text-sm rounded hover:bg-red-600"
              >
                <FiLogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="flex items-center gap-1 bg-[#3972C1] text-white px-3 py-1.5 text-sm rounded hover:bg-[#2f5ea4]">
              <FiLogIn size={18} />
              Login
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <HiX size={26} /> : <HiMenu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`md:hidden px-4 pb-3 overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ transitionProperty: 'max-height, opacity' }}
      >
        {!isLoading && (
          <div className="flex flex-col gap-2 text-sm">{renderLinks()}</div>
        )}

        {status === 'authenticated' ? (
          <>
            <div className="flex justify-center mt-2 mb-1 relative group">
              <Image
                src={session?.user?.image || "/default-user.png"}
                alt="User"
                width={50}
                height={50}
                className="rounded-full border"
              />
              <span className="absolute bottom-[-24px] left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                {session?.user?.name || "User"}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 text-white px-3 py-2 text-sm rounded hover:bg-red-600 w-full justify-center"
            >
              <FiLogOut size={18} />
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className="flex items-center gap-2 bg-[#3972C1] text-white px-3 py-2 text-sm rounded hover:bg-[#2f5ea4] w-full justify-center mt-2">
            <FiLogIn size={18} />
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
