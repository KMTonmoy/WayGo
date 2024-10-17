"use client";
import React, { useContext, useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { AuthContext } from "../../Provider/AuthProvider";

const stripePromise = loadStripe(
  "pk_test_51PLRDh1ER2eQQaKOIacKieEoEcmrxq1iXUsfZCu7itWd6KAMzuQyotjLWrjKag3KzgTsvZooEDBnfsfyVGMbznhJ00vAOF7I33"
);
console.log(
  "Stripe Public Key:",
  "pk_test_51PLRDh1ER2eQQaKOIacKieEoEcmrxq1iXUsfZCu7itWd6KAMzuQyotjLWrjKag3KzgTsvZooEDBnfsfyVGMbznhJ00vAOF7I33"
);

const Pay = ({ Bus, selectedSeats, totalPrice }) => {
  const [paymentDate] = useState(new Date().toISOString().substring(0, 10));
  const [paymentTime, setPaymentTime] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const today = new Date();
    const formattedTime = today.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    setPaymentTime(formattedTime);
  }, []);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await fetch(
          "https://way-go-backend.vercel.app/coupons"
        );
        if (!response.ok) throw new Error("Failed to fetch coupons");
        const couponsData = await response.json();
        // setCoupons(couponsData);
      } catch (error) {
        console.error(error.message);
      }
    };

    const fetchMemberInfo = async () => {
      try {
        if (user) {
          const response = await fetch(
            `https://way-go-backend.vercel.app/users/${user?.email}`
          );
          if (!response.ok) throw new Error("Failed to fetch user info");
          const userData = await response.json();
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchCoupons();
    fetchMemberInfo();
  }, [user, totalPrice]);

  const handlePay = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white rounded-lg shadow-lg p-6 md:w-[800px] w-full">
          <h2 className="font-bold text-center text-3xl mb-5">
            Payment Information
          </h2>
          <div className="space-y-5">
            <div>
              <h1 className="font-raleway text-2xl font-semibold">
                Price Details
              </h1>
              <div className="flex justify-between mb-2">
                <p className="text-lg font-medium">Total Seats Selected:</p>
                <p className="text-lg">{selectedSeats.length}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="text-lg font-medium">Seat Price:</p>
                <p className="text-lg">{Bus?.seatPrice} BDT</p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="text-lg font-medium">Total Price:</p>
                <p className="text-lg">{totalPrice} BDT</p>
              </div>
            </div>

            <div className="mt-5">
              <p className="text-xl font-bold">
                Total to Pay: {totalPrice} BDT
              </p>
            </div>
            <p className="text-lg font-bold">Current Date: {paymentDate}</p>
            <p className="text-lg font-bold">Payment Time: {paymentTime}</p>
            <div className="mt-5">
              <label
                htmlFor="departureDate"
                className="block text-lg font-medium mb-2"
              >
                Departure Date:
              </label>
              <input
                type="date"
                id="departureDate"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="input-bordered w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button
              type="button"
              className="bg-green-500 mt-5 p-3 font-bold text-white rounded-md w-full"
              onClick={handlePay}
            >
              Process Payment
            </button>

            {/* Modal */}
            {/* {isModalOpen && (
              <dialog id="my_modal_1" className="modal" open>
                <div className="modal-box p-5 border-2 border-orange-500 rounded-2xl h-[300px] flex flex-col items-center justify-center gap-5">
                  <div className="absolute right-1 top-1">
                    <button
                      onClick={closeModal}
                      className="bg-orange-600  rounded-full px-[10px] py-[5px]   text-white font-bold text-xl "
                    >
                      X
                    </button>
                  </div>
                  <Elements stripe={stripePromise}>
                    <CheckoutForm
                      totalToPay={totalPrice}
                      paymentMonth={paymentDate}
                      paymentTime={paymentTime}
                      departureDate={departureDate}
                    />
                  </Elements>
                </div>
              </dialog>
            )} */}
            {isModalOpen && (
              <dialog
                id="my_modal_1"
                className="modal fixed inset-40 flex items-center justify-center"
                open
              >
                <div className="modal-box p-5 border-2 border-orange-500 rounded-2xl h-[400px] flex flex-col items-center justify-center gap-5 relative shadow-lg bg-white">
                  <div className="absolute right-2 top-2">
                    <button
                      onClick={closeModal}
                      className="bg-orange-600 rounded-full px-3 py-1 text-white font-bold text-xl hover:bg-orange-500 transition-colors duration-200"
                    >
                      X
                    </button>
                  </div>
                  <h2 className="text-lg font-semibold text-center text-orange-600">
                    Payment Details
                  </h2>
                  <Elements stripe={stripePromise}>
                    <CheckoutForm
                      totalToPay={totalPrice}
                      paymentMonth={paymentDate}
                      paymentTime={paymentTime}
                      departureDate={departureDate}
                      BusId={Bus._id}
                      selectedSeats={selectedSeats}
                    />
                  </Elements>
                </div>
              </dialog>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pay;
