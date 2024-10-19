"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const ManageBus = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await fetch(
          "https://way-go-backend.vercel.app/allbus"
        );
        const data = await response.json();
        setBuses(data);
      } catch (error) {
        console.error("Error fetching bus data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBuses();
  }, []);

  const handleDelete = async (busId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff5722",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `https://way-go-backend.vercel.app/allbus/${busId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          setBuses(buses.filter((bus) => bus._id !== busId));
          Swal.fire({
            title: "Deleted!",
            text: "Bus deleted successfully.",
            icon: "success",
            confirmButtonColor: "#ff5722",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Failed to delete bus.",
            icon: "error",
            confirmButtonColor: "#ff5722",
          });
        }
      } catch (error) {
        console.error("Error deleting bus:", error);
      }
    }
  };

  const handleStatusChange = async (busId, newStatus) => {


    console.log(busId, newStatus);


    try {
      const response = await fetch(
        `https://way-go-backend.vercel.app/buses/${busId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (response.ok) {
        // Update local state
        setBuses((prevBuses) =>
          prevBuses.map((bus) =>
            bus._id === busId ? { ...bus, status: newStatus } : bus
          )
        );
        Swal.fire({
          title: "Success!",
          text: `Bus status updated to ${newStatus}.`,
          icon: "success",
          confirmButtonColor: "#ff5722",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to update bus status.",
          icon: "error",
          confirmButtonColor: "#ff5722",
        });
      }
    } catch (error) {
      console.error("Error updating bus status:", error);
    }
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes} ${period}`;
  };

  // Filter buses based on search query
  const filteredBuses = buses.filter((bus) =>
    bus.busName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-orange-600 mb-6">
        Manage Buses
      </h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by bus name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>
      {loading ? (
        <div className="text-center">
          <p className="text-xl">Loading buses...</p>
        </div>
      ) : filteredBuses.length === 0 ? (
        <div className="text-center">
          <p className="text-xl text-red-500">No buses available</p>
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          {filteredBuses.map((bus) => (
            <motion.div
              key={bus._id}
              className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 flex flex-col sm:flex-row relative gap-10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex-shrink-0 w-full sm:w-1/3 mb-4 sm:mb-0">
                {bus.busImage && (
                  <img
                    src={bus.busImage}
                    alt={`${bus.busName} bus`}
                    className="w-full h-[250px] object-cover rounded"
                  />
                )}
              </div>
              <div className="flex-grow">
                <h2 className="text-2xl font-semibold text-orange-600 mb-2">
                  {bus.busName}
                </h2>
                <p className="text-gray-600">
                  From: <span className="text-orange-500">{bus.from}</span>
                </p>
                <p className="text-gray-600">
                  To: <span className="text-orange-500">{bus.to}</span>
                </p>
                <p className="text-gray-600">
                  Seat Price:{" "}
                  <span className="text-orange-500">${bus.seatPrice}</span>
                </p>
                <p className="text-gray-600">
                  Total Seats:{" "}
                  <span className="text-orange-500">{bus.totalSeats}</span>
                </p>
                <p className="text-gray-600">
                  Departure:{" "}
                  <span className="text-orange-500">
                    {formatTime(bus.departureTime)}
                  </span>
                </p>
                <p className="text-gray-600">
                  Arrival:{" "}
                  <span className="text-orange-500">
                    {formatTime(bus.arrivalTime)}
                  </span>
                </p>
                <p className="text-gray-600">
                  AC:{" "}
                  <span className="text-orange-500">
                    {bus.ac ? "Yes" : "No"}
                  </span>
                </p>
                <p className="text-gray-600">
                  WiFi:{" "}
                  <span className="text-orange-500">
                    {bus.wifi ? "Yes" : "No"}
                  </span>
                </p>
                <div className="mt-4">
                  <label htmlFor={`status-${bus._id}`} className="block mb-2">
                    Change Status:
                  </label>
                  <select
                    id={`status-${bus._id}`}
                    value={bus.status || "Available"}
                    onChange={(e) =>
                      handleStatusChange(bus._id, e.target.value)
                    }
                    className="border border-gray-300 rounded p-2"
                  >
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
                  </select>
                </div>
              </div>
              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  onClick={() => handleDelete(bus._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageBus;
