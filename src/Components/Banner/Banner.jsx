'use client';
import React, { useEffect, useState } from 'react';

const Banner = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTransport, setActiveTransport] = useState('Flights');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [tripType, setTripType] = useState('one-way');

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
      setCurrentImageIndex(prevIndex =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (images.length === 0) {
    return (
      <div className="text-center text-3xl text-gray-700 py-20">
        No banner available
      </div>
    );
  }

  return (
    <div className="relative mt-10 z-0">
      <div
        className="h-[600px] lg:h-[600px] bg-cover bg-center transition-all duration-700 ease-in-out object-cover bg-clip-content rounded-lg overflow-hidden"
        style={{ backgroundImage: `url(${images[currentImageIndex]?.url})` }}
      ></div>

      <div className="h-[600px] absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-lg">
        <div className="container mx-auto grid lg:grid-cols-2 gap-5 items-center px-5 lg:px-10">
          <div className="text-white text-center lg:text-left">
            <h1 className="text-3xl lg:text-5xl font-bold mb-4">
              {images[currentImageIndex]?.heading}
            </h1>
            <p className="mb-6 text-sm lg:text-base">
              {images[currentImageIndex]?.description}
            </p>
          </div>

          <div className="bg-white bg-opacity-50 backdrop-blur-lg rounded-lg p-5 shadow-lg w-full lg:w-1/2 max-w-lg mx-auto">
            <div className="flex mb-4 gap-5 justify-center">
              <button
                onClick={() => setActiveTransport('Flights')}
                className={`px-4 py-2 rounded-full ${activeTransport === 'Flights'
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-700 border'
                  } hover:bg-[var(--clr-focussed)] duration-700 transition-shadow shadow-md hover:shadow-lg`}
              >
                Flights
              </button>
              <button
                onClick={() => setActiveTransport('Trains')}
                className={`px-4 py-2 rounded-full ${activeTransport === 'Trains'
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-700 border'
                  } hover:bg-orange-600 transition-shadow shadow-md hover:shadow-lg`}
              >
                Trains
              </button>
              <button
                onClick={() => setActiveTransport('Buses')}
                className={`px-4 py-2 rounded-full ${activeTransport === 'Buses'
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-700 border'
                  } hover:bg-orange-600 transition-shadow shadow-md hover:shadow-lg`}
              >
                Buses
              </button>
            </div>

            {/* Conditional Radio Buttons for Bus */}
            {activeTransport === 'Buses' && (
              <div className="mb-4">
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name="tripType"
                      value="one-way"
                      checked={tripType === 'one-way'}
                      onChange={() => setTripType('one-way')}
                    />
                    <span className="ml-2">One Way</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name="tripType"
                      value="round-way"
                      checked={tripType === 'round-way'}
                      onChange={() => setTripType('round-way')}
                    />
                    <span className="ml-2">Round Way</span>
                  </label>
                </div>
              </div>
            )}

            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium">From</label>
                <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
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
                <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>Select Destination</option>
                  <option>Bali</option>
                  <option>Jakarta</option>
                  <option>Bandung</option>
                  <option>Surabaya</option>
                  <option>Yogyakarta</option>
                </select>
              </div>

              {/* Conditional Date Inputs */}
              <div>
                <label className="block text-gray-700 font-medium">Departure Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {tripType === 'round-way' && (
                <div>
                  <label className="block text-gray-700 font-medium">
                    Return Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-gray-700 font-medium">Seat Type</label>
                <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>Business</option>
                  <option>Economy</option>
                </select>
              </div>

              <div className="flex justify-center">
                <button className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 w-full transition-shadow shadow-md hover:shadow-lg">
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
