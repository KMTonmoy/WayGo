/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";

// Define the type for each hot deal item
interface HotDealItem {
  img: string;
  title: string;
  description: string;
  validTill: string;
  promoCode: string;
}

const CustomSlider: React.FC = () => {
  const [deal, setDeal] = useState<HotDealItem[]>([]); // Use the type for the state

  useEffect(() => {
    fetch("/hotdeal.json")
      .then((res) => res.json())
      .then((data: HotDealItem[]) => setDeal(data)) // Make sure the fetched data has the correct type
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const [currentSlider, setCurrentSlider] = useState(0);

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

  const isSmallScreen = window.innerWidth <= 768;

  return (
    <div className="max-w-full min-w-[350px] mx-auto min-h-[400px] flex flex-row items-center overflow-hidden gap-5 lg:gap-10 px-8 md:px-16 lg:px-24">
      <div className="relative ">
        <div className="absolute w-full h-full flex items-center justify-between z-50 ">
          {/* arrow left */}
          <button
            onClick={prevSlider}
            className="flex justify-center items-center hover:bg-white/30 rounded-full w-6 h-6 md:w-8 md:h-8"
          >
            <svg
              viewBox="0 0 1024 1024"
              className="w-4 h-4 md:w-6 md:h-6 icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="black"
            >
              <path
                fill="black"
                d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z"
              ></path>
            </svg>
          </button>
          {/* arrow right */}
          <button
            onClick={nextSlider}
            className="flex justify-center items-center hover:bg-white/30 rounded-full w-6 h-6 md:w-8 md:h-8"
          >
            <svg
              viewBox="0 0 1024 1024"
              className="w-4 h-4 md:w-6 md:h-6 icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="black"
              transform="rotate(180)"
            >
              <path
                fill="black"
                d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z"
              ></path>
            </svg>
          </button>
        </div>
        {/* slider container */}
        <div
          className="ease-linear duration-300 flex"
          style={{
            transform: `translateX(-${
              currentSlider * (isSmallScreen ? 100 : 33.33)
            }%)`,
          }}
        >
          {/* sliders */}
          {deal.map((item, idx) => (
            <div
              key={idx}
              className="p-2 max-w-full h-[250px] relative bg-gray-300 rounded-lg md:min-w-[33.33%] mr-6"
            >
              <div className=" flex justify-between ">
                <div className="absolute -top-4 -left-4 z-10">
                  {/* Ensured z-10 to bring image above */}
                  <img
                    className="w-[150px] rounded-xl h-[150px]"
                    src={item.img}
                    alt={item.title}
                  />
                </div>
                <div className="pl-36">
                  <h6 className="pt-5">{item.title}</h6>
                  <p className="pt-4">{item.description}</p>
                  <p>Offer valid till: {item.validTill}</p>
                </div>
              </div>
              <div className="absolute bottom-4 left-5">
                <p className="bg-zinc-200 rounded-lg px-2 py-1">
                  {item.promoCode}
                </p>
              </div>
              <div className="absolute -bottom-4 right-8">
                <button className="bg-orange-400 px-4 py-2 rounded-xl ">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomSlider;
