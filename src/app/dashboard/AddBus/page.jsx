"use client";
import React, { useState } from "react";
import Swal from "sweetalert2";
import Select from "react-select"; // Import react-select
import { imageUpload } from "../../../api/utils/index";

const locations = [
  "Pabna",
  "Dhaka",
  "Borisal",
  "Bogura",
  "Coxbazar",
  "Rangamati",
  "Khagrasori",
];

// Sample bus names for the searchable dropdown
const busNames = [
  { value: "Shamoli", label: "Shamoli" },
  { value: "Hanif", label: "Hanif" },
  { value: "SB", label: "SB" },
  { value: "SabaLine", label: "SabaLine" },
  { value: "Super Sony", label: "Super Sony" },
  { value: "JR Poribohon", label: "JR Poribohon" },
  { value: "Fatema", label: "Fatema" },
  { value: "JS Poribohon", label: "JS Poribohon" },
  { value: "Sorkar Travels", label: "Sorkar Travels" },
  { value: "Ishwardi Travels", label: "Ishwardi Travels" },
  { value: "Pabna Express", label: "Pabna Express" },
  { value: "See Line", label: "See Line" },
  { value: "Ena Poribohon", label: "Ena Poribohon" },
  { value: "Bangla Star", label: "Bangla Star" },
  { value: "RP Nige", label: "RP Nige" },
  { value: "Five Star", label: "Five Star" },
  { value: "Egal Poribohon", label: "Egal Poribohon" },
  { value: "Bosundhara", label: "Bosundhara" },
  { value: "Challenger", label: "Challenger" },
  { value: "Green Line", label: "Green Line" },
  { value: "Desh Travels", label: "Desh Travels" },
  { value: "National Travels", label: "National Travels" },
  { value: "Soudia", label: "Soudia" },
  { value: "Pakhi", label: "Pakhi" },
  { value: "Akota", label: "Akota" },
  { value: "Golden Line", label: "Golden Line" },
  { value: "Sokalsondha", label: "Sokalsondha" },
  { value: "Raja Badsha", label: "Raja Badsha" },
  { value: "Mitali", label: "Mitali" },
  { value: "Modina", label: "Modina" },
];

const page = () => {
  const [busName, setBusName] = useState(null);
  const [seatPrice, setSeatPrice] = useState("");
  const [totalSeats, setTotalSeats] = useState("40");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [ac, setAc] = useState("Yes");
  const [wifi, setWifi] = useState("Yes");
  const [busImage, setBusImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setImagePreview(URL.createObjectURL(selectedFile));
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      Swal.fire({
        title: "No Image Selected",
        text: "Please select an image before submitting.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    if (!busName) {
      Swal.fire({
        title: "No Bus Selected",
        text: "Please select a bus name before submitting.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      const imageUrl = await imageUpload(file);
      const formData = {
        busName: busName.value,
        status: "Available",
        seatPrice,
        totalSeats,
        from,
        to,
        departureTime,
        arrivalTime,
        ac,
        wifi,
        busImage: imageUrl,
      };

      const response = await fetch("https://way-go-backend.vercel.app/addbus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          title: "Bus Added",
          text: "Your bus details have been successfully added.",
          icon: "success",
          confirmButtonText: "OK",
        });

        setBusName(null);
        setSeatPrice("");
        setTotalSeats("40");
        setFrom("");
        setTo("");
        setDepartureTime("");
        setArrivalTime("");
        setAc("Yes");
        setWifi("Yes");
        setBusImage(null);
        setImagePreview(null);
        setFile(null);
      } else {
        Swal.fire({
          title: "Submission Failed",
          text: "Failed to submit the bus details. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Upload Failed",
        text: "Failed to upload the image. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Add New Bus</h1>
      <div className="bg-white rounded-lg shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Bus Name</label>
            <Select
              options={busNames}
              value={busName}
              onChange={setBusName}
              placeholder="Select Bus Name"
              className="w-full"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">
              Seat Price
            </label>
            <input
              type="number"
              value={seatPrice}
              onChange={(e) => setSeatPrice(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Seat Price"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">
              Total Seats
            </label>
            <select
              value={totalSeats}
              onChange={(e) => setTotalSeats(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="36">36</option>
              <option value="40">40</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">From</label>
            <select
              value={from}
              onChange={(e) => {
                setFrom(e.target.value);
                setTo(""); // Reset 'To' when 'From' changes
              }}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Departure Location</option>
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
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Destination</option>
              {locations
                .filter((location) => location !== from)
                .map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">
              Departure Time
            </label>
            <input
              type="time"
              value={departureTime}
              onChange={(e) => setDepartureTime(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">
              Arrival Time
            </label>
            <input
              type="time"
              value={arrivalTime}
              onChange={(e) => setArrivalTime(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">AC</label>
            <select
              value={ac}
              onChange={(e) => setAc(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">WiFi</label>
            <select
              value={wifi}
              onChange={(e) => setWifi(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Bus Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover rounded"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-[#22C55E] text-white font-bold rounded hover:bg-[#0d8d3c] transition duration-300"
          >
            Add Bus
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
