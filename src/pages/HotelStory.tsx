import React from 'react';
import './HotelStory.css';

const HotelStory: React.FC = () => {
  return (
    <div className="hotel-story-page">
      {/* Hero Section */}
      <section className="story-hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>OUR STORY</h1>
            <div className="divider"></div>
            <p>Redefining Luxury Hospitality Since 1995</p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="introduction-section">
        <div className="container">
          <div className="intro-content">
            <div className="intro-text">
              <h2>Where Elegance Meets Excellence</h2>
              <p className="lead">
                For over two decades, Hotel H has been synonymous with unparalleled luxury and exceptional service. 
                Nestled in the heart of Seoul, our boutique hotel represents the perfect harmony between traditional 
                Korean hospitality and contemporary sophistication.
              </p>
              <p>
                Our commitment to excellence extends beyond mere accommodation; we create unforgettable experiences 
                that resonate with discerning travelers from around the world. Every detail, from our meticulously 
                designed interiors to our personalized service, reflects our dedication to providing moments of pure luxury.
              </p>
            </div>
            <div className="intro-image">
              <img src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80" alt="Hotel Lobby" />
            </div>
          </div>
        </div>
      </section>

      {/* Heritage Section */}
      <section className="heritage-section">
        <div className="heritage-bg">
          <div className="container">
            <div className="heritage-content">
              <div className="heritage-text">
                <span className="year">1995</span>
                <h3>A Legacy of Excellence</h3>
                <p>
                  Founded with a vision to create an oasis of tranquility in the bustling metropolis, 
                  Hotel H opened its doors in 1995. From our humble beginnings as a boutique property, 
                  we have grown to become one of Seoul's most prestigious luxury destinations.
                </p>
                <p>
                  Our founders believed that true luxury lies not just in opulent surroundings, 
                  but in the ability to anticipate and exceed every guest's expectations. This philosophy 
                  continues to guide us today.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="philosophy-section">
        <div className="container">
          <div className="philosophy-grid">
            <div className="philosophy-item">
              <div className="philosophy-icon">🏛️</div>
              <h4>Timeless Elegance</h4>
              <p>Our architectural design seamlessly blends classical sophistication with modern comfort, creating spaces that feel both grand and intimate.</p>
            </div>
            <div className="philosophy-item">
              <div className="philosophy-icon">🌟</div>
              <h4>Personalized Service</h4>
              <p>Every member of our team is dedicated to providing anticipatory service that goes beyond expectations, ensuring each stay is truly memorable.</p>
            </div>
            <div className="philosophy-item">
              <div className="philosophy-icon">🍃</div>
              <h4>Sustainable Luxury</h4>
              <p>We believe in responsible hospitality, implementing eco-friendly practices while maintaining the highest standards of luxury and comfort.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="awards-section">
        <div className="container">
          <h2>Recognition & Awards</h2>
          <div className="awards-grid">
            <div className="award-item">
              <div className="award-year">2024</div>
              <h5>International Prestige Hotel Institute</h5>
              <p>Best Luxury Boutique Hotel - Asia</p>
            </div>
            <div className="award-item">
              <div className="award-year">2023</div>
              <h5>Global Luxury Hotel Awards</h5>
              <p>Five-Star Hotel Recognition</p>
            </div>
            <div className="award-item">
              <div className="award-year">2023</div>
              <h5>Prestige Hospitality Review</h5>
              <p>Readers' Choice Awards - Top 10 Hotels in Seoul</p>
            </div>
            <div className="award-item">
              <div className="award-year">2022</div>
              <h5>International Travel Excellence</h5>
              <p>Travelers' Choice Award</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <div className="team-content">
            <div className="team-text">
              <h2>Our Dedicated Team</h2>
              <p className="lead">
                Behind every exceptional experience at Hotel H is our team of passionate hospitality professionals. 
                From our concierge who knows the city's best-kept secrets to our housekeeping staff who ensure 
                every detail is perfect, each team member embodies our commitment to excellence.
              </p>
              <p className="ledby">
                Led by our General Manager with over 20 years of luxury hospitality experience, our team undergoes 
                continuous training to maintain the highest standards of service. We believe that great service 
                comes from genuine care and attention to detail.
              </p>
              <div className="team-stats">
                <div className="stat">
                  <span className="stat-number">150+</span>
                  <span className="stat-label">Dedicated Staff Members</span>
                </div>
                <div className="stat">
                  <span className="stat-number">28</span>
                  <span className="stat-label">Years Average Experience</span>
                </div>
                <div className="stat">
                  <span className="stat-number">12</span>
                  <span className="stat-label">Languages Spoken</span>
                </div>
              </div>
            </div>
            <div className="team-image">
              <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80" alt="Hotel Team" />
            </div>
          </div>
        </div>
      </section>

      {/* Future Vision Section */}
      <section className="vision-section">
        <div className="vision-bg">
          <div className="container">
            <div className="vision-content">
              <h2>Looking Forward</h2>
              <p className="lead">
                As we continue to evolve, our commitment remains unwavering: to provide an extraordinary 
                sanctuary where luxury meets innovation, and where every guest feels truly valued.
              </p>
              <p>
                We are constantly investing in new technologies and sustainable practices to enhance 
                the guest experience while preserving the environment for future generations. 
                Our upcoming renovations will introduce cutting-edge amenities while maintaining 
                the timeless elegance that defines Hotel H.
              </p>
              <div className="vision-quote">
                <blockquote>
                  "Luxury is not about having the most expensive things, but about creating 
                  experiences that money cannot buy."
                </blockquote>
                <cite>— Hotel H Management</cite>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Experience Our Story</h2>
            <p>Discover the luxury and elegance that defines Hotel H. 
            Let us create an unforgettable experience tailored just for you.</p>
            <div className="cta-buttons">
              <a href="/reservation" className="btn-primary">Make a Reservation</a>
              <a href="/contact" className="btn-secondary2">Contact Us</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HotelStory;