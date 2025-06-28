import React, { useEffect, useState } from "react";
import "../Player/Playes.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import addition from "../../assets/addition.png";
import { useParams, useNavigate } from "react-router-dom";
import { addToWatchlist } from "./AddToWatchlistButton";

export const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
  });
  const [loading, setLoading] = useState(true); // ✅ Added loading state

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMThlOGJjZmQ5OGFlNDllYTZkZDg2ZjQwZGRkMmY1ZCIsIm5iZiI6MTc1MDUxMTI5NC43NjMsInN1YiI6IjY4NTZhZWJlY2YyY2E5MzQwMjdlNzg1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pmgKGYDi_OVm_MsQJ3sc9KKbt1N30W4_bJt0kdOh8qA",
    },
  };

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
          options
        );

        if (!response.ok) {
          // ✅ Check if response is ok
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // ✅ Handle case where no videos are found
        if (data.results && data.results.length > 0) {
          setApiData(data.results[0]);
        } else {
          console.log("No videos found for this movie");
          setApiData({
            name: "No trailer available",
            key: "",
            published_at: "",
            type: "",
          });
        }
      } catch (error) {
        console.error("Error fetching video data:", error);
        setApiData({
          name: "Error loading trailer",
          key: "",
          published_at: "",
          type: "",
        });
      } finally {
        setLoading(false); // ✅ Set loading to false regardless of success/failure
      }
    };

    fetchVideoData();
  }, [id]);

  // ✅ Handle add to watchlist with error handling
  const handleAddToWatchlist = async () => {
    try {
      await addToWatchlist(id);
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    }
  };

  if (loading) {
    return (
      <div className="player">
        <p>Loading trailer...</p>
      </div>
    );
  }

  return (
    <div className="player">
      {/* Back Arrow Icon */}
      <img
        onClick={() => navigate(-1)}
        className="back-button"
        src={back_arrow_icon}
        alt="Back"
      />

      {/* Watchlist Icon */}
      <div className="tooltip" onClick={handleAddToWatchlist}>
        <img src={addition} alt="Watchlist" className="watchlist_icon" />
        <span className="tooltip-text">Add to Watchlist</span>
      </div>

      {/* ✅ Only show iframe if we have a valid video key */}
      {apiData.key ? (
        <iframe
          width="90%"
          height="90%"
          src={`https://www.youtube.com/embed/${apiData.key}`}
          title="Trailer"
          allowFullScreen
        ></iframe>
      ) : (
        <div className="no-video">
          <p>No trailer available for this movie</p>
        </div>
      )}

      <div className="player-info">
        <p>{apiData.published_at?.slice(0, 4)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};
