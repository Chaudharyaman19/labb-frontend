import React, { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import "../../websitecss/css/navbar.css";
import newlogo from "../../websiteimages/assets/newlogo.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <nav className="main-navbar">
      <ul className={`nav-links ${menuOpen ? "show" : ""}`}>
        <li onClick={() => scrollToSection("home")}>Home</li>
        <li onClick={() => scrollToSection("about")}>About</li>
        <li onClick={() => scrollToSection("category")}>Services</li>
        <li onClick={() => scrollToSection("featuredoctor")}>Doctors</li>
        {/* <li onClick={() => scrollToSection("metdoctor")}>Blog</li> */}
        <Link to="/blog" style={{ textDecoration: "none", color: "white" }}>
          {" "}
          <li>Blog</li>
        </Link>
        <li onClick={() => scrollToSection("footer")}>Contact</li>
      </ul>

      {/* <div className="nav-actions">
        <span className="login-register">
          <span className="flexuser">
            <FaRegUser className="user" />
            <span>Login</span> / <span>Register</span>
          </span>
        </span>
        <button className="appointment-btn">
          Take Appointment <FiArrowRight className="btn-icon" />
        </button>
      </div> */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          width: "100%",
          height: "70px",
          justifyContent: "space-between",
        }}
      >
        <div
          className="menu-icon"
          onClick={() => setMenuOpen((prev) => !prev)}
          style={{ color: "white" }}
        >
          {menuOpen ? <IoMdClose size={40} /> : <GiHamburgerMenu size={30} />}
        </div>
        <div>
          <img
            className="m"
            src={newlogo}
            alt="lofo"
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
