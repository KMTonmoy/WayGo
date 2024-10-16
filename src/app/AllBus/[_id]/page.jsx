'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import photo1 from '../../../asset/seat-gray.png';
import photo2 from '../../../asset/seat-gray.png';

const Page = ({ params }) => {
    const [Bus, setBus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);

    useEffect(() => {
        const fetchBus = async () => {
            try {
                const response = await fetch(`https://way-go-backend.vercel.app/allbus/${params._id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch Bus');
                }
                const data = await response.json();
                setBus(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBus();
    }, [params._id]);

    const formatTime = (time) => {
        const [hours, minutes] = time.split(':');
        const hoursIn12 = hours % 12 || 12;
        const amPm = hours >= 12 ? 'PM' : 'AM';
        return `${hoursIn12}:${minutes} ${amPm}`;
    };

    const handleSeatSelection = (seat) => {
        if (selectedSeats.includes(seat)) {
            // Deselect seat
            setSelectedSeats(selectedSeats.filter(s => s !== seat));
        } else {
            // Select seat if less than 4 are selected
            if (selectedSeats.length < 4) {
                setSelectedSeats([...selectedSeats, seat]);
            }
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="loader">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-10 text-red-500">
                {error}
                <button onClick={() => setLoading(true)} className="mt-4 px-4 py-2 bg-orange-500 text-white rounded">
                    Retry
                </button>
            </div>
        );
    }

    if (!Bus) {
        return <div className="text-center py-10">Bus not found.</div>;
    }

    return (
        <div className="mt-20 py-10 px-5 bg-white rounded-lg shadow-lg">
            <div>
                <motion.h1
                    className="text-4xl font-bold text-orange-600 text-center mb-5"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {Bus.busName}
                </motion.h1>
                <motion.img
                    src={Bus.busImage}
                    alt={Bus.busName}
                    className="w-full h-[550px] rounded-md object-cover mt-5 shadow-md"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                />
                <div className="mt-5 text-gray-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-orange-100 p-4 rounded-md shadow-md">
                            <p className="text-lg font-medium">From:</p>
                            <p className="font-normal">{Bus.from}</p>
                        </div>
                        <div className="bg-orange-100 p-4 rounded-md shadow-md">
                            <p className="text-lg font-medium">To:</p>
                            <p className="font-normal">{Bus.to}</p>
                        </div>
                        <div className="bg-orange-100 p-4 rounded-md shadow-md">
                            <p className="text-lg font-medium">Departure Time:</p>
                            <p className="font-normal">{formatTime(Bus.departureTime)}</p>
                        </div>
                        <div className="bg-orange-100 p-4 rounded-md shadow-md">
                            <p className="text-lg font-medium">Arrival Time:</p>
                            <p className="font-normal">{formatTime(Bus.arrivalTime)}</p>
                        </div>
                        <div className="bg-orange-100 p-4 rounded-md shadow-md">
                            <p className="text-lg font-medium">Total Seats:</p>
                            <p className="font-normal">{Bus.totalSeats}</p>
                        </div>
                        <div className="bg-orange-100 p-4 rounded-md shadow-md">
                            <p className="text-lg font-medium">Seat Price:</p>
                            <p className="font-normal">{Bus.seatPrice} BDT</p>
                        </div>
                        <div className="bg-orange-100 p-4 rounded-md shadow-md col-span-1 md:col-span-2">
                            <p className="text-lg font-medium">Amenities:</p>
                            <p className={`font-normal ${Bus.ac === "Yes" ? 'text-red-600' : 'text-gray-700'}`}>AC: {Bus.ac}</p>
                            <p className={`font-normal ${Bus.wifi === "Yes" ? 'text-red-600' : 'text-gray-700'}`}>WiFi: {Bus.wifi}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <div className="mt-5">
                        <div className="flex flex-col md:flex-row justify-between gap-11">
                            <div className="w-full md:w-1/2 p-5 bg-white">
                                <h1 className="font-raleway text-2xl font-semibold">Select Your Seat</h1>
                                {Bus.totalSeats === 36 && (
                                    <div className="bg-red-100 p-2 mb-4 text-center">
                                        <p className="text-lg font-medium text-red-600">Special Offer: This bus has only 36 seats!</p>
                                    </div>
                                )}
                                <div className="flex justify-between mb-[50px] pb-2 border-dashed border-y-2 ">
                                    <p className="flex gap-2 text-[#030712] font-inter text-lg mt-5"><img src={photo1} alt="Available" /> Available</p>
                                    <p className="flex gap-2 text-[#030712] font-inter text-lg mt-5"><img src={photo2} alt="Selected" /> Selected</p>
                                </div>
                                <div>
                                    <div className="flex justify-center md:justify-end mb-3">
                                        <button
                                            className={`btn text-lg font-medium font-inter w-full md:w-[110px] h-[56px] text-[#030712] flex justify-center items-center text-center absolute bg-orange-400 shadow-md rounded-md transition duration-200`}
                                        >
                                            <img src="https://i.ibb.co.com/NpsXwN5/wheel.png" alt="Select" />
                                        </button>
                                        <button aria-label="Select Seat" className="btn text-lg font-medium font-inter w-full md:w-[110px] h-[56px] text-[#030712]"></button>
                                    </div>
                                    {/* Seat Selection Rows */}
                                    {Bus.totalSeats === 36 ? (
                                        <>
                                            {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'].map((row) => (
                                                <div key={row} className="flex gap-5 flex-row md:justify-between items-center mb-3">
                                                    <p>{row}</p>
                                                    {[1, 2, 3, 4].map(seatNumber => {
                                                        const seat = `${row}${seatNumber}`;
                                                        const isSelected = selectedSeats.includes(seat);
                                                        return (
                                                            <button
                                                                key={seat}
                                                                aria-label={`Seat ${seat}`}
                                                                onClick={() => handleSeatSelection(seat)}
                                                                className={`btn text-lg font-medium font-inter w-full md:w-[110px] h-[56px] text-[#030712] ${isSelected ? 'bg-orange-400 shadow-md' : 'bg-gray-300 shadow'} rounded-md transition duration-200`}
                                                            >
                                                                {seat}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            ))}
                                        </>
                                    ) : (
                                        <>
                                            {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].map((row) => (
                                                <div key={row} className="flex gap-5 flex-row md:justify-between items-center mb-3">
                                                    <p>{row}</p>
                                                    {[1, 2, 3, 4].map(seatNumber => {
                                                        const seat = `${row}${seatNumber}`;
                                                        const isSelected = selectedSeats.includes(seat);
                                                        return (
                                                            <button
                                                                key={seat}
                                                                aria-label={`Seat ${seat}`}
                                                                onClick={() => handleSeatSelection(seat)}
                                                                className={`btn text-lg font-medium font-inter w-full md:w-[110px] h-[56px] text-[#030712] ${isSelected ? 'bg-orange-400 shadow-md' : 'bg-gray-300 shadow'} rounded-md transition duration-200`}
                                                            >
                                                                {seat}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
