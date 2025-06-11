import React, { useState, useEffect } from 'react';
import './RealtimeBooking.css';

interface Room {
  id: number;
  name: string;
  name_eng: string;
  area: number;
  capacity: number;
  min: number;
  desc: string;
  desc_eng: string;
  images: any[];
}

interface Season {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
}

interface Holiday {
  id: number;
  holiday_name: string;
  holiday_date: string;
}

interface Price {
  id: number;
  room_id: number;
  season_id: number;
  weekday_price: number;
  weekend_price: number;
  holiday_price: number;
}

interface Reservation {
  id: number;
  customer_name: string;
  phone_number: string;
  room_id: number;
  check_in_date: string;
  check_out_date: string;
  number_of_guests: number;
  total_price: number;
}

interface BookingForm {
  additionalGuests: number;
  guestName: string;
  phoneNumber: string;
}

const RealtimeBooking: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [prices, setPrices] = useState<Price[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [selectedDates, setSelectedDates] = useState<{
    checkIn: Date | null;
    checkOut: Date | null;
  }>({ checkIn: null, checkOut: null });
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [bookingForm, setBookingForm] = useState<BookingForm>({
    additionalGuests: 0,
    guestName: '',
    phoneNumber: ''
  });
  const [selectingCheckOut, setSelectingCheckOut] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  // KST 기준 현재 날짜 가져오기
  const getKSTDate = (): Date => {
    const now = new Date();
    const kstOffset = 9 * 60; // KST는 UTC+9
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const kst = new Date(utc + (kstOffset * 60000));
    kst.setHours(0, 0, 0, 0); // 시간 부분 제거
    return kst;
  };

  // KST 날짜를 YYYY-MM-DD 형식으로 변환 (사용자 화면용)
  const formatKSTDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // KST 날짜를 UTC 형식으로 변환 (서버 저장용)
  const formatDateForServer = (kstDate: Date): string => {
    // KST 날짜를 UTC로 변환
    const utcDate = new Date(kstDate.getTime() - (9 * 60 * 60 * 1000));
    return utcDate.toISOString().split('T')[0];
  };

  // UTC 날짜 문자열을 KST Date 객체로 변환 (서버 데이터 읽기용)
  const parseUTCToKST = (utcDateString: string): Date => {
    const utcDate = new Date(utcDateString + 'T00:00:00Z');
    const kstDate = new Date(utcDate.getTime() + (9 * 60 * 60 * 1000));
    return kstDate;
  };

  // KST 날짜 문자열을 KST Date 객체로 변환 (로컬 처리용)
  const parseKSTDate = (dateString: string): Date => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  // 객실별 이미지 URL을 반환하는 함수
  const getRoomImageUrl = (room: Room): string => {
    const roomNameLower = room.name_eng.toLowerCase();
    
    if (roomNameLower.includes('standard')) {
      return 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80';
    } else if (roomNameLower.includes('deluxe')) {
      return 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80';
    } else if (roomNameLower.includes('premium')) {
      return 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80';
    } else if (roomNameLower.includes('suite')) {
      return 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80';
    }
    
    // 기본 이미지 (스탠다드)
    return 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80';
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Data fetching started...');
        
        // 먼저 개별 엔드포인트들 확인
        const endpoints = [
          'http://localhost:3001/rooms',
          'http://localhost:3001/season', 
          'http://localhost:3001/holiday',
          'http://localhost:3001/price',
          'http://localhost:3001/reservation'
        ];
        
        for (const endpoint of endpoints) {
          try {
            const response = await fetch(endpoint);
            console.log(`${endpoint}: ${response.status} ${response.ok ? '✅' : '❌'}`);
          } catch (err) {
            console.log(`${endpoint}: Connection failed ❌`);
          }
        }
        
        // 실제 데이터 가져오기
        const [roomsRes, seasonsRes, holidaysRes, pricesRes, reservationsRes] = await Promise.all([
          fetch('http://localhost:3001/rooms'),
          fetch('http://localhost:3001/season'),
          fetch('http://localhost:3001/holiday'),
          fetch('http://localhost:3001/price'),
          fetch('http://localhost:3001/reservation')
        ]);

        const roomsData = await roomsRes.json();
        const seasonsData = await seasonsRes.json();
        const holidaysData = await holidaysRes.json();
        const pricesData = await pricesRes.json();
        const reservationsData = await reservationsRes.json();
        
        console.log('Rooms data:', roomsData);
        console.log('Seasons data:', seasonsData);
        console.log('Reservations data:', reservationsData);
        
        setRooms(roomsData);
        setSeasons(seasonsData);
        setHolidays(holidaysData);
        setPrices(pricesData);
        setReservations(reservationsData);
        setLoading(false);
      } catch (error) {
        console.error('Individual endpoint failure:', error);
        
        // 대안으로 /db 엔드포인트 시도
        try {
          console.log('Trying /db endpoint...');
          const response = await fetch('http://localhost:3001/db');
          console.log(`/db response: ${response.status} ${response.ok ? '✅' : '❌'}`);
          
          const data = await response.json();
          console.log('/db data:', data);
          
          setRooms(data.rooms || []);
          setSeasons(data.season || []);
          setHolidays(data.holiday || []);
          setPrices(data.price || []);
          setReservations(data.reservation || []);
          setLoading(false);
        } catch (fallbackError) {
          console.error('Fallback endpoint also failed:', fallbackError);
          setLoading(false);
        }
      }
    };

    fetchData();
  }, []);

  // 룸 타입별 기본 가격을 반환하는 함수
  const getBaseRoomPrice = (roomId: number): number => {
    const room = rooms.find(r => r.id === roomId);
    if (!room) return 150000;
    
    const roomNameLower = room.name_eng.toLowerCase();
    
    if (roomNameLower.includes('standard')) {
      return 150000;
    } else if (roomNameLower.includes('deluxe')) {
      return 180000;
    } else if (roomNameLower.includes('premium')) {
      return 200000;
    } else if (roomNameLower.includes('suite')) {
      return 250000;
    }
    
    return 150000; // 기본값
  };

  // KST 기준 날짜별 가격 계산 함수
  const calculateDatePrice = (kstDate: Date, roomId: number): number => {
    const dateStr = formatKSTDate(kstDate);
    
    // 공휴일 체크 (KST 기준)
    const isHoliday = holidays.some(holiday => holiday.holiday_date === dateStr);
    
    // 주말 체크 (토요일: 6, 일요일: 0)
    const isWeekend = kstDate.getDay() === 0 || kstDate.getDay() === 6;
    
    // 시즌 체크 (KST 기준)
    const currentSeason = seasons.find(season => {
      const startDate = parseKSTDate(season.start_date);
      const endDate = parseKSTDate(season.end_date);
      return kstDate >= startDate && kstDate <= endDate;
    });
    
    const seasonId = currentSeason ? currentSeason.id : 1; // 기본값은 비수기
    
    // 해당 객실의 가격 정보 찾기
    const priceInfo = prices.find(price => 
      price.room_id === roomId && price.season_id === seasonId
    );
    
    if (!priceInfo) return getBaseRoomPrice(roomId); // 룸 타입별 기본 가격
    
    if (isHoliday) {
      return priceInfo.holiday_price;
    } else if (isWeekend) {
      return priceInfo.weekend_price;
    } else {
      return priceInfo.weekday_price;
    }
  };

  // KST 기준 총 가격 계산 (기준 2명 + 추가 인원별 20% 추가)
  const calculateTotalPrice = (): number => {
    if (!selectedRoom || !selectedDates.checkIn || !selectedDates.checkOut) {
      return 0;
    }

    let total = 0;
    const current = new Date(selectedDates.checkIn);
    
    while (current < selectedDates.checkOut) {
      const basePrice = calculateDatePrice(current, selectedRoom.id);
      const additionalPrice = basePrice * 0.2 * bookingForm.additionalGuests;
      total += basePrice + additionalPrice;
      current.setDate(current.getDate() + 1);
    }
    
    return total;
  };

  // KST 기준으로 날짜가 예약 가능한지 체크
  const isDateAvailable = (kstDate: Date): boolean => {
    if (!selectedRoom) return true;
    
    return !reservations.some(reservation => {
      if (reservation.room_id !== selectedRoom.id) return false;
      
      // UTC로 저장된 예약 데이터를 KST로 변환하여 비교
      const checkInDate = parseUTCToKST(reservation.check_in_date);
      const checkOutDate = parseUTCToKST(reservation.check_out_date);
      
      // 체크인 날짜부터 체크아웃 날짜까지 모두 예약 불가
      return kstDate >= checkInDate && kstDate <= checkOutDate;
    });
  };

  const handleRoomSelect = (room: Room) => {
    setSelectedRoom(room);
    setStep(2);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    while (current <= lastDay || current.getDay() !== 0 || days.length < 42) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
      if (days.length >= 42) break;
    }
    
    return days;
  };

  const formatDate = (date: Date) => {
    return `${date.getFullYear()} ${String(date.getMonth() + 1).padStart(2, '0')}`;
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  const isDateInRange = (date: Date) => {
    if (!selectedDates.checkIn || !selectedDates.checkOut) return false;
    return date >= selectedDates.checkIn && date <= selectedDates.checkOut;
  };

  const handleDateClick = (date: Date) => {
    const today = getKSTDate(); // KST 기준 오늘 날짜
    
    if (date < today || !isDateAvailable(date)) return;

    if (!selectedDates.checkIn || selectingCheckOut) {
      if (!selectedDates.checkIn) {
        setSelectedDates({ checkIn: date, checkOut: null });
        setSelectingCheckOut(true);
      } else {
        if (date <= selectedDates.checkIn) {
          setSelectedDates({ checkIn: date, checkOut: null });
        } else {
          // 체크인과 체크아웃 사이에 예약 불가능한 날짜가 있는지 확인
          let canBook = true;
          const checkDate = new Date(selectedDates.checkIn);
          checkDate.setDate(checkDate.getDate() + 1);
          
          while (checkDate <= date) {
            if (!isDateAvailable(checkDate)) {
              canBook = false;
              break;
            }
            checkDate.setDate(checkDate.getDate() + 1);
          }
          
          if (canBook) {
            setSelectedDates({ ...selectedDates, checkOut: date });
            setSelectingCheckOut(false);
          } else {
            setSelectedDates({ checkIn: date, checkOut: null });
            setSelectingCheckOut(true);
          }
        }
      }
    } else {
      setSelectedDates({ checkIn: date, checkOut: null });
      setSelectingCheckOut(true);
    }
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const canProceedToBooking = () => {
    return selectedDates.checkIn && selectedDates.checkOut;
  };

  // KST 기준 숙박 일수 계산 함수
  const calculateStayDays = (): number => {
    if (!selectedDates.checkIn || !selectedDates.checkOut) return 0;
    
    const timeDifference = selectedDates.checkOut.getTime() - selectedDates.checkIn.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    
    return daysDifference;
  };

  // 예약하기 버튼 클릭 핸들러 (KST 기준 6일 이상 체크)
  const handleBookingButtonClick = () => {
    if (!canProceedToBooking()) {
      alert('Please select both check-in and check-out dates.');
      return;
    }
    
    const stayDays = calculateStayDays(); // KST 기준으로 계산
    console.log('Stay days (KST basis):', stayDays);
    
    // 6일 이상 예약 제한 체크 (KST 기준)
    if (stayDays >= 6) {
      console.log('6+ days booking - showing warning modal');
      setShowWarningModal(true);
      return;
    }
    
    // 5박 이하인 경우 다음 단계로
    console.log('5 nights or less - proceeding to next step');
    setStep(3);
  };

  const handleBookingSubmit = async () => {
    if (!selectedRoom || !selectedDates.checkIn || !selectedDates.checkOut || !bookingForm.guestName || !bookingForm.phoneNumber) {
      alert('Please fill in all required information.');
      return;
    }
    
    const totalGuests = 2 + bookingForm.additionalGuests;
    
    if (totalGuests > 4) {
      alert(`Maximum occupancy is 4 guests per room.`);
      return;
    }

    // KST 날짜를 UTC 형식으로 변환하여 서버에 저장
    const newReservation = {
      customer_name: bookingForm.guestName,
      phone_number: bookingForm.phoneNumber,
      room_id: selectedRoom.id,
      check_in_date: formatDateForServer(selectedDates.checkIn), // UTC로 변환
      check_out_date: formatDateForServer(selectedDates.checkOut), // UTC로 변환
      number_of_guests: totalGuests,
      total_price: calculateTotalPrice()
    };

    console.log('Sending reservation data (UTC format):', newReservation);

    try {
      const response = await fetch('http://localhost:3001/reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReservation)
      });

      if (response.ok) {
        setShowCompleteModal(true);
        // 3초 후 자동으로 모달 닫고 초기화
        setTimeout(() => {
          setShowCompleteModal(false);
          // 초기화
          setStep(1);
          setSelectedRoom(null);
          setSelectedDates({ checkIn: null, checkOut: null });
          setBookingForm({ additionalGuests: 0, guestName: '', phoneNumber: '' });
          setSelectingCheckOut(false);
        }, 3000);
      } else {
        throw new Error('Booking failed');
      }
    } catch (error) {
      console.error('Error processing booking:', error);
      alert('An error occurred while processing your booking. Please try again.');
    }
  };

  // 경고 모달 확인 버튼 핸들러
  const handleWarningModalConfirm = () => {
    console.log('Warning modal confirm button clicked');
    setShowWarningModal(false);
    // 체크아웃 날짜 초기화하고 다시 선택하도록 함
    setSelectedDates(prev => ({ ...prev, checkOut: null }));
    setSelectingCheckOut(true);
  };

  if (loading) {
    return (
      <div className="realtime-booking-page">
        <div className="loading">Loading data...</div>
      </div>
    );
  }

  // 1단계: 객실 선택 화면
  if (step === 1) {
    return (
      <div className="realtime-booking-page">
        <section className="booking-hero">
          <div className="hero-overlay">
            <h1>RESERVATION</h1>
            <div className="divider"></div>
            <p>Real-time Booking</p>
          </div>
        </section>

        <section className="room-selection-section">
          <div className="container">
            <h2>Select Room</h2>
            
            <div className="rooms-grid">
              {rooms.map((room, index) => (
                <div 
                  key={room.id} 
                  className={`room-card2 room-type-${index + 1}`}
                  onClick={() => handleRoomSelect(room)}
                >
                  <div className="room-image">
                    <div className="room-overlay">
                      <h3>{room.name_eng.toUpperCase()}</h3>
                      <div className="arrow">→</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="booking-info">
              <h3>Cancellation & Refund Policy</h3>
              <ul>
                <li>Cancellation is available without charge until 6:00 PM one day before the reservation date.</li>
                <li>After 6:00 PM one day before / same day / no-show: 100% of room rate + cancellation fee will be charged.</li>
                <li>- Peak season: 80% of the first day's room rate will be charged as penalty.</li>
                <li>- Off-peak season (excluding peak season): 10% of the first day's room rate will be charged as penalty.</li>
                <li>Some packages may have separate cancellation policies.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // 2단계: 날짜 선택 화면
  if (step === 2) {
    const days = getDaysInMonth(currentMonth);
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = getKSTDate(); // KST 기준 오늘 날짜

    return (
      <div className="realtime-booking-page">
        <section className="booking-hero">
          <div className="hero-overlay">
            <h1>RESERVATION</h1>
            <div className="divider"></div>
            <p>Real-time Booking</p>
          </div>
        </section>
        
        <section className="calendar-section">
          <div className="container">
            <div className="calendar-layout">
              <div className="room-info-side">
                <div className="selected-room-card2">
                  <h3>{selectedRoom?.name_eng.toUpperCase()}</h3>
                  <div className="room-image-small">
                    <img src={selectedRoom ? getRoomImageUrl(selectedRoom) : ''} alt={selectedRoom?.name} />
                  </div>
                  <p className="room-description">{selectedRoom?.desc}</p>
                  <div className="room-price">
                    <span className="price-label">Base rate per night</span>
                    <span className="price">{selectedDates.checkIn ? calculateDatePrice(selectedDates.checkIn, selectedRoom.id).toLocaleString() : getBaseRoomPrice(selectedRoom.id).toLocaleString()} KRW</span>
                  </div>
                </div>
                
                <div className="guest-selection">
                  <h4>Additional Guests</h4>
                  <div className="guest-input">
                    <button 
                      className="guest-btn"
                      onClick={() => setBookingForm(prev => ({ ...prev, additionalGuests: Math.max(0, prev.additionalGuests - 1) }))}
                    >
                      -
                    </button>
                    <span className="guest-count">{bookingForm.additionalGuests}</span>
                    <button 
                      className="guest-btn"
                      onClick={() => setBookingForm(prev => ({ ...prev, additionalGuests: Math.min(2, prev.additionalGuests + 1) }))}
                    >
                      +
                    </button>
                  </div>
                  <p className="capacity-info">Base 2 guests + additional guests (max 4)</p>
                  {bookingForm.additionalGuests > 0 && (
                    <p className="additional-cost-info">20% additional charge per extra guest</p>
                  )}
                </div>

                <div className="total-price">
                  <h4>Total Amount</h4>
                  <span className="total-amount">{calculateTotalPrice().toLocaleString()} KRW</span>
                  {selectedDates.checkIn && selectedDates.checkOut && (
                    <p className="nights-info">
                      {calculateStayDays()} nights {calculateStayDays() + 1} days
                    </p>
                  )}
                </div>

                <button 
                  className="back-btn"
                  onClick={() => setStep(1)}
                >
                  Back
                </button>
              </div>

              <div className="calendar-main">
                <div className="calendar-header">
                  <button className="nav-btn" onClick={handlePrevMonth}>‹</button>
                  <h3>{formatDate(currentMonth)}</h3>
                  <button className="nav-btn" onClick={handleNextMonth}>›</button>
                </div>

                <div className="calendar-grid">
                  <div className="weekdays">
                    {weekDays.map(day => (
                      <div key={day} className="weekday">{day}</div>
                    ))}
                  </div>
                  
                  <div className="days-grid">
                    {days.map((date, index) => {
                      const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
                      const isPast = date < today;
                      const isCheckIn = selectedDates.checkIn && isSameDay(date, selectedDates.checkIn);
                      const isCheckOut = selectedDates.checkOut && isSameDay(date, selectedDates.checkOut);
                      const isInRange = isDateInRange(date);
                      const isUnavailable = !isDateAvailable(date) && isCurrentMonth && !isPast;
                      const isHoliday = holidays.some(holiday => holiday.holiday_date === formatKSTDate(date));
                      const isSunday = date.getDay() === 0;
                      
                      return (
                        <div
                          key={index}
                          className={`calendar-day ${!isCurrentMonth ? 'other-month' : ''} ${isPast ? 'past' : ''} ${isCheckIn ? 'check-in' : ''} ${isCheckOut ? 'check-out' : ''} ${isInRange ? 'in-range' : ''} ${isUnavailable ? 'unavailable' : ''} ${isHoliday ? 'holiday' : ''} ${isSunday ? 'sunday' : ''}`}
                          onClick={() => isCurrentMonth && !isPast && !isUnavailable && handleDateClick(date)}
                        >
                          <span className="day-number">{date.getDate()}</span>
                          {isCheckIn && <span className="check-label">Check-in</span>}
                          {isCheckOut && <span className="check-label">Check-out</span>}
                          {isUnavailable && <span className="unavailable-label">Unavailable</span>}
                          {isHoliday && isCurrentMonth && <span className="holiday-dot"></span>}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Calendar Legend */}
                <div className="calendar-legend">
                  <div className="legend-item">
                    <span className="legend-dot holiday-legend"></span>
                    <span className="legend-text">Holiday</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot unavailable-legend"></span>
                    <span className="legend-text">Unavailable</span>
                  </div>
                </div>

                <div className="booking-actions">
                  <button 
                    className={`next-btn ${canProceedToBooking() ? 'active' : ''}`}
                    onClick={handleBookingButtonClick}
                    disabled={!canProceedToBooking()}
                  >
                    Make Reservation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Warning Modal - 7일 이상 예약 경고 */}
        {showWarningModal && (
          <div className="modal-overlay">
            <div className="warning-modal">
              <h3>You cannot book for 7 or more days.</h3>
              <button 
                className="modal-confirm-btn" 
                onClick={handleWarningModalConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 3단계: 예약 폼 화면
  return (
    <div className="realtime-booking-page">
      <section className="booking-hero">
        <div className="hero-overlay">
          <h1>RESERVATION</h1>
          <div className="divider"></div>
          <p>Real-time Booking</p>
        </div>
      </section>
      
      <section className="booking-form-section">
        <div className="container">
          <div className="form-layout">
            <div className="form-main">
              <h2>Booking Registration</h2>
              
              <div className="form-grid">
                <div className="form-group">
                  <label>ROOM</label>
                  <div className="form-value">{selectedRoom?.name_eng.toUpperCase()}</div>
                </div>

                <div className="form-group">
                  <label>Additional Guests</label>
                  <div className="form-value">{bookingForm.additionalGuests} guests (Base 2 + {bookingForm.additionalGuests} additional)</div>
                </div>

                <div className="form-group">
                  <label>Guest Name</label>
                  <input
                    type="text"
                    placeholder="Please enter the guest name"
                    value={bookingForm.guestName}
                    onChange={(e) => setBookingForm(prev => ({ ...prev, guestName: e.target.value }))}
                    className={!bookingForm.guestName ? 'error' : ''}
                  />
                  {!bookingForm.guestName && <span className="error-text">This field is required.</span>}
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    placeholder="Please enter your phone number"
                    value={bookingForm.phoneNumber}
                    onChange={(e) => setBookingForm(prev => ({ ...prev, phoneNumber: e.target.value }))}
                    className={!bookingForm.phoneNumber ? 'error' : ''}
                  />
                  {!bookingForm.phoneNumber && <span className="error-text">This field is required.</span>}
                </div>

                <div className="form-group full-width">
                  <label>Total Amount</label>
                  <div className="total-price-display">
                    {calculateTotalPrice().toLocaleString()} KRW
                    {selectedDates.checkIn && selectedDates.checkOut && (
                      <span className="nights-detail">
                        ({calculateStayDays()} nights {calculateStayDays() + 1} days)
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button className="back-btn" onClick={() => setStep(2)}>Back</button>
                <button className="submit-btn" onClick={handleBookingSubmit}>Submit Reservation</button>
              </div>
            </div>

            <div className="calendar-sidebar">
              <div className="calendar-header">
                <button className="nav-btn" onClick={handlePrevMonth}>‹</button>
                <h3>{formatDate(currentMonth)}</h3>
                <button className="nav-btn" onClick={handleNextMonth}>›</button>
              </div>

              <div className="calendar-grid-small">
                <div className="weekdays-small">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="weekday-small">{day}</div>
                  ))}
                </div>
                
                <div className="days-grid-small">
                  {getDaysInMonth(currentMonth).map((date, index) => {
                    const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
                    const isCheckIn = selectedDates.checkIn && isSameDay(date, selectedDates.checkIn);
                    const isCheckOut = selectedDates.checkOut && isSameDay(date, selectedDates.checkOut);
                    const isInRange = isDateInRange(date);
                    
                    return (
                      <div
                        key={index}
                        className={`calendar-day-small ${!isCurrentMonth ? 'other-month' : ''} ${isCheckIn || isCheckOut ? 'selected' : ''} ${isInRange ? 'in-range' : ''}`}
                      >
                        {date.getDate()}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Modal - 예약 완료 */}
      {showCompleteModal && (
        <div className="modal-overlay">
          <div className="complete-modal">
            <h3>Your reservation has been completed.</h3>
            <button className="modal-confirm-btn" onClick={() => setShowCompleteModal(false)}>
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealtimeBooking;