// AddToWatchlistButton.jsx

import { auth, db } from '../../firebase';
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from 'firebase/firestore'; // ✅ Changed from firestore/lite to regular firestore
import { toast } from 'react-toastify';

// ✅ Reusable function with better error handling
export const addToWatchlist = async (movieId) => {
  try {
    const user = auth.currentUser;
    
    // ✅ Check if user is logged in
    if (!user) {
      toast.error("Please log in to add movies to your watchlist");
      return;
    }

    // ✅ Convert movieId to string to ensure consistency
    const movieIdStr = String(movieId);
    
    console.log("Adding movie to watchlist:", movieIdStr); // ✅ Debug log

    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      toast.error("User profile not found");
      return;
    }

    const userDoc = snapshot.docs[0];
    const userRef = userDoc.ref;
    const data = userDoc.data();
    const currentList = data.wishlist || [];

    // ✅ Check if movie is already in wishlist (handle both string and number IDs)
    const isAlreadyInWishlist = currentList.some(id => String(id) === movieIdStr);
    
    if (isAlreadyInWishlist) {
      toast.info("Already in your watchlist");
      return;
    }

    const updatedList = [...currentList, movieIdStr];
    await updateDoc(userRef, { wishlist: updatedList });

    console.log("Updated wishlist:", updatedList); // ✅ Debug log
    toast.success("Added to watchlist!");
    
  } catch (error) {
    console.error("Error adding to watchlist:", error);
    
    // ✅ Handle specific Firebase errors
    if (error.code === 'permission-denied') {
      toast.error("Permission denied. Please check your login status.");
    } else if (error.code === 'not-found') {
      toast.error("User profile not found.");
    } else {
      toast.error("Failed to add to watchlist. Please try again.");
    }
  }
};