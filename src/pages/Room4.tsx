import React from 'react';
import './Room.css';

const Room4: React.FC = () => {
  return (
    <div className="room-page">
      {/* Hero Section */}
      <section className="room-hero suite">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>PRESIDENTIAL SUITE</h1>
            <div className="divider"></div>
            <p>The Epitome of Luxury & Grandeur</p>
          </div>
        </div>
      </section>

      {/* Room Overview */}
      <section className="room-overview">
        <div className="container">
          <div className="overview-content">
            <div className="overview-text">
              <h2>Presidential Excellence</h2>
              <p className="lead">
                Experience the ultimate in luxury hospitality with our Presidential Suite. 
                This magnificent residence-style accommodation spans multiple rooms with 
                bespoke furnishings, private terraces, and personalized service that 
                rivals the world's finest hotels. Every detail is crafted for heads of 
                state, celebrities, and discerning guests who demand perfection.
              </p>
              <div className="room-specs">
                <div className="spec-item">
                  <div className="spec-icon">📐</div>
                  <div className="spec-info">
                    <h4>Suite Size</h4>
                    <p>120 sqm (1,292 sq ft)</p>
                  </div>
                </div>
                <div className="spec-item">
                  <div className="spec-icon">👥</div>
                  <div className="spec-info">
                    <h4>Occupancy</h4>
                    <p>Up to 6 guests</p>
                  </div>
                </div>
                <div className="spec-item">
                  <div className="spec-icon">🛏️</div>
                  <div className="spec-info">
                    <h4>Layout</h4>
                    <p>2 Bedrooms + Living suite</p>
                  </div>
                </div>
                <div className="spec-item">
                  <div className="spec-icon">🏙️</div>
                  <div className="spec-info">
                    <h4>View</h4>
                    <p>360° panoramic city view</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="overview-image">
              <img src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80" alt="Presidential Suite" />
            </div>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="amenities-section">
        <div className="container">
          <h2>Presidential Amenities</h2>
          <div className="amenities-grid">
            <div className="amenity-category">
              <h3>Master Suite & Living</h3>
              <ul>
                <li>Bespoke Italian silk linens (1,000 thread count)</li>
                <li>Custom California King bed with adjustable base</li>
                <li>Grand piano in living room</li>
                <li>Private library with rare books</li>
                <li>Dedicated high-speed fiber internet</li>
                <li>85" OLED TV with premium sound system</li>
                <li>Private dining room for 8 guests</li>
                <li>Vintage wine cellar with sommelier service</li>
              </ul>
            </div>
            <div className="amenity-category">
              <h3>Bathroom & Spa</h3>
              <ul>
                <li>Master bathroom with gold fixtures</li>
                <li>Private sauna and steam room</li>
                <li>Infinity bathtub with city views</li>
                <li>Luxury La Prairie spa amenities</li>
                <li>In-suite massage and treatment room</li>
                <li>Private gymnasium with personal trainer</li>
                <li>His & hers walk-in closets</li>
              </ul>
            </div>
            <div className="amenity-category">
              <h3>Technology & Business</h3>
              <ul>
                <li>State-of-the-art home automation</li>
                <li>Private meeting room with video conferencing</li>
                <li>Professional recording studio setup</li>
                <li>Advanced security and privacy systems</li>
                <li>Multiple device charging throughout suite</li>
                <li>Smart glass windows with privacy control</li>
                <li>High-end gaming and entertainment center</li>
              </ul>
            </div>
            <div className="amenity-category">
              <h3>Presidential Services</h3>
              <ul>
                <li>24/7 personal butler and maid service</li>
                <li>Private chef and catering team</li>
                <li>Dedicated concierge and security detail</li>
                <li>Private helicopter landing access</li>
                <li>Luxury fleet transportation</li>
                <li>Personal shopping and styling service</li>
                <li>VIP airport fast-track service</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Suite Features */}
      <section className="suite-features">
        <div className="container">
          <h2>Exclusive Suite Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🏛️</div>
              <h3>Private Terrace</h3>
              <p>Expansive outdoor space with panoramic city views, outdoor dining area, and private garden</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🍽️</div>
              <h3>Private Kitchen</h3>
              <p>Fully equipped gourmet kitchen with professional appliances and personal chef service</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎭</div>
              <h3>Entertainment Room</h3>
              <p>Dedicated entertainment space with home theater, game room, and bar area</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💼</div>
              <h3>Business Center</h3>
              <p>Private office with secure communications, meeting facilities, and administrative support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section">
        <div className="container">
          <h2>Suite Gallery</h2>
          <div className="gallery-grid">
            <div className="gallery-item large">
              <img src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80" alt="Presidential Suite Overview" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80" alt="Master Bedroom" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80" alt="Living Room" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80" alt="Private Dining" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80" alt="Private Terrace" />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section">
        <div className="container">
          <div className="pricing-content">
            <div className="pricing-info">
              <h2>Suite Rates</h2>
              <div className="rate-card suite">
                <div className="rate-header">
                  <h3>Presidential Suite</h3>
                  <div className="rate-price">
                    <span className="currency">₩</span>
                    <span className="amount">250,000</span>
                    <span className="period">per night</span>
                  </div>
                </div>
                <div className="rate-details">
                  <p>Exclusive package includes:</p>
                  <ul>
                    <li>24/7 personal butler & chef service</li>
                    <li>Private helicopter transfers</li>
                    <li>Luxury vehicle fleet access</li>
                    <li>VIP dining experiences</li>
                    <li>Spa & wellness treatments</li>
                    <li>Personal shopping & concierge</li>
                    <li>Security detail if required</li>
                  </ul>
                  <p className="rate-note">*Rates are all-inclusive. Custom packages available upon request.</p>
                </div>
              </div>
            </div>
            <div className="booking-actions">
              <h3>Ready to Book?</h3>
              <p>Experience presidential-level luxury in our exclusive suite</p>
              <div className="action-buttons">
                <a href="/reservation" className="btn-primary">Reserve Suite</a>
                <a href="/contact" className="btn-secondary4">Contact Us</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exclusive Experiences */}
      <section className="offers-section">
        <div className="container">
          <h2>Presidential Experiences</h2>
          <div className="offers-grid">
            <div className="offer-card presidential">
              <div className="offer-badge">Exclusive</div>
              <h4>Royal Treatment</h4>
              <p>Private jet transfers, Michelin-star dining, and VIP cultural experiences</p>
              <div className="offer-discount">All-Inclusive</div>
            </div>
            <div className="offer-card presidential">
              <div className="offer-badge">Bespoke</div>
              <h4>Custom Experience</h4>
              <p>Fully personalized itinerary designed around your preferences</p>
              <div className="offer-discount">Tailored Service</div>
            </div>
            <div className="offer-card presidential">
              <div className="offer-badge">Diplomatic</div>
              <h4>State Visit Package</h4>
              <p>Security detail, diplomatic protocol, and government liaison services</p>
              <div className="offer-discount">VIP Protocol</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Room4;