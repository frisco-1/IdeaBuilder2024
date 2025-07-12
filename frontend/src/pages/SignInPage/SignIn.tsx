import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GoArrowUpRight } from 'react-icons/go';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <div className="text-center">
        <h1>Sign in to Idea Builder</h1>

        <form className="block max-w-sm mx-auto" action="">
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />

          <button type="submit">Register</button>
        </form>

        <Link to="/forgot-password">Forgot Password?</Link>
        <p>
          Don't have an Idea Builder Account? &nbsp;
          <Link to="/register">
            Register One Now <GoArrowUpRight />
          </Link>
        </p>
      </div>
    </>
  );
}

export default SignIn;
