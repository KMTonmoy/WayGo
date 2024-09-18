'use client';  
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineMail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/logo.png';

// Define animation variants
const socialIconVariant = {
  hover: {
    scale: 1.2,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10,
    },
  },
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#000000] text-white py-8 px-10 mt-10">

      <div className='flex md:flex-row flex-col flex-wrap md:justify-around gap-10  md:gap-5 items-center'>
        <motion.div
          className='md:w-[300px]'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image className='w-[150px]' src={logo} alt="Logo" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          </p>
          <div className='flex items-center gap-2'>
            <motion.button
              className='text-white text-xl bg-orange-600 p-3 rounded-md mt-2 duration-300 hover:bg-orange-900'
              whileHover="hover"
              variants={socialIconVariant}
            >
              <FaFacebook />
            </motion.button>
            <motion.button
              className='text-white text-xl bg-orange-600 p-3 rounded-md mt-2 duration-300 hover:bg-orange-900'
              whileHover="hover"
              variants={socialIconVariant}
            >
              <FaTwitter />
            </motion.button>
            <motion.button
              className='text-white text-xl bg-orange-600 p-3 rounded-md mt-2 duration-300 hover:bg-orange-900'
              whileHover="hover"
              variants={socialIconVariant}
            >
              <FaInstagram />
            </motion.button>
            <motion.button
              className='text-white text-xl bg-orange-600 p-3 rounded-md mt-2 duration-300 hover:bg-orange-900'
              whileHover="hover"
              variants={socialIconVariant}
            >
              <FaLinkedin />
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h4 className='mb-2'>Quick Links</h4>
          {['About Us', 'Services', 'Projects', 'Pricing', 'Contact'].map((link, idx) => (
            <motion.p
              key={idx}
              className='flex gap-2 duration-300 hover:cursor-pointer hover:text-orange-600'
              whileHover={{ x: 10 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <span className='text-orange-600'>
                <MdOutlineKeyboardArrowRight />
              </span>
              <Link href={`/${link.toLowerCase().replace(" ", "")}`}>{link}</Link>
            </motion.p>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h4 className='mb-2'>Contact Info</h4>
          <p className='flex gap-2 items-center py-2 border-b-[1px] border-solid border-gray-600'><span className='text-orange-500'><CiLocationOn /></span>Jl. Raya Kuta No.21, Kuta, Bali 80361 </p>
          <p className='flex gap-2 items-center py-2 border-b-[1px] border-solid border-gray-600'><span className='text-orange-500'><FaPhoneAlt /></span>(+62)81587 6218</p>
          <p className='flex gap-2 items-center py-2'><span className='text-orange-500'><MdOutlineMail /></span>support@domain.com</p>
        </motion.div>

        <motion.div
          className='w-[300px]'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h4 className='mb-2'>Newsletter</h4>
          <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.</p>

          <div className='flex items-center mt-2'>
            <input type="email" placeholder='example@gmail.com' className='p-4' />
            <motion.button
              className='p-5 bg-orange-600'
              whileHover={{ scale: 1.1 }}
            >
              <MdOutlineMail />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
