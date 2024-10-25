"use client";

import React from 'react';
import {
  FaShieldAlt,
  FaTags,
  FaUserTie,
  FaClock,
  FaLaptop,
  FaHeadset,
} from 'react-icons/fa'; // Icons for services

const services = [
  {
    icon: <FaShieldAlt size={40} />,
    title: 'Safety Guarantee',
    description:
      'Your safety is our priority. We adhere to the highest standards to ensure a secure and comfortable journey for every passenger.',
  },
  {
    icon: <FaTags size={40} />,
    title: 'Discount & Promo',
    description:
      'Enjoy great savings on your trips with our regular discounts and exclusive promotions tailored just for you.',
  },
  {
    icon: <FaUserTie size={40} />,
    title: 'Professional Staff',
    description:
      'Our friendly and skilled team is here to assist you, ensuring that your travel experience is smooth from start to finish.',
  },
  {
    icon: <FaClock size={40} />,
    title: 'Schedule On Time',
    description:
      'We value your time and strive to maintain punctuality with a well-organized schedule you can rely on.',
  },
  {
    icon: <FaLaptop size={40} />,
    title: 'Online Booking',
    description:
      'Conveniently book your tickets online with an easy, user-friendly process to secure your seat anytime, anywhere.',
  },
  {
    icon: <FaHeadset size={40} />,
    title: '24/7 Support',
    description:
      'Our support team is available around the clock to address any inquiries or concerns for a hassle-free journey.',
  },
];


const OurServices = () => {
  return (
    <div className="container mx-auto px-5 lg:px-10 py-16">
      <h2 className="text-4xl lg:text-5xl font-bold text-center mb-10 text-[#22C55E] ">
        Our Services
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="relative group bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden p-6 transition-transform duration-500 hover:shadow-2xl"
          >
            {/* Orange Background on Hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#22C55E]  to-[#22C55E]  h-0 group-hover:h-full transition-all duration-500 ease-in-out z-0"></div>

            {/* Content including Icon */}
            <div className="relative z-10 text-center">
              <div className="mb-4 text-[#22C55E]  group-hover:text-white transition-all duration-500">
                {service.icon}
              </div>
              <h3 className="text-2xl font-semibold text-[#25527E] group-hover:text-white transition-all duration-500">
                {service.title}
              </h3>
              <p className="mt-4 text-gray-700 group-hover:text-white transition-all duration-500">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurServices;
