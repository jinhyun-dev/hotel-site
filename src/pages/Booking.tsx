import React, { useState, useEffect, useRef } from 'react';
import { getRooms, getSeasons, getPrices } from '../firebase/services';
import './Booking.css';

interface Room {
  id: string;
  originalId?: number;
  name: string;
  name_eng: string;
  area: number;
  capacity: number;
  min: number;
  desc: string;
}

interface Season {
  id: string;
  originalId?: number;
  name: string;
  start_date: string;
  end_date: string;
}

interface Price {
  id: string;
  originalId?: number;
  room_id: number;
  season_id: number;
  weekday_price: number;
  weekend_price: number;
  holiday_price: number;
}

const Booking: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [prices, setPrices] = useState<Price[]>([]);
  const [loading, setLoading] = useState(true);
  
  // 중복 로딩 방지를 위한 ref
  const hasFetched = useRef(false);

  useEffect(() => {
    // 이미 데이터를 가져왔다면 중복 실행 방지
    if (hasFetched.current) {
      console.log('🔄 중복 요청 방지: 이미 데이터를 가져왔습니다.');
      return;
    }

    const fetchData = async () => {
      try {
        hasFetched.current = true;
        setLoading(true);
        console.log('🔥 Booking 컴포넌트: Firebase에서 데이터 가져오는 중...');
        
        const [roomsData, seasonsData, pricesData] = await Promise.all([
          getRooms(),
          getSeasons(),
          getPrices()
        ]);

        console.log('✅ Booking 데이터 로드 완료:', {
          rooms: roomsData.length,
          seasons: seasonsData.length,
          prices: pricesData.length
        });

        setRooms(roomsData);
        setSeasons(seasonsData);
        setPrices(pricesData);
      } catch (error) {
        console.error('❌ Booking Firebase 데이터 로드 실패:', error);
        // 에러 발생시 재시도를 위해 플래그 리셋
        hasFetched.current = false;
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // cleanup 함수에서 플래그 리셋 (개발 모드에서 StrictMode로 인한 언마운트 시)
    return () => {
      console.log('🧹 Booking 컴포넌트 cleanup');
    };
  }, []); // 빈 의존성 배열로 마운트 시 한 번만 실행

  // Firebase에서 가져온 데이터의 originalId를 사용하여 가격 찾기
  const getPriceForRoom = (roomOriginalId: number, seasonOriginalId: number) => {
    const price = prices.find(price => {
      const priceRoomId = Number(price.room_id);
      const priceSeasonId = Number(price.season_id);
      return priceRoomId === roomOriginalId && priceSeasonId === seasonOriginalId;
    });
    
    return price;
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString();
  };

  if (loading) {
    return (
      <div className="booking-page">
        <div className="loading">🔥 Loading data from Firebase...</div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      {/* Hero Section */}
      <section className="booking-hero">
        <div className="hero-overlay">
          <h1>BOOKING INFORMATION</h1>
          <div className="divider"></div>
          <p>Rates & Policies</p>
        </div>
      </section>

      {/* Booking Info Section */}
      <section className="booking-info">
        <div className="container">
          <h2>Room Rates & Information</h2>
          
          {/* Price Table */}
          <div className="price-table-container">
            <table className="price-table">
              <thead>
                <tr>
                  <th rowSpan={2}>Room Type</th>
                  <th rowSpan={2}>Size</th>
                  <th rowSpan={2}>Occupancy</th>
                  <th colSpan={3}>
                    {seasons.find(s => s.originalId === 1)?.name || 'Off-Peak Season'}<br />
                    ({seasons.find(s => s.originalId === 1)?.start_date?.slice(5).replace('-', '.') || '10.01'}~{seasons.find(s => s.originalId === 1)?.end_date?.slice(5).replace('-', '.') || '06.30'})
                  </th>
                  <th colSpan={3}>
                    {seasons.find(s => s.originalId === 2)?.name || 'Peak Season'}<br />
                    ({seasons.find(s => s.originalId === 2)?.start_date?.slice(5).replace('-', '.') || '07.01'}~{seasons.find(s => s.originalId === 2)?.end_date?.slice(5).replace('-', '.') || '09.30'})
                  </th>
                </tr>
                <tr>
                  <th>Weekday</th>
                  <th>Weekend</th>
                  <th>Holiday</th>
                  <th>Weekday</th>
                  <th>Weekend</th>
                  <th>Holiday</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map(room => {
                  const roomOriginalId = room.originalId || 1;
                  const lowSeasonPrice = getPriceForRoom(roomOriginalId, 1);
                  const highSeasonPrice = getPriceForRoom(roomOriginalId, 2);

                  return (
                    <tr key={room.id}>
                      <td>{room.name}</td>
                      <td>{room.area}㎡</td>
                      <td>{room.min}/{room.capacity}</td>
                      <td>{lowSeasonPrice?.weekday_price ? formatPrice(lowSeasonPrice.weekday_price) : '-'}</td>
                      <td>{lowSeasonPrice?.weekend_price ? formatPrice(lowSeasonPrice.weekend_price) : '-'}</td>
                      <td>{lowSeasonPrice?.holiday_price ? formatPrice(lowSeasonPrice.holiday_price) : '-'}</td>
                      <td>{highSeasonPrice?.weekday_price ? formatPrice(highSeasonPrice.weekday_price) : '-'}</td>
                      <td>{highSeasonPrice?.weekend_price ? formatPrice(highSeasonPrice.weekend_price) : '-'}</td>
                      <td>{highSeasonPrice?.holiday_price ? formatPrice(highSeasonPrice.holiday_price) : '-'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Info Cards */}
          <div className="info-cards-section">
            <div className="info-cards">
              <div className="info-card">
                <h4>Check-in & Check-out</h4>
                <p>• Check-in: After 3:00 PM</p>
                <p>• Check-out: Before 11:00 AM</p>
                <p>• Minimum stay: 1 night</p>
                <p>• Extra charges apply for additional guests</p>
              </div>
              <div className="info-card">
                <h4>Dining Services</h4>
                <p>• Breakfast served: 7:00 AM - 10:00 AM</p>
                <p>• Included for adults</p>
                <p>• Children under 12: Complimentary (up to 2)</p>
                <p>• Additional meals charged separately</p>
              </div>
              <div className="info-card">
                <h4>Hotel Amenities</h4>
                <p>• Complimentary Wi-Fi</p>
                <p>• Parking available</p>
                <p>• 24-hour front desk</p>
                <p>• Room service available</p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="additional-info">
            <h3>Cancellation & Refund Policy</h3>
            <ul>
              <li>Free cancellation until 6:00 PM, 1 day before arrival</li>
              <li>50% cancellation fee applies for cancellations after 6:00 PM, 1 day before arrival</li>
              <li>100% cancellation fee for same-day cancellations or no-shows</li>
              <li>Special cancellation policies may apply during peak seasons and holidays</li>
              <li>Refunds will be processed within 3-5 business days after cancellation</li>
            </ul>
          </div>

          {/* Firebase Info Banner */}
          <div className="firebase-info-banner">
            <div className="firebase-icon">🔥</div>
            <div className="firebase-text">
              <h4>Real-time Data</h4>
              <p>All pricing information is powered by Firebase and updated in real-time.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;