import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import 'dotenv/config';

// ✅ Ensure DB URI is provided
const dbUri = process.env.DB_CATALOG;
if (!dbUri) {
  throw new Error('DB_CATALOG environment variable is required');
}

console.log("✅ BetterAuth initialized, endpoints should be active.");


// ✅ Connect MongoClient once and reuse
const client = new MongoClient(dbUri, { useUnifiedTopology: true });
await client.connect();
const db = client.db(); // Uses the default database specified in the URI

// ✅ BetterAuth configuration
export const auth = betterAuth({
  baseURL: process.env.BASE_URL || "http://localhost:4000", // Must match backend server
  database: mongodbAdapter(db),

  // Email/password authentication
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Set to true in production if email verification is needed
  },

  // Session configuration
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24,     // Refresh token every 24 hours
  },

  // Custom user fields
  user: {
    additionalFields: {
      name: {
        type: "string",
        required: true,
      }
    }
  },

  // Social login providers
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    },
  },

  // ✅ Explicitly enable API endpoints (this ensures /api/auth/sign-up is created)
  endpoints: {
    signUp: true,
    signIn: true,
    signOut: true,
    getSession: true,
  },
});
