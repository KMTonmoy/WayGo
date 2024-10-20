"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  FaHome,
  FaUserAlt,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaShieldAlt,
  FaBan,
  FaPaintBrush,
  FaBus,
} from "react-icons/fa";
import { RiBusWifiFill } from "react-icons/ri";

import Link from "next/link";
import { AuthContext } from "../../Provider/AuthProvider";
import { IoTicket } from "react-icons/io5";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const { user, logOut } = useContext(AuthContext);
  const email = user?.email || "";
  const toggleSidebar = () => setIsOpen(!isOpen);

  const role = data?.role;

  useEffect(() => {
    if (email) {
      fetch(`https://way-go-backend.vercel.app/users/${email}`)
        .then((res) => res.json())
        .then(setData)
        .catch(console.error);
    }
  }, [email]);

  const commonLinks = [
    { name: "Home", icon: <FaHome />, path: "/dashboard" },
    { name: "Profile", icon: <FaUserAlt />, path: "/dashboard/profile" },
    { name: "Settings", icon: <FaCog />, path: "/dashboard/settings" },
    { name: "MyTickets", icon: <IoTicket />, path: "/dashboard/MyTickets" },
  ];

  const adminLinks = [
    ...commonLinks,
    { name: "Manage User", icon: <FaUserAlt />, path: "/dashboard/ManageUser" },
    {
      name: "Manage Agent",
      icon: <FaShieldAlt />,
      path: "/dashboard/ManageAgent",
    },
    { name: "Blocked Users", icon: <FaBan />, path: "/dashboard/BlockedUsers" },
    {
      name: "Customize Banner",
      icon: <FaPaintBrush />,
      path: "/dashboard/CustomizeBanner",
    },
    { name: "Add Bus", icon: <FaBus />, path: "/dashboard/AddBus" },
    {
      name: "Manage Bus",
      icon: <RiBusWifiFill />,
      path: "/dashboard/ManageBus",
    },
  ];

  const agentLinks = [
    ...commonLinks,
    { name: "Manage User", icon: <FaUserAlt />, path: "/dashboard/ManageUser" },
    {
      name: "Manage Agent",
      icon: <FaShieldAlt />,
      path: "/dashboard/ManageAgent",
    },
    { name: "Blocked Users", icon: <FaBan />, path: "/dashboard/BlockedUsers" },
  ];

  const links =
    role === "admin" ? adminLinks : role === "agent" ? agentLinks : commonLinks;

  return (
    <div className="flex md:z-0 md:w-[300px]  z-50 min-h-screen bg-gray-800 text-white">
      <button
        onClick={toggleSidebar}
        className="lg:hidden p-4 text-2xl focus:outline-none"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
      <div
        className={`fixed lg:static bg-gray-900 w-64 h-full transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-5 flex items-center space-x-4 bg-gray-800">
          <img
            src={user?.photoURL}
            alt="User Avatar"
            className="h-12 w-12 rounded-full"
          />
          <div>
            <h2 className="text-lg font-bold">{user?.displayName}</h2>
            <p className="text-sm text-gray-400">Role: {role}</p>
          </div>
        </div>

        <nav className="mt-8">
          {links.map(({ name, icon, path }) => (
            <Link
              key={name}
              href={path}
              className="flex items-center space-x-4 p-4 hover:bg-gray-700 rounded-lg transition-transform transform hover:scale-105"
            >
              <span className="text-xl">{icon}</span>
              <span>{name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
