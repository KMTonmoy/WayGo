import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { motion } from "framer-motion";

const MyPayment = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email || "";
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (email) {
      setLoading(true);
      fetch(`https://way-go-backend.vercel.app/payments`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          const userPayments = data.filter(
            (payment) => payment.email === email
          );
          setPayments(userPayments);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [email]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">Loading...</div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const formatTime = (timeString) => {
    if (!timeString) return "N/A";

    const timeParts = timeString.split(":");
    if (timeParts.length !== 2) return timeString;

    const [hours, minutes] = timeParts;
    const hours12 = hours % 12 || 12;
    const ampm = hours < 12 ? "AM" : "PM";
    return `${hours12}:${minutes} ${ampm}`;
  };

  const totalPayment = payments.reduce(
    (total, payment) => total + payment.price,
    0
  );

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-center mb-6">My Payments</h1>
      {payments.length === 0 ? (
        <p className="text-center text-gray-500">No payment records found.</p>
      ) : (
        <motion.table
          className="min-w-[800px] bg-white border border-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border">Payment Date</th>
              <th className="py-2 px-4 border">Payment Time</th>
              <th className="py-2 px-4 border">Transaction ID</th>
              <th className="py-2 px-4 border">Selected Seats</th>
              <th className="py-2 px-4 border">Total Payment</th>
            </tr>
          </thead>
          <tbody>
            {payments
              .slice()
              .reverse()
              .map((payment) => {
                const [date, time] = payment.SubmitDate.split(" ");
                return (
                  <motion.tr
                    key={payment.transactionId}
                    className="hover:bg-gray-100"
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <td className="py-2 px-4 border">{date}</td>

                    {payment.paymentTime?.length > 0 ? (
                      <td className="py-2 px-4 border">
                        {payment.paymentTime}
                      </td>
                    ) : (
                      <td className="py-2 px-4 border">N/A</td>
                    )}

                    <td className="py-2 px-4 border">
                      {payment.transactionId}
                    </td>
                    <td className="py-2 px-4 border">
                      {payment.selectedSeats.join(", ")}
                    </td>
                    <td className="py-2 px-4 border text-orange-500">
                      {payment.price.toFixed(2)} BDT
                    </td>
                  </motion.tr>
                );
              })}
            <tr className="bg-gray-200">
              <td colSpan="4" className="py-2 px-4 border text-right font-bold">
                Total:
              </td>
              <td className="py-2 px-4 border text-orange-500 font-bold">
                {totalPayment.toFixed(2)} BDT
              </td>
            </tr>
          </tbody>
        </motion.table>
      )}
    </div>
  );
};

export default MyPayment;
