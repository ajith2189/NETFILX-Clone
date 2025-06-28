import React, { useRef, useEffect, useState } from "react";
import "./TitleCard.css";
import { Link } from "react-router-dom";

function TitleCard({ title, category = "now_playing" }) {
  const cardsRef = useRef();
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //fetch data from TMDB
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMThlOGJjZmQ5OGFlNDllYTZkZDg2ZjQwZGRkMmY1ZCIsIm5iZiI6MTc1MDUxMTI5NC43NjMsInN1YiI6IjY4NTZhZWJlY2YyY2E5MzQwMjdlNzg1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pmgKGYDi_OVm_MsQJ3sc9KKbt1N30W4_bJt0kdOh8qA",
    },
  };

  const handleWheel = (event) => {
    event.preventDefault();
    if (cardsRef.current) {
      cardsRef.current.scrollLeft += event.deltaY;
    }
  };

  useEffect(() => {
    // Add loading state and better error handling
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`,
          options
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }

        const data = await response.json();
        setApiData(data.results || []);
        console.log("API Data loaded");
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const currentRef = cardsRef.current;
    if (currentRef) {
      currentRef.addEventListener("wheel", handleWheel);
      return () => {
        currentRef.removeEventListener("wheel", handleWheel);
      };
    }
  }, [apiData]);

  // Add loading and error states
  if (loading) {
    return (
      <div className="title-cards">
        <h2>{title ? title : "Popular on Netflix"}</h2>
        <div style={{ color: "white", padding: "20px" }}>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="title-cards">
        <h2>{title ? title : "Popular on Netflix"}</h2>
        <div style={{ color: "red", padding: "20px" }}>Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500/${card.backdrop_path}`} alt="" />
              <p> {card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default TitleCard;
