"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaThList, FaThLarge } from "react-icons/fa";
import Link from "next/link";

const Page = ({ searchResults, departureDate }) => {
  const [visibleCount, setVisibleCount] = useState(6);
  const [layout, setLayout] = useState("list");

  const handleShowMore = () => {
    if (visibleCount < busData.length) {
      setVisibleCount((prevCount) => Math.min(prevCount + 6, busData.length));
    } else {
      setVisibleCount(6);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const toggleLayout = () => {
    setLayout((prevLayout) => (prevLayout === "list" ? "grid" : "list"));
  };

  const busData = Array.isArray(searchResults)
    ? searchResults.filter((bus) => bus.status === "Available")
    : [];

  if (busData.length === 0) {
    return (
      <div className="text-center p-4  ">
        <h1 className="text-2xl font-bold text-red-500"> </h1>
      </div>
    );
  }

  return (
    <div className="p-4   my-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#22C55E]">All Buses</h2>
        <button onClick={toggleLayout} aria-label="Toggle layout view">
          {layout === "list" ? (
            <FaThLarge className="text-2xl text-[#22C55E] hover:text-[#0ca544] transition-colors" />
          ) : (
            <FaThList className="text-2xl text-[#22C55E] hover:text-[#0ca544] transition-colors" />
          )}
        </button>
      </div>

      <div
        className={`${
          layout === "list"
            ? "space-y-6"
            : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center"
        }`}
      >
        <AnimatePresence>
          {busData.slice(0, visibleCount).map((bus) => (
            <motion.div
              key={bus._id}
              className={`bg-white shadow-md rounded-lg overflow-hidden p-6 flex flex-col ${
                layout === "list" ? "md:flex-row" : "items-start"
              } justify-between gap-6 hover:shadow-lg transition-shadow duration-300`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              layout
            >
              <div
                className={` ${
                  layout === "list" ? "w-full md:w-1/3" : "w-full"
                }`}
              >
                <img
                  src={bus.busImage}
                  alt={bus.busName}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <div
                className={` ${
                  layout === "list"
                    ? "w-full md:w-2/3"
                    : "w-full mt-4 text-left"
                }`}
              >
                {layout === "list" ? (
                  <div>
                    <div className="flex justify-around py-5 items-center gap-4">
                      <div>
                        <h3 className="text-2xl font-semibold text-[#22C55E] mb-2">
                          {bus.busName}
                        </h3>
                        <p>
                          <strong>From:</strong> {bus.from}
                        </p>
                        <p>
                          <strong>To:</strong> {bus.to}
                        </p>
                        <p>
                          <strong>Departure Time:</strong> {bus.departureTime}
                        </p>
                        <p>
                          <strong>Arrival Time:</strong> {bus.arrivalTime}
                        </p>
                      </div>
                      <div>
                        <p>
                          <strong>AC:</strong> {bus.ac}
                        </p>
                        <p>
                          <strong>WiFi:</strong> {bus.wifi}
                        </p>
                        <p>
                          <strong>Total Seats:</strong> {bus.totalSeats}
                        </p>
                        <p className="text-xl font-bold text-[#22C55E]">
                          Seat Price: {bus.seatPrice} BDT
                        </p>
                      </div>
                      <Link href={`/AllBus/${bus._id}?date=${departureDate}`}>
                        <button className="px-6 py-2 bg-[#22C55E] text-white rounded-lg hover:bg-[#22C55E] transition-colors">
                          Book a Ticket
                        </button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="py-2 text-center text-2xl font-semibold text-[#22C55E] mb-2">
                      {bus.busName}
                    </h3>
                    <div>
                      <div className="flex justify-around py-5">
                        <div>
                          <p>
                            <strong>From:</strong> {bus.from}
                          </p>
                          <p>
                            <strong>To:</strong> {bus.to}
                          </p>
                          <p>
                            <strong>Total Seats:</strong> {bus.totalSeats}
                          </p>
                        </div>
                        <div>
                          <p>
                            <strong>Departure:</strong> {bus.departureTime}
                          </p>
                          <p>
                            <strong>Arrival:</strong> {bus.arrivalTime}
                          </p>
                        </div>
                        <div>
                          <p>
                            <strong>AC:</strong> {bus.ac}
                          </p>
                          <p>
                            <strong>WiFi:</strong> {bus.wifi}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <p className="text-xl mb-5 font-bold text-[#22C55E]">
                          Seat Price: {bus.seatPrice} BDT
                        </p>
                        <Link href={`/AllBus/${bus._id}?date=${departureDate}`}>
                          <button className="px-6 py-2 bg-[#22C55E] text-white rounded-lg hover:bg-[#22C55E] transition-colors">
                            Book a Ticket
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {busData.length > 6 && (
        <div className="text-center mt-6">
          <button
            className="px-8 py-3 bg-[#22C55E] text-white rounded-full shadow-lg hover:bg-[#22C55E] transition-all duration-300"
            onClick={handleShowMore}
          >
            {visibleCount >= busData.length ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </div>
    
  );
};

export default Page;
