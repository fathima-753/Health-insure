import React, { useState, useRef } from 'react';
import './Navbar.css';


const Navbar = () => {
  const [dropdown, setDropdown] = useState(null); // Tracks the active dropdown menu
  const timeoutRef = useRef(null); 

  const showDropdown = (menu) => {
    clearTimeout(timeoutRef.current); 
    setDropdown(menu);
  };

  // Function to hide the dropdown after 5 seconds
  const hideDropdown = () => {
    timeoutRef.current = setTimeout(() => {
      setDropdown(null); // Hide the dropdown after 5 seconds
    },900); // 5-second delay
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Health Insurance</div>
      <ul className="navbar-links">
        <li><a href="Home.js">Home</a></li>
        <li 
          className="dropdown"
          onMouseEnter={() => showDropdown('patient')} // Show dropdown on hover
          onMouseLeave={hideDropdown} // Start hiding timer on leave
        >
          <a href="#patient">Patient</a>
          {dropdown === 'patient' && (
            <ul className="dropdown-menu">
            <li><a href="/patient/register">Registration</a></li>
             <li><a href="/patient/login">Login</a></li>
            </ul>
          )}
        </li>
        <li 
          className="dropdown"
          onMouseEnter={() => showDropdown('company')}
          onMouseLeave={hideDropdown}
        >
          <a href="#insurance">Company</a>
          {dropdown === 'company' && (
            <ul className="dropdown-menu">
              <li><a href="/company/register">Registration</a></li>
              <li><a href="/company/login">Login</a></li>
            </ul>
          )}
        </li>
        <li 
          className="dropdown"
          onMouseEnter={() => showDropdown('hospital')}
          onMouseLeave={hideDropdown}
        >
          <a href="#admin">Hospital</a>
          {dropdown === 'hospital' && (
            <ul className="dropdown-menu">
              <li><a href="/hospital/register">Registration</a></li>
              <li><a href="/hospital/login">Login</a></li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
