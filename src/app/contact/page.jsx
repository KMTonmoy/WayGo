"use client";

import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const page = () => {
  return (
    <div className="container mx-auto py-12 px-5 lg:px-20  ">
      <h1 className="text-3xl font-bold text-center mb-10 text-green-700">
        Contact Us
      </h1>

      <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
        {/* Contact Form */}
        <div className="w-full lg:w-1/2 bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-green-600">
            Get in Touch
          </h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                placeholder="Your Name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                placeholder="Your Email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Message</label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
                placeholder="Your Message"
                rows={5}
              ></textarea>
            </div>
            <button className="w-full p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300">
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info & Description */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl font-semibold mb-6 text-green-600">
            Our Contact Information
          </h2>
          <p className="mb-6 text-gray-700">
            We are here to assist you! Feel free to reach out to us using the
            form, or through our contact details below.
          </p>

          {/* Info Boxes */}
          <div className="space-y-5">
            <div className="flex items-center space-x-4 bg-green-600 text-white p-4 rounded-lg shadow-md">
              <FaPhoneAlt className="text-2xl" />
              <div>
                <p className="font-semibold">Phone</p>
                <p>(+62) 81587 6218</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 bg-green-700 text-white p-4 rounded-lg shadow-md">
              <FaEnvelope className="text-2xl" />
              <div>
                <p className="font-semibold">Email</p>
                <p>contact@waygo.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 bg-green-800 text-white p-4 rounded-lg shadow-md">
              <FaMapMarkerAlt className="text-2xl" />
              <div>
                <p className="font-semibold">Location</p>
                <p>123 WayGO St, Jakarta, Indonesia</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-6 text-green-600">
          Our Location
        </h2>
        <div className="w-full h-[400px] lg:h-[500px] overflow-hidden rounded-lg shadow-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423286.8827803802!2d-118.74138195907396!3d34.02003924141445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA%2C%20USA!5e0!3m2!1sen!2sbd!4v1726633605732!5m2!1sen!2sbd"
            width="100%"
            height="100%"
            allowFullScreen={false}
            loading="lazy"
            className="border-0"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default page;
