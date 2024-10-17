import React, { useContext, useEffect, useState } from 'react';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { AuthContext } from '../../Provider/AuthProvider';

const stripePromise = loadStripe(
  'pk_test_51PLRDh1ER2eQQaKOIacKieEoEcmrxq1iXUsfZCu7itWd6KAMzuQyotjLWrjKag3KzgTsvZooEDBnfsfyVGMbznhJ00vAOF7I33'
);

const Pay = ({ Bus, selectedSeats, totalPrice }) => {
  const [coupons, setCoupons] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [memberInfo, setMemberInfo] = useState({});
  const [totalToPay, setTotalToPay] = useState(totalPrice);
  const [paymentDate] = useState(new Date().toISOString().substring(0, 10)); // Current date as payment date
  const [paymentTime, setPaymentTime] = useState(''); // State for payment time
  const [departureDate, setDepartureDate] = useState(''); // State for selected departure date
  const [showModal, setShowModal] = useState(false); // Modal state
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const today = new Date();
    const formattedTime = today.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    setPaymentTime(formattedTime); // Set the payment time
  }, []);

  useEffect(() => {
    const fetchCoupons = async () => {
      const response = await fetch('http://localhost:8000/coupons');
      const couponsData = await response.json();
      setCoupons(couponsData);
    };

    const fetchMemberInfo = async () => {
      if (user) {
        const response = await fetch(
          `http://localhost:8000/users/${user?.email}`
        );
        const userData = await response.json();
        setMemberInfo(userData);
        setTotalToPay(userData.rent);
      }
    };

    fetchCoupons();
    fetchMemberInfo();
  }, [user]);

  const handlePay = () => {
    if (departureDate) {
      setShowModal(true); // Open modal only if departure date is selected
    } else {
      alert('Please select a departure date before proceeding.');
    }
  };

  const closeModal = () => {
    setShowModal(false);
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
                Total to Pay: {totalToPay} BDT
              </p>
            </div>
            <p className="text-lg font-bold">Current Date: {paymentDate} </p>
            <p className="text-lg font-bold">Payment Time: {paymentTime} </p>
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
                onChange={e => setDepartureDate(e.target.value)}
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
          </div>

          {showModal && (
            <div className="modal-overlay">
              <div className="modal">
                <div className="modal-content">
                  <Elements stripe={stripePromise}>
                    <CheckoutForm
                      totalToPay={totalToPay}
                      paymentMonth={paymentDate}
                      paymentTime={paymentTime}
                      departureDate={departureDate}
                    />
                  </Elements>
                  <button className="modal-close" onClick={closeModal}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pay;
