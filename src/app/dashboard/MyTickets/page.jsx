"use client";
import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../../../Provider/AuthProvider";
import { FcPrint } from "react-icons/fc";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(isSameOrAfter);

const Page = () => {
  const [tickets, setTickets] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(
          "https://way-go-backend.vercel.app/payments"
        );
        const data = await response.json();
        setTickets(data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, []);

  const today = dayjs().format("YYYY-MM-DD");

  const userTickets = tickets
    .filter((ticket) => ticket.email === user?.email)
    .filter((ticket) => dayjs(ticket.departureDate).isSameOrAfter(today))
    .reverse();

  const handlePrint = (ticketId) => {
    const printContents = document.getElementById(ticketId).innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {userTickets.length > 0 ? (
        userTickets.map((ticket) => (
          <motion.div
            key={ticket._id}
            className="bg-green-100 shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            id={ticket._id}
          >
            <button
              className="absolute top-2 right-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 z-10 print:hidden"
              onClick={() => handlePrint(ticket._id)}
            >
              <FcPrint />
            </button>
            <div className="border-l-4 border-green-500 pl-4">
              <h2 className="text-2xl font-bold text-green-800">
                Bus Name: {ticket?.Bus?.busName || "N/A"}
              </h2>
              <p className="text-green-600">
                Transaction ID: {ticket.transactionId}
              </p>
              <p className="text-green-600">Email: {ticket.email}</p>
              <p className="text-green-600">Price: ${ticket.price}</p>
              <p className="text-green-600">
                Payment Date: {ticket.paymentMonth}
              </p>
              <p className="text-green-600">
                Departure Date: {ticket.departureDate}
              </p>
              <p className="text-green-600">
                Selected Seats: {ticket.selectedSeats.join(", ")}
              </p>
            </div>
          </motion.div>
        ))
      ) : (
        <p className="text-center text-xl font-semibold text-gray-700">
          No tickets found for {user?.email}.
        </p>
      )}
    </div>
  );
};

export default Page;
