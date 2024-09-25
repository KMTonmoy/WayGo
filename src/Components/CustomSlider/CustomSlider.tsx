"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomSlider: React.FC = () => {
  const [deal, setDeal] = useState([]);
  const [currentSlider, setCurrentSlider] = useState(0);

  useEffect(() => {
    // Fetch data only on the client side
    fetch("/hotdeal.json")
      .then((res) => res.json())
      .then((data) => setDeal(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const prevSlider = () =>
    setCurrentSlider((currentSlider) =>
      currentSlider === 0 ? deal.length - 1 : currentSlider - 1
    );

  const nextSlider = () =>
    setCurrentSlider((currentSlider) =>
      currentSlider === deal.length - 1 ? 0 : currentSlider + 1
    );

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlider();
    }, 10000);
    return () => {
      clearInterval(intervalId);
    };
  }, [currentSlider]);

  return (
    <div className="relative">
      <div className="flex px-14 mt-8 justify-between">
<<<<<<< HEAD
        <h4 className="text-lg font-semibold text-gray-800">Hot Deals</h4>
        <ul className="flex gap-4 px-3 py-2 bg-white rounded-full shadow-lg">
          {["All", "Bus", "Train", "Flight"].map((category) => (
            <li key={category}>
              <button className="cursor-pointer hover:bg-gray-200 rounded-full px-3 py-1 transition duration-200">
                {category}
              </button>
            </li>
          ))}
=======
        <h4 className="text-lg font-semibold">Hot Deals</h4>
        <ul className="flex gap-4 px-3 py-2 bg-white rounded-full">
          <button className="cursor-pointer hover:bg-slate-300 rounded-full px-3 py-1">
            All
          </button>
          <button className="cursor-pointer hover:bg-slate-300 rounded-full px-3 py-1">
            Bus
          </button>
          <button className="cursor-pointer hover:bg-slate-300 rounded-full px-3 py-1">
            Train
          </button>
          <button className="cursor-pointer hover:bg-slate-300 rounded-full px-3 py-1">
            Flight
          </button>
>>>>>>> 91e1f64617355557f063f3f4fdf6b47fd352a94a
        </ul>
      </div>

      <div className="relative overflow-hidden max-w-full mx-auto mt-8">
        <button
          onClick={prevSlider}
<<<<<<< HEAD
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full p-2 hover:bg-gray-200 transition duration-200 shadow-md"
=======
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full p-2 hover:bg-gray-200"
>>>>>>> 91e1f64617355557f063f3f4fdf6b47fd352a94a
        >
          <svg
            viewBox="0 0 1024 1024"
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
          >
<<<<<<< HEAD
            <path d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z"></path>
          </svg>
        </button>

        <motion.div
=======
            <path
              d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z"
            ></path>
          </svg>
        </button>

        <div
>>>>>>> 91e1f64617355557f063f3f4fdf6b47fd352a94a
          className="flex transition-transform duration-300"
          style={{
            transform: `translateX(-${currentSlider * 100}%)`,
          }}
        >
          {deal.map((item, idx) => (
            <motion.div
              key={idx}
              className="flex-shrink-0 w-full md:w-1/3 p-4 bg-gray-300 rounded-lg relative"
<<<<<<< HEAD
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute -top-4 left-4 z-10">
                <img className="w-32 h-32 rounded-xl" src={item.img} alt={item.title} />
=======
            >
              <div className="absolute -top-4 left-4 z-10">
                <img
                  className="w-32 h-32 rounded-xl"
                  src={item.img}
                  alt=""
                />
>>>>>>> 91e1f64617355557f063f3f4fdf6b47fd352a94a
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
<<<<<<< HEAD
                <button className="bg-orange-400 px-4 py-2 rounded-xl text-white transition duration-200 hover:bg-orange-500">
=======
                <button className="bg-orange-400 px-4 py-2 rounded-xl text-white">
>>>>>>> 91e1f64617355557f063f3f4fdf6b47fd352a94a
                  Learn More
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <button
          onClick={nextSlider}
<<<<<<< HEAD
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full p-2 hover:bg-gray-200 transition duration-200 shadow-md"
=======
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full p-2 hover:bg-gray-200"
>>>>>>> 91e1f64617355557f063f3f4fdf6b47fd352a94a
        >
          <svg
            viewBox="0 0 1024 1024"
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            transform="rotate(180)"
          >
<<<<<<< HEAD
            <path d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z"></path>
=======
            <path
              d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z"
            ></path>
>>>>>>> 91e1f64617355557f063f3f4fdf6b47fd352a94a
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CustomSlider;
