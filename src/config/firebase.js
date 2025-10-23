import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD0mTYEy0paJVyu_GX558idjFGLFdvEPrk",
  authDomain: "emannueldevfullstacksolu-ff453.firebaseapp.com",
  projectId: "emannueldevfullstacksolu-ff453",
  storageBucket: "emannueldevfullstacksolu-ff453.firebasestorage.app",
  messagingSenderId: "529945348496",
  appId: "1:529945348496:web:27072ec7fe676368e40b15",
  measurementId: "G-45WJX2B13B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);

export default app;