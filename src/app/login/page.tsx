"use client";
import Link from 'next/link';
import { useContext, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';

const page: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn } = useContext(AuthContext);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signIn(email, password);
            Swal.fire({
                title: 'Login Successful',
                text: 'You have successfully logged in.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } catch (error) {
            Swal.fire({
                title: 'Login Failed',
                text: error.message || 'Please check your credentials and try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10 px-5">
            <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
                <h2 className="text-3xl font-semibold text-center text-[#25527E] mb-8">Login to Your Account</h2>

                <form onSubmit={handleLogin}> {/* Link handleLogin to the form submission */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f0652b]"
                            placeholder="Your Email"
                            value={email} // Bind email state to input
                            onChange={(e) => setEmail(e.target.value)} // Update state on change
                            required // Make it a required field
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f0652b]"
                            placeholder="Your Password"
                            value={password} // Bind password state to input
                            onChange={(e) => setPassword(e.target.value)} // Update state on change
                            required // Make it a required field
                        />
                    </div>

                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center">
                            <input type="checkbox" id="remember-me" className="mr-2 text-[#f0652b] focus:ring-[#f0652b]" />
                            <label htmlFor="remember-me" className="text-gray-600">Remember Me</label>
                        </div>
                        <Link href="/forgot-password" className="text-[#f0652b] hover:underline">Forgot Password?</Link>
                    </div>

                    <button
                        type="submit" // Ensure the button submits the form
                        className="w-full p-3 bg-[#f0652b] text-white font-semibold rounded-lg hover:bg-[#e55c28] transition-colors duration-300"
                    >
                        Log In
                    </button>
                </form>

                <p className="mt-5 text-center text-gray-600">
                    Dont have an account?
                    <Link href="/Signup" className="text-[#f0652b] hover:underline">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default page;
