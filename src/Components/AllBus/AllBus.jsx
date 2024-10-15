'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaThList, FaThLarge } from 'react-icons/fa';

const AllBus = () => {
    const [busData, setBusData] = useState([]);
    const [visibleCount, setVisibleCount] = useState(6);
    const [layout, setLayout] = useState('list');

    useEffect(() => {
        fetch('https://way-go-backend.vercel.app/searchBus')
            .then(response => response.json())
            .then(data => setBusData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleShowMore = () => {
        if (visibleCount === 6) {
            setVisibleCount(busData.length);
        } else {
            setVisibleCount(6);
        }
    };

    const toggleLayout = () => {
        setLayout(layout === 'list' ? 'grid' : 'list');
    };

    return (
        <div className="p-4   min-h-screen my-10">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-orange-600">All Buses</h2>
                <div className="flex space-x-4">
                    <button onClick={toggleLayout}>
                        {layout === 'list' ? (
                            <FaThLarge className="text-2xl text-orange-600 hover:text-orange-700 transition-colors" />
                        ) : (
                            <FaThList className="text-2xl text-orange-600 hover:text-orange-700 transition-colors" />
                        )}
                    </button>
                </div>
            </div>

            <div className={`${layout === 'list' ? 'space-y-6' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center'}`}>
                <AnimatePresence>
                    {busData.slice(0, visibleCount).map(bus => (
                        <motion.div
                            key={bus._id}
                            className={`bg-white shadow-md rounded-lg overflow-hidden p-6 flex flex-col ${layout === 'list' ? 'md:flex-row' : 'items-start'
                                } justify-between gap-6 hover:shadow-lg transition-shadow duration-300`}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            layout
                        >
                            <div className={`${layout === 'list' ? 'w-full md:w-1/3' : 'w-full'}`}>
                                <img
                                    src={bus.busImage}
                                    alt={bus.busName}
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                            </div>
                            <div className={`${layout === 'list' ? 'w-full md:w-2/3' : 'w-full mt-4 text-left'}`}>
                                <h3 className="text-lg font-semibold text-orange-700 mb-2">{bus.busName}</h3>
                                {layout === 'list' ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p><strong>From:</strong> {bus.from}</p>
                                            <p><strong>To:</strong> {bus.to}</p>
                                            <p><strong>Departure Time:</strong> {bus.departureTime}</p>
                                            <p><strong>Arrival Time:</strong> {bus.arrivalTime}</p>
                                        </div>
                                        <div>
                                            <p><strong>AC:</strong> {bus.ac}</p>
                                            <p><strong>WiFi:</strong> {bus.wifi}</p>
                                            <p><strong>Total Seats:</strong> {bus.totalSeats}</p>
                                            <p className="text-xl font-bold text-orange-600">Seat Price: ${bus.seatPrice}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <p><strong>From:</strong> {bus.from}</p>
                                        <p><strong>To:</strong> {bus.to}</p>
                                        <p><strong>Departure:</strong> {bus.departureTime}</p>
                                        <p><strong>Arrival:</strong> {bus.arrivalTime}</p>
                                        <p><strong>AC:</strong> {bus.ac}</p>
                                        <p><strong>WiFi:</strong> {bus.wifi}</p>
                                        <p><strong>Total Seats:</strong> {bus.totalSeats}</p>
                                        <p className="text-xl font-bold text-orange-600">Seat Price: ${bus.seatPrice}</p>
                                    </div>
                                )}
                            </div>
                            <div className="text-left mt-4">
                                <button className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                                    Book a Ticket
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <div className="text-center mt-6">
                <button
                    className="px-8 py-3 bg-orange-600 text-white rounded-full shadow-lg hover:bg-orange-700 transition-all duration-300"
                    onClick={handleShowMore}
                >
                    {visibleCount === 6 ? 'Show More' : 'Show Less'}
                </button>
            </div>
        </div>
    );
};

export default AllBus;
