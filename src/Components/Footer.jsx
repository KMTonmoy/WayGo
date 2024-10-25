'use client';

import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { CiLocationOn } from 'react-icons/ci';
import { MdOutlineMail } from 'react-icons/md';
import { FaPhoneAlt } from 'react-icons/fa';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/logo.png';

// Define animation variants
const socialIconVariant = {
  hover: {
    scale: 1.2,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 10,
    },
  },
};

const Footer = () => {
  return (
    <footer className="bg-[#000000] text-white py-8 px-10  ">
      <div className="flex md:flex-row flex-col flex-wrap md:justify-around gap-10 md:gap-5 items-center">
        <motion.div
          className="md:w-[300px]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image className="w-[150px]" src={logo} alt="Logo" />
          <p className="w-[330px]">
            Your trusted bus booking service, committed to making travel easy
            and accessible. Start your journey with confidence and convenience,
            every step of the way.
          </p>
          <div className="flex items-center gap-2">
            <motion.button
              className="text-white text-xl bg-[#22C55E]  p-3 rounded-md mt-2 duration-300 hover:bg-orange-900"
              whileHover="hover"
              variants={socialIconVariant}
            >
              <FaFacebook />
            </motion.button>
            <motion.button
              className="text-white text-xl bg-[#22C55E]  p-3 rounded-md mt-2 duration-300 hover:bg-orange-900"
              whileHover="hover"
              variants={socialIconVariant}
            >
              <FaTwitter />
            </motion.button>
            <motion.button
              className="text-white text-xl bg-[#22C55E]  p-3 rounded-md mt-2 duration-300 hover:bg-orange-900"
              whileHover="hover"
              variants={socialIconVariant}
            >
              <FaInstagram />
            </motion.button>
            <motion.button
              className="text-white text-xl bg-[#22C55E]  p-3 rounded-md mt-2 duration-300 hover:bg-orange-900"
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
          <h4 className="mb-2">Quick Links</h4>
          {['About Us', 'Services', 'Contact'].map((link, idx) => (
            <motion.p
              key={idx}
              className="flex gap-2 duration-300 hover:cursor-pointer hover:text-[#22C55E] "
              whileHover={{ x: 10 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <span className="text-[#22C55E] ">
                <MdOutlineKeyboardArrowRight />
              </span>
              <Link href={`/${link.toLowerCase().replace(' ', '')}`}>
                {link}
              </Link>
            </motion.p>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h4 className="mb-2">Contact Info</h4>
          <p className="flex gap-2 items-center py-2 border-b-[1px] border-solid border-gray-600">
            <span className="text-[#22C55E] ">
              <CiLocationOn />
            </span>
            Jl. Raya Kuta No.21, Kuta, Bali 80361
          </p>
          <p className="flex gap-2 items-center py-2 border-b-[1px] border-solid border-gray-600">
            <span className="text-[#22C55E] ">
              <FaPhoneAlt />
            </span>
            (+62)81587 6218
          </p>
          <p className="flex gap-2 items-center py-2">
            <span className="text-[#22C55E] ">
              <MdOutlineMail />
            </span>
            support@domain.com
          </p>
        </motion.div>

        <motion.div
          className="w-[300px]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h4 className="mb-2">Newsletter</h4>
          <p>
            Stay updated with Way-Go! Receive the latest travel deals, exclusive
            offers, and helpful travel tips right in your inbox. Join us for a
            better journey.
          </p>

          <div className="flex items-center mt-2">
            <input
              type="email"
              placeholder="example@gmail.com"
              className="p-4"
            />
            <motion.button
              className="p-5 bg-[#22C55E] "
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
