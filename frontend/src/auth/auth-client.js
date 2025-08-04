import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000"
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  getSession,
} = authClient;
