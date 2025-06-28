import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./Wishlist.css";
import { Link, useNavigate } from "react-router-dom";
import back_arrow_icon from "../../assets/back_arrow_icon.png"

const apiKey = "218e8bcfd98ae49ea6dd86f40ddd2f5d";
const db = getFirestore();
const auth = getAuth();

const WishList = () => {
  const [wishlist, setWishlist] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Added loading state
  const navigate = useNavigate();

  // Step 1: Fetch wishlist from Firestore
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // ✅ Added try-catch for error handling
          const docRef = doc(db, "users", user.uid);

          const userSnap = await getDoc(docRef);

          if (userSnap.exists()) {
            const userData = userSnap.data();
            const userWishlist = userData.wishlist || []; // ✅ Handle undefined wishlist
            setWishlist(userWishlist);
          } else {
            console.log("No user document found");
            setWishlist([]); // ✅ Set empty array if no document
          }
        } catch (error) {
          console.error("Error fetching user data:", error); // ✅ Error handling
          setWishlist([]);
        }
      } else {
        // ✅ Handle case when user is not logged in
        console.log("User not logged in");
        setWishlist([]);
      }
      setLoading(false); // ✅ Set loading to false after auth check
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  // Step 2: Fetch movie data using wishlist
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        console.log("Fetching movies for IDs:", wishlist); // ✅ Debug log
        const responses = await Promise.all(
          wishlist.map(async (id) => {
            // ✅ Added async for better error handling
            try {
              const response = await fetch(
                `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
              );

              if (!response.ok) {
                // ✅ Check if response is ok
                throw new Error(`HTTP error! status: ${response.status}`);
              }

              return await response.json();
            } catch (error) {
              console.error(`Error fetching movie ${id}:`, error);
              return null; // ✅ Return null for failed requests
            }
          })
        );

        // ✅ Filter out null responses (failed requests)
        const validMovies = responses.filter((movie) => movie !== null);
        setMovies(validMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setMovies([]); // ✅ Set empty array on error
      }
    };

    fetchMovies();
  }, [wishlist]); // Run this effect only when wishlist changes

  // ✅ Show loading state
  if (loading) {
    return (
      <div className="movie-list">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <h2 className="wish-list">Your Wishlist</h2>
      
        <img onClick={() => navigate(-1)} className="back-button" src={back_arrow_icon} alt="Back" />

      <div className="movie-list">
        {movies.length === 0 ? (
          <p>
            {wishlist.length === 0
              ? "Your wishlist is empty. Add some movies!"
              : "Loading movies..."}
          </p>
        ) : (
          <div className="movie-list">
            {movies.map((movie) => (
              <Link to={`/player/${movie.id}`} className="card" key={movie.id}>
                <div className="movie-card" key={movie.id}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/200x300?text=No+Image";
                    }}
                  />
                  <div className="movie-info">
                    <p className="movie-title">{movie.original_title}</p>
                    <p className="release-date">
                      {movie.release_date?.slice(0, 4)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default WishList;
