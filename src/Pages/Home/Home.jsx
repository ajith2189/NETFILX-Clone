import React from "react";
import "./Home.css";
import Navbar from "../../Components/Navbar/Navbar";
import hero_title from "../../assets/hero_title.png";
import hero_banner from "../../assets/hero_banner.jpg";
import play_icon from "../../assets/play_icon.png";
import info_icon from "../../assets/info_icon.png";
import TitleCard from "../../Components/TitleCard/TitleCard";
import Footer from "../../Components/Footer/Footer";

export default function Home() {
  return (
    <div className="home">
      <Navbar />
      <div className="hero">
        <img src={hero_banner} alt="" className="banner-img" />

        <div className="hero-caption">
          <img src={hero_title} alt="" className="caption-img" />
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt nam
            iure,
          </p>
          <div className="hero-btns">
            <button className="btn">
              <img src={play_icon} />
              play
            </button>

            <button className="btn dark-btn">
              <img src={info_icon} />
              More Info
            </button>
          </div>
          <TitleCard title={"Popular"} category={"popular"} />
        </div>
      </div>
      <div className="more-cards">
        <TitleCard title={"Top Rated"} category ={"top_rated"} />
        <TitleCard title={"Upcoming"} category ={"upcoming"} />
        <TitleCard title={"Now Playing"} category ={"now_playing"} />
        <TitleCard />
      </div>
      <Footer />
    </div>
  );
}
