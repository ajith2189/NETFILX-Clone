import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import { Player } from "./Pages/Player/Player";
import { onAuthStateChanged } from "firebase/auth/cordova";
import { auth } from "./firebase";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Wishlist  from "./Pages/WishList/Wishlist";

export default function App() {
  //using navigate to go to the exact  page
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("logged in");
        navigate("/");
      } else {
        console.log("logged out");
        navigate("/login");
      }
    });
  }, []);

  return (
    <>
      <ToastContainer theme="dark" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/player/:id" element={<Player />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </>
  );
}
