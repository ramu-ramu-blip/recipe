import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Favorites from "./pages/Favorites";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Procedure from "./pages/Procedure";
import Footer from "./pages/Footer";
import "./index.css";

export default function App() {
  const location = useLocation();

  
  const hideLayout = ["/", "/login"].includes(location.pathname);

  return (
    <>
    
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/procedure/:id" element={<Procedure />} />
      </Routes>

      
      {!hideLayout && <Footer />}
    </>
  );
}
