"use client";
import React, { useContext, useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { AuthContext } from "../../Provider/AuthProvider";
import { Toaster, toast } from "react-hot-toast";

const stripePromise = loadStripe(
  "pk_test_51PLRDh1ER2eQQaKOIacKieEoEcmrxq1iXUsfZCu7itWd6KAMzuQyotjLWrjKag3KzgTsvZooEDBnfsfyVGMbznhJ00vAOF7I33"
);

const Pay = ({ Bus, selectedSeats, totalPrice }) => {
  const [paymentDate] = useState(new Date().toISOString().substring(0, 10));
  const [paymentTime, setPaymentTime] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [coupons, setCoupons] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
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
    fetch("https://way-go-backend.vercel.app/coupons")
      .then((response) => response.json())
      .then((json) => setCoupons(json));
  }, []);

  useEffect(() => {
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

    fetchMemberInfo();
  }, [user, totalPrice]);

  const handlePay = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const playErrorSound = () => {
    const errorSound = new Audio("/error.mp3");
    errorSound.play();
  };

  const playSuccessSound = () => {
    const successSound = new Audio("/success.mp3");
    successSound.play();
  };

  const applyCoupon = () => {
    const validCoupon = coupons.find(
      (coupon) => coupon.promoCode === couponCode
    );

    if (validCoupon) {
      setDiscount(validCoupon.discountPercentage);
      playSuccessSound();

      toast.success(
        `${validCoupon.discountPercentage}% discount will be applied to your total.`
      );
    } else {
      playErrorSound();

      toast.error(
        "Invalid coupon code. Please check the coupon code and try again."
      );
      setDiscount(0);
    }
  };

  // Calculate the discounted price
  const discountedPrice = totalPrice - (totalPrice * discount) / 100;
  // Calculate the discount amount in BDT
  const discountAmount = (totalPrice * discount) / 100;

  return (
    <div>
      <audio id="errorSound" src="/error.mp3" />
      <audio id="successSound" src="/success.mp3" />
      <Toaster />
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
              <div className="flex mb-2">
                <input
                  type="text"
                  placeholder="Use Coupons here"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="border border-gray-300 rounded p-2 mr-2 w-full"
                />
                <button
                  onClick={applyCoupon}
                  className="bg-blue-500 text-white rounded px-4 py-2"
                >
                  Apply
                </button>
              </div>
              {/* Show discount percentage and amount */}
              {discount > 0 && (
                <div className="flex justify-between mb-2 text-green-600">
                  <p className="text-lg font-medium">Discount:</p>
                  <p className="text-lg">
                    {discount}% (-{discountAmount.toFixed(2)} BDT)
                  </p>
                </div>
              )}
            </div>

            <div className="mt-5">
              <p className="text-xl font-bold">
                Total to Pay: {discountedPrice.toFixed(2)} BDT
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

            {isModalOpen && (
              <dialog
                id="my_modal_1"
                className="modal fixed inset-40 rounded-2xl flex items-center justify-center"
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
                      totalToPay={discountedPrice}
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
