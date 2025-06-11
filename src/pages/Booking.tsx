import React, { useState, useEffect } from 'react';
import './Booking.css';

interface Room {
  id: number;
  name: string;
  name_eng: string;
  area: number;
  capacity: number;
  min: number;
  desc: string;
}

interface Season {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
}

interface Price {
  id: number;
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const [roomsRes, seasonsRes, pricesRes] = await Promise.all([
          fetch('http://localhost:3001/rooms'),
          fetch('http://localhost:3001/season'),
          fetch('http://localhost:3001/price')
        ]);


        const roomsData = await roomsRes.json();
        const seasonsData = await seasonsRes.json();
        const pricesData = await pricesRes.json();


        setRooms(roomsData);
        setSeasons(seasonsData);
        setPrices(pricesData);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getPriceForRoom = (roomId: number, seasonId: number) => {

    // 첫 번째 호출에서만 전체 데이터 확인
    if (roomId == 1 && seasonId == 1) {
      
      // 각 가격 객체의 타입 확인
      prices.forEach((price, index) => {
        console.log(`Price ${index}:`, {
          room_id: price.room_id,
          room_id_type: typeof price.room_id,
          season_id: price.season_id,
          season_id_type: typeof price.season_id
        });
      });
    }
    
    const price = prices.find(price => {
      const priceRoomId = Number(price.room_id);
      const priceSeasonId = Number(price.season_id);
      const match = priceRoomId == roomId && priceSeasonId == seasonId;
      
      // 매칭 시도 로그 (첫 번째 방만)
      if (roomId == 1) {
        console.log(`매칭 시도: ${priceRoomId} == ${roomId} && ${priceSeasonId} == ${seasonId} => ${match}`);
      }
      
      return match;
    });
    
    if (!price && roomId == 1) {
      console.log(`가격을 찾을 수 없음: roomId=${roomId}, seasonId=${seasonId}`);
    }
    
    return price;
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString();
  };

  if (loading) {
    return (
      <div className="booking-page">
        <div className="loading">Loading data...</div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      {/* Hero Section */}
      <section className="booking-hero">
        <div className="hero-overlay">
          <h1>BOOKING INFORMATION</h1>
          <div class="divider"></div>
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
                    {seasons.find(s => s.id == 1)?.name || 'Low Season'}<br />
                    ({seasons.find(s => s.id == 1)?.start_date?.slice(5).replace('-', '.') || '10.01'}~{seasons.find(s => s.id == 1)?.end_date?.slice(5).replace('-', '.') || '06.30'})
                  </th>
                  <th colSpan={3}>
                    {seasons.find(s => s.id == 2)?.name || 'High Season'}<br />
                    ({seasons.find(s => s.id == 2)?.start_date?.slice(5).replace('-', '.') || '07.01'}~{seasons.find(s => s.id == 2)?.end_date?.slice(5).replace('-', '.') || '09.30'})
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
                  const lowSeasonPrice = getPriceForRoom(room.id, 1);
                  const highSeasonPrice = getPriceForRoom(room.id, 2);

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
        </div>
      </section>
    </div>
  );
};

export default Booking;