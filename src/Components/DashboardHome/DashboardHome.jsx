'use client'; // Client-side rendering for this component
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import CountUp from 'react-countup';
import { FaUser } from 'react-icons/fa';

const DashboardHome = () => {
    const { user } = useContext(AuthContext);
    const email = user?.email || '';
    const [data, setData] = useState({});
    const [alldata, setAllData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        if (email) {
            setLoading(true);
            fetch(`https://way-go-server.vercel.app/users/${email}`)
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return res.json();
                })
                .then(data => {
                    setData(data);
                    setLoading(false);
                })
                .catch(err => {
                    setError(err.message);
                    setLoading(false);
                });
        }
    }, [email]);

    useEffect(() => {
        setLoading(true);
        fetch(`https://way-go-server.vercel.app/users`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                setAllData(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    // Handle loading and error states
    if (loading) {
        return <div className="flex justify-center items-center h-full">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    // Filter users by roles
    const role = data?.role;
    const memberCount = alldata.filter(user => user.role === 'agent').length;
    const blockedCount = alldata.filter(user => user.role === 'blocked').length;
    const userCount = alldata.filter(user => user.role === 'user').length;

    return (
        <div className="p-8 ">
            <h1 className="text-4xl font-bold text-center mb-6">Welcome to Your Dashboard</h1>
            {role && <p className="text-lg text-center mb-4">You are logged in as: <strong>{role}</strong></p>}

            {/* Dashboard stats */}
            <div className="flex flex-wrap justify-center gap-8">
                <DashboardCard
                    title="Total Users"
                    count={userCount}
                    icon={<FaUser className="text-blue-500 text-4xl" />}
                />
                <DashboardCard
                    title="Total Agents"
                    count={memberCount}
                    icon={<span className="text-purple-500 text-4xl">🪪</span>}
                />
                <DashboardCard
                    title="Total Blocked Users"
                    count={blockedCount}
                    icon={<span className="text-red-500 text-4xl">🚫</span>}
                />
            </div>
        </div>
    );
};

// Dashboard Card Component
const DashboardCard = ({ title, count, icon }) => {
    return (
        <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-lg rounded-lg py-8 px-6 w-full md:w-80 flex items-center transition-transform transform hover:scale-105">
            <div className="mr-4">
                {icon}
            </div>
            <div>
                <h2 className="text-3xl font-bold">
                    <CountUp start={0} end={count} duration={2.75} />
                </h2>
                <p className="text-gray-600">{title}</p>
            </div>
        </div>
    );
};

export default DashboardHome;
