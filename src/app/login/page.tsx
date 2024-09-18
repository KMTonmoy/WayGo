
import Link from 'next/link';

const LoginPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10 px-5">
            <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
                <h2 className="text-3xl font-semibold text-center text-[#25527E] mb-8">Login to Your Account</h2>

                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f0652b]"
                            placeholder="Your Email"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f0652b]"
                            placeholder="Your Password"
                        />
                    </div>

                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center">
                            <input type="checkbox" id="remember-me" className="mr-2 text-[#f0652b] focus:ring-[#f0652b]" />
                            <label htmlFor="remember-me" className="text-gray-600">Remember Me</label>
                        </div>
                        <Link href="/forgot-password" className="text-[#f0652b] hover:underline">Forgot Password??</Link>
                    </div>

                    <button className="w-full p-3 bg-[#f0652b] text-white font-semibold rounded-lg hover:bg-[#e55c28] transition-colors duration-300">
                        Log In
                    </button>
                </form>

                <p className="mt-5 text-center text-gray-600">
                    Don't have an account?{' '}
                    <Link href="/Signup" className="text-[#f0652b] hover:underline">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
