// firebase.js (or firebaseConfig.js)

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// ✅ Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaB1QiZnwt2m4gCls7OwfNkSDrsnmpZe8",
  authDomain: "slack-clone-d27b6.firebaseapp.com",
  projectId: "slack-clone-d27b6",
  storageBucket: "slack-clone-d27b6.firebasestorage.app",
  messagingSenderId: "1021880617974",
  appId: "1:1021880617974:web:5252df3eaeca41d50a55d7",
  measurementId: "G-GD9867WJ1W"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize services
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

export { db, auth, provider, storage };
