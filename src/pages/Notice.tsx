import React, { useState } from 'react';
import './Notice.css';

interface NoticeItem {
  id: number;
  category: 'general' | 'event' | 'service' | 'urgent';
  title: string;
  content: string;
  date: string;
  isImportant: boolean;
}

const Notice: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);

  const notices: NoticeItem[] = [
    {
      id: 1,
      category: 'urgent',
      title: 'Holiday Season Special Operating Hours',
      content: `Dear Valued Guests,

Please be advised that during the holiday season (December 24-26, 2024), our hotel services will operate under special hours:

• Front Desk: 24/7 (No changes)
• Restaurant: 6:00 AM - 11:00 PM
• Spa & Wellness Center: 8:00 AM - 8:00 PM
• Business Center: 7:00 AM - 9:00 PM
• Valet Parking: Available 24/7

Room service will continue to be available around the clock. We appreciate your understanding and wish you a wonderful holiday season.

Best regards,
Hotel H Management`,
      date: '2024-12-15',
      isImportant: true
    },
    {
      id: 2,
      category: 'service',
      title: 'Spa & Wellness Center Renovation Complete',
      content: `We are delighted to announce the completion of our Spa & Wellness Center renovation.

New features include:
• State-of-the-art treatment rooms with premium amenities
• Expanded relaxation areas with panoramic city views
• New signature treatments featuring Korean traditional wellness practices
• Advanced fitness equipment and personal training services
• Meditation and yoga studio with expert instructors

To celebrate the reopening, we are offering 20% off all spa treatments through January 31, 2025.

For reservations, please contact our Spa Concierge at ext. 1234.`,
      date: '2024-12-10',
      isImportant: false
    },
    {
      id: 3,
      category: 'event',
      title: 'New Year\'s Eve Gala Dinner - Limited Seats Available',
      content: `Join us for an unforgettable New Year's Eve celebration at Hotel H.

Event Details:
• Date: December 31, 2024
• Time: 7:00 PM - 1:00 AM
• Venue: Grand Ballroom
• Dress Code: Black Tie

The evening includes:
• Welcome champagne reception
• Seven-course tasting menu by our Executive Chef
• Live jazz performance
• Midnight champagne toast
• Party favors and entertainment

Price: ₩350,000 per person (exclusive of taxes and service charge)

Limited seats available. For reservations, please call +82-2-1234-5678 or visit our concierge desk.`,
      date: '2024-12-08',
      isImportant: true
    },
    {
      id: 4,
      category: 'general',
      title: 'Enhanced Contactless Services Now Available',
      content: `We are pleased to introduce our new contactless service options for your convenience and safety:

Digital Services:
• Mobile check-in/check-out via Hotel H app
• Digital room key accessible through smartphone
• QR code menus for in-room dining
• Contactless payment options
• Virtual concierge services

Traditional services remain available for guests who prefer personal assistance. Our staff is always ready to help with a warm smile.

Download the Hotel H app from the App Store or Google Play to get started.`,
      date: '2024-12-05',
      isImportant: false
    },
    {
      id: 5,
      category: 'service',
      title: 'Executive Lounge Hours Extension',
      content: `Based on guest feedback, we are extending our Executive Lounge operating hours:

New Hours:
• Monday - Friday: 6:00 AM - 11:00 PM
• Saturday - Sunday: 6:00 AM - 12:00 AM

Enhanced Services:
• Extended breakfast service until 11:00 AM on weekends
• All-day refreshments and snacks
• Evening cocktail hour: 5:30 PM - 7:30 PM
• Late evening light bites: 9:00 PM - 11:00 PM

These changes are effective immediately and apply to all Deluxe Room, Premium Room, and Presidential Suite guests.`,
      date: '2024-12-01',
      isImportant: false
    },
    {
      id: 6,
      category: 'event',
      title: 'Winter Culinary Festival - December Special Menu',
      content: `Discover the flavors of winter at our exclusive Culinary Festival throughout December.

Featured Experiences:
• Weekly themed dinners featuring seasonal ingredients
• Guest chef collaborations with Michelin-starred restaurants
• Wine pairing dinners with premium selections
• Cooking classes with our Executive Chef
• Traditional Korean winter delicacies

Special Menu Highlights:
• Truffle and mushroom tasting menu
• Fresh winter seafood selections
• Premium Korean BBQ experience
• Artisanal winter desserts

Reservations recommended. Contact our restaurant at ext. 2345 for bookings and more information.`,
      date: '2024-11-28',
      isImportant: false
    }
  ];

  const categories = [
    { value: 'all', label: 'All Announcements', icon: '📢' },
    { value: 'urgent', label: 'Important Updates', icon: '🚨' },
    { value: 'service', label: 'Service Updates', icon: '🔧' },
    { value: 'event', label: 'Events & Offers', icon: '🎉' },
    { value: 'general', label: 'General News', icon: '📰' }
  ];

  const filteredNotices = selectedCategory === 'all' 
    ? notices 
    : notices.filter(notice => notice.category === selectedCategory);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryLabel = (category: string) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.label : 'General';
  };

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.icon : '📰';
  };

  return (
    <div className="notice-page">
      {/* Hero Section */}
      <section className="notice-hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>HOTEL ANNOUNCEMENTS</h1>
            <div className="divider"></div>
            <p>Stay Updated with Our Latest News & Services</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="notice-content">
        <div className="container">
          <div className="notice-layout">
            {/* Sidebar */}
            <div className="notice-sidebar">
              <h3>Categories</h3>
              <div className="category-filters">
                {categories.map(category => (
                  <button
                    key={category.value}
                    className={`category-btn ${selectedCategory === category.value ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category.value)}
                  >
                    <span className="category-icon">{category.icon}</span>
                    <span className="category-label">{category.label}</span>
                  </button>
                ))}
              </div>

              {/* Quick Links */}
              <div className="quick-links">
                <h3>Quick Links</h3>
                <div className="links-list">
                  <a href="/reservation" className="quick-link">
                    <span className="link-icon">📅</span>
                    Make Reservation
                  </a>
                  <a href="/contact" className="quick-link">
                    <span className="link-icon">📞</span>
                    Contact Concierge
                  </a>
                  <a href="/rooms" className="quick-link">
                    <span className="link-icon">🏨</span>
                    View Rooms
                  </a>
                  <a href="/directions" className="quick-link">
                    <span className="link-icon">📍</span>
                    Directions
                  </a>
                </div>
              </div>
            </div>

            {/* Notice List */}
            <div className="notice-main">
              <div className="notice-header">
                <h2>
                  {selectedCategory === 'all' ? 'All Announcements' : getCategoryLabel(selectedCategory)}
                </h2>
                <div className="notice-count">
                  {filteredNotices.length} announcement{filteredNotices.length !== 1 ? 's' : ''}
                </div>
              </div>

              <div className="notices-list">
                {filteredNotices.map(notice => (
                  <div
                    key={notice.id}
                    className={`notice-item ${notice.isImportant ? 'important' : ''} ${selectedNotice?.id === notice.id ? 'active' : ''}`}
                    onClick={() => setSelectedNotice(selectedNotice?.id === notice.id ? null : notice)}
                  >
                    <div className="notice-item-header">
                      <div className="notice-meta">
                        <span className="notice-category">
                          {getCategoryIcon(notice.category)} {getCategoryLabel(notice.category)}
                        </span>
                        {notice.isImportant && (
                          <span className="important-badge">Important</span>
                        )}
                      </div>
                      <div className="notice-date">{formatDate(notice.date)}</div>
                    </div>
                    <h3 className="notice-title">{notice.title}</h3>
                    {selectedNotice?.id === notice.id && (
                      <div className="notice-content-expanded">
                        <div className="content-text">
                          {notice.content.split('\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="notice-expand-hint">
                      {selectedNotice?.id === notice.id ? 'Click to collapse' : 'Click to read more'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="notice-contact">
        <div className="container">
          <div className="contact-content">
            <h2>Need More Information?</h2>
            <p>Our concierge team is available 24/7 to assist you with any questions or special requests.</p>
            <div className="contact-options">
              <a href="/contact" className="contact-btn primary">
                📞 Call Concierge
              </a>
              <a href="/contact" className="contact-btn secondary">
                ✉️ Send Message
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Notice;