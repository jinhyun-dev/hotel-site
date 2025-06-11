import React, { useState } from 'react';
import './Events.css';

interface Event {
  id: number;
  title: string;
  category: 'dining' | 'wellness' | 'entertainment' | 'seasonal' | 'business';
  description: string;
  longDescription: string;
  date: string;
  endDate?: string;
  time: string;
  location: string;
  price: string;
  image: string;
  status: 'upcoming' | 'ongoing' | 'past';
  isExclusive: boolean;
  capacity?: string;
  highlights: string[];
}

const Events: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const events: Event[] = [
    {
      id: 1,
      title: 'New Year\'s Eve Gala Dinner',
      category: 'entertainment',
      description: 'Ring in the New Year with an unforgettable evening of luxury dining and entertainment.',
      longDescription: `Join us for the most anticipated event of the year at Hotel H's Grand Ballroom. This black-tie affair features a seven-course tasting menu crafted by our Michelin-starred Executive Chef, paired with premium champagne and wines.

The evening includes live jazz performances, a spectacular midnight champagne toast, and dancing until the early hours. Our sommelier will guide you through exclusive wine pairings, while our pastry chef presents a show-stopping dessert presentation.

Limited to 120 guests, this intimate celebration ensures personalized service and an unforgettable start to the new year.`,
      date: '2024-12-31',
      time: '7:00 PM - 1:00 AM',
      location: 'Grand Ballroom',
      price: '₩350,000 per person',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      status: 'upcoming',
      isExclusive: true,
      capacity: '120 guests',
      highlights: [
        '7-course tasting menu',
        'Premium champagne & wine pairing',
        'Live jazz performance',
        'Midnight champagne toast',
        'Dancing & entertainment'
      ]
    },
    {
      id: 2,
      title: 'Winter Wellness Retreat',
      category: 'wellness',
      description: 'Rejuvenate your body and mind with our comprehensive winter wellness program.',
      longDescription: `Escape the winter blues with our holistic wellness retreat designed to restore balance and vitality. This three-day program combines traditional Korean healing practices with modern spa therapies.

Experience daily yoga sessions overlooking the city, personalized spa treatments using organic ingredients, meditation workshops, and nutritious cuisine designed by our wellness chef. Each day includes different therapeutic activities from forest bathing to thermal therapy.

The retreat includes accommodation in our Premium Rooms, all meals, spa treatments, and wellness activities. Our certified wellness practitioners will guide you through transformative experiences.`,
      date: '2025-01-15',
      endDate: '2025-01-17',
      time: 'Check-in 3:00 PM',
      location: 'Spa & Wellness Center',
      price: '₩1,200,000 per person',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      status: 'upcoming',
      isExclusive: true,
      capacity: '24 guests',
      highlights: [
        '3-day comprehensive program',
        'Premium room accommodation',
        'Daily spa treatments',
        'Yoga & meditation sessions',
        'Wellness cuisine',
        'Personal wellness consultation'
      ]
    },
    {
      id: 3,
      title: 'Executive Chef\'s Table Experience',
      category: 'dining',
      description: 'An intimate culinary journey with our Michelin-starred Executive Chef.',
      longDescription: `Discover the artistry behind our cuisine in this exclusive monthly dining experience. Limited to just 12 guests, the Chef's Table offers unprecedented access to our culinary team and kitchen.

Watch as our Executive Chef prepares a personalized tasting menu, explaining techniques, ingredients, and inspiration behind each dish. This interactive experience includes wine pairings selected by our sommelier and the opportunity to ask questions throughout the evening.

The menu changes monthly to reflect seasonal ingredients and the chef's creative evolution. Past menus have featured rare Japanese wagyu, fresh Korean seafood, and innovative plant-based creations.`,
      date: '2025-01-20',
      time: '6:30 PM - 10:00 PM',
      location: 'Chef\'s Private Kitchen',
      price: '₩450,000 per person',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      status: 'upcoming',
      isExclusive: true,
      capacity: '12 guests',
      highlights: [
        'Interactive cooking demonstration',
        'Personalized tasting menu',
        'Wine pairing by sommelier',
        'Kitchen tour',
        'Recipe cards to take home',
        'Signed cookbook'
      ]
    },
    {
      id: 4,
      title: 'Korean Traditional Culture Night',
      category: 'entertainment',
      description: 'Immerse yourself in Korean heritage with traditional performances and cuisine.',
      longDescription: `Experience the rich cultural heritage of Korea in an elegant evening showcasing traditional arts, music, and cuisine. This monthly cultural event features authentic performances by renowned Korean artists.

The evening begins with a traditional tea ceremony, followed by performances including traditional Korean dance, gayageum (Korean zither) music, and pansori (Korean opera). Guests will enjoy a royal court cuisine dinner prepared according to historical recipes.

Cultural experts will provide insights into Korean history and traditions throughout the evening. Traditional Korean attire is available for guests who wish to participate in the cultural experience.`,
      date: '2025-01-25',
      time: '6:00 PM - 9:30 PM',
      location: 'Heritage Hall',
      price: '₩180,000 per person',
      image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      status: 'upcoming',
      isExclusive: false,
      capacity: '80 guests',
      highlights: [
        'Traditional performances',
        'Royal court cuisine dinner',
        'Tea ceremony experience',
        'Cultural education',
        'Traditional attire available',
        'Souvenir Korean tea set'
      ]
    },
    {
      id: 5,
      title: 'Business Leaders Summit',
      category: 'business',
      description: 'Network with industry leaders in luxury hospitality and business innovation.',
      longDescription: `Join Korea's most influential business leaders for an exclusive networking summit focused on innovation in hospitality and business excellence. This invitation-only event brings together CEOs, entrepreneurs, and thought leaders.

The day-long program includes keynote presentations on industry trends, panel discussions on sustainable business practices, and networking sessions in our Executive Lounge. Lunch and dinner are provided, featuring our signature cuisine.

Previous speakers have included leaders from major Korean conglomerates, international hospitality brands, and innovative startups. Attendees receive exclusive research reports and continue networking through our private business club.`,
      date: '2025-02-10',
      time: '9:00 AM - 8:00 PM',
      location: 'Business Center & Executive Lounge',
      price: 'Invitation Only',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      status: 'upcoming',
      isExclusive: true,
      capacity: '50 executives',
      highlights: [
        'Industry keynote speakers',
        'Executive networking',
        'Business innovation panels',
        'Premium lunch & dinner',
        'Exclusive research reports',
        'Business club membership'
      ]
    },
    {
      id: 6,
      title: 'Valentine\'s Romance Package',
      category: 'seasonal',
      description: 'Celebrate love with our romantic Valentine\'s Day experience.',
      longDescription: `Create unforgettable memories with your special someone during our Valentine's Romance Package. This two-day experience is designed to celebrate love in the most romantic setting.

The package includes accommodation in our Romance Suite with rose petal turndown service, couples spa treatments, private dining experiences, and surprise romantic touches throughout your stay. Our concierge team will arrange special requests to personalize your experience.

Additional romantic activities include private rooftop dining under the stars, couples wine tasting, and a professional photography session to capture your special moments. The experience concludes with breakfast in bed and late checkout.`,
      date: '2025-02-14',
      endDate: '2025-02-15',
      time: 'Check-in 2:00 PM',
      location: 'Romance Suite & Spa',
      price: '₩850,000 per couple',
      image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      status: 'upcoming',
      isExclusive: false,
      capacity: '20 couples',
      highlights: [
        'Romance Suite accommodation',
        'Couples spa treatments',
        'Private rooftop dining',
        'Wine tasting experience',
        'Professional photography',
        'Romantic turndown service'
      ]
    }
  ];

  const categories = [
    { value: 'all', label: 'All Events', icon: '🎪' },
    { value: 'dining', label: 'Dining Experiences', icon: '🍽️' },
    { value: 'wellness', label: 'Wellness & Spa', icon: '🧘‍♀️' },
    { value: 'entertainment', label: 'Entertainment', icon: '🎭' },
    { value: 'seasonal', label: 'Seasonal Events', icon: '🌸' },
    { value: 'business', label: 'Business Events', icon: '💼' }
  ];

  const filteredEvents = selectedCategory === 'all' 
    ? events 
    : events.filter(event => event.category === selectedCategory);

  const formatDate = (dateString: string, endDateString?: string) => {
    const date = new Date(dateString);
    const formatted = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    if (endDateString) {
      const endDate = new Date(endDateString);
      const endFormatted = endDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric'
      });
      return `${formatted} - ${endFormatted}`;
    }
    
    return formatted;
  };

  const getCategoryInfo = (category: string) => {
    const cat = categories.find(c => c.value === category);
    return cat || { label: 'General', icon: '📅' };
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming': return { text: 'Upcoming', class: 'upcoming' };
      case 'ongoing': return { text: 'Now Open', class: 'ongoing' };
      case 'past': return { text: 'Past Event', class: 'past' };
      default: return { text: 'Event', class: 'default' };
    }
  };

  return (
    <div className="events-page">
      {/* Hero Section */}
      <section className="events-hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>EXCLUSIVE EVENTS</h1>
            <div className="divider"></div>
            <p>Extraordinary Experiences & Unforgettable Moments</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="events-content">
        <div className="container">
          {/* Category Filter */}
          <div className="category-section">
            <h2>Browse by Category</h2>
            <div className="category-grid">
              {categories.map(category => (
                <button
                  key={category.value}
                  className={`category-card ${selectedCategory === category.value ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.value)}
                >
                  <span className="category-icon">{category.icon}</span>
                  <span className="category-label">{category.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Events Grid */}
          <div className="events-section">
            <div className="section-header">
              <h2>
                {selectedCategory === 'all' ? 'All Events' : getCategoryInfo(selectedCategory).label}
              </h2>
              <div className="events-count">
                {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} available
              </div>
            </div>

            <div className="events-grid">
              {filteredEvents.map(event => (
                <div key={event.id} className="event-card">
                  <div className="event-image">
                    <img src={event.image} alt={event.title} />
                    <div className="event-badges">
                      <span className={`status-badge ${getStatusBadge(event.status).class}`}>
                        {getStatusBadge(event.status).text}
                      </span>
                      {event.isExclusive && (
                        <span className="exclusive-badge">Exclusive</span>
                      )}
                    </div>
                    <div className="event-category-badge">
                      {getCategoryInfo(event.category).icon} {getCategoryInfo(event.category).label}
                    </div>
                  </div>
                  
                  <div className="event-details">
                    <h3 className="event-title">{event.title}</h3>
                    <p className="event-description">{event.description}</p>
                    
                    <div className="event-info">
                      <div className="info-item">
                        <span className="info-icon">📅</span>
                        <span>{formatDate(event.date, event.endDate)}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-icon">🕐</span>
                        <span>{event.time}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-icon">📍</span>
                        <span>{event.location}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-icon">💰</span>
                        <span>{event.price}</span>
                      </div>
                      {event.capacity && (
                        <div className="info-item">
                          <span className="info-icon">👥</span>
                          <span>{event.capacity}</span>
                        </div>
                      )}
                    </div>

                    <div className="event-actions">
                      <button 
                        className="btn-details"
                        onClick={() => setSelectedEvent(event)}
                      >
                        View Details
                      </button>
                      <button className="btn-reserve">
                        Reserve Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="event-modal-overlay" onClick={() => setSelectedEvent(null)}>
          <div className="event-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedEvent(null)}>×</button>
            
            <div className="modal-image">
              <img src={selectedEvent.image} alt={selectedEvent.title} />
            </div>
            
            <div className="modal-content">
              <div className="modal-header">
                <h2>{selectedEvent.title}</h2>
                <div className="modal-badges">
                  <span className={`status-badge ${getStatusBadge(selectedEvent.status).class}`}>
                    {getStatusBadge(selectedEvent.status).text}
                  </span>
                  {selectedEvent.isExclusive && (
                    <span className="exclusive-badge">Exclusive</span>
                  )}
                </div>
              </div>
              
              <div className="modal-info-grid">
                <div className="info-item">
                  <span className="info-icon">📅</span>
                  <span>{formatDate(selectedEvent.date, selectedEvent.endDate)}</span>
                </div>
                <div className="info-item">
                  <span className="info-icon">🕐</span>
                  <span>{selectedEvent.time}</span>
                </div>
                <div className="info-item">
                  <span className="info-icon">📍</span>
                  <span>{selectedEvent.location}</span>
                </div>
                <div className="info-item">
                  <span className="info-icon">💰</span>
                  <span>{selectedEvent.price}</span>
                </div>
              </div>
              
              <div className="modal-description">
                {selectedEvent.longDescription.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              
              <div className="modal-highlights">
                <h4>Event Highlights</h4>
                <ul>
                  {selectedEvent.highlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              </div>
              
              <div className="modal-actions">
                <button className="btn-primary">Reserve Your Spot</button>
                <button className="btn-secondary">Contact Concierge</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="events-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Create Unforgettable Memories?</h2>
            <p>Our events team is ready to help you reserve your spot or create a custom experience tailored to your preferences.</p>
            <div className="cta-buttons">
              <a href="/contact" className="btn-primary">Contact Events Team</a>
              <a href="/contact" className="btn-secondary">Call Now</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;