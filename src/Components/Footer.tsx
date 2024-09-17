import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Image from 'next/image';
import logo from '../../public/logo.png';  
 
const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        {/* Logo and Navigation */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Image src={logo} alt="Waygo Logo" width={150} height={50} />
          <nav className="flex gap-4">
            <a href="#home" className="hover:text-purple-500">Home</a>
            <a href="#about" className="hover:text-purple-500">About</a>
            <a href="#services" className="hover:text-purple-500">Services</a>
            <a href="#contact" className="hover:text-purple-500">Contact</a>
          </nav>
        </div>

        {/* Social Media Icons */}
        <div className="flex gap-6 mt-4 sm:mt-0">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-500">
            <FaFacebook size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-500">
            <FaTwitter size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-500">
            <FaInstagram size={24} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-500">
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center mt-6 border-t border-gray-700 pt-4">
        <p className="text-sm">&copy; 2024 Waygo. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
