"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

const CustomSlider: React.FC = () => {
  const [deal, setDeal] = useState<any[]>([]);
  const [currentSlider, setCurrentSlider] = useState(0);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const res = await fetch("/hotdeal.json");
        const data = await res.json();
        setDeal(data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchDeals();
  }, []);

  const prevSlider = useCallback(() => {
    setCurrentSlider((prev) => (prev === 0 ? deal.length - 1 : prev - 1));
  }, [deal.length]);

  const nextSlider = useCallback(() => {
    setCurrentSlider((prev) => (prev === deal.length - 1 ? 0 : prev + 1));
  }, [deal.length]);

  useEffect(() => {
    const intervalId = setInterval(nextSlider, 10000);
    return () => clearInterval(intervalId);
  }, [nextSlider]);

  return (
    <div className="relative">
      <div className="flex px-14 mt-8 justify-between">
        <h4 className="text-lg font-semibold text-gray-800">Hot Deals</h4>
        <ul className="flex gap-4 px-3 py-2 bg-white rounded-full shadow-lg">
          {["All", "Bus", "Train", "Flight"].map((category) => (
            <li key={category}>
              <button className="hover:bg-gray-200 rounded-full px-3 py-1">
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative overflow-hidden max-w-full mx-auto mt-8">
        <button
          onClick={prevSlider}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full p-2 hover:bg-gray-200 shadow-md"
        >
          <svg
            viewBox="0 0 1024 1024"
            className="w-6 h-6"
            fill="currentColor"
          >
            <path d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z"></path>
          </svg>
        </button>

        <motion.div
          className="flex transition-transform duration-300"
          style={{ transform: `translateX(-${currentSlider * 100}%)` }}
        >
          {deal.map((item, idx) => (
            <motion.div
              key={idx}
              className="flex-shrink-0 w-full md:w-1/3 p-4 bg-gray-300 rounded-lg relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute -top-4 left-4">
                <img className="w-32 h-32 rounded-xl" src={item.img} alt={item.title} />
              </div>
              <div className="pl-40">
                <h6 className="pt-5 text-lg font-semibold">{item.title}</h6>
                <p className="pt-4">{item.description}</p>
                <p className="pt-2 text-sm">Offer valid till: {item.validTill}</p>
              </div>
              <div className="absolute bottom-4 left-5 bg-zinc-200 rounded-lg px-2 py-1">
                {item.promoCode}
              </div>
              <div className="absolute bottom-4 right-5">
                <button className="bg-orange-400 px-4 py-2 rounded-xl text-white hover:bg-orange-500">
                  Learn More
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <button
          onClick={nextSlider}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full p-2 hover:bg-gray-200 shadow-md"
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
