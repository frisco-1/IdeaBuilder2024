import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setCreatingUser(true);
    setError(false);
    setUserCreated(false);

    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      setUserCreated(true);
    } else {
      setError(true);
    }
    setCreatingUser(false);
  }

  return (
    <>
      <section className="mt-8 ">

        <div className=''>
          <h1 className="text-center text-red-500 text-4xl">
            Register for Idea Builder
          </h1>
          <p className="text-center text-red-500 text-4xl ">
            Create a free account or&nbsp;
            <Link to="/sign-in">
              log in
            </Link>
          </p>
        </div>


        {userCreated && (
          <div className="my-4 text-center">
            User created. <br />
            Now you can{' '}
            <Link className="underline" to={'/login'}>
              Login &raquo;
            </Link>
          </div>
        )}

        {error && (
          <div className="my-4 text-center">
            An error has occurred. <br />
            Please try again later.
          </div>
        )}

        <form
          className=" max-w-sm mx-auto text-center"
          onSubmit={handleFormSubmit}
        >
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            disabled={creatingUser}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            disabled={creatingUser}
          />

          <button type="submit" disabled={creatingUser}>
            Register
          </button>

          <div className="my-4 text-center text-gray-500">
            or login with provider
          </div>
          <button className="flex gap-4 justify-center">
            <img
              src={'./img/Google.png'}
              alt={'Google Logo'}
              width={40}
              height={40}
            />
            &nbsp; Login with Google
          </button>
        </form>
      </section>
    </>
  );
}
