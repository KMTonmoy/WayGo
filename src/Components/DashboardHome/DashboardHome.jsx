"use client";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import CountUp from "react-countup";
import { FaUser } from "react-icons/fa";
import MyPayments from "../MyPaments/MyPayment";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email || "";
  const [data, setData] = useState({});
  const [alldata, setAllData] = useState([]);
  const [payData, setPaymentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPayments, setTotalPayments] = useState(0);
  const [totalSelectedSeats, setTotalSelectedSeats] = useState(0);
  const [adminTotal, setAdminTotal] = useState(0); // Fix: New state to hold admin total balance

  useEffect(() => {
    if (email) {
      setLoading(true);
      fetch(`https://way-go-backend.vercel.app/users/${email}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          setData(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [email]);

  useEffect(() => {
    setLoading(true);
    fetch(`https://way-go-backend.vercel.app/users`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setAllData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`https://way-go-backend.vercel.app/payments`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setPaymentData(data);
        setLoading(false);

        // Filter payments by the current user's email
        const userPayments = data.filter((payment) => payment.email === email);

        // Calculate total payments for current user
        const total = userPayments.reduce((sum, payment) => sum + payment.price, 0);
        setTotalPayments(total);

        // Count total selected seats for the user
        const selectedSeatsCount = userPayments.reduce(
          (count, payment) => count + (payment.selectedSeats?.length || 0),
          0
        );
        setTotalSelectedSeats(selectedSeatsCount);

        // Calculate total payments for admin
        const adminPayments = data.reduce((sum, payment) => sum + payment.price, 0);
        setAdminTotal(adminPayments); // Set admin total balance
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [email]);

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const role = data?.role;
  const memberCount = alldata.filter((user) => user.role === "agent").length;
  const blockedCount = alldata.filter((user) => user.role === "blocked").length;
  const userCount = alldata.filter((user) => user.role === "user").length;

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-center mb-6 text-[#F04935]">
        Welcome to Your Dashboard
      </h1>
      {role && (
        <p className="text-lg text-center mb-4 text-gray-700">
          You are logged in as:{" "}
          <strong className="uppercase text-[#F04935]">{role}</strong>
        </p>
      )}

      {role === "admin" && (
        <div className="flex flex-wrap justify-center gap-8 z-0">
          <DashboardCard
            title="Total Users"
            count={userCount}
            icon={<FaUser className="text-[#F04935] text-4xl" />}
          />
          <DashboardCard
            title="Total Agents"
            count={memberCount}
            icon={<span className="text-[#F04935] text-4xl">🪪</span>}
          />
          <DashboardCard
            title="Total Blocked Users"
            count={blockedCount}
            icon={<span className="text-[#F04935] text-4xl">🚫</span>}
          />
          <DashboardCard
            title="Total Bank Balance"
            count={adminTotal} // Fix: Display admin total balance
            icon={<span className="text-[#F04935] text-4xl">💵</span>}
          />
        </div>
      )}
      {role === "agent" && (
        <div className="flex flex-wrap justify-center gap-8 z-0">
          <DashboardCard
            title="Total Users"
            count={userCount}
            icon={<FaUser className="text-[#F04935] text-4xl" />}
          />
          <DashboardCard
            title="Total Agents"
            count={memberCount}
            icon={<span className="text-[#F04935] text-4xl">🪪</span>}
          />
          <DashboardCard
            title="Total Blocked Users"
            count={blockedCount}
            icon={<span className="text-[#F04935] text-4xl">🚫</span>}
          />
        </div>
      )}
      {role === "user" && (
        <div className="flex flex-wrap justify-center gap-8 z-0">
          <DashboardCard
            title="Total My Payments"
            count={totalPayments}
            icon={<FaUser className="text-[#F04935] text-4xl" />}
          />
          <DashboardCard
            title="Total Selected Seats"
            count={totalSelectedSeats}
            icon={<span className="text-[#F04935] text-4xl">🎟️</span>}
          />
         
          <MyPayments />
        </div>
      )}
    </div>
  );
};

const DashboardCard = ({ title, count, icon }) => {
  return (
    <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-lg rounded-lg py-8 px-6 w-full md:w-80 z-0 flex items-center transition-transform transform hover:scale-105 hover:shadow-xl duration-300 ease-in-out">
      <div className="mr-4 text-5xl">{icon}</div>
      <div>
        <h2 className="text-4xl font-bold text-[#F04935]">
          <CountUp start={0} end={count} duration={2.75} />
        </h2>
        <p className="text-gray-600 mt-2">{title}</p>
      </div>
    </div>
  );
};

export default DashboardHome;
