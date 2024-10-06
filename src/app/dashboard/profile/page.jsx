'use client'
import React, { useContext } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
 

const Profile = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="    flex items-center justify-center">
            <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
                <div className="flex flex-col items-center">
                    {/* User Profile Image */}
                    <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg">
                        <img
                            className="object-cover w-full h-full"
                            src={user?.photoURL || 'https://via.placeholder.com/150'}
                            alt="User Avatar"
                        />
                    </div>

                    {/* User Info */}
                    <h2 className="text-2xl font-semibold mt-4">{user?.displayName || 'Guest User'}</h2>
                    <p className="text-gray-500">{user?.email || 'Email not available'}</p>



                    {/* Edit Profile Button */}
                    <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all">
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;