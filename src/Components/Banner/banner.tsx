'use client'
import React, { useEffect, useState } from 'react';

const images = [
    {
        url: 'https://www.emtracsystems.com/wp-content/uploads/2021/06/Banner-Red-Passenger-Train-at-Station-580.png',
        heading: 'Explore the World by Train',
        description: 'Experience comfortable and scenic journeys by train across the country.'
    },
    {
        url: 'https://media.istockphoto.com/id/155439315/photo/passenger-airplane-flying-above-clouds-during-sunset.jpg?b=1&s=612x612&w=0&k=20&c=E68ksW1MTzGZGHOxSYHu-y9I2Nv0iqbJCkER9e3K7TM=',
        heading: 'Fly to Your Dream Destination',
        description: 'Book flights with us and discover the world from above.'
    },
    {
        url: 'https://img.freepik.com/free-photo/group-buses-driving-along-road-sunset_157027-4307.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1726012800&semt=ais_hybrid',
        heading: 'Travel by Bus with Ease',
        description: 'Enjoy comfortable bus rides to your desired destinations at affordable prices.'
    }
];

const Banner: React.FC = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [activeTransport, setActiveTransport] = useState('Flights'); //  

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative z-0"> {/* Set z-index low */}
            {/* Background Carousel */}
            <div
                className="h-[800px] lg:h-[600px] bg-cover bg-center transition-all duration-700 ease-in-out"
                style={{ backgroundImage: `url(${images[currentImageIndex].url})` }}
            ></div>

            {/* Overlay content */}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                <div className="container mx-auto grid lg:grid-cols-2 gap-5 items-center px-5 lg:px-10">
                    {/* Left Side - Heading and Description */}
                    <div className="text-white text-center lg:text-left">
                        <h1 className="text-3xl lg:text-5xl font-bold mb-4">
                            {images[currentImageIndex].heading}
                        </h1>
                        <p className="mb-6 text-sm lg:text-base">
                            {images[currentImageIndex].description}
                        </p>
                    </div>

                    {/* Right Side - Search Form */}
                    <div className="bg-white bg-opacity-50 backdrop-blur-lg rounded-lg p-5 shadow-lg w-full lg:w-1/2 max-w-lg mx-auto">
                        <div className="flex space-x-2 mb-4 justify-center lg:justify-start">
                            <button
                                onClick={() => setActiveTransport('Flights')}
                                className={`px-4 py-2 rounded ${activeTransport === 'Flights'
                                    ? 'bg-orange-500 text-white'
                                    : 'bg-white text-gray-700 border'
                                    } hover:bg-orange-600`}
                            >
                                Flights
                            </button>
                            <button
                                onClick={() => setActiveTransport('Trains')}
                                className={`px-4 py-2 rounded ${activeTransport === 'Trains'
                                    ? 'bg-orange-500 text-white'
                                    : 'bg-white text-gray-700 border'
                                    } hover:bg-orange-600`}
                            >
                                Trains
                            </button>
                            <button
                                onClick={() => setActiveTransport('Buses')}
                                className={`px-4 py-2 rounded ${activeTransport === 'Buses'
                                    ? 'bg-orange-500 text-white'
                                    : 'bg-white text-gray-700 border'
                                    } hover:bg-orange-600`}
                            >
                                Buses
                            </button>
                        </div>

                        <form className="space-y-4">
                            {/* From Input */}
                            <div>
                                <label className="block text-gray-700 font-medium">From</label>
                                <select className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500">
                                    <option>Select Location</option>
                                    <option>Bali</option>
                                    <option>Jakarta</option>
                                    <option>Bandung</option>
                                    <option>Surabaya</option>
                                    <option>Yogyakarta</option>
                                </select>
                            </div>

                            {/* To Input */}
                            <div>
                                <label className="block text-gray-700 font-medium">To</label>
                                <select className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500">
                                    <option>Select Destination</option>
                                    <option>Bali</option>
                                    <option>Jakarta</option>
                                    <option>Bandung</option>
                                    <option>Surabaya</option>
                                    <option>Yogyakarta</option>
                                </select>
                            </div>

                            {/* Departure Date */}
                            <div>
                                <label className="block text-gray-700 font-medium">Departure Date</label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Seat Type */}
                            <div>
                                <label className="block text-gray-700 font-medium">Seat Type</label>
                                <select className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500">
                                    <option>Business</option>
                                    <option>Economy</option>
                                </select>
                            </div>

                            {/* Search Button */}
                            <div className="flex justify-center">
                                <button className="px-6 py-3 bg-orange-500 text-white rounded hover:bg-orange-600 w-full">
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;