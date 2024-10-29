import React, { useContext, useEffect, useState } from 'react';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { AuthContext } from '../../Provider/AuthProvider';
import { Toaster, toast } from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';
import { FaMale, FaFemale } from 'react-icons/fa';

const stripePromise = loadStripe(
  'pk_test_51PLRDh1ER2eQQaKOIacKieEoEcmrxq1iXUsfZCu7itWd6KAMzuQyotjLWrjKag3KzgTsvZooEDBnfsfyVGMbznhJ00vAOF7I33'
);

const Pay = ({ Bus, selectedSeats, totalPrice }) => {
  const [passengerName, setPassengerName] = useState(''); // State for passenger name
  const [passengerPhone, setPassengerPhone] = useState(''); // State for passenger phone
  const [paymentDate] = useState(new Date().toISOString().substring(0, 10));
  const [paymentTime, setPaymentTime] = useState('');
  const [coupons, setCoupons] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [gender, setGender] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const { user } = useContext(AuthContext);

  const searchParams = useSearchParams();
  const departureDate = searchParams.get('date');

  useEffect(() => {
    const today = new Date();
    const formattedTime = today.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    setPaymentTime(formattedTime);
  }, []);

  useEffect(() => {
    fetch('https://way-go-backend.vercel.app/coupons')
      .then(response => response.json())
      .then(json => setCoupons(json));
  }, []);

  useEffect(() => {
    const fetchMemberInfo = async () => {
      try {
        if (user) {
          const response = await fetch(
            `https://way-go-backend.vercel.app/users/${user?.email}`
          );
          if (!response.ok) throw new Error('Failed to fetch user info');
          const userData = await response.json();
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchMemberInfo();
  }, [user, totalPrice]);

  const handlePay = () => {
    if (!gender) {
      toast.error('Please select a gender.');
      return;
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const playErrorSound = () => {
    const errorSound = new Audio('/error.mp3');
    errorSound.play();
  };

  const playSuccessSound = () => {
    const successSound = new Audio('/success.mp3');
    successSound.play();
  };

  const applyCoupon = () => {
    const trimmedCouponCode = couponCode.trim().toLowerCase();
    const validCoupon = coupons.find(
      coupon => coupon.promoCode.toLowerCase() === trimmedCouponCode
    );

    if (validCoupon) {
      setDiscount(validCoupon.discountPercentage);
      setIsCouponApplied(true);
      playSuccessSound();
      toast.success(
        `${validCoupon.discountPercentage}% discount will be applied to your total.`
      );
    } else {
      playErrorSound();
      toast.error(
        'Invalid coupon code. Please check the coupon code and try again.'
      );
      setDiscount(0);
      setIsCouponApplied(false);
    }
  };

  const discountedPrice = totalPrice - (totalPrice * discount) / 100;
  const discountAmount = (totalPrice * discount) / 100;

  return (
    <div>
      <audio id="errorSound" src="/error.mp3" />
      <audio id="successSound" src="/success.mp3" />
      <Toaster />
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white rounded-lg shadow-lg p-6 md:w-[800px] w-full">
          <div>
            <h2 className="font-bold text-center text-3xl mb-5">
              Passenger details
            </h2>
            <div>
              <div className="relative w-max flex gap-8 rounded-lg">
                <div className="space-y-2 text-sm dark:text-zinc-400">
                  <label
                    className="block text-black text-xl font-semibold"
                    htmlFor="name"
                  >
                    Passenger Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="border text-black border-rose-600 outline-none rounded p-2 mr-2 w-full"
                    id="name"
                    required={true}
                    placeholder="Enter Name"
                    name="name"
                    type="text"
                    value={passengerName} // Bind the input value
                    onChange={e => setPassengerName(e.target.value)} // Update state on change
                  />
                </div>
                <div className="space-y-2 text-sm dark:text-zinc-400">
                  <label
                    className="block text-black text-xl font-semibold"
                    htmlFor="phone"
                  >
                    Mobile No.<span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center">
                    <span className="border p-2 border-r-0 text-black rounded-tr-none rounded-br-none border-rose-500 outline-none rounded">
                      +88
                    </span>
                    <input
                      className="border border-rose-500 text-black outline-none rounded-tl-none rounded-bl-none border-l-0 rounded p-2 mr-2 w-full"
                      id="phone"
                      placeholder="***********"
                      name="phone"
                      required={true}
                      type="tel"
                      maxLength="11"
                      pattern="[0-9]{10}"
                      value={passengerPhone} // Bind the input value
                      onChange={e => setPassengerPhone(e.target.value)} // Update state on change
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col mt-4">
              <label className="text-xl font-medium text-black mb-1">
                Gender <span className="text-red-500">*</span>
              </label>
              <div className="flex space-x-4">
                <label className="flex hover:cursor-pointer bg-slate-300 rounded-xl p-2 items-center space-x-2">
                  <input
                    className="form-radio text-blue-600"
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={gender === 'Male'}
                    onChange={() => setGender('Male')}
                  />
                  <span className="flex items-center space-x-2">
                    <span className="text-2xl">
                      <FaMale />
                    </span>
                    <span className="radio-label">Male</span>
                  </span>
                </label>

                <label className="flex hover:cursor-pointer bg-slate-300 rounded-xl p-2 items-center space-x-2 ml-4">
                  <input
                    className="form-radio  text-blue-600"
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={gender === 'Female'}
                    onChange={() => setGender('Female')}
                  />
                  <span className="flex items-center space-x-2">
                    <span className="text-2xl">
                      <FaFemale />
                    </span>
                    <span className="radio-label">Female</span>
                  </span>
                </label>
              </div>
            </div>
          </div>
          <h2 className="font-bold text-center text-3xl mt-5 mb-5">
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
                  onChange={e => setCouponCode(e.target.value)}
                  className="border border-gray-300 rounded p-2 mr-2 w-full"
                />
                <button
                  onClick={applyCoupon}
                  disabled={isCouponApplied}
                  className={`${
                    isCouponApplied
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-[#F43F5E]'
                  } text-white rounded px-4 py-2`}
                >
                  Apply
                </button>
              </div>
              {isCouponApplied && (
                <p className="text-green-600 font-bold">
                  {discountAmount} BDT discount applied!
                </p>
              )}
            </div>
            <p className="text-lg font-bold">Payment Date: {paymentDate}</p>
            <p className="text-lg font-bold">Departure Date: {departureDate}</p>

            <button
              type="button"
              className="bg-[#F43F5E] mt-5 p-3 font-bold text-white rounded-md w-full"
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
                <div className="modal-box p-5 border-2 border-[#F43F5E] rounded-2xl h-[400px] flex flex-col items-center justify-center gap-5 relative shadow-lg bg-white">
                  <div className="absolute right-2 top-2">
                    <button
                      onClick={closeModal}
                      className="bg-[#F43F5E] rounded-full px-3 py-1 text-white font-bold text-xl hover:bg-[#F43F5E] transition-colors duration-200"
                    >
                      X
                    </button>
                  </div>
                  <h2 className="text-lg font-semibold text-center text-[#F43F5E]">
                    Payment Details
                  </h2>
                  <Elements stripe={stripePromise}>
                    <CheckoutForm
                      totalToPay={discountedPrice}
                      paymentMonth={paymentDate}
                      paymentTime={paymentTime}
                      departureDate={departureDate}
                      BusId={Bus._id}
                      Bus={Bus}
                      selectedSeats={selectedSeats}
                      gender={gender} 
                      passengerName={passengerName} // Pass passenger name
                      passengerPhone={passengerPhone} // Pass passenger phone
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
