import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GoArrowUpRight } from 'react-icons/go';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    // TODO: Handle authentication logic
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle,_rgba(153,27,27,1)_0%,_#000000_100%)] text-white">
      <section className="w-full max-w-md p-10 bg-[#0d1117] rounded-xl shadow-xl border border-gray-700">

        <h1 className="text-3xl font-semibold mb-2 text-center">Sign in</h1>
        <p className="text-center mb-6 text-gray-400">
          Don’t have an Idea Builder Account? <br/>{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register One Now <GoArrowUpRight className="inline" />
          </Link>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            className="w-full p-3 mb-2 rounded-xl bg-[#161b22] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            className="w-full p-3 mb-2 rounded-xl bg-[#161b22] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
          />

          <div className="text-right text-sm mb-2">
            <Link to="/forgot-password" className="text-blue-400 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
          >
            Sign in
          </button>

          <div className="flex items-center justify-center my-4 text-gray-400">
            <span className="px-2">or</span>
          </div>

          <button
            type="button"
            className="w-full flex items-center mb-2 justify-center gap-2 bg-[#20232a] text-white py-2 rounded-xl border border-gray-700 hover:bg-[#2c313c]"
          >
            <img src="/img/Google.png" alt="Google Logo" className="w-5 h-5" />
            Sign in with Google
          </button>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 bg-[#20232a] text-white py-2 rounded-xl border border-gray-700 hover:bg-[#2c313c]"
          >
            <img src="/img/Facebook.png" alt="Facebook Logo" className="w-5 h-5" />
            Sign in with Facebook
          </button>
        </form>
      </section>
    </div>
  );
}

export default SignIn;
