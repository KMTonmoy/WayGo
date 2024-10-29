"use client";
import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../../../Provider/AuthProvider";
import { FcPrint } from "react-icons/fc";
import { jsPDF } from "jspdf"; // Import jsPDF for PDF generation
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

  const handleDownload = (ticket) => {
    const doc = new jsPDF();
    
    // Set a custom background color/image for PDF
    doc.setFillColor(240, 240, 240); // Light gray background
    doc.rect(0, 0, 210, 297, 'F'); // A4 size

    // Add ticket details to PDF
    doc.setFontSize(20);
    doc.setTextColor(34, 139, 34); // Dark green
    doc.text(`Bus Name: ${ticket?.Bus?.busName || "N/A"}`, 10, 20);
    
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0); // Black
    doc.text(`Transaction ID: ${ticket.transactionId}`, 10, 30);
    doc.text(`Email: ${ticket.email}`, 10, 40);
    doc.text(`Price: ${ticket.price} BDT`, 10, 50);
    doc.text(`From: ${ticket?.Bus?.from || "N/A"}`, 10, 60);
    doc.text(`To: ${ticket?.Bus?.to || "N/A"}`, 10, 70);
    doc.text(`Payment Date: ${ticket.paymentMonth}`, 10, 80);
    doc.text(`Departure Date: ${ticket.departureDate}`, 10, 90);
    doc.text(`Selected Seats: ${ticket.selectedSeats.join(", ")}`, 10, 100);

    doc.save(`ticket_${ticket.transactionId}.pdf`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {userTickets.length > 0 ? (
        userTickets.map((ticket) => (
          <motion.div
            key={ticket._id}
            className="bg-[#f04835] text-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 relative flex flex-col justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            id={ticket._id}
            style={{ height: "450px" }} // Fixed height for ticket cards
          >
            <div className="flex-grow">
              <h2 className="text-2xl font-bold mb-2">
                Bus Name: {ticket?.Bus?.busName || "N/A"} 🚍
              </h2>
              <p className="mb-1">
                Transaction ID: <strong>{ticket.transactionId}</strong>
              </p>
              <p className="mb-1">Email: {ticket.email}</p>
              <p className="mb-1">
                Price: <strong>{ticket.price} BDT</strong>
              </p>
              <p className="mb-1">
                From: <strong>{ticket?.Bus?.from || "N/A"}</strong> 🌍
              </p>
              <p className="mb-1">
                To: <strong>{ticket?.Bus?.to || "N/A"}</strong> 🌏
              </p>
              <p className="mb-1">
                Payment Date: <strong>{ticket.paymentMonth}</strong> 🗓️
              </p>
              <p className="mb-1">
                Departure Date: <strong>{ticket.departureDate}</strong> ⏰
              </p>
              <p>
                Selected Seats:{" "}
                <strong>{ticket.selectedSeats.join(", ")}</strong> 🎟️
              </p>
            </div>
            <div className="flex justify-between mt-4">
              <button
                className="flex items-center p-2 bg-blue-700 text-white rounded hover:bg-blue-600 transition duration-300"
                onClick={() => handlePrint(ticket._id)}
              >
                <FcPrint className="mr-2" />
                Print
              </button>
              <button
                className="flex items-center p-2 bg-green-700 text-white rounded hover:bg-green-600 transition duration-300"
                onClick={() => handleDownload(ticket)}
              >
                📥 Download
              </button>
            </div>
          </motion.div>
        ))
      ) : (
        <p className="text-center text-xl font-semibold text-gray-700">
          No tickets found for {user?.email}.
        </p>
      )}
      
      <style jsx>{`
        @media print {
          body {
            background: #f0f0f0; /* Change to your desired print background color */
          }
          .bg-[#f04835] {
            background: #f0f0f0 !important; /* Same as body background */
          }
          /* Additional print styles can be added here */
        }
      `}</style>
    </div>
  );
};

export default Page;
