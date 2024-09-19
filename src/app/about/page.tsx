"use client";
import React from "react";
import { motion } from "framer-motion";

const AboutPage = () => {
  const developers = [
    {
      name: "Mahabub",
      image:
        "https://scontent.fdac24-5.fna.fbcdn.net/v/t1.6435-9/75521941_2493651144085862_8736480005715918848_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=53a332&_nc_eui2=AeF49_4ZRq3_itASlR3ELIheIct5NttDQZshy3k220NBm29N2b0xMAD_bck8c64MA2quDKuTk1k6NHg59vy7tNMO&_nc_ohc=P16MwamdgxEQ7kNvgGPNc78&_nc_ht=scontent.fdac24-5.fna&oh=00_AYAnRvCcPJq5DZk6NQftN1Jg1dGBQ095eIvIt8oRlqWA_A&oe=6712BF55",
      github: "#",
      linkedin: "#",
      facebook: "#",
    },
    {
      name: "Tonmoy",
      image:
        "https://scontent.fdac24-2.fna.fbcdn.net/v/t39.30808-6/437748294_392400403710156_4285802983513536949_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeENSq_9DY60UtJ6UragaEOV2AFuFOitDkbYAW4U6K0ORvAbURclhRwpKpsozcwZ_9U-80M_EPYey5j3E443hQbt&_nc_ohc=pdTuVU7VQI0Q7kNvgFi_LdD&_nc_ht=scontent.fdac24-2.fna&_nc_gid=AmG8OIGRKvbReTgrWWz7EqE&oh=00_AYCWgdYGny7Eeg0dsVAjj0HSuDC8C63WLTZa1yqv03qeYg&oe=66F119CB",
      github: "#",
      linkedin: "#",
      facebook: "#",
    },
    {
      name: "Sobuj",
      image:
        "https://scontent.fdac24-4.fna.fbcdn.net/v/t39.30808-6/456106349_1035880118095107_943714043369380548_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGbHT_MIy4xNh5wJS4SbUZSLBq0cu5F5jAsGrRy7kXmMELljBpxT9gD9rK1sXCY-bBp9_BT0ARimWqsiiKEONB8&_nc_ohc=UguC5wW44D8Q7kNvgF9f5ri&_nc_ht=scontent.fdac24-4.fna&oh=00_AYBLaHjA7hRpGnnHuQnTuFyfMlEeZ_-gfabwglfxLEj4NA&oe=66F0F29F",
      github: "#",
      linkedin: "#",
      facebook: "#",
    },
    {
      name: "Golam",
      image: "/path/to/golam.jpg",
      github: "#",
      linkedin: "#",
      facebook: "#",
    },
    {
      name: "Maruf",
      image: "/path/to/maruf.jpg",
      github: "#",
      linkedin: "#",
      facebook: "#",
    },
    {
      name: "Rakib",
      image: "/path/to/maruf.jpg",
      github: "#",
      linkedin: "#",
      facebook: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      {/* About Section */}
      <div className="container mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold text-[#25527E] mb-6">About Us</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          We are a team of skilled MERN full-stack developers with extensive
          experience in building scalable web applications. Our passion is to
          create efficient solutions and deliver exceptional service to our
          clients.
        </p>
      </div>

      {/* About This Website Section */}
      <div className="container mx-auto text-center bg-white py-12 px-6 shadow-lg rounded-lg mb-16">
        <motion.h2
          className="text-3xl font-semibold text-[#25527E] mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About This Website
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Welcome to WayGO, a state-of-the-art ticket management platform
          designed to streamline your ticketing processes. Our website provides
          users with an intuitive interface to manage, track, and resolve
          tickets with ease. Powered by the latest technologies like{" "}
          <strong>Next.js</strong>, <strong>TypeScript</strong>, and{" "}
          <strong>Tailwind CSS</strong>, WayGO ensures a seamless experience for
          users and administrators alike.
        </motion.p>
        <motion.p
          className="text-lg text-gray-600 max-w-3xl mx-auto mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Whether you are handling customer support tickets, IT service
          requests, or general inquiries, WayGO simplifies the ticketing
          workflow, making sure your tasks are well-organized and completed
          efficiently. Explore the features of this powerful tool and elevate
          your ticket management experience!
        </motion.p>
      </div>

      {/* Developer Team Section */}
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold text-center text-[#25527E] mb-8">
          Our Expert Developer Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {developers.map((dev, index) => (
            <motion.div
              key={index}
              className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              {/* Developer Image */}
              <img
                src={dev.image}
                alt={dev.name}
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
              {/* Hover Overlay */}
              <motion.div
                className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-white text-xl font-bold mb-2">
                  {dev.name}
                </h3>
                <div className="flex space-x-4">
                  <a
                    href={dev.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <motion.img
                      src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                      alt="GitHub"
                      className="w-8 h-8"
                      whileHover={{ scale: 1.2 }}
                    />
                  </a>
                  <a
                    href={dev.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <motion.img
                      src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                      alt="LinkedIn"
                      className="w-8 h-8"
                      whileHover={{ scale: 1.2 }}
                    />
                  </a>
                  <a
                    href={dev.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <motion.img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkbPf6A7tl21KJxFRS7Ou3ss9GgyDsbeuAUw&s"
                      alt="Facebook"
                      className="w-8 h-8"
                      whileHover={{ scale: 1.2 }}
                    />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
