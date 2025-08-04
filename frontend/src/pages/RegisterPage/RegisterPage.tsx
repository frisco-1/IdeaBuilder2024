import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import React from 'react';
import { GoArrowUpRight } from 'react-icons/go';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, isLoading, error, success } = useAuth();

  async function handleFormSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    await register(name, email, password);
  }

  // 👇 Redirect to your social provider endpoints
  const handleSocialAuth = (provider: 'google' | 'facebook') => {
    window.location.href = `http://localhost:4000/api/auth/${provider}`;
    // In production:
    // window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/${provider}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle,_rgba(153,27,27,1)_0%,_#000000_100%)] text-white">
      <div className="flex flex-col md:flex-row w-full max-w-6xl rounded-xl shadow-xl overflow-hidden border border-gray-700">

        {/* Left Panel: Benefits */}
        <div className="w-full md:w-1/2 p-10 bg-[#1a1a1d] flex flex-col justify-center">
          <h2 className="text-xl font-bold mb-8">Benefits of Creating an <br />Idea Builder Account</h2>

          <ul className="space-y-4 text-gray-300 text-base leading-relaxed">
            <li>✅ Track the production status of your orders in real-time</li>
            <li>✅ Receive timely updates via email or phone</li>
            <li>✅ Unlock access to exclusive promotions and offers</li>
          </ul>
        </div>

        {/* Right Panel: Register Form */}
        <div className="w-full md:w-1/2 p-10 bg-[#0d1117]">
          <h1 className="text-3xl font-semibold mb-2 text-center">Register</h1>
          <p className="text-center mb-6 text-gray-400">
            Already have an account?{' '}
            <Link to="/sign-in" className="text-blue-500 hover:underline">
              Log in <GoArrowUpRight className="inline" />
            </Link>
          </p>

          {success && (
            <div className="mb-4 text-center text-green-400">
              User created successfully! <br />
              Now you can{' '}
              <Link className="underline" to={'/sign-in'}>
                Login &raquo;
              </Link>
            </div>
          )}

          {error && (
            <div className="mb-4 text-center text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              required
              className="w-full p-3 mb-2 rounded-xl bg-[#161b22] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
              className="w-full p-3 mb-2 rounded-xl bg-[#161b22] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
              minLength={6}
              className="w-full p-3 mb-2 rounded-xl bg-[#161b22] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:bg-gray-200 transition disabled:opacity-50"
            >
              {isLoading ? 'Creating Account...' : 'Register'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center justify-center my-4 text-gray-400">
            <span className="px-2">or</span>
          </div>

          {/* Social Register Buttons */}
          <button
            type="button"
            onClick={() => handleSocialAuth('google')}
            className="w-full flex items-center mb-2 justify-center gap-2 bg-[#20232a] text-white py-2 rounded-xl border border-gray-700 hover:bg-[#2c313c]"
          >
            <img src="/img/Google.png" alt="Google Logo" className="w-5 h-5" />
            Register with Google
          </button>

          <button
            type="button"
            onClick={() => handleSocialAuth('facebook')}
            className="w-full flex items-center justify-center gap-2 bg-[#20232a] text-white py-2 rounded-xl border border-gray-700 hover:bg-[#2c313c]"
          >
            <img src="/img/Facebook.png" alt="Facebook Logo" className="w-5 h-5" />
            Register with Facebook
          </button>
        </div>
      </div>
    </div>
  );
}
