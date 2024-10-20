import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { motion } from "framer-motion";

const MyPayment = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email || "";
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visiblePayments, setVisiblePayments] = useState(15);

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
          setPayments(userPayments.reverse());
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

  const calculateTotal = (paymentArray) => {
    return paymentArray.reduce((total, payment) => total + payment.price, 0);
  };

  const displayedPayments = payments.slice(0, visiblePayments);
  const displayedTotal = calculateTotal(displayedPayments);

  const overallTotal = calculateTotal(payments);

  const handleShowMore = () => {
    setVisiblePayments((prev) => prev + 10);
  };

  const handleShowLess = () => {
    setVisiblePayments(10);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-center mb-6">My Payments</h1>
      {payments.length === 0 ? (
        <p className="text-center text-gray-500">No payment records found.</p>
      ) : (
        <>
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
              {displayedPayments.map((payment) => {
                const [date] = payment.SubmitDate.split(" ");
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
                    <td className="py-2 px-4 border">
                      {payment.paymentTime?.length > 0
                        ? payment.paymentTime
                        : "N/A"}
                    </td>
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
                <td
                  colSpan="4"
                  className="py-2 px-4 border text-right font-bold"
                >
                  Total for displayed payments:
                </td>
                <td className="py-2 px-4 border text-orange-500 font-bold">
                  {displayedTotal.toFixed(2)} BDT
                </td>
              </tr>
              <tr className="bg-gray-300">
                <td
                  colSpan="4"
                  className="py-2 px-4 border text-right font-bold"
                >
                  Overall Total:
                </td>
                <td className="py-2 px-4 border text-orange-500 font-bold">
                  {overallTotal.toFixed(2)} BDT
                </td>
              </tr>
            </tbody>
          </motion.table>

          {visiblePayments < payments.length && (
            <div className="text-center mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleShowMore}
              >
                Show More
              </button>
            </div>
          )}

          {visiblePayments > 15 && (
            <div className="text-center mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={handleShowLess}
              >
                Show Less
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyPayment;
