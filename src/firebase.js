import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC6nZdZs7M0jwKyZrlGvWO0f9xEniszgNc",
  authDomain: "chat-application-4725e.firebaseapp.com",
  projectId: "chat-application-4725e",
  storageBucket: "chat-application-4725e.firebasestorage.app",
  messagingSenderId: "687148266651",
  appId: "1:687148266651:web:fab3bc5eb172e86892c23e",
  measurementId: "G-6RV333NCD4"
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);