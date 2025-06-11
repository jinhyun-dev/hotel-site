import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleMouseEnter = (menu: string) => {
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <h1>H</h1>
          </Link>
        </div>
        <nav className="nav">
          <ul className="nav-list">
            <li 
              className="nav-item"
              onMouseEnter={() => handleMouseEnter('about')}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="/about">ABOUT</Link>
              {activeDropdown === 'about' && (
                <ul className="dropdown-menu">
                  <li><Link to="/hotel-story">Our Story</Link></li>
                  <li><Link to="/directions">Location & Directions</Link></li>
                </ul>
              )}
            </li>
            
            <li 
              className="nav-item"
              onMouseEnter={() => handleMouseEnter('rooms')}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="/rooms">ROOMS</Link>
              {activeDropdown === 'rooms' && (
                <ul className="dropdown-menu">
                  <li><Link to="/room1">STANDARD ROOM</Link></li>
                  <li><Link to="/room2">DELUXE ROOM</Link></li>
                  <li><Link to="/room3">PREMIUM ROOM</Link></li>
                  <li><Link to="/room4">PRESIDENTIAL SUITE</Link></li>
                </ul>
              )}
            </li>
            
            <li 
              className="nav-item"
              onMouseEnter={() => handleMouseEnter('reservation')}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="/reservation">RESERVATION</Link>
              {activeDropdown === 'reservation' && (
                <ul className="dropdown-menu">
                  <li><Link to="/booking">Booking Information</Link></li>
                  <li><Link to="/realtime-booking">Make Reservation</Link></li>
                </ul>
              )}
            </li>
            
            <li 
              className="nav-item"
              onMouseEnter={() => handleMouseEnter('community')}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="/community">COMMUNITY</Link>
              {activeDropdown === 'community' && (
                <ul className="dropdown-menu">
                  <li><Link to="/notice">Hotel Announcements</Link></li>
                  <li><Link to="/events">Exclusive Events</Link></li>
                  <li><Link to="/faq">Guest Services FAQ</Link></li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;