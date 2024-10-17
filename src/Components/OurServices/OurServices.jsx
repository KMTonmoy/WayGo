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
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.',
  },
  {
    icon: <FaTags size={40} />,
    title: 'Discount & Promo',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.',
  },
  {
    icon: <FaUserTie size={40} />,
    title: 'Professional Staff',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.',
  },
  {
    icon: <FaClock size={40} />,
    title: 'Schedule On Time',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.',
  },
  {
    icon: <FaLaptop size={40} />,
    title: 'Online Booking',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.',
  },
  {
    icon: <FaHeadset size={40} />,
    title: '24/7 Support',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.',
  },
];

const OurServices = () => {
  return (
    <div className="container mx-auto px-5 lg:px-10 py-16">
      <h2 className="text-4xl lg:text-5xl font-bold text-center mb-10 text-[#25527E]">
        Our Services
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="relative group bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden p-6 transition-transform duration-500 hover:shadow-2xl"
          >
            {/* Orange Background on Hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-clr-focussed to-[#ec3124] h-0 group-hover:h-full transition-all duration-500 ease-in-out z-0"></div>

            {/* Content including Icon */}
            <div className="relative z-10 text-center">
              <div className="mb-4 text-clr-focussed group-hover:text-white transition-all duration-500">
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
