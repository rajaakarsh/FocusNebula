import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase only if it hasn't been initialized already (crucial for Next.js SSR)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

let authInstance: any;
try {
  authInstance = getAuth(app);
} catch (error) {
  console.error("Firebase auth initialization failed:", error);
  // Provide a dummy auth object to prevent immediate crashes in providers
  authInstance = {} as any;
}

export const auth = authInstance;
export default app;
