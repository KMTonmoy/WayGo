'use client';

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const ManageAgent = () => {
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchAgents = async () => {
        try {
            const response = await fetch('https://way-go-backend.vercel.app/users');
            if (!response.ok) {
                throw new Error('Failed to fetch agents');
            }
            const data = await response.json();
            const agentUsers = data.filter(user => user.role === 'agent');
            setAgents(agentUsers);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAgents();
    }, []);

    const handleBlockAgent = async (email) => {
        try {
            const response = await fetch(`https://way-go-backend.vercel.app/users/${email}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ role: 'blocked' }),
            });

            if (!response.ok) {
                throw new Error('Failed to block agent');
            }

            Swal.fire({
                title: 'Success!',
                text: `Agent with email ${email} has been blocked.`,
                icon: 'success',
                confirmButtonText: 'OK',
            });

            fetchAgents(); // Refetch data after blocking the agent
        } catch (err) {
            Swal.fire({
                title: 'Error!',
                text: err.message,
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    const handleMakeUser = async (email) => {
        try {
            const response = await fetch(`https://way-go-backend.vercel.app/users/${email}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ role: 'user' }),
            });

            if (!response.ok) {
                throw new Error('Failed to make user');
            }

            Swal.fire({
                title: 'Success!',
                text: `Agent with email ${email} has been made a User.`,
                icon: 'success',
                confirmButtonText: 'OK',
            });

            fetchAgents(); // Refetch data after making the agent a user
        } catch (err) {
            Swal.fire({
                title: 'Error!',
                text: err.message,
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    // Filter agents based on search term
    const filteredAgents = agents.filter(agent =>
        (agent.name && agent.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (agent.email && agent.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="p-6 h-[100%] overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-4">Manage Agents</h2>

            <input
                type="text"
                placeholder="Search by name or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4 p-2 border border-gray-300 rounded w-full outline-none"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAgents.map((agent) => (
                    <div key={agent.email} className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-center">
                            <img
                                src="https://static.vecteezy.com/system/resources/thumbnails/004/607/791/small_2x/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg"
                                alt="Profile"
                                className="w-12 h-12 rounded-full"
                            />
                            <div className="ml-4">
                                <h3 className="text-lg font-medium">{agent.name}</h3>
                                <p className="text-gray-500">{agent.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mr-2"
                                onClick={() => handleBlockAgent(agent.email)}
                            >
                                Block
                            </button>
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                                onClick={() => handleMakeUser(agent.email)}
                            >
                                Make User
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageAgent;
