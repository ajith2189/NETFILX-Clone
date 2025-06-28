// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
// ✅ Fixed: Import from regular firestore, not firestore/lite
import { 
  getFirestore, 
  doc, 
  setDoc
} from "firebase/firestore";
import { toast } from "react-toastify";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAk0lHmIjUtoCnUyOh9IyQScRdwa_j0Qzs",
  authDomain: "netflix-clone-8abdd.firebaseapp.com",
  projectId: "netflix-clone-8abdd",
  storageBucket: "netflix-clone-8abdd.firebasestorage.app",
  messagingSenderId: "860745300104",
  appId: "1:860745300104:web:c27861abe3f5a0e3ec473d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    // ✅ Step 1: Create user in Firebase Auth
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    
    console.log("User created in Auth:", user.uid); // Debug log
    
    // ✅ Step 2: Add user data to Firestore database
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      wishlist: [], // ✅ Fixed typo: wishlist (was wishlist:[])
      createdAt: new Date().toISOString(), // ✅ Added timestamp
    });
    
    console.log("User data saved to Firestore"); // Debug log
    toast.success("Account created successfully!");
    
  } catch (error) {
    console.error("Signup error:", error); // ✅ Better error logging
    
    // ✅ Handle specific Firebase errors
    if (error.code === 'auth/email-already-in-use') {
      toast.error("Email already in use");
    } else if (error.code === 'auth/weak-password') {
      toast.error("Password should be at least 6 characters");
    } else if (error.code === 'auth/invalid-email') {
      toast.error("Invalid email address");
    } else {
      // Generic error handling
      toast.error(error.code.split("/")[1].split("-").join(" "));
    }
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("Logged in successfully!");
  } catch (error) {
    console.error("Login error:", error);
    
    // ✅ Handle specific login errors
    if (error.code === 'auth/user-not-found') {
      toast.error("No account found with this email");
    } else if (error.code === 'auth/wrong-password') {
      toast.error("Incorrect password");
    } else if (error.code === 'auth/invalid-email') {
      toast.error("Invalid email address");
    } else {
      toast.error(error.code.split("/")[1].split("-").join(" "));
    }
  }
};

const logout = () => {
  signOut(auth);
  toast.success("Logged out successfully!");
};

export { auth, db, login, signup, logout };