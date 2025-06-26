import React, { useEffect, useRef } from "react";
import "./Navbar.css";
import logo from "/src/assets/logo.png";
import bell_icon from "/src/assets/bell_icon.svg";
import profile_img from "/src/assets/profile_img.png";
import search_icon from "/src/assets/search_icon.svg";
import caret_icon from "/src/assets/caret_icon.svg";
import { logout } from "../../firebase";

export default function Navbar() {
  const navRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add("nav-dark");
      } else {
        navRef.current.classList.remove("nav-dark");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={navRef} className="navbar">
      <div className="navbar-left">
        <img className="logo" src={logo} alt="Netflix Logo" />
        <ul>
          <li>Home</li>
          <li>TV Series</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Language</li>
        </ul>
      </div>

      <div className="navbar-right">
        <img src={search_icon} alt="Search" className="icons" />
        <p>Children</p>
        <img src={bell_icon} alt="Notifications" className="icons" />

        <div className="navbar-profile">
          <img src={profile_img} alt="Profile" className="profile" />
          <img src={caret_icon} alt="Dropdown" />

          <div className="dropdown">
            <p onClick={logout}>Sign out from Netflix</p>
          </div>
        </div>
      </div>
    </div>
  );
}
