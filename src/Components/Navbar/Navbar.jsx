import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import logo from "/src/assets/logo.png";
import bell_icon from "/src/assets/bell_icon.svg";
import profile_img from "/src/assets/profile_img.png";
import search_icon from "/src/assets/search_icon.svg";
import caret_icon from "/src/assets/caret_icon.svg";
import { logout } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Navbar() {
  const auth = getAuth(); // ✅ Call the function
  const navigate = useNavigate();
  const navRef = useRef();
  const [userEmail, setUserEmail] = useState(""); // ✅ State for user email

  useEffect(() => {
    // ✅ Listen for authentication state changes and updates UI accordingly 
    // always change when user change status and also looks for who is logedin

    // unsubscribe as name because this returns a function used to unsubscribe
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail("");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth]);

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
          <li onClick={() => navigate('/wishlist')}>My List</li>
          <li>Browse by Language</li>
        </ul>
      </div>

      <div className="navbar-right">
        <img src={search_icon} alt="Search" className="icons" />
        <p>{userEmail.split("@")[0]}</p> {/* ✅ Display user email from state */}
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