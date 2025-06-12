import React from 'react';
import './Room.css';

const Room3: React.FC = () => {
  return (
    <div className="room-page">
      {/* Hero Section */}
      <section className="room-hero premium">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>PREMIUM ROOM</h1>
            <div className="divider"></div>
            <p>Unparalleled Luxury & Prestige</p>
          </div>
        </div>
      </section>

      {/* Room Overview */}
      <section className="room-overview">
        <div className="container">
          <div className="overview-content">
            <div className="overview-text">
              <h2>Premium Excellence</h2>
              <p className="lead">
                Discover the pinnacle of luxury accommodation in our Premium Rooms. 
                These spacious sanctuaries feature designer furnishings, premium materials, 
                and bespoke amenities. With dedicated butler service and exclusive access 
                to our club floor, every moment is crafted for the discerning traveler.
              </p>
              <div className="room-specs">
                <div className="spec-item">
                  <div className="spec-icon">📐</div>
                  <div className="spec-info">
                    <h4>Room Size</h4>
                    <p>60 sqm (646 sq ft)</p>
                  </div>
                </div>
                <div className="spec-item">
                  <div className="spec-icon">👥</div>
                  <div className="spec-info">
                    <h4>Occupancy</h4>
                    <p>Up to 4 guests</p>
                  </div>
                </div>
                <div className="spec-item">
                  <div className="spec-icon">🛏️</div>
                  <div className="spec-info">
                    <h4>Bed Type</h4>
                    <p>King bed + Living area</p>
                  </div>
                </div>
                <div className="spec-item">
                  <div className="spec-icon">🏙️</div>
                  <div className="spec-info">
                    <h4>View</h4>
                    <p>Panoramic city view</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="overview-image">
              <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80" alt="Premium Room" />
            </div>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="amenities-section">
        <div className="container">
          <h2>Premium Amenities</h2>
          <div className="amenities-grid">
            <div className="amenity-category">
              <h3>Bedroom & Living</h3>
              <ul>
                <li>Hand-woven silk linens from France</li>
                <li>Custom-made mattress with memory foam</li>
                <li>Separate living room with dining area</li>
                <li>Designer furniture by Italian craftsmen</li>
                <li>Complimentary ultra-high-speed WiFi</li>
                <li>75" QLED Smart TV with surround sound</li>
                <li>Professional espresso machine</li>
                <li>Premium champagne & wine selection</li>
              </ul>
            </div>
            <div className="amenity-category">
              <h3>Bathroom</h3>
              <ul>
                <li>Carrara marble bathroom suite</li>
                <li>Jacuzzi tub with chromotherapy</li>
                <li>Steam shower with aromatherapy</li>
                <li>Luxury La Mer toiletries</li>
                <li>Heated marble floors throughout</li>
                <li>Smart mirror with TV integration</li>
                <li>His & hers vanity areas</li>
              </ul>
            </div>
            <div className="amenity-category">
              <h3>Technology & Entertainment</h3>
              <ul>
                <li>Smart home automation system</li>
                <li>Bang & Olufsen sound system</li>
                <li>Private streaming library</li>
                <li>Wireless projection screen</li>
                <li>Multiple device charging stations</li>
                <li>Voice-controlled room features</li>
                <li>Gaming console with premium titles</li>
              </ul>
            </div>
            <div className="amenity-category">
              <h3>VIP Services</h3>
              <ul>
                <li>Dedicated butler service</li>
                <li>Club floor lounge access</li>
                <li>Private check-in/check-out</li>
                <li>Complimentary airport transfers</li>
                <li>24-hour in-room dining</li>
                <li>Personal shopping service</li>
                <li>Helicopter transfer available</li>
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
              <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80" alt="Premium Room Overview" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80" alt="Living Area" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80" alt="Luxury Bathroom" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80" alt="Dining Area" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80" alt="Panoramic View" />
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
              <div className="rate-card premium">
                <div className="rate-header">
                  <h3>Premium Room</h3>
                  <div className="rate-price">
                    <span className="currency">₩</span>
                    <span className="amount">200,000</span>
                    <span className="period">per night</span>
                  </div>
                </div>
                <div className="rate-details">
                  <p>Rates include:</p>
                  <ul>
                    <li>Dedicated butler service</li>
                    <li>Club floor lounge privileges</li>
                    <li>Complimentary airport transfers</li>
                    <li>Premium dining experiences</li>
                    <li>Spa treatment credits</li>
                    <li>Private check-in service</li>
                  </ul>
                  <p className="rate-note">*Rates exclude taxes and service charges. Seasonal rates may apply.</p>
                </div>
              </div>
            </div>
            <div className="booking-actions">
              <h3>Ready to Book?</h3>
              <p>Immerse yourself in the ultimate luxury of our Premium Room</p>
              <div className="action-buttons">
                <a href="/reservation" className="btn-primary">Book Now</a>
                <a href="/contact" className="btn-secondary4">Contact Us</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="offers-section">
        <div className="container">
          <h2>Exclusive Experiences</h2>
          <div className="offers-grid">
            <div className="offer-card luxury">
              <div className="offer-badge">Platinum</div>
              <h4>Ultimate Experience</h4>
              <p>Private chef, spa treatments, and luxury transfers</p>
              <div className="offer-discount">₩300,000 VALUE</div>
            </div>
            <div className="offer-card luxury">
              <div className="offer-badge">Cultural</div>
              <h4>Seoul Discovery</h4>
              <p>Private guided tours and cultural experiences</p>
              <div className="offer-discount">Exclusive Access</div>
            </div>
            <div className="offer-card luxury">
              <div className="offer-badge">Wellness</div>
              <h4>Wellness Retreat</h4>
              <p>Spa treatments, yoga sessions, and healthy cuisine</p>
              <div className="offer-discount">Holistic Package</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Room3;