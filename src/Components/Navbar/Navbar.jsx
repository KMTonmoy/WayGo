"use client";

import Image from "next/image";
import React, { useContext, useState } from "react";
import logo from "../../../public/logo.png";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { AuthContext } from "../../Provider/AuthProvider";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathName = usePathname();
  const { user, logOut } = useContext(AuthContext);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const links = [
    { title: "Home", path: "/" },
    { title: "About Us", path: "/about" },
    { title: "Services", path: "/services" },
    { title: "Blog", path: "/blog" },
    { title: "Contact Us", path: "/contact" },
  ];

  return (
    <>
      <div className="bg-white fixed w-full top-0 shadow-lg z-50">
        <div className="container mx-auto flex justify-between items-center h-[80px] px-5 lg:px-10">
          <div>
            <Image src={logo} alt="WayGO Logo" className="w-[150px]" />
          </div>

          <div className="hidden lg:flex gap-6">
            {links.map((link) => (
              <Link
                key={link.path}
                className={`font-semibold transition-colors duration-300 ${
                  link.path === pathName
                    ? "text-clr-focussed underline"
                    : "hover:text-clr-focussed"
                }`}
                href={link.path}
              >
                {link.title}
              </Link>
            ))}
            {user && (
              <Link
                href="/dashboard"
                className={`font-semibold transition-colors duration-300 ${
                  pathName === "/dashboard"
                    ? "text-clr-focussed underline"
                    : "hover:text-clr-focussed"
                }`}
              >
                Dashboard
              </Link>
            )}
          </div>

          <div className="flex items-center">
            {!user ? (
              <div className="flex gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center px-5 py-2 font-medium text-white transition duration-300 ease-out bg-[#f0652b] rounded-full hover:bg-[#d05424]"
                  >
                    Login
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/signup"
                    className="inline-flex items-center justify-center px-5 py-2 font-medium text-white transition duration-300 ease-out bg-[#f0652b] rounded-full hover:bg-[#d05424]"
                  >
                    Signup
                  </Link>
                </motion.div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <img
                  src={user.photoURL}
                  className="rounded-full h-[50px] w-[50px] border-2 border-[#f0652b]"
                  alt="User Profile"
                />
                <button
                  onClick={() => logOut()}
                  className="md:inline-flex items-center justify-center px-5 py-2 font-medium text-white transition duration-300 ease-out bg-[#f0652b] rounded-full hover:bg-[#d05424] hidden"
                >
                  Logout
                </button>
              </div>
            )}

            <div className="lg:hidden flex items-center ml-5">
              <button
                onClick={handleMenuToggle}
                className="text-2xl text-gray-600"
              >
                {menuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>

        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white shadow-lg w-full p-5 z-20"
          >
            {links.map((link) => (
              <Link
                key={link.path}
                className={`block my-2 font-semibold transition-colors duration-300 ${
                  link.path === pathName
                    ? "text-clr-focussed underline"
                    : "hover:text-clr-focussed"
                }`}
                href={link.path}
                onClick={() => setMenuOpen(false)}
              >
                {link.title}
              </Link>
            ))}
            {user && (
              <Link
                href="/dashboard"
                className={`block my-2 font-semibold transition-colors duration-300 ${
                  pathName === "/dashboard"
                    ? "text-[#f0652b] underline"
                    : "hover:text-[#f0652b]"
                }`}
              >
                Dashboard
              </Link>
            )}
            {user && (
              <button
                onClick={() => logOut()}
                className="md:inline-flex items-center justify-center px-5 py-2 font-medium text-white transition duration-300 ease-out bg-clr-focussed rounded-full hover:bg-orange-500"
              >
                Logout
              </button>
            )}
            {!user && (
              <div className="mt-5 py-4 flex gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/login"
                    className="relative inline-flex items-center justify-center px-5 py-2.5 overflow-hidden font-medium text-white transition duration-300 ease-out bg-clr-focussed rounded-full hover:bg-[#d05424]"
                  >
                    Login
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/signup"
                    className="relative inline-flex items-center justify-center px-5 py-2.5 overflow-hidden font-medium text-white transition duration-300 ease-out bg-clr-focussed rounded-full hover:bg-[#d05424]"
                  >
                    Signup
                  </Link>
                </motion.div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </>
  );
};

export default Navbar;
