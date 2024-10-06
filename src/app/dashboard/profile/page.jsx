'use client';
import React, { useContext } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';

const Profile = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="flex w-full items-center justify-center min-h-screen bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500">
            <div className="max-w-md w-full bg-white shadow-2xl rounded-lg p-6 transform transition-all hover:scale-105 duration-300 ease-in-out">
                <div className="flex flex-col items-center">
                    {/* User Profile Image */}
                    <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-lg border-4 border-purple-500">
                        <img
                            className="object-cover w-full h-full"
                            src={user?.photoURL || 'https://via.placeholder.com/150'}
                            alt="User Avatar"
                        />
                    </div>

                    {/* User Info */}
                    <h2 className="text-3xl font-semibold mt-4 text-gray-800">{user?.displayName || 'Guest User'}</h2>
                    <p className="text-gray-500 text-sm">{user?.email || 'Email not available'}</p>

                    {/* Cool Divider */}
                    <div className="mt-6 w-24 border-b-2 border-purple-500"></div>

                    {/* Edit Profile Button */}
                    <button className="mt-6 px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full shadow-lg hover:shadow-xl hover:from-pink-500 hover:to-yellow-500 transform hover:scale-105 transition-all duration-300">
                        Edit Profile
                    </button>
                </div>

                {/* Additional Info (Optional) */}
                <div className="mt-8 text-center">
                    <p className="text-gray-600">Joined: {user?.metadata?.creationTime || 'N/A'}</p>
                    <p className="text-gray-600">Last Login: {user?.metadata?.lastSignInTime || 'N/A'}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
