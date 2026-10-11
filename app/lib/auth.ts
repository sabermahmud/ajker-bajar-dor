
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";

const databaseUrl = process.env.BETTER_AUTH_DB_URL;
const baseURL = process.env.BETTER_AUTH_URL;

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

const githubClientId = process.env.GITHUB_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;

if (!databaseUrl) {
  throw new Error("Missing environment variable: BETTER_AUTH_DB_URL");
}

if (!baseURL) {
  throw new Error("Missing environment variable: BETTER_AUTH_URL");
}

if (!googleClientId || !googleClientSecret) {
  throw new Error(
    "Missing environment variables: GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET",
  );
}

if (!githubClientId || !githubClientSecret) {
  throw new Error(
    "Missing environment variables: GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET",
  );
}

const client = new MongoClient(databaseUrl);
const db = client.db();

export const auth = betterAuth({
  baseURL,

  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    },

    github: {
      clientId: githubClientId,
      clientSecret: githubClientSecret,
    },
  },

  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google"],
    },
  },
});
