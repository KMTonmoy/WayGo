'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const CustomSlider = () => {
  const [deals, setDeals] = useState([]);
  const [currentSlider, setCurrentSlider] = useState(1); // Start with 1 to show the first item correctly

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const res = await fetch('/hotdeal.json');
        const data = await res.json();
        setDeals(data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchDeals();
  }, []);

  const prevSlider = useCallback(() => {
    setCurrentSlider(prev => (prev === 0 ? deals.length : prev - 1));
  }, [deals.length]);

  const nextSlider = useCallback(() => {
    setCurrentSlider(prev => (prev === deals.length + 1 ? 1 : prev + 1));
  }, [deals.length]);

  return (
    <div className="relative mx-auto mt-8">
      <div className="relative overflow-hidden rounded-lg shadow-lg">
        <button
          onClick={prevSlider}
          className="absolute top-1/2 z-50 left-4 transform -translate-y-1/2 bg-orange-500 text-white rounded-full p-2 hover:bg-orange-600 transition duration-300"
        >
          <svg viewBox="0 0 1024 1024" className="w-6 h-6 z-50" fill="currentColor">
            <path d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z"></path>
          </svg>
        </button>

        

      
        <motion.div
          className="flex transition-transform duration-300"
          style={{ transform: `translateX(-${currentSlider * 100}%)` }}
        >
          {deals.map((item, idx) => (
            <motion.div
              key={idx}
              className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-6 bg-white rounded-lg relative mx-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col items-center">
                <img
                  className="w-32 h-32 rounded-full border-4 border-orange-400 mb-4 shadow-lg"
                  src={item.img}
                  alt={item.title}
                />
                <h6 className="text-2xl font-bold text-gray-800">{item.title}</h6>
                <p className="text-gray-600 mt-2 text-center">{item.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Offer valid till: <span className="font-semibold">{item.validTill}</span>
                </p>
                <div className="mt-4 bg-orange-100 text-orange-600 rounded-lg px-3 py-1 text-xs font-medium">
                  {item.promoCode}
                </div>
                <button className="bg-orange-500 mt-4 px-4 py-2 rounded-xl text-white hover:bg-orange-600 transition duration-300 shadow-md">
                  Learn More
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <button
          onClick={nextSlider}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-orange-500 text-white rounded-full p-2 hover:bg-orange-600 transition duration-300"
        >
          <svg
            viewBox="0 0 1024 1024"
            className="w-6 h-6"
            fill="currentColor"
            transform="rotate(180)"
          >
            <path d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CustomSlider;
