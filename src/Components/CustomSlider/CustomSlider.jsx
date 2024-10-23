"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

const CustomSlider = () => {
  const [deals, setDeals] = useState([]);
  const [currentSlider, setCurrentSlider] = useState(0);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const res = await fetch("https://way-go-backend.vercel.app/coupons");
        const data = await res.json();
        setDeals(data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchDeals();
  }, []);

  const prevSlider = useCallback(() => {
    setCurrentSlider((prev) => (prev === 0 ? deals.length - 2 : prev - 1));
  }, [deals.length]);

  const nextSlider = useCallback(() => {
    setCurrentSlider((prev) => (prev === deals.length - 2 ? 0 : prev + 1));
  }, [deals.length]);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlider();
    }, 4000);

    return () => clearInterval(slideInterval);
  }, [nextSlider]);

  return (
    <div className="relative mx-auto mt-8 ">
      <div className="relative overflow-hidden rounded-xl shadow-xl">
        <button
          onClick={prevSlider}
          className="absolute top-1/2 z-50 left-4 transform -translate-y-1/2 bg-[#0F172A] text-white rounded-full p-3 hover:bg-[#334155] transition duration-300"
        >
          <svg viewBox="0 0 1024 1024" className="w-6 h-6" fill="currentColor">
            <path d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z"></path>
          </svg>
        </button>

        <motion.div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentSlider * (100 / 3)}%)`,
          }}
        >
          {deals.map((item, idx) => (
            <motion.div
              key={idx}
              className="flex-shrink-0 px-5 w-full md:w-1/2 lg:w-1/3 p-6 bg-gradient-to-r from-white via-gray-100 to-white shadow-lg rounded-lg relative mx-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col py-5 items-center">
                <img
                  className="w-32 h-32 rounded-full border-4 border-[#22C55E] mb-4 shadow-lg transform transition hover:scale-105"
                  src={item.img}
                  alt={item.title}
                />
                <h6 className="text-2xl font-bold text-gray-800 mt-2">
                  Unlock an Amazing
                  <span className="text-[#22C55E] mx-2 font-bold">
                    {item.discountPercentage}%
                  </span>
                  Discount Just for You!
                </h6>
                <p className="text-gray-600 mt-2 text-center">
                  Purchase any ticket online and enjoy an exclusive flat
                  discount of{" "}
                  <span className="text-[#22C55E]">
                    {item.discountPercentage}
                  </span>
                  %! Don’t miss out on this fantastic opportunity to save on
                  your next adventure!
                </p>

                <div className="mt-4 rounded-lg px-4 py-1 text-xs font-medium">
                  <span className="text-gray-600">Promo Code:</span> <span className="px-2 py-1 rounded-2xl bg-[#22c55e2d] text-[#22C55E]">{item.promoCode}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <button
          onClick={nextSlider}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-[#0F172A] text-white rounded-full p-3 hover:bg-[#334155] transition duration-300"
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

      {/* Slider indicators */}
      <div className="flex justify-center space-x-2 mt-6">
        {deals.map((_, idx) => (
          <div
            key={idx}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              currentSlider === idx ? "bg-[#22C55E] w-8" : "bg-gray-300 w-2"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default CustomSlider;
