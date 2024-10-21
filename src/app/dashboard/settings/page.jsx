'use client'
import React, { useState } from 'react';

const Page = () => {
    const [isNotificationsEnabled, setNotificationsEnabled] = useState(true);
    const [isDarkMode, setDarkMode] = useState(false);
    const [language, setLanguage] = useState('English');

    const handleToggleNotifications = () => {
        setNotificationsEnabled(!isNotificationsEnabled);
    };

    const handleToggleDarkMode = () => {
        setDarkMode(!isDarkMode);
    };

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    return (
        <div className="p-8  my-10 w-full mx-auto bg-gray-50 shadow-md rounded-lg">
            <div className='p-8  my-10 w-full mx-auto max-w-7xl rounded-lg'>
                <h1 className="text-3xl font-bold mb-6">Settings</h1>

                {/* Account Settings */}
                <div className="mb-6 w-full">
                    <h2 className="text-xl font-semibold mb-4">Account Preferences</h2>
                    <div className="flex items-center justify-between mb-3">
                        <label className="text-lg">Language</label>
                        <select
                            value={language}
                            onChange={handleLanguageChange}
                            className="p-2 border rounded-lg"
                        >
                            <option value="English">English</option>
                            <option value="Spanish">Spanish</option>
                            <option value="French">French</option>
                            <option value="German">German</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                        <label className="text-lg">Dark Mode</label>
                        <button
                            onClick={handleToggleDarkMode}
                            className={`px-4 py-2 text-white rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-blue-500'
                                }`}
                        >
                            {isDarkMode ? 'Disable' : 'Enable'}
                        </button>
                    </div>
                </div>

                {/* Notification Settings */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">Notifications</h2>
                    <div className="flex items-center justify-between mb-3">
                        <label className="text-lg">Enable Notifications</label>
                        <button
                            onClick={handleToggleNotifications}
                            className={`px-4 py-2 text-white rounded-lg ${isNotificationsEnabled ? 'bg-green-500' : 'bg-gray-400'
                                }`}
                        >
                            {isNotificationsEnabled ? 'Enabled' : 'Disabled'}
                        </button>
                    </div>
                </div>

                {/* Privacy Settings */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">Privacy</h2>
                    <div className="flex items-center justify-between mb-3">
                        <label className="text-lg">Allow Profile Visibility</label>
                        <button
                            className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-600"
                        >
                            Toggle
                        </button>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                        <label className="text-lg">Location Tracking</label>
                        <button
                            className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-600"
                        >
                            Toggle
                        </button>
                    </div>
                </div>

                {/* Save Changes Button */}
                <div className="text-right mt-20">
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Page;
