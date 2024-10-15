'use client';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { imageUpload } from '../../../api/utils/index';

const locations = ['Pabna', 'Dhaka', 'Borisal', 'Bogura', 'Coxbazar', 'Rangamati', 'Khagrasori'];

const AddBus = () => {
    const [busName, setBusName] = useState('');
    const [seatPrice, setSeatPrice] = useState('');
    const [totalSeats, setTotalSeats] = useState('40');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [departureTime, setDepartureTime] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [ac, setAc] = useState('Yes');
    const [wifi, setWifi] = useState('Yes');
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
                title: 'No Image Selected',
                text: 'Please select an image before submitting.',
                icon: 'warning',
                confirmButtonText: 'OK',
            });
            return;
        }

        try {
            const imageUrl = await imageUpload(file);
            const formData = {
                busName,
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

            const response = await fetch('https://way-go-backend.vercel.app/addbus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                Swal.fire({
                    title: 'Bus Added',
                    text: 'Your bus details have been successfully added.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
                // Reset form fields
                setBusName('');
                setSeatPrice('');
                setTotalSeats('40');
                setFrom('');
                setTo('');
                setDepartureTime('');
                setArrivalTime('');
                setAc('Yes');
                setWifi('Yes');
                setBusImage(null);
                setImagePreview(null);
                setFile(null);
            } else {
                Swal.fire({
                    title: 'Submission Failed',
                    text: 'Failed to submit the bus details. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Upload Failed',
                text: 'Failed to upload the image. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK',
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
                        <input
                            type="text"
                            value={busName}
                            onChange={(e) => setBusName(e.target.value)}
                            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Bus Name"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Seat Price</label>
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
                        <label className="block text-gray-700 font-medium">Total Seats</label>
                        <select
                            value={totalSeats}
                            onChange={(e) => setTotalSeats(e.target.value)}
                            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="30">30</option>
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
                                setTo(''); // Reset 'To' when 'From' changes
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
                                .filter((location) => location !== from) // Exclude selected 'from' location
                                .map((location) => (
                                    <option key={location} value={location}>
                                        {location}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Departure Time (HH:MM AM/PM)</label>
                        <input
                            type="time"
                            value={departureTime}
                            onChange={(e) => setDepartureTime(e.target.value)}
                            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Arrival Time (HH:MM AM/PM)</label>
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
                            onChange={handleImageChange}
                            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        {imagePreview && (
                            <img src={imagePreview} alt="Bus Preview" className="mt-4 w-full h-40 object-cover" />
                        )}
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 w-full"
                        >
                            Add Bus
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBus;
