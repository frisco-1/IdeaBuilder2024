import { useState } from 'react';
import { signUp } from '../auth/auth-client.js'; // ✅ updated import

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await signUp.email(
        {
          name,
          email,
          password,
          callbackURL: '/dashboard', // redirect after signup if desired
        },
        {
          onSuccess: () => {
            setSuccess(true);
          },
          onError: (ctx) => {
            setError(ctx.error.message || 'Registration failed');
          },
        }
      );
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading, error, success };
}
