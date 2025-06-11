import React, { useState, useEffect, useRef } from 'react';
import './Home.css';

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Rooms section scroll states
  const [roomsScrollLeft, setRoomsScrollLeft] = useState(0);
  const [isRoomsDragging, setIsRoomsDragging] = useState(false);
  const [roomsStartX, setRoomsStartX] = useState(0);
  const [roomsCurrentX, setRoomsCurrentX] = useState(0);
  const roomsScrollRef = useRef<HTMLDivElement>(null);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{src: string, alt: string} | null>(null);
  
  const heroImages = [
    'https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
  ];

  const roomImages = [
    {
      src: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200&q=80',
      alt: 'Standard Room',
      title: 'Standard Room'
    },
    {
      src: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200&q=80',
      alt: 'Deluxe Room',
      title: 'Deluxe Room'
    },
    {
      src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200&q=80',
      alt: 'Premium Room',
      title: 'Premium Room'
    },
    {
      src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200&q=80',
      alt: 'Suite Room',
      title: 'Suite Room'
    },
    {
      src: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200&q=80',
      alt: 'Luxury Suite',
      title: 'Luxury Suite'
    },
    {
      src: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200&q=80',
      alt: 'Executive Room',
      title: 'Executive Room'
    },
    {
      src: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200&q=80',
      alt: 'Royal Suite',
      title: 'Royal Suite'
    }
  ];

  // Modal functions
  const openModal = (imageData: {src: string, alt: string, title?: string}, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isRoomsDragging) { // 드래그 중이 아닐 때만 모달 열기
      setSelectedImage(imageData);
      setIsModalOpen(true);
      document.body.style.overflow = 'hidden'; // 배경 스크롤 방지
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = 'unset'; // 배경 스크롤 복원
  };

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isModalOpen]);

  // 컴포넌트 언마운트 시 body 스타일 복원
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // 자동 슬라이드 기능 (4초마다 변경)
  const startAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!isDragging) {
        setCurrentSlide((prev) => (prev + 1) % heroImages.length);
      }
    }, 4000);
  };

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [heroImages.length, isDragging]);

  // 점 클릭으로 슬라이드 변경
  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
    startAutoSlide(); // 자동 슬라이드 재시작
  };

  // Hero section 마우스/터치 드래그 이벤트 핸들러
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setCurrentX(clientX);
    if (intervalRef.current) clearInterval(intervalRef.current); // 드래그 중 자동 슬라이드 멈춤
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    setCurrentX(clientX);
    const diff = clientX - startX;
    setDragOffset(diff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    
    const diff = currentX - startX;
    const threshold = 50; // 최소 드래그 거리
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // 오른쪽으로 드래그 - 이전 슬라이드
        setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
      } else {
        // 왼쪽으로 드래그 - 다음 슬라이드
        setCurrentSlide((prev) => (prev + 1) % heroImages.length);
      }
    }
    
    setIsDragging(false);
    setDragOffset(0);
    startAutoSlide(); // 드래그 완료 후 자동 슬라이드 재시작
  };

  // Hero section 마우스 이벤트
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleDragEnd();
    }
  };

  // Hero section 터치 이벤트
  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  // Rooms section 드래그 이벤트 핸들러
  const handleRoomsDragStart = (clientX: number) => {
    setIsRoomsDragging(true);
    setRoomsStartX(clientX);
    setRoomsCurrentX(clientX);
    if (roomsScrollRef.current) {
      setRoomsScrollLeft(roomsScrollRef.current.scrollLeft);
    }
  };

  const handleRoomsDragMove = (clientX: number) => {
    if (!isRoomsDragging || !roomsScrollRef.current) return;
    setRoomsCurrentX(clientX);
    const diff = roomsStartX - clientX;
    roomsScrollRef.current.scrollLeft = roomsScrollLeft + diff;
  };

  const handleRoomsDragEnd = () => {
    setIsRoomsDragging(false);
  };

  // Rooms section 마우스 이벤트
  const handleRoomsMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleRoomsDragStart(e.clientX);
  };

  const handleRoomsMouseMove = (e: React.MouseEvent) => {
    handleRoomsDragMove(e.clientX);
  };

  const handleRoomsMouseUp = () => {
    handleRoomsDragEnd();
  };

  const handleRoomsMouseLeave = () => {
    if (isRoomsDragging) {
      handleRoomsDragEnd();
    }
  };

  // Rooms section 터치 이벤트
  const handleRoomsTouchStart = (e: React.TouchEvent) => {
    handleRoomsDragStart(e.touches[0].clientX);
  };

  const handleRoomsTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    handleRoomsDragMove(e.touches[0].clientX);
  };

  const handleRoomsTouchEnd = () => {
    handleRoomsDragEnd();
  };

  return (
    <div className="home">
      {/* Hero Section with Auto Swiper */}
      <section className="hero-section">
        <div 
          className="hero-slider"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${image})`,
                transform: isDragging ? `translateX(${dragOffset}px)` : 'translateX(0)',
                transition: isDragging ? 'none' : 'opacity 1s ease-in-out, transform 0.3s ease'
              }}
            />
          ))}
        </div>
        
        <div className="hero-content">
          <h1>SWEET MOMENT</h1>
          <button className="see-more-btn">SEE MORE</button>
        </div>
        
        <div className="hero-dots">
          {heroImages.map((_, index) => ( 
            <span
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </section>

      {/* Rooms Section with Free Mode */}
      <section className="rooms-section">
        <div className="container">
          <h2 className="section-title">ROOMS</h2>
          <div 
            className="rooms-grid2"
            ref={roomsScrollRef}
            onMouseDown={handleRoomsMouseDown}
            onMouseMove={handleRoomsMouseMove}
            onMouseUp={handleRoomsMouseUp}
            onMouseLeave={handleRoomsMouseLeave}
            onTouchStart={handleRoomsTouchStart}
            onTouchMove={handleRoomsTouchMove}
            onTouchEnd={handleRoomsTouchEnd}
            style={{ cursor: isRoomsDragging ? 'grabbing' : 'grab' }}
          >
            {roomImages.map((room, index) => (
              <div 
                key={index}
                className="room-card"
                onClick={(e) => openModal(room, e)}
              >
                <img 
                  src={room.src} 
                  alt={room.alt}
                  draggable={false}
                />
                <div className="room-card-overlay">
                  <h3>{room.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Section */}
      <section className="event-section">
        <div className="container">
          <h2 className="section-title">EVENT</h2>
          <div className="event-grid">
            <div className="event-card">
              <div className="event-image">
                <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80" alt="봄 휴가 이벤트" />
              </div>
              <h3>Spring Getaway Experience</h3>
            </div>
            <div className="event-card">
              <div className="event-image">
                <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80" alt="5월 호스팅 신청" />
              </div>
              <h3>May Signature Events</h3>
            </div>
            <div className="event-card">
              <div className="event-image">
                <img src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80" alt="새로운 객실을 기대해 주세요" />
              </div>
              <h3>Discover Our New Accommodations</h3>
            </div>
            <div className="event-card">
              <div className="event-image">
                <img src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80" alt="스위트 프로그램 할인" />
              </div>
              <h3>Exclusive Spa Wellness Packages</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Best Hotel Section */}
      <section className="best-hotel-section">
        <div className="best-hotel-overlay">
          <div className="container">
            <div className="award-icon">🏆</div>
            <h2>2024 BEST HOTEL</h2>
            <p>Celebrated for excellence, where every stay becomes a memory.<br />
            Experience more than just luxury — discover the art of living.<br />
            </p>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {isModalOpen && selectedImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-image-container">
              <img src={selectedImage.src} alt={selectedImage.alt} />
            </div>
            <div className="modal-info">
              <h3>{selectedImage.title || selectedImage.alt}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;