'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { AiFillHome } from "react-icons/ai";
import { FaPlusSquare, FaBoxes, FaTools } from "react-icons/fa";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { HiMenu, HiX } from "react-icons/hi";
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import toast from 'react-hot-toast';  // <-- import toast

const Navbar = () => {
  const { data: session, status } = useSession();
  console.log(session)
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

  // New logout handler with toast
  const handleLogout = async () => {
    await signOut();
    toast.success('Logged out successfully!');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md text-[#3972C1] max-w-screen-xl mx-auto">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center cursor-pointer">
            <Image src="/assets/logo.png" alt="Logo" width={60} height={80} />
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
          <Link href="/" className="flex items-center gap-1 hover:underline">
            <AiFillHome size={20} />
            Home
          </Link>
          <Link href="/add-rooms" className="flex items-center gap-1 hover:underline">
            <FaPlusSquare size={20} />
            Add Rooms
          </Link>
          <Link href="/inventory" className="flex items-center gap-1 hover:underline">
            <FaBoxes size={20} />
            My Inventory
          </Link>
          <Link href="/manage-rooms" className="flex items-center gap-1 hover:underline">
            <FaTools size={20} />
            Manage Rooms
          </Link>
        </div>

        {/* Desktop Auth Button */}
        <div className="hidden md:flex items-center gap-4">
          {status === 'authenticated' ? (
            <>
              <div className="relative group">
                <Image
                  src={session?.user?.image || "/default-user.png"}
                  alt="User"
                  width={35}
                  height={35}
                  className="rounded-full border cursor-pointer"
                />
                <span className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                  {session?.user?.name || "User"}
                </span>
              </div>
              <button
                onClick={handleLogout}  // <-- use new handler here
                className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                <FiLogOut size={20} />
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="flex items-center gap-2 bg-[#3972C1] text-white px-4 py-2 rounded hover:bg-[#2f5ea4]">
              <FiLogIn size={20} />
              Login
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <HiX size={30} /> : <HiMenu size={30} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`md:hidden px-6 pb-4 overflow-hidden transition-all duration-300 ease-in-out
          ${menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
        style={{ transitionProperty: 'max-height, opacity' }}
      >
        <Link href="/" className="flex items-center gap-2 hover:underline text-lg py-2">
          <AiFillHome size={24} />
          Home
        </Link>
        <Link href="/add-rooms" className="flex items-center gap-2 hover:underline text-lg py-2">
          <FaPlusSquare size={24} />
          Add Rooms
        </Link>
        <Link href="/inventory" className="flex items-center gap-2 hover:underline text-lg py-2">
          <FaBoxes size={24} />
          My Inventory
        </Link>
        <Link href="/manage-rooms" className="flex items-center gap-2 hover:underline text-lg py-2">
          <FaTools size={24} />
          Manage Rooms
        </Link>

        {/* Mobile Auth Button */}
        {status === 'authenticated' ? (
          <>
            <div className="flex justify-center mt-2 mb-2 relative group">
              <Image
                src={session?.user?.image || "/default-user.png"}
                alt="User"
                width={60}
                height={60}
                className="rounded-full border cursor-pointer"
              />
              <span className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                {session?.user?.name || "User"}
              </span>
            </div>
            <button
              onClick={handleLogout}  // <-- here too
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full justify-center"
            >
              <FiLogOut size={24} />
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className="flex items-center gap-2 bg-[#3972C1] text-white px-4 py-2 rounded hover:bg-[#2f5ea4] w-full justify-center mt-2">
            <FiLogIn size={24} />
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
