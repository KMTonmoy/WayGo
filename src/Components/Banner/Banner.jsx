'use client';
import React, { useEffect, useState } from 'react';

const Banner = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [activeTransport, setActiveTransport] = useState('Flights');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchBannerData = async () => {
            try {
                const response = await fetch('https://way-go-server.vercel.app/banners');
                if (!response.ok) {
                    throw new Error('Failed to fetch banner data');
                }
                const data = await response.json();
                setImages(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBannerData();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="relative z-0">

            <div
                className="h-[800px] lg:h-[800px] bg-cover bg-center transition-all duration-700 ease-in-out object-cover"
                style={{ backgroundImage: `url(${images[currentImageIndex].url})` }}
            ></div>

            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                <div className="container mx-auto grid lg:grid-cols-2 gap-5 items-center px-5 lg:px-10">

                    <div className="text-white text-center lg:text-left">
                        <h1 className="text-3xl lg:text-5xl font-bold mb-4">
                            {images[currentImageIndex].heading}
                        </h1>
                        <p className="mb-6 text-sm lg:text-base">
                            {images[currentImageIndex].description}
                        </p>
                    </div>

                    <div className="bg-white bg-opacity-50 backdrop-blur-lg rounded-lg p-5 shadow-lg w-full lg:w-1/2 max-w-lg mx-auto">
                        <div className="flex space-x-2 mb-4 justify-center lg:justify-start">
                            <button
                                onClick={() => setActiveTransport('Flights')}
                                className={`px-4 py-2 rounded ${activeTransport === 'Flights' ? 'bg-orange-500 text-white' : 'bg-white text-gray-700 border'} hover:bg-[var(--clr-focussed)] duration-700`}
                            >
                                Flights
                            </button>
                            <button
                                onClick={() => setActiveTransport('Trains')}
                                className={`px-4 py-2 rounded ${activeTransport === 'Trains' ? 'bg-orange-500 text-white' : 'bg-white text-gray-700 border'} hover:bg-orange-600`}
                            >
                                Trains
                            </button>
                            <button
                                onClick={() => setActiveTransport('Buses')}
                                className={`px-4 py-2 rounded ${activeTransport === 'Buses' ? 'bg-orange-500 text-white' : 'bg-white text-gray-700 border'} hover:bg-orange-600`}
                            >
                                Buses
                            </button>
                        </div>

                        <form className="space-y-4">

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

                            <div>
                                <label className="block text-gray-700 font-medium">Departure Date</label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium">Seat Type</label>
                                <select className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500">
                                    <option>Business</option>
                                    <option>Economy</option>
                                </select>
                            </div>

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
