import React from 'react';
import './Room.css';

const Room1: React.FC = () => {
  return (
    <div className="room-page">
      {/* Hero Section */}
      <section className="room-hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>STANDARD ROOM</h1>
            <div className="divider"></div>
            <p>Comfort & Elegance Redefined</p>
          </div>
        </div>
      </section>

      {/* Room Overview */}
      <section className="room-overview">
        <div className="container">
          <div className="overview-content">
            <div className="overview-text">
              <h2>Sophisticated Comfort</h2>
              <p className="lead">
                Our Standard Rooms offer the perfect blend of comfort and style, featuring 
                contemporary design elements and premium amenities. Each room is thoughtfully 
                appointed with modern furnishings and luxurious touches that ensure a 
                memorable stay in the heart of Seoul.
              </p>
              <div className="room-specs">
                <div className="spec-item">
                  <div className="spec-icon">📐</div>
                  <div className="spec-info">
                    <h4>Room Size</h4>
                    <p>35 sqm (377 sq ft)</p>
                  </div>
                </div>
                <div className="spec-item">
                  <div className="spec-icon">👥</div>
                  <div className="spec-info">
                    <h4>Occupancy</h4>
                    <p>Up to 2 guests</p>
                  </div>
                </div>
                <div className="spec-item">
                  <div className="spec-icon">🛏️</div>
                  <div className="spec-info">
                    <h4>Bed Type</h4>
                    <p>King or Twin beds</p>
                  </div>
                </div>
                <div className="spec-item">
                  <div className="spec-icon">🏙️</div>
                  <div className="spec-info">
                    <h4>View</h4>
                    <p>City or Garden view</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="overview-image">
              <img src="https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80" alt="Standard Room" />
            </div>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="amenities-section">
        <div className="container">
          <h2>Room Amenities</h2>
          <div className="amenities-grid">
            <div className="amenity-category">
              <h3>Bedroom & Living</h3>
              <ul>
                <li>Premium Egyptian cotton linens</li>
                <li>Hypoallergenic pillows and duvet</li>
                <li>Blackout curtains</li>
                <li>Work desk with ergonomic chair</li>
                <li>Complimentary high-speed WiFi</li>
                <li>55" LED Smart TV</li>
                <li>Individual climate control</li>
                <li>In-room safe</li>
              </ul>
            </div>
            <div className="amenity-category">
              <h3>Bathroom</h3>
              <ul>
                <li>Marble bathroom with rainfall shower</li>
                <li>Premium toiletries by L'Occitane</li>
                <li>Plush bathrobes and slippers</li>
                <li>Hair dryer and magnifying mirror</li>
                <li>Heated bathroom floors</li>
                <li>Separate vanity area</li>
                <li>Fresh towels twice daily</li>
              </ul>
            </div>
            <div className="amenity-category">
              <h3>Technology & Entertainment</h3>
              <ul>
                <li>Universal charging stations</li>
                <li>Bluetooth sound system</li>
                <li>International cable channels</li>
                <li>Video on demand</li>
                <li>Digital newspaper access</li>
                <li>Multi-language TV channels</li>
                <li>Gaming console available on request</li>
              </ul>
            </div>
            <div className="amenity-category">
              <h3>Services</h3>
              <ul>
                <li>24-hour room service</li>
                <li>Daily housekeeping</li>
                <li>Turndown service</li>
                <li>Laundry and dry cleaning</li>
                <li>Concierge services</li>
                <li>Wake-up call service</li>
                <li>Complimentary shoeshine</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section">
        <div className="container">
          <h2>Room Gallery</h2>
          <div className="gallery-grid">
            <div className="gallery-item large">
              <img src="https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80" alt="Standard Room Overview" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80" alt="Bedroom Detail" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80" alt="Bathroom" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80" alt="Work Area" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80" alt="City View" />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section">
        <div className="container">
          <div className="pricing-content">
            <div className="pricing-info">
              <h2>Room Rates</h2>
              <div className="rate-card">
                <div className="rate-header">
                  <h3>Standard Room</h3>
                  <div className="rate-price">
                    <span className="currency">₩</span>
                    <span className="amount">150,000</span>
                    <span className="period">per night</span>
                  </div>
                </div>
                <div className="rate-details">
                  <p>Rates include:</p>
                  <ul>
                    <li>Complimentary WiFi</li>
                    <li>Daily housekeeping</li>
                    <li>Access to fitness center</li>
                    <li>24-hour concierge service</li>
                  </ul>
                  <p className="rate-note">*Rates exclude taxes and service charges. Seasonal rates may apply.</p>
                </div>
              </div>
            </div>
            <div className="booking-actions">
              <h3>Ready to Book?</h3>
              <p>Experience the comfort and elegance of our Standard Room</p>
              <div className="action-buttons">
                <a href="/reservation" className="btn-primary">Book Now</a>
                <a href="/contact" className="btn-secondary">Contact Us</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="offers-section">
        <div className="container">
          <h2>Special Offers</h2>
          <div className="offers-grid">
            <div className="offer-card">
              <div className="offer-badge">Limited Time</div>
              <h4>Early Bird Special</h4>
              <p>Book 30 days in advance and save 15% on your stay</p>
              <div className="offer-discount">15% OFF</div>
            </div>
            <div className="offer-card">
              <div className="offer-badge">Weekend</div>
              <h4>Weekend Getaway</h4>
              <p>Stay 2 nights and get complimentary breakfast for two</p>
              <div className="offer-discount">FREE Breakfast</div>
            </div>
            <div className="offer-card">
              <div className="offer-badge">Extended Stay</div>
              <h4>Weekly Package</h4>
              <p>Stay 7 nights and get the 7th night complimentary</p>
              <div className="offer-discount">1 Night FREE</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Room1;