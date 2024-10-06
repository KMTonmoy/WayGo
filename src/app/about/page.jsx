'use client';
import React from 'react';
import { motion } from 'framer-motion';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center flex-col ">
      {/* About Section */}
      <div className="container mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold text-[#25527E] mb-6">About Us</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Welcome to WayGO, a state-of-the-art ticket management platform designed to streamline your ticketing processes. Our platform offers a seamless experience for purchasing and managing tickets for buses, trains, and flights.
        </p>
      </div>

      {/* About This Website Section */}
      <div className="container mx-auto text-center bg-white py-12 px-6 shadow-lg rounded-lg mb-16">
        <motion.h2
          className="text-3xl font-semibold text-[#25527E] mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About WayGO
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          WayGO is your go-to platform for purchasing and managing tickets. Whether you're planning a bus journey, a train ride, or booking a flight, WayGO ensures a hassle-free ticketing experience. Powered by cutting-edge technologies like <strong>Next.js</strong>, <strong>TypeScript</strong>, and <strong>Tailwind CSS</strong>, WayGO provides an intuitive interface for users and administrators.
        </motion.p>
        <motion.p
          className="text-lg text-gray-600 max-w-3xl mx-auto mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Simplify your ticketing process with WayGO's efficient workflow. Whether it's managing customer support tickets, IT service requests, or general inquiries, WayGO is designed to streamline your tasks and enhance your ticket management experience.
        </motion.p>
      </div>

      {/* Developer Team Section (if necessary) */}
      {/* Replace this section if you have information about developers */}
    </div>
  );
};

export default AboutPage;
