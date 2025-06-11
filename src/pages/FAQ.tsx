import React, { useState } from 'react';
import './FAQ.css';

interface FAQItem {
  id: number;
  category: 'general' | 'reservation' | 'rooms' | 'dining' | 'spa' | 'business' | 'policies';
  question: string;
  answer: string;
  isPopular: boolean;
}

const FAQ: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const faqData: FAQItem[] = [
    {
      id: 1,
      category: 'general',
      question: 'What are the hotel\'s check-in and check-out times?',
      answer: 'Standard check-in time is 3:00 PM and check-out is 12:00 PM. Early check-in and late check-out are subject to availability and may incur additional charges. Premium Room and Presidential Suite guests enjoy complimentary late check-out until 2:00 PM.',
      isPopular: true
    },
    {
      id: 2,
      category: 'reservation',
      question: 'How can I make a reservation?',
      answer: 'You can make a reservation through our website, by calling our reservations team at +82-2-1234-5678, or by emailing reservations@hotelh.com. Our reservation team is available 24/7 to assist you with booking and special requests.',
      isPopular: true
    },
    {
      id: 3,
      category: 'reservation',
      question: 'What is your cancellation policy?',
      answer: 'Cancellations must be made at least 24 hours before the scheduled arrival date to avoid charges. For stays during peak seasons or special events, a 72-hour cancellation notice may be required. Specific cancellation terms will be provided at the time of booking.',
      isPopular: true
    },
    {
      id: 4,
      category: 'rooms',
      question: 'Do all rooms have city views?',
      answer: 'Our Standard Rooms offer either city or garden views, while Deluxe Rooms feature premium city views. Premium Rooms and Presidential Suites provide panoramic city views. Specific view preferences can be requested during booking, subject to availability.',
      isPopular: false
    },
    {
      id: 5,
      category: 'rooms',
      question: 'Are pets allowed in the hotel?',
      answer: 'We welcome well-behaved pets in designated pet-friendly rooms. There is a pet fee of ₩50,000 per night, and pets must be registered at check-in. We provide pet amenities including beds, bowls, and treats. Service animals are always welcome at no additional charge.',
      isPopular: false
    },
    {
      id: 6,
      category: 'dining',
      question: 'What dining options are available?',
      answer: 'Hotel H features three distinctive dining venues: our signature fine dining restaurant with Michelin-starred cuisine, a casual all-day dining cafe, and our rooftop bar with panoramic city views. 24-hour room service is also available for all guests.',
      isPopular: true
    },
    {
      id: 7,
      category: 'dining',
      question: 'Do you accommodate dietary restrictions?',
      answer: 'Absolutely! Our culinary team can accommodate various dietary requirements including vegetarian, vegan, gluten-free, kosher, and halal options. Please inform us of any dietary restrictions at the time of reservation or at least 24 hours in advance.',
      isPopular: false
    },
    {
      id: 8,
      category: 'spa',
      question: 'What spa services do you offer?',
      answer: 'Our award-winning spa offers a comprehensive menu of treatments including traditional Korean therapies, Swedish massages, facial treatments, body wraps, and couple\'s treatments. We also feature a fitness center, sauna, steam room, and indoor pool.',
      isPopular: true
    },
    {
      id: 9,
      category: 'spa',
      question: 'How far in advance should I book spa treatments?',
      answer: 'We recommend booking spa treatments at least 48 hours in advance to ensure availability, especially during weekends and holidays. Same-day appointments may be available based on capacity. Hotel guests receive priority booking.',
      isPopular: false
    },
    {
      id: 10,
      category: 'business',
      question: 'What business facilities are available?',
      answer: 'Our Business Center operates 24/7 with high-speed internet, printing, copying, and secretarial services. We have five meeting rooms and a grand ballroom that can accommodate up to 200 guests. All spaces feature state-of-the-art audiovisual equipment.',
      isPopular: true
    },
    {
      id: 11,
      category: 'business',
      question: 'Do you provide airport transportation?',
      answer: 'Yes, we offer luxury airport transfer service to and from Incheon and Gimpo airports. The service must be arranged in advance and fees apply based on the type of vehicle. Complimentary airport transfers are included for Presidential Suite guests.',
      isPopular: true
    },
    {
      id: 12,
      category: 'policies',
      question: 'What safety measures do you have in place?',
      answer: 'Hotel H maintains the highest safety and security standards with 24/7 security personnel, keycard access systems, in-room safes, and comprehensive health protocols. Our staff is trained in emergency procedures and we comply with all local and international safety regulations.',
      isPopular: false
    },
    {
      id: 13,
      category: 'policies',
      question: 'Is smoking allowed in the hotel?',
      answer: 'Hotel H is a non-smoking property. Smoking is not permitted in any guest rooms, restaurants, or indoor public areas. Designated outdoor smoking areas are available. A cleaning fee of ₩200,000 will be charged for smoking violations in rooms.',
      isPopular: false
    },
    {
      id: 14,
      category: 'general',
      question: 'Do you offer currency exchange services?',
      answer: 'Yes, our concierge can assist with currency exchange for major international currencies. We also have ATMs available in the lobby that accept international cards. Our staff can provide information about nearby banks and exchange centers.',
      isPopular: false
    },
    {
      id: 15,
      category: 'general',
      question: 'What languages does your staff speak?',
      answer: 'Our multilingual staff speaks Korean, English, Japanese, Chinese (Mandarin), and several other languages. Our concierge team is specially trained to assist international guests and can help with translation services when needed.',
      isPopular: true
    },
    {
      id: 16,
      category: 'rooms',
      question: 'What amenities are included in the rooms?',
      answer: 'All rooms feature premium linens, marble bathrooms, high-speed WiFi, smart TVs, mini-bar, coffee/tea facilities, bathrobes, slippers, luxury toiletries, and 24-hour room service. Higher category rooms include additional amenities such as Nespresso machines and premium bath products.',
      isPopular: true
    },
    {
      id: 17,
      category: 'spa',
      question: 'What are the spa and fitness center hours?',
      answer: 'The fitness center is open 24/7 for hotel guests. The spa operates from 6:00 AM to 10:00 PM daily. The indoor pool and sauna are available from 6:00 AM to 11:00 PM. Extended hours may be available for Presidential Suite guests.',
      isPopular: false
    },
    {
      id: 18,
      category: 'reservation',
      question: 'Do you offer group booking discounts?',
      answer: 'Yes, we offer special rates for group bookings of 10 or more rooms. Group packages can include meeting facilities, dining credits, and spa services. Please contact our Group Sales team at groups@hotelh.com for customized proposals and pricing.',
      isPopular: false
    }
  ];

  const categories = [
    { value: 'all', label: 'All Questions', icon: '❓' },
    { value: 'general', label: 'General Info', icon: 'ℹ️' },
    { value: 'reservation', label: 'Reservations', icon: '📅' },
    { value: 'rooms', label: 'Rooms & Suites', icon: '🏨' },
    { value: 'dining', label: 'Dining', icon: '🍽️' },
    { value: 'spa', label: 'Spa & Wellness', icon: '🧘‍♀️' },
    { value: 'business', label: 'Business Services', icon: '💼' },
    { value: 'policies', label: 'Policies', icon: '📋' }
  ];

  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const popularFAQs = faqData.filter(faq => faq.isPopular);

  const toggleExpanded = (id: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const getCategoryInfo = (category: string) => {
    const cat = categories.find(c => c.value === category);
    return cat || { label: 'General', icon: '❓' };
  };

  return (
    <div className="faq-page">
      {/* Hero Section */}
      <section className="faq-hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>FREQUENTLY ASKED QUESTIONS</h1>
            <div className="divider"></div>
            <p>Find answers to common questions about your stay</p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="faq-search">
        <div className="container">
          <div className="search-box">
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Search frequently asked questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="faq-content">
        <div className="container">
          <div className="faq-layout">
            {/* Sidebar */}
            <div className="faq-sidebar">
              <h3>Browse by Category</h3>
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

              {/* Popular Questions */}
              <div className="popular-section">
                <h3>Most Popular</h3>
                <div className="popular-questions">
                  {popularFAQs.slice(0, 5).map(faq => (
                    <button
                      key={faq.id}
                      className="popular-item"
                      onClick={() => {
                        setSelectedCategory('all');
                        setSearchTerm('');
                        toggleExpanded(faq.id);
                      }}
                    >
                      {faq.question}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* FAQ List */}
            <div className="faq-main">
              <div className="faq-header">
                <h2>
                  {selectedCategory === 'all' ? 'All Questions' : getCategoryInfo(selectedCategory).label}
                </h2>
                <div className="faq-count">
                  {filteredFAQs.length} question{filteredFAQs.length !== 1 ? 's' : ''} found
                </div>
              </div>

              {filteredFAQs.length === 0 ? (
                <div className="no-results">
                  <div className="no-results-icon">🔍</div>
                  <h3>No questions found</h3>
                  <p>Try adjusting your search terms or browse by category</p>
                  <button 
                    className="clear-search-btn"
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                    }}
                  >
                    Clear Search
                  </button>
                </div>
              ) : (
                <div className="faq-list">
                  {filteredFAQs.map(faq => (
                    <div
                      key={faq.id}
                      className={`faq-item ${expandedItems.has(faq.id) ? 'expanded' : ''}`}
                    >
                      <button
                        className="faq-question"
                        onClick={() => toggleExpanded(faq.id)}
                      >
                        <div className="question-content">
                          <div className="question-meta">
                            {faq.isPopular && (
                              <span className="popular-badge">Popular</span>
                            )}
                            <span className="category-badge">
                              {getCategoryInfo(faq.category).icon} {getCategoryInfo(faq.category).label}
                            </span>
                          </div>
                          <h3 className="question-text">{faq.question}</h3>
                        </div>
                        <div className="expand-icon">
                          {expandedItems.has(faq.id) ? '−' : '+'}
                        </div>
                      </button>
                      
                      {expandedItems.has(faq.id) && (
                        <div className="faq-answer">
                          <p>{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="faq-contact">
        <div className="container">
          <div className="contact-content">
            <h2>Still Have Questions?</h2>
            <p>Our concierge team is available 24/7 to provide personalized assistance and answer any questions not covered in our FAQ.</p>
            
            <div className="contact-options">
              <div className="contact-option">
                <div className="contact-icon">📞</div>
                <h4>Call Us</h4>
                <p>+82-2-1234-5678</p>
                <span className="availability">24/7 Available</span>
              </div>
              
              <div className="contact-option">
                <div className="contact-icon">✉️</div>
                <h4>Email Us</h4>
                <p>concierge@hotelh.com</p>
                <span className="availability">Response within 2 hours</span>
              </div>
              
              <div className="contact-option">
                <div className="contact-icon">💬</div>
                <h4>Live Chat</h4>
                <p>Instant assistance</p>
                <span className="availability">Available 6 AM - 12 AM</span>
              </div>
            </div>

            <div className="contact-actions">
              <a href="/contact" className="btn-primary">Contact Concierge</a>
              <a href="/reservation" className="btn-secondary">Make Reservation</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;