'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import logo from '../../public/logo.png';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 bg-white text-gray-800 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image src={logo} alt="Site Logo" height={40} width={120} />
            </Link>
          </div>

          {/* Links for larger screens */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-semibold">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 font-semibold">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-semibold">
              Contact
            </Link>
            <Link href="/tickets" className="text-gray-700 hover:text-blue-600 font-semibold">
              Tickets
            </Link>
          </div>

          {/* Call to Action Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                Login
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleSidebar}
              className="text-gray-800 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <Link href="/">
              <Image src={logo} alt="Site Logo" height={40} width={120} />
            </Link>
            <button
              onClick={closeSidebar}
              className="text-gray-800 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <ul className="space-y-6">
            <li>
              <Link href="/" onClick={closeSidebar} className="block text-gray-700 hover:text-blue-600 font-semibold">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" onClick={closeSidebar} className="block text-gray-700 hover:text-blue-600 font-semibold">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" onClick={closeSidebar} className="block text-gray-700 hover:text-blue-600 font-semibold">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/tickets" onClick={closeSidebar} className="block text-gray-700 hover:text-blue-600 font-semibold">
                Tickets
              </Link>
            </li>
            <li>
              <Link href="/login" onClick={closeSidebar} className="block text-gray-700 hover:text-blue-600 font-semibold">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
