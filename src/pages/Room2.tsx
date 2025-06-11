import React from 'react';
import './Room.css';

const Room2: React.FC = () => {
  return (
    <div className="room-page">
      {/* Hero Section */}
      <section className="room-hero deluxe">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>DELUXE ROOM</h1>
            <div className="divider"></div>
            <p>Enhanced Luxury & Sophistication</p>
          </div>
        </div>
      </section>

      {/* Room Overview */}
      <section className="room-overview">
        <div className="container">
          <div className="overview-content">
            <div className="overview-text">
              <h2>Elevated Experience</h2>
              <p className="lead">
                Step into refined luxury with our Deluxe Rooms, featuring expanded space, 
                premium furnishings, and enhanced amenities. These elegantly appointed rooms 
                offer a sophisticated retreat with panoramic city views and exclusive access 
                to our executive lounge services.
              </p>
              <div className="room-specs">
                <div className="spec-item">
                  <div className="spec-icon">📐</div>
                  <div className="spec-info">
                    <h4>Room Size</h4>
                    <p>45 sqm (484 sq ft)</p>
                  </div>
                </div>
                <div className="spec-item">
                  <div className="spec-icon">👥</div>
                  <div className="spec-info">
                    <h4>Occupancy</h4>
                    <p>Up to 3 guests</p>
                  </div>
                </div>
                <div className="spec-item">
                  <div className="spec-icon">🛏️</div>
                  <div className="spec-info">
                    <h4>Bed Type</h4>
                    <p>King bed + Sofa bed</p>
                  </div>
                </div>
                <div className="spec-item">
                  <div className="spec-icon">🏙️</div>
                  <div className="spec-info">
                    <h4>View</h4>
                    <p>Premium city view</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="overview-image">
              <img src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80" alt="Deluxe Room" />
            </div>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="amenities-section">
        <div className="container">
          <h2>Enhanced Amenities</h2>
          <div className="amenities-grid">
            <div className="amenity-category">
              <h3>Bedroom & Living</h3>
              <ul>
                <li>Luxury Italian cotton linens</li>
                <li>Memory foam mattress topper</li>
                <li>Separate seating area with sofa</li>
                <li>Executive work station</li>
                <li>Complimentary premium WiFi</li>
                <li>65" OLED Smart TV</li>
                <li>Nespresso coffee machine</li>
                <li>Mini-bar with premium selections</li>
              </ul>
            </div>
            <div className="amenity-category">
              <h3>Bathroom</h3>
              <ul>
                <li>Marble bathroom with bathtub</li>
                <li>Separate rainfall shower</li>
                <li>Premium Hermès toiletries</li>
                <li>Heated towel rails</li>
                <li>Double vanity with LED mirrors</li>
                <li>Japanese-style toilet</li>
                <li>Bluetooth bathroom speakers</li>
              </ul>
            </div>
            <div className="amenity-category">
              <h3>Technology & Entertainment</h3>
              <ul>
                <li>Tablet for room controls</li>
                <li>Bose sound system</li>
                <li>Streaming service access</li>
                <li>Wireless device charging</li>
                <li>Multiple USB-C ports</li>
                <li>Smart home automation</li>
                <li>VR headset available</li>
              </ul>
            </div>
            <div className="amenity-category">
              <h3>Exclusive Services</h3>
              <ul>
                <li>Executive lounge access</li>
                <li>Priority room service</li>
                <li>Personal concierge</li>
                <li>Complimentary pressing service</li>
                <li>Late checkout (2 PM)</li>
                <li>Welcome amenities</li>
                <li>Complimentary yoga mat</li>
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
              <img src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80" alt="Deluxe Room Overview" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80" alt="Seating Area" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80" alt="Luxury Bathroom" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80" alt="Work Station" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80" alt="City View" />
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
              <div className="rate-card deluxe">
                <div className="rate-header">
                  <h3>Deluxe Room</h3>
                  <div className="rate-price">
                    <span className="currency">₩</span>
                    <span className="amount">180,000</span>
                    <span className="period">per night</span>
                  </div>
                </div>
                <div className="rate-details">
                  <p>Rates include:</p>
                  <ul>
                    <li>Executive lounge access</li>
                    <li>Complimentary breakfast</li>
                    <li>Premium WiFi & entertainment</li>
                    <li>Personal concierge service</li>
                    <li>Late checkout privileges</li>
                  </ul>
                  <p className="rate-note">*Rates exclude taxes and service charges. Seasonal rates may apply.</p>
                </div>
              </div>
            </div>
            <div className="booking-actions">
              <h3>Ready to Book?</h3>
              <p>Indulge in the enhanced luxury of our Deluxe Room</p>
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
          <h2>Exclusive Offers</h2>
          <div className="offers-grid">
            <div className="offer-card premium">
              <div className="offer-badge">VIP</div>
              <h4>Executive Package</h4>
              <p>Includes spa credits and fine dining voucher</p>
              <div className="offer-discount">₩100,000 VALUE</div>
            </div>
            <div className="offer-card premium">
              <div className="offer-badge">Romance</div>
              <h4>Romantic Getaway</h4>
              <p>Champagne, rose petals, and couples massage</p>
              <div className="offer-discount">Special Package</div>
            </div>
            <div className="offer-card premium">
              <div className="offer-badge">Business</div>
              <h4>Corporate Rate</h4>
              <p>Extended executive lounge hours and meeting room access</p>
              <div className="offer-discount">20% OFF</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Room2;