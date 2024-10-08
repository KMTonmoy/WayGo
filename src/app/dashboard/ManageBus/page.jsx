'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ManageBus = () => {
    const [buses, setBuses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBuses = async () => {
            try {
                const response = await fetch('https://way-go-server.vercel.app/allbus');
                const data = await response.json();
                setBuses(data);
            } catch (error) {
                console.error('Error fetching bus data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBuses();
    }, []);

    const handleEdit = (busId) => {
        console.log('Edit bus with ID:', busId);
    };

    const handleDelete = async (busId) => {
        if (window.confirm('Are you sure you want to delete this bus?')) {
            try {
                const response = await fetch(`https://way-go-server.vercel.app/allbus/${busId}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    setBuses(buses.filter(bus => bus._id !== busId));
                    alert('Bus deleted successfully');
                } else {
                    alert('Failed to delete bus');
                }
            } catch (error) {
                console.error('Error deleting bus:', error);
            }
        }
    };

    const formatTime = (time) => {
        const [hours, minutes] = time.split(':');
        const period = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        return `${formattedHours}:${minutes} ${period}`;
    };

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-center mb-6">Manage Buses</h1>
            {loading ? (
                <div className="text-center">
                    <p className="text-xl">Loading buses...</p>
                </div>
            ) : buses.length === 0 ? (
                <div className="text-center">
                    <p className="text-xl text-red-500">No buses available</p>
                </div>
            ) : (
                <div className="flex flex-col gap-10">
                    {buses.map((bus) => (
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
                                        className="w-full h-[250px] object-cover rounded" // Set height to 24 (6rem)
                                    />
                                )}
                            </div>
                            <div className="flex-grow">
                                <h2 className="text-xl font-semibold mb-2">{bus.busName}</h2>
                                <p className="text-gray-600">From: {bus.from}</p>
                                <p className="text-gray-600">To: {bus.to}</p>
                                <p className="text-gray-600">Seat Price: ${bus.seatPrice}</p>
                                <p className="text-gray-600">Total Seats: {bus.totalSeats}</p>
                                <p className="text-gray-600">Departure: {formatTime(bus.departureTime)}</p>
                                <p className="text-gray-600">Arrival: {formatTime(bus.arrivalTime)}</p>
                                <p className="text-gray-600">AC: {bus.ac}</p>
                                <p className="text-gray-600">WiFi: {bus.wifi}</p>
                            </div>
                            <div className="absolute top-4 right-4 flex space-x-2">
                                <button
                                    onClick={() => handleEdit(bus._id)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Edit
                                </button>
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
