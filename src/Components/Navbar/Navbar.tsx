'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import logo from '../../../public/logo.png';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

const Navbar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const router = usePathname();

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };

    const isActive = (path: string) => router === path;

    return (

        <div className="bg-white mb-5 fixed  w-full top-0 shadow-lg ">
            <div className="container mx-auto flex justify-between items-center h-[100px] px-5 lg:px-10">

                {/* Logo */}
                <div>
                    <Image src={logo} alt="WayGO Logo" className="w-[150px]" />
                </div>

                {/* Desktop Menu */}
                <div className="hidden lg:flex gap-5">
                    <Link className={`text-gray-600 font-medium hover:text-[#f0652b] transition-colors duration-300 ${isActive('/') ? 'text-[#f0652b]' : ''}`} href="/">Home</Link>
                    <Link className={`text-gray-600 font-medium hover:text-[#f0652b] transition-colors duration-300 ${isActive('/about') ? 'text-[#f0652b]' : ''}`} href="/about">About Us</Link>
                    <Link className={`text-gray-600 font-medium hover:text-[#f0652b] transition-colors duration-300 ${isActive('/services') ? 'text-[#f0652b]' : ''}`} href="/services">Services</Link>
                    <Link className={`text-gray-600 font-medium hover:text-[#f0652b] transition-colors duration-300 ${isActive('/our') ? 'text-[#f0652b]' : ''}`} href="/our">Buy Tickets</Link>
                    <Link className={`text-gray-600 font-medium hover:text-[#f0652b] transition-colors duration-300 ${isActive('/blog') ? 'text-[#f0652b]' : ''}`} href="/blog">Blog</Link>
                    <Link className={`text-gray-600 font-medium hover:text-[#f0652b] transition-colors duration-300 ${isActive('/contact') ? 'text-[#f0652b]' : ''}`} href="/contact">Contact Us</Link>
                </div>

                {/* Login Button (Desktop) */}
                <div className='flex gap-2'>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="hidden lg:flex"
                    >
                        <Link href="/login" className="relative inline-flex items-center justify-center px-5 py-2.5 overflow-hidden font-medium text-white transition duration-300 ease-out bg-[#f0652b] rounded-full group">
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#ff7e5f] to-[#feb47b]"></span>
                            <span className="absolute bottom-0 right-0 w-64 h-64 -mr-10 -mb-10 transition-all duration-300 transform rotate-45 translate-x-24 opacity-30 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"></span>
                            <span className="relative">Login</span>
                        </Link>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="hidden lg:flex"
                    >
                        <Link href="/Signup" className="relative inline-flex items-center justify-center px-5 py-2.5 overflow-hidden font-medium text-white transition duration-300 ease-out bg-[#f0652b] rounded-full group">
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#ff7e5f] to-[#feb47b]"></span>
                            <span className="absolute bottom-0 right-0 w-64 h-64 -mr-10 -mb-10 transition-all duration-300 transform rotate-45 translate-x-24 opacity-30 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"></span>
                            <span className="relative">Signup</span>
                        </Link>
                    </motion.div>
                </div>

                {/* Mobile Menu Button */}
                <div className="lg:hidden flex items-center">
                    <button onClick={handleMenuToggle} className="text-2xl text-gray-600">
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>

            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="lg:hidden bg-white shadow-lg w-full p-5"
                >
                    <Link className={`block text-gray-600 font-medium py-2 hover:text-[#f0652b] transition-colors duration-300 ${isActive('/') ? 'text-[#f0652b]' : ''}`} href="/" onClick={() => setMenuOpen(false)}>Home</Link>
                    <Link className={`block text-gray-600 font-medium py-2 hover:text-[#f0652b] transition-colors duration-300 ${isActive('/about') ? 'text-[#f0652b]' : ''}`} href="/about" onClick={() => setMenuOpen(false)}>About Us</Link>
                    <Link className={`block text-gray-600 font-medium py-2 hover:text-[#f0652b] transition-colors duration-300 ${isActive('/services') ? 'text-[#f0652b]' : ''}`} href="/services" onClick={() => setMenuOpen(false)}>Services</Link>
                    <Link className={`block text-gray-600 font-medium py-2 hover:text-[#f0652b] transition-colors duration-300 ${isActive('/our') ? 'text-[#f0652b]' : ''}`} href="/our" onClick={() => setMenuOpen(false)}>Buy Tickets</Link>
                    <Link className={`block text-gray-600 font-medium py-2 hover:text-[#f0652b] transition-colors duration-300 ${isActive('/blog') ? 'text-[#f0652b]' : ''}`} href="/blog" onClick={() => setMenuOpen(false)}>Blog</Link>
                    <Link className={`block text-gray-600 font-medium py-2 hover:text-[#f0652b] transition-colors duration-300 ${isActive('/contact') ? 'text-[#f0652b]' : ''}`} href="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link>

                    {/* Login Button (Mobile) */}
                    <div className="mt-5 py-4 flex gap-2">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link href="/login" className="relative inline-flex items-center justify-center px-5 py-2.5 overflow-hidden  font-medium text-white transition duration-300 ease-out bg-[#f0652b] rounded-full group">
                                <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#ff7e5f] to-[#feb47b]"></span>
                                <span className="absolute bottom-0 right-0 w-64 h-64 -mr-10 -mb-10 transition-all duration-300 transform rotate-45 translate-x-24 opacity-30 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"></span>
                                <span className="relative">Login</span>
                            </Link>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link href="/signup" className="relative inline-flex items-center justify-center px-5 py-2.5 overflow-hidden font-medium text-white transition duration-300 ease-out bg-[#f0652b] rounded-full group">
                                <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#ff7e5f] to-[#feb47b]"></span>
                                <span className="absolute bottom-0 right-0 w-64 h-64 -mr-10 -mb-10 transition-all duration-300 transform rotate-45 translate-x-24 opacity-30 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"></span>
                                <span className="relative">Signup</span>
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </div>

    );
};

export default Navbar;
