"use client";
import React, { useEffect, useState } from "react";
import AllBus from "../../app/AllBus/page";

const locations = [
  "Pabna",
  "Dhaka",
  "Borisal",
  "Bogura",
  "Coxbazar",
  "Rangamati",
  "Khagrasori",
];

const Banner = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [tripType, setTripType] = useState("one-way");
  const [searchResults, setSearchResults] = useState([]);
  const [allBuses, setAllBuses] = useState([]);
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [seatType, setSeatType] = useState("Economy");

  useEffect(() => {
    fetch("https://way-go-backend.vercel.app/banners")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch banner data");
        }
        return response.json();
      })
      .then((data) => {
        setImages(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetch(
      `https://way-go-backend.vercel.app/searchBus?form=${fromLocation}&to=${toLocation}`
    )
      .then((response) => response.json())
      .then((json) => {
        setSearchResults(json);
        if (json.length === 0) {
          setSearchResults([]);
        } else {
          window.scrollTo({ top: 50, behavior: "smooth" });
        }
      });
  };

  const fetchAllBuses = () => {
    fetch("https://way-go-backend.vercel.app/searchBus")
      .then((response) => response.json())
      .then((json) => setAllBuses(json));
  };

  useEffect(() => {
    fetchAllBuses();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (images.length === 0) {
    return (
      <div className="text-center text-3xl text-gray-700 py-20">
        No banner available
      </div>
    );
  }

  const availableToLocations = locations.filter(
    (location) => location !== fromLocation
  );

  return (
    <div className="relative mt-10 z-0">
      <div>
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
              <form className="space-y-4" onSubmit={handleSearch}>
                <div>
                  <label className="block text-gray-700 font-medium">
                    From
                  </label>
                  <select
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={fromLocation}
                    onChange={(e) => setFromLocation(e.target.value)}
                  >
                    <option>Select Location</option>
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium">To</label>
                  <select
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={toLocation}
                    onChange={(e) => setToLocation(e.target.value)}
                    disabled={!fromLocation}
                  >
                    <option>Select Destination</option>
                    {availableToLocations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium">
                    Departure Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={departureDate}
                    onChange={(e) => {
                      setDepartureDate(e.target.value);
                      console.log(e.target.value);
                    }}
                  />
                </div>

                {tripType === "round-way" && (
                  <div>
                    <label className="block text-gray-700 font-medium">
                      Return Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                    />
                  </div>
                )}

                <div>
                  <label className="block text-gray-700 font-medium">
                    Seat Type
                  </label>
                  <select
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={seatType}
                    onChange={(e) => setSeatType(e.target.value)}
                  >
                    <option value="Economy">Economy</option>
                    <option value="Business">Business</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-orange-500 text-white font-bold rounded-lg"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div>
        <AllBus
          departureDate={departureDate}
          searchResults={searchResults.length > 0 ? searchResults : allBuses}
        />
      </div>
    </div>
  );
};

export default Banner;
