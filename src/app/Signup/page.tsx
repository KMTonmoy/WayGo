'use client'
import React, { useState } from 'react';

const page: React.FC = () => {
    const [profilePic, setProfilePic] = useState(null);

    const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfilePic(file);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10 px-5">
            <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
                <h2 className="text-3xl font-semibold text-center text-[#25527E] mb-8">Create Your Account</h2>

                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f0652b]"
                            placeholder="Your Full Name"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f0652b]"
                            placeholder="Your Email"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="phone">Phone Number</label>
                        <input
                            type="text"
                            id="phone"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f0652b]"
                            placeholder="Your Phone Number"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f0652b]"
                            placeholder="Your Password"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2" htmlFor="confirm-password">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm-password"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f0652b]"
                            placeholder="Confirm Password"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="profile-pic">Profile Picture</label>
                        <input
                            type="file"
                            id="profile-pic"
                            accept="image/*"
                            onChange={handleProfilePicChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f0652b]"
                        />
                    </div>



                    <button className="w-full p-3 bg-[#f0652b] text-white font-semibold rounded-lg hover:bg-[#e55c28] transition-colors duration-300">
                        Sign Up
                    </button>
                </form>

                <p className="mt-5 text-center text-gray-600">
                    Already have an account?{' '}
                    <a href="/login" className="text-[#f0652b] hover:underline">Log In</a>
                </p>
            </div>
        </div>
    );
};

export default page;
