"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  FaHome,
  FaUserCircle,
  FaCogs,
  FaTicketAlt,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaUsers,
  FaBan,
  FaBrush,
  FaBusAlt,
  FaMoneyBill,
} from "react-icons/fa";
import { MdDirectionsBus } from "react-icons/md";
import Link from "next/link";
import { AuthContext } from "../../Provider/AuthProvider";

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
    { name: "Profile", icon: <FaUserCircle />, path: "/dashboard/profile" },
    { name: "Settings", icon: <FaCogs />, path: "/dashboard/settings" },
    { name: "My Tickets", icon: <FaTicketAlt />, path: "/dashboard/MyTickets" },
  ];

  const adminLinks = [
    ...commonLinks,
    { name: "Manage Users", icon: <FaUsers />, path: "/dashboard/ManageUser" },
    { name: "Blocked Users", icon: <FaBan />, path: "/dashboard/BlockedUsers" },
    {
      name: "Customize Banner",
      icon: <FaBrush />,
      path: "/dashboard/CustomizeBanner",
    },
    { name: "Add Bus", icon: <MdDirectionsBus />, path: "/dashboard/AddBus" },
    { name: "Add Coupon", icon: <FaMoneyBill />, path: "/dashboard/AddCoupon" },
    {
      name: "Manage Coupons",
      icon: <FaMoneyBill />,
      path: "/dashboard/ManageCoupon",
    },
    { name: "Manage Buses", icon: <FaBusAlt />, path: "/dashboard/ManageBus" },
  ];

  const agentLinks = [
    ...commonLinks,
    { name: "Manage Users", icon: <FaUsers />, path: "/dashboard/ManageUser" },
    { name: "Blocked Users", icon: <FaBan />, path: "/dashboard/BlockedUsers" },
  ];

  const links =
    role === "admin" ? adminLinks : role === "agent" ? agentLinks : commonLinks;

  return (
    <div className="flex md:z-0 md:w-[300px] z-50 min-h-screen bg-gray-800 text-white">
      <button
        onClick={toggleSidebar}
        className="lg:hidden p-4 text-2xl focus:outline-none"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
      <div
        className={`fixed lg:static bg-gray-900 w-64 h-full transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 overflow-y-auto overflow-x-hidden`}
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
        <div className="p-5">
          <button
            onClick={logOut}
            className="flex items-center space-x-4 p-4 bg-red-600 rounded-lg hover:bg-red-700 transition-all"
          >
            <FaSignOutAlt className="text-xl" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
