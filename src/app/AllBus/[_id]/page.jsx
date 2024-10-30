'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Pay from '../../../Components/Payment/Pay';
import { useSearchParams } from 'next/navigation';
import { TbSteeringWheel } from 'react-icons/tb';

const Page = ({ params }) => {
  const { _id } = React.use(params);
  const [Bus, setBus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  const searchParams = useSearchParams();
  const date = searchParams.get('date');

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch(
          'https://way-go-backend.vercel.app/payments'
        );
        const data = await response.json();
        if (Bus) {
          const userPayments = data.filter(
            payment =>
              payment.BusId === Bus._id && payment?.departureDate === date
          );
          const bookedSeatsFromPayments = userPayments.flatMap(
            payment => payment.selectedSeats
          );
          
          setBookedSeats(bookedSeatsFromPayments);
        }
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };

    fetchPayments();
  }, [Bus, date]);

  useEffect(() => {
    const fetchBus = async () => {
      try {
        const response = await fetch(
          `https://way-go-backend.vercel.app/allbus/${_id}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch Bus');
        }
        const data = await response.json();
        setBus(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBus();
  }, [_id]);

  const formatTime = time => {
    const [hours, minutes] = time.split(':');
    const hoursIn12 = hours % 12 || 12;
    const amPm = hours >= 12 ? 'PM' : 'AM';
    return `${hoursIn12}:${minutes} ${amPm}`;
  };

  const handleSeatSelection = seat => {
    if (bookedSeats.includes(seat)) return;

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else {
      if (selectedSeats.length < 6) {
        setSelectedSeats([...selectedSeats, seat]);
      }
    }
  };

  const totalPrice = selectedSeats.length * (Bus?.seatPrice || 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-[#F43F5E]">
        {error}
        <button
          onClick={() => setLoading(true)}
          className="mt-4 px-4 py-2 bg-[#F43F5E] text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!Bus) {
    return <div className="text-center py-10">Bus not found.</div>;
  }

  return (
    <div className="mt-20 py-10 px-5 bg-white rounded-lg shadow-lg">
      <div>
        <motion.h1
          className="text-4xl font-bold text-[#F43F5E] text-center mb-5"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {Bus.busName}
        </motion.h1>
        <motion.img
          src={Bus.busImage}
          alt={Bus.busName}
          className="w-full h-[550px] rounded-md object-cover mt-5 shadow-md"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <div className="mt-5 text-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#f0483521] p-4 rounded-md shadow-md">
              <p className="text-lg font-medium">From:</p>
              <p className="font-normal">{Bus.from}</p>
            </div>
            <div className="bg-[#f0483521] p-4 rounded-md shadow-md">
              <p className="text-lg font-medium">To:</p>
              <p className="font-normal">{Bus.to}</p>
            </div>
            <div className="bg-[#f0483521] p-4 rounded-md shadow-md">
              <p className="text-lg font-medium">Departure Time:</p>
              <p className="font-normal">{formatTime(Bus.departureTime)}</p>
            </div>
            <div className="bg-[#f0483521] p-4 rounded-md shadow-md">
              <p className="text-lg font-medium">Arrival Time:</p>
              <p className="font-normal">{formatTime(Bus.arrivalTime)}</p>
            </div>
            <div className="bg-[#f0483521] p-4 rounded-md shadow-md">
              <p className="text-lg font-medium">Total Seats:</p>
              <p className="font-normal">{Bus.totalSeats}</p>
            </div>
            <div className="bg-[#f0483521] p-4 rounded-md shadow-md">
              <p className="text-lg font-medium">Seat Price:</p>
              <p className="font-normal">{Bus.seatPrice} BDT</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <div className="flex justify-between md:p-10 items-center w-full">
          <div className="w-[90%]">
            <div className="mt-5">
              <div className="flex flex-col md:flex-row justify-between gap-11">
                <div className="w-full md:w-1/2 p-5 bg-white">
                  <h1 className="font-raleway text-2xl font-semibold">
                    Select Your Seat
                  </h1>

                  <div className="flex justify-between mb-[50px] pb-2 border-dashed border-y-2 ">
                    <p className="flex gap-2 text-[#030712] font-inter text-lg mt-5">
                      <img
                        src="https://i.ibb.co.com/nMM6NZZ/seat-gray.png"
                        alt="Available"
                      />{' '}
                      Available
                    </p>
                    <p className="flex gap-2 text-[#030712] font-inter text-lg mt-5">
                      <img
                        src="https://i.ibb.co.com/b1jKfZ8/seat-green-filled.png"
                        alt="Selected"
                      />{' '}
                      Selected
                    </p>
                  </div>
                  <div>
                    <div className="mb-5">
                      <div className="relative md:left-[80%]  ">
                        <button
                          className=" flex justify-center items-center text-lg font-medium font-inter w-full md:w-[110px] h-[56px] text-white bg-[#F43F5E]  shadow-md rounded-md transition duration-200 transform hover:scale-105 hover:bg-[#9b2e22] cursor-not-allowed"
                          disabled={true}
                        >
                          <p className="text-3xl ">
                            <TbSteeringWheel />
                          </p>
                        </button>
                      </div>
                    </div>
                    <div></div>
                    <div className=" relative  ">
                      {Bus.totalSeats === 40 ? (
                        <div>
                          {[
                            'A',
                            'B',
                            'C',
                            'D',
                            'E',
                            'F',
                            'G',
                            'H',
                            'I',
                            'J',
                          ].map(row => (
                            <div
                              key={row}
                              className="flex gap-5 flex-row md:justify-between items-center mb-3"
                            >
                              <p>{row}</p>
                              {[1, 2, 3, 4].map(seatNumber => {
                                const seat = `${row}${seatNumber}`;
                                const isSelected = selectedSeats.includes(seat);
                                const isBooked = bookedSeats.includes(seat);

                                return (
                                  <button
                                    key={seat}
                                    aria-label={`Seat ${seat}`}
                                    onClick={() => handleSeatSelection(seat)}
                                    className={`btn text-lg font-medium font-inter w-full md:w-[110px] h-[56px]  text-[#030712] ${
                                      isBooked
                                        ? 'bg-[#9e9d9d] cursor-not-allowed'
                                        : isSelected
                                        ? 'bg-[#F43F5E] text-white'
                                        : 'bg-gray-300'
                                    } shadow-md rounded-md transition duration-200`}
                                    disabled={isBooked}
                                  >
                                    {seat}
                                  </button>
                                );
                              })}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <>
                          {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'].map(
                            row => (
                              <div
                                key={row}
                                className="flex gap-5 flex-row md:justify-between items-center mb-3"
                              >
                                <p>{row}</p>
                                {[1, 2, 3, 4].map(seatNumber => {
                                  const seat = `${row}${seatNumber}`;
                                  const isSelected =
                                    selectedSeats.includes(seat);
                                  const isBooked = bookedSeats.includes(seat);

                                  return (
                                    <button
                                      key={seat}
                                      aria-label={`Seat ${seat}`}
                                      onClick={() => handleSeatSelection(seat)}
                                      className={`btn text-lg font-medium font-inter w-full md:w-[110px] h-[56px] text-[#030712] ${
                                        isBooked
                                          ? 'bg-[#808288b9]  cursor-not-allowed'
                                          : isSelected
                                          ? 'bg-[#F43F5E] text-white'
                                          : 'bg-gray-300'
                                      } shadow-md rounded-md transition duration-200`}
                                      disabled={isBooked}
                                      title={
                                        isBooked
                                          ? `This seat is booked by an user`
                                          : ''
                                      }
                                    >
                                      {seat}
                                    </button>
                                  );
                                })}
                              </div>
                            )
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2   ">
                  <Pay
                    selectedSeats={selectedSeats}
                    totalPrice={totalPrice}
                    Bus={Bus}
                    params={params}
                    date={date}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
