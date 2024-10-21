"use client";

import React from 'react';

const AboutShuttle = () => {
    return (
        <div className="container mx-auto px-5 lg:px-10 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10  items-center">
                {/* Left Side - Text Content */}
                <div>
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-[#25527E]">
                        About Shuttle
                    </h2>
                    <h3 className="text-2xl lg:text-3xl font-semibold mb-4 text-[#22C55E] ">
                        More Than 25 Years We Provide Bus Charter Service For You
                    </h3>
                    <p className="text-gray-700 mb-6">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
                    </p>
                    <ul className="space-y-2">
                        <li className="text-lg text-gray-800">
                            <strong>✔ Brilient Client Service</strong>
                        </li>
                        <li className="text-lg text-gray-800">
                            <strong>✔ 24/7 Support</strong>
                        </li>
                        <li className="text-lg text-gray-800">
                            <strong>✔ Free Consultations</strong>
                        </li>
                        <li className="text-lg text-gray-800">
                            <strong>✔ User Experience</strong>
                        </li>
                        <li className="text-lg text-gray-800">
                            <strong>✔ Big Data & Analytics</strong>
                        </li>
                        <li className="text-lg text-gray-800">
                            <strong>✔ Quick Tips and Advice</strong>
                        </li>
                    </ul>
                    <a href="#" className="mt-6 inline-block text-[#22C55E]  hover:underline">
                        More About Us
                    </a>
                </div>

                {/* Right Side - Image */}
                <div className="flex justify-center">
                    <img
                        src="https://templatekit.jegtheme.com/shuttle/wp-content/uploads/sites/300/elementor/thumbs/the-girls-enter-the-doors-of-a-blue-bus-that-has-arrived-at-the-bus-stop--e1656575414346-pr2ezsmmrawcmkiwtv7o9n2a7ydrrpmhfdv79k8qho.jpg"
                        alt="Bus Charter Service"
                        className="w-[550px] h-[600px] rounded-lg shadow-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default AboutShuttle;
