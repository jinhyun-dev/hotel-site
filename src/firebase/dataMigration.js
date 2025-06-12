// src/firebase/dataMigration.js
import { 
  getRooms, getSeasons, getHolidays, getPrices, getReservations,
  addRoom, addSeason, addHoliday, addPrice, addReservation
} from './services';

// db.json 데이터 (기존 데이터)
const initialData = {
  "rooms": [
    {
      "name": "STANDARD",
      "name_eng": "standard",
      "area": 78,
      "capacity": 2,
      "min": 2,
      "images": [],
      "desc": "A comfortable and cozy basic room, ideal for relaxing after a day of business or travel. It features a king-sized bed and essential amenities.",
      "desc_eng": "A comfortable and cozy basic room, ideal for relaxing after a day of business or travel. It features a king-sized bed and essential amenities."
    },
    {
      "name": "DELUXE",
      "name_eng": "deluxe",
      "area": 94,
      "capacity": 3,
      "min": 2,
      "images": [],
      "desc": "A spacious and modernly designed room with luxurious bedding and the latest facilities, ensuring a comfortable and relaxing stay.",
      "desc_eng": "A spacious and modernly designed room with luxurious bedding and the latest facilities, ensuring a comfortable and relaxing stay."
    },
    {
      "name": "PREMIUM",
      "name_eng": "premium", 
      "area": 105,
      "capacity": 4,
      "min": 2,
      "images": [],
      "desc": "A stylishly furnished room with elegant interiors and premium furniture, offering a luxurious atmosphere for a more relaxed and indulgent stay.",
      "desc_eng": "A stylishly furnished room with elegant interiors and premium furniture, offering a luxurious atmosphere for a more relaxed and indulgent stay."
    },
    {
      "name": "SUITE",
      "name_eng": "suite",
      "area": 200,
      "capacity": 6,
      "min": 4,
      "images": [],
      "desc": "A spacious and sophisticated room with a separate living area and bedroom, offering both privacy and comfort. Premium amenities and services are included.",
      "desc_eng": "A spacious and sophisticated room with a separate living area and bedroom, offering both privacy and comfort. Premium amenities and services are included."
    }
  ],
  "seasons": [
    {
      "name": "Off-Peak Season",
      "start_date": "2025-10-01",
      "end_date": "2025-06-30"
    },
    {
      "name": "Peak Season", 
      "start_date": "2025-07-01",
      "end_date": "2025-09-30"
    }
  ],
  "holidays": [
    {
      "holiday_name": "신정",
      "holiday_date": "2025-01-01"
    },
    {
      "holiday_name": "설날 연휴",
      "holiday_date": "2025-01-28"
    },
    {
      "holiday_name": "설날",
      "holiday_date": "2025-01-29"
    },
    {
      "holiday_name": "설날 연휴",
      "holiday_date": "2025-01-30"
    },
    {
      "holiday_name": "3·1절",
      "holiday_date": "2025-03-01"
    },
    {
      "holiday_name": "대체공휴일(3·1절)",
      "holiday_date": "2025-03-03"
    },
    {
      "holiday_name": "어린이날",
      "holiday_date": "2025-05-05"
    },
    {
      "holiday_name": "부처님 오신날",
      "holiday_date": "2025-05-05"
    },
    {
      "holiday_name": "대체공휴일(부처님 오신날)",
      "holiday_date": "2025-05-06"
    },
    {
      "holiday_name": "현충일",
      "holiday_date": "2025-06-06"
    },
    {
      "holiday_name": "광복절",
      "holiday_date": "2025-08-15"
    },
    {
      "holiday_name": "개천절",
      "holiday_date": "2025-10-03"
    },
    {
      "holiday_name": "추석 연휴",
      "holiday_date": "2025-10-05"
    },
    {
      "holiday_name": "추석",
      "holiday_date": "2025-10-06"
    },
    {
      "holiday_name": "추석 연휴",
      "holiday_date": "2025-10-07"
    },
    {
      "holiday_name": "대체공휴일(추석)",
      "holiday_date": "2025-10-08"
    },
    {
      "holiday_name": "한글날",
      "holiday_date": "2025-10-09"
    },
    {
      "holiday_name": "크리스마스",
      "holiday_date": "2025-12-25"
    }
  ],
  "prices": [
    {
      "room_id": 1,
      "season_id": 1,
      "weekday_price": 150000,
      "weekend_price": 180000,
      "holiday_price": 200000
    },
    {
      "room_id": 1,
      "season_id": 2,
      "weekday_price": 180000,
      "weekend_price": 200000,
      "holiday_price": 250000
    },
    {
      "room_id": 2,
      "season_id": 1,
      "weekday_price": 180000,
      "weekend_price": 200000,
      "holiday_price": 250000
    },
    {
      "room_id": 2,
      "season_id": 2,
      "weekday_price": 200000,
      "weekend_price": 250000,
      "holiday_price": 280000
    },
    {
      "room_id": 3,
      "season_id": 1,
      "weekday_price": 200000,
      "weekend_price": 250000,
      "holiday_price": 280000
    },
    {
      "room_id": 3,
      "season_id": 2,
      "weekday_price": 250000,
      "weekend_price": 280000,
      "holiday_price": 320000
    },
    {
      "room_id": 4,
      "season_id": 1,
      "weekday_price": 250000,
      "weekend_price": 280000,
      "holiday_price": 320000
    },
    {
      "room_id": 4,
      "season_id": 2,
      "weekday_price": 280000,
      "weekend_price": 320000,
      "holiday_price": 400000
    }
  ]
};

