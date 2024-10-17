'use client'
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://way-go-backend.vercel.app/users');
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await response.json();
                setUsers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleBlockUser = async (email) => {
        try {
            const response = await fetch(`https://way-go-backend.vercel.app/users/${email}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ role: 'blocked' }),
            });

            if (!response.ok) {
                throw new Error('Failed to block user');
            }

            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.email === email ? { ...user, role: 'blocked' } : user
                )
            );

            Swal.fire({
                title: 'Success!',
                text: `User with email ${email} has been blocked.`,
                icon: 'success',
                confirmButtonText: 'OK',
            });
        } catch (err) {
            Swal.fire({
                title: 'Error!',
                text: err.message,
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    const handleMakeAgent = async (email) => {
        try {
            const response = await fetch(`https://way-go-backend.vercel.app/users/${email}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ role: 'agent' }),
            });

            if (!response.ok) {
                throw new Error('Failed to make user an agent');
            }

            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.email === email ? { ...user, role: 'agent' } : user
                )
            );

            Swal.fire({
                title: 'Success!',
                text: `User with email ${email} has been promoted to agent.`,
                icon: 'success',
                confirmButtonText: 'OK',
            });
        } catch (err) {
            Swal.fire({
                title: 'Error!',
                text: err.message,
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredUsers = users.filter(
        (user) =>
            (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="p-6 h-[100%] overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
            <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded outline-none"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers
                    .filter((user) => user.role === 'user')
                    .map((user) => (
                        <div key={user.email} className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between">
                            <div className="flex items-center">
                                <img
                                    src={user.photo}
                                    alt="Profile"
                                    className="w-12 h-12 rounded-full"
                                />
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium">{user.name}</h3>
                                    <p className="text-gray-500">{user.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mr-2"
                                    onClick={() => handleBlockUser(user.email)}
                                >
                                    Block
                                </button>
                                <button
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                                    onClick={() => handleMakeAgent(user.email)}
                                >
                                    Make Agent
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ManageUsers;
