import React from 'react';
import './Directions.css';

const Directions: React.FC = () => {
  return (
    <div className="directions-page">
      {/* Hero Section */}
      <section className="directions-hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>LOCATION & DIRECTIONS</h1>
            <div className="divider"></div>
            <p>In the Heart of Seoul's Premium District</p>
          </div>
        </div>
      </section>

      {/* Address & Contact Section */}
      <section className="address-section">
        <div className="container">
          <div className="address-content">
            <div className="address-info">
              <h2>Hotel H Seoul</h2>
              <div className="address-details">
                <div className="detail-item">
                  <div className="icon">📍</div>
                  <div className="info">
                    <h4>Address</h4>
                    <p>123 Gangnam-daero, Gangnam-gu<br />Seoul 06292, South Korea</p>
                  </div>
                </div>
                <div className="detail-item">
                  <div className="icon">📞</div>
                  <div className="info">
                    <h4>Reservations</h4>
                    <p>+82 2 1234-5678</p>
                  </div>
                </div>
                <div className="detail-item">
                  <div className="icon">✉️</div>
                  <div className="info">
                    <h4>Email</h4>
                    <p>reservations@hotel.com</p>
                  </div>
                </div>
                <div className="detail-item">
                  <div className="icon">🕐</div>
                  <div className="info">
                    <h4>Concierge</h4>
                    <p>24 Hours Available</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="map-container">
              <div className="map-placeholder">
                <img src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80" alt="Hotel Location" />
                <div className="map-overlay">
                  <h4>Interactive Map</h4>
                  <p>Click to view in Google Maps</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transportation Section */}
      <section className="transportation-section">
        <div className="container">
          <h2>Transportation Options</h2>
          <div className="transport-grid">
            <div className="transport-card">
              <div className="transport-icon">✈️</div>
              <h3>From Incheon Airport</h3>
              <div className="transport-options">
                <div className="option">
                  <h4>Airport Limousine</h4>
                  <p>Bus 6020 to Gangnam Station<br />
                  <span className="time">45 minutes</span> | <span className="price">₩15,000</span></p>
                </div>
                <div className="option">
                  <h4>AREX Express Train</h4>
                  <p>Airport Express to Seoul Station + Subway<br />
                  <span className="time">60 minutes</span> | <span className="price">₩9,000</span></p>
                </div>
                <div className="option">
                  <h4>Private Transfer</h4>
                  <p>Luxury sedan service available<br />
                  <span className="time">50 minutes</span> | <span className="price">₩120,000</span></p>
                </div>
              </div>
            </div>

            <div className="transport-card">
              <div className="transport-icon">🚇</div>
              <h3>Seoul Subway</h3>
              <div className="transport-options">
                <div className="option">
                  <h4>Line 2 (Green)</h4>
                  <p>Gangnam Station, Exit 10<br />
                  <span className="time">3 minutes walk</span></p>
                </div>
                <div className="option">
                  <h4>Line 9 (Gold)</h4>
                  <p>Sinnonhyeon Station, Exit 5<br />
                  <span className="time">7 minutes walk</span></p>
                </div>
                <div className="option">
                  <h4>Bundang Line</h4>
                  <p>Gangnam Station, Exit 10<br />
                  <span className="time">3 minutes walk</span></p>
                </div>
              </div>
            </div>

            <div className="transport-card">
              <div className="transport-icon">🚗</div>
              <h3>By Car</h3>
              <div className="transport-options">
                <div className="option">
                  <h4>From Seoul Station</h4>
                  <p>Via Namdaemun-ro and Teheran-ro<br />
                  <span className="time">25 minutes</span></p>
                </div>
                <div className="option">
                  <h4>From Myeongdong</h4>
                  <p>Via Jung-gu and Gangnam-daero<br />
                  <span className="time">20 minutes</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parking & Services Section */}
      <section className="services-section">
        <div className="container">
          <div className="services-grid">
            <div className="service-card">
              <div className="service-header">
                <div className="service-icon">🅿️</div>
                <h3>Valet Parking</h3>
              </div>
              <div className="service-content">
                <p>Complimentary valet parking service available 24/7 for all hotel guests.</p>
                <ul>
                  <li>Premium covered parking garage</li>
                  <li>Electric vehicle charging stations</li>
                  <li>Luxury car detailing service</li>
                  <li>Direct elevator access to lobby</li>
                </ul>
                <div className="service-price">Complimentary for guests</div>
              </div>
            </div>

            <div className="service-card">
              <div className="service-header">
                <div className="service-icon">🚖</div>
                <h3>Transportation Services</h3>
              </div>
              <div className="service-content">
                <p>Premium transportation arrangements by our dedicated concierge team.</p>
                <ul>
                  <li>Airport transfer service</li>
                  <li>Luxury sedan rental</li>
                  <li>Helicopter transfers available</li>
                  <li>City tour arrangements</li>
                </ul>
                <div className="service-price">Starting from ₩50,000</div>
              </div>
            </div>

            <div className="service-card">
              <div className="service-header">
                <div className="service-icon">🏢</div>
                <h3>Business Services</h3>
              </div>
              <div className="service-content">
                <p>Convenient access to Seoul's premier business district and shopping areas.</p>
                <ul>
                  <li>5 minutes to COEX Convention Center</li>
                  <li>Walking distance to Gangnam business district</li>
                  <li>Adjacent to premium shopping centers</li>
                  <li>Easy access to Seoul's financial district</li>
                </ul>
                <div className="service-price">Prime location</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Attractions Section */}
      <section className="attractions-section">
        <div className="container">
          <h2>Nearby Attractions</h2>
          <div className="attractions-grid">
            <div className="attraction-item">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Teheran-ro_Yeongdong-daero_crossing_7.jpg/1200px-Teheran-ro_Yeongdong-daero_crossing_7.jpg" alt="Gangnam District" />
              <div className="attraction-content">
                <h4>Gangnam District</h4>
                <p>Seoul's premier shopping and entertainment district</p>
                <span className="distance">2 minutes walk</span>
              </div>
            </div>
            <div className="attraction-item">
              <img src="https://english.seoul.go.kr/wp-content/uploads/2022/03/starfield-library-COEX07.jpg" alt="COEX Mall" />
              <div className="attraction-content">
                <h4>COEX Mall & Aquarium</h4>
                <p>Asia's largest underground shopping mall</p>
                <span className="distance">5 minutes by car</span>
              </div>
            </div>
            <div className="attraction-item">
              <img src="https://www.agoda.com/wp-content/uploads/2024/10/Banpo-Bridge-Seoul-South-Korea-rainbow-fountain-show-featured.jpg" alt="Banpo Bridge" />
              <div className="attraction-content">
                <h4>Banpo Rainbow Bridge</h4>
                <p>Famous fountain show and Han River views</p>
                <span className="distance">10 minutes by car</span>
              </div>
            </div>
            <div className="attraction-item">
              <img src="https://tong.visitkorea.or.kr/cms/resource/99/3048599_image2_1.jpg" alt="Bongeunsa Temple" />
              <div className="attraction-content">
                <h4>Bongeunsa Temple</h4>
                <p>Traditional Buddhist temple in the city center</p>
                <span className="distance">8 minutes walk</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="contact-cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Need Assistance with Directions?</h2>
            <p>Our concierge team is available 24/7 to assist with transportation arrangements 
            and provide detailed directions to ensure your seamless arrival.</p>
            <div className="cta-buttons">
              <a href="/contact" className="btn-primary">Call Concierge</a>
              <a href="/contact" className="btn-secondary3">Send Message</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Directions;