// Firebase에 초기 데이터 업로드
export const migrateDataToFirebase = async () => {
  try {
    console.log('🔥 Firebase 데이터 마이그레이션 시작...');

    // 1. 객실 데이터 업로드
    console.log('📦 객실 데이터 업로드 중...');
    const roomPromises = initialData.rooms.map(async (room, index) => {
      const roomData = { ...room, originalId: index + 1 }; // 원래 ID 보존
      return await addRoom(roomData);
    });
    const rooms = await Promise.all(roomPromises);
    console.log('✅ 객실 데이터 업로드 완료:', rooms.length);

    // 2. 시즌 데이터 업로드  
    console.log('📦 시즌 데이터 업로드 중...');
    const seasonPromises = initialData.seasons.map(async (season, index) => {
      const seasonData = { ...season, originalId: index + 1 };
      return await addSeason(seasonData);
    });
    const seasons = await Promise.all(seasonPromises);
    console.log('✅ 시즌 데이터 업로드 완료:', seasons.length);

    // 3. 공휴일 데이터 업로드
    console.log('📦 공휴일 데이터 업로드 중...');
    const holidayPromises = initialData.holidays.map(async (holiday, index) => {
      const holidayData = { ...holiday, originalId: index + 1 };
      return await addHoliday(holidayData);
    });
    const holidays = await Promise.all(holidayPromises);
    console.log('✅ 공휴일 데이터 업로드 완료:', holidays.length);

    // 4. 가격 데이터 업로드 (room_id, season_id 매핑 필요)
    console.log('📦 가격 데이터 업로드 중...');
    const pricePromises = initialData.prices.map(async (price, index) => {
      const priceData = { ...price, originalId: index + 1 };
      return await addPrice(priceData);
    });
    const prices = await Promise.all(pricePromises);
    console.log('✅ 가격 데이터 업로드 완료:', prices.length);

    console.log('🎉 Firebase 데이터 마이그레이션 완료!');
    
    return {
      rooms,
      seasons, 
      holidays,
      prices
    };

  } catch (error) {
    console.error('❌ 데이터 마이그레이션 실패:', error);
    throw error;
  }
};

// 데이터가 이미 존재하는지 확인
export const checkDataExists = async () => {
  try {
    const [rooms, seasons, holidays, prices] = await Promise.all([
      getRooms(),
      getSeasons(), 
      getHolidays(),
      getPrices()
    ]);

    return {
      rooms: rooms.length > 0,
      seasons: seasons.length > 0,
      holidays: holidays.length > 0,
      prices: prices.length > 0,
      total: rooms.length + seasons.length + holidays.length + prices.length
    };
  } catch (error) {
    console.error('데이터 존재 확인 실패:', error);
    return {
      rooms: false,
      seasons: false, 
      holidays: false,
      prices: false,
      total: 0
    };
  }
};