'use client';
import Lottie from 'lottie-react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import loginAnimation from '../../../public/login.json';
import { useContext, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import Link from 'next/link';

const Page = () => {
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const axiosPublic = useAxiosPublic();

  const handleLogin = async e => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signIn(email, password);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      if (result && result.user) {
        const userInfo = {
          email: result.user.email || '', // Fallback to empty string if email is undefined
          name: result.user.displayName || '', // Fallback to empty string if displayName is undefined
        };
        await axiosPublic.post('/users', userInfo);
      }
    } catch (error) {
      console.error('Error during Google sign-in:', error); // Log the full error object
      setError(`Google sign-in failed: ${error.message || 'Unknown error'}`); // Better error message for users
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div>
        <Lottie animationData={loginAnimation} loop={true} />
      </div>
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#25527E]">
          Login
        </h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Your Email"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Your Password"
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 font-semibold text-white rounded-md ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#22C55E] text-white font-semibold rounded-lg hover:bg-[#25a755]  duration-700'
            }`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        <div>
          <button
            onClick={handleGoogleLogin}
            className="max-w-[320px] flex items-center justify-center mx-auto mt-4 py-2 px-5 text-sm font-bold text-center uppercase rounded-md border border-[rgba(50,50,80,0.25)] gap-3 text-white bg-[rgb(50,50,80)] cursor-pointer transition-all duration-600 ease-in-out hover:scale-[1.02] hover:bg-[rgb(90,90,120)] hover:shadow-[0_2px_4px_rgba(90,90,120,0.1)] focus:outline-none focus:shadow-[0_0_0_3px_rgba(0,0,40,0.3)] active:scale-[0.98] active:opacity-80 md:max-w-full"
          >
            <svg
              viewBox="0 0 256 262"
              preserveAspectRatio="xMidYMid"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 fill-white mr-2"
            >
              <path
                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                fill="#4285F4"
              ></path>
              <path
                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                fill="#34A853"
              ></path>
              <path
                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                fill="#FBBC05"
              ></path>
              <path
                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                fill="#EB4335"
              ></path>
            </svg>
            Continue with Google
          </button>
        </div>
        <p className="mt-5 text-center text-gray-600">
          Do not have an account?{' '}
          <Link href="/Signup" className="text-[#f0652b] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;
