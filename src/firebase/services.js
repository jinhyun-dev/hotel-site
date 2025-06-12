// src/firebase/services.js
import { 
  collection, 
  getDocs, 
  addDoc, 
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  writeBatch
} from 'firebase/firestore';
import { db } from './config.js';

// 컬렉션 이름 상수
export const COLLECTIONS = {
  ROOMS: 'rooms',
  SEASONS: 'seasons', 
  HOLIDAYS: 'holidays',
  PRICES: 'prices',
  RESERVATIONS: 'reservations'
};

// 마이그레이션 상태 추적을 위한 플래그
let migrationInProgress = false;

// ==================== 공통 함수 ====================

// 모든 문서 가져오기
export const getAllDocuments = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error(`Error getting documents from ${collectionName}:`, error);
    throw error;
  }
};

// 문서 추가
export const addDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return { id: docRef.id, ...data };
  } catch (error) {
    console.error(`Error adding document to ${collectionName}:`, error);
    throw error;
  }
};

// 문서 업데이트
export const updateDocument = async (collectionName, docId, data) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, data);
    return { id: docId, ...data };
  } catch (error) {
    console.error(`Error updating document in ${collectionName}:`, error);
    throw error;
  }
};

// 문서 삭제
export const deleteDocument = async (collectionName, docId) => {
  try {
    await deleteDoc(doc(db, collectionName, docId));
    return docId;
  } catch (error) {
    console.error(`Error deleting document from ${collectionName}:`, error);
    throw error;
  }
};

// 배치로 컬렉션 전체 삭제
export const clearCollection = async (collectionName) => {
  try {
    console.log(`🗑️ ${collectionName} 컬렉션 삭제 중...`);
    const querySnapshot = await getDocs(collection(db, collectionName));
    
    if (querySnapshot.empty) {
      console.log(`✅ ${collectionName} 컬렉션이 이미 비어있습니다.`);
      return;
    }

    const batch = writeBatch(db);
    querySnapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    
    await batch.commit();
    console.log(`✅ ${collectionName} 컬렉션 삭제 완료 (${querySnapshot.docs.length}개 문서)`);
  } catch (error) {
    console.error(`❌ ${collectionName} 컬렉션 삭제 실패:`, error);
    throw error;
  }
};

// 배치로 여러 문서 추가
export const addDocumentsBatch = async (collectionName, documents) => {
  try {
    console.log(`📦 ${collectionName}에 ${documents.length}개 문서 배치 추가 중...`);
    
    const batch = writeBatch(db);
    const results = [];
    
    documents.forEach((data) => {
      const docRef = doc(collection(db, collectionName));
      batch.set(docRef, data);
      results.push({ id: docRef.id, ...data });
    });
    
    await batch.commit();
    console.log(`✅ ${collectionName} 배치 추가 완료: ${documents.length}개`);
    return results;
  } catch (error) {
    console.error(`❌ ${collectionName} 배치 추가 실패:`, error);
    throw error;
  }
};

// ==================== 객실 관련 함수 ====================

export const getRooms = () => getAllDocuments(COLLECTIONS.ROOMS);

export const addRoom = (roomData) => addDocument(COLLECTIONS.ROOMS, roomData);

// ==================== 시즌 관련 함수 ====================

export const getSeasons = () => getAllDocuments(COLLECTIONS.SEASONS);

export const addSeason = (seasonData) => addDocument(COLLECTIONS.SEASONS, seasonData);

// ==================== 공휴일 관련 함수 ====================

export const getHolidays = () => getAllDocuments(COLLECTIONS.HOLIDAYS);

export const addHoliday = (holidayData) => addDocument(COLLECTIONS.HOLIDAYS, holidayData);

// ==================== 가격 관련 함수 ====================

export const getPrices = () => getAllDocuments(COLLECTIONS.PRICES);

export const addPrice = (priceData) => addDocument(COLLECTIONS.PRICES, priceData);

// 특정 객실과 시즌의 가격 가져오기
export const getPriceByRoomAndSeason = async (roomId, seasonId) => {
  try {
    const q = query(
      collection(db, COLLECTIONS.PRICES),
      where('room_id', '==', roomId),
      where('season_id', '==', seasonId)
    );
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting price by room and season:', error);
    throw error;
  }
};

// ==================== 예약 관련 함수 ====================

export const getReservations = async () => {
  try {
    const q = query(
      collection(db, COLLECTIONS.RESERVATIONS),
      orderBy('check_in_date', 'asc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting reservations:', error);
    throw error;
  }
};

export const addReservation = (reservationData) => 
  addDocument(COLLECTIONS.RESERVATIONS, reservationData);

// 특정 객실의 예약 가져오기
export const getReservationsByRoom = async (roomId) => {
  try {
    const q = query(
      collection(db, COLLECTIONS.RESERVATIONS),
      where('room_id', '==', roomId),
      orderBy('check_in_date', 'asc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting reservations by room:', error);
    throw error;
  }
};

// 날짜 범위로 예약 가져오기
export const getReservationsByDateRange = async (startDate, endDate) => {
  try {
    const q = query(
      collection(db, COLLECTIONS.RESERVATIONS),
      where('check_in_date', '>=', startDate),
      where('check_in_date', '<=', endDate),
      orderBy('check_in_date', 'asc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting reservations by date range:', error);
    throw error;
  }
};

// 예약 업데이트
export const updateReservation = (reservationId, data) => 
  updateDocument(COLLECTIONS.RESERVATIONS, reservationId, data);

// 예약 삭제
export const deleteReservation = (reservationId) => 
  deleteDocument(COLLECTIONS.RESERVATIONS, reservationId);

// ==================== 데이터 존재 확인 및 마이그레이션 ====================

// 데이터가 이미 존재하는지 확인 (더 정확한 체크)
export const checkDataExists = async () => {
  try {
    console.log('🔍 데이터 존재 여부 확인 중...');
    
    const [rooms, seasons, holidays, prices] = await Promise.all([
      getRooms(),
      getSeasons(), 
      getHolidays(),
      getPrices()
    ]);

    const result = {
      rooms: rooms.length > 0,
      seasons: seasons.length > 0,
      holidays: holidays.length > 0,
      prices: prices.length > 0,
      total: rooms.length + seasons.length + holidays.length + prices.length,
      details: {
        roomsCount: rooms.length,
        seasonsCount: seasons.length,
        holidaysCount: holidays.length,
        pricesCount: prices.length
      }
    };
    
    console.log('📊 데이터 존재 여부:', result);
    
    // 정확한 데이터 개수 체크 (원본 데이터: rooms 4개, seasons 2개, holidays 18개, prices 8개)
    const isValidData = (
      rooms.length === 4 && 
      seasons.length === 2 && 
      holidays.length === 18 && 
      prices.length === 8
    );
    
    result.isValid = isValidData;
    result.needsMigration = !isValidData;
    
    return result;
  } catch (error) {
    console.error('❌ 데이터 존재 확인 실패:', error);
    return {
      rooms: false,
      seasons: false, 
      holidays: false,
      prices: false,
      total: 0,
      isValid: false,
      needsMigration: true
    };
  }
};

// Firebase 데이터베이스 완전 초기화
export const resetFirebaseData = async () => {
  try {
    console.log('🔥 Firebase 데이터베이스 초기화 시작...');
    
    // 모든 컬렉션 삭제
    await Promise.all([
      clearCollection(COLLECTIONS.ROOMS),
      clearCollection(COLLECTIONS.SEASONS),
      clearCollection(COLLECTIONS.HOLIDAYS),
      clearCollection(COLLECTIONS.PRICES),
      clearCollection(COLLECTIONS.RESERVATIONS)
    ]);
    
    console.log('✅ Firebase 데이터베이스 초기화 완료!');
  } catch (error) {
    console.error('❌ Firebase 데이터베이스 초기화 실패:', error);
    throw error;
  }
};

// Firebase에 초기 데이터 업로드 (개선된 버전)
export const migrateDataToFirebase = async (forceReset = false) => {
  // 이미 마이그레이션이 진행 중이면 중단
  if (migrationInProgress) {
    console.log('⏳ 마이그레이션이 이미 진행 중입니다...');
    return;
  }

  try {
    migrationInProgress = true;
    console.log('🔥 Firebase 데이터 마이그레이션 시작...');

    // 강제 리셋이 요청되거나 잘못된 데이터가 있으면 초기화
    if (forceReset) {
      await resetFirebaseData();
    }

    // 초기 데이터 정의
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
          "desc_eng": "A comfortable and cozy basic room, ideal for relaxing after a day of business or travel. It features a king-sized bed and essential amenities.",
          "originalId": 1
        },
        {
          "name": "DELUXE",
          "name_eng": "deluxe",
          "area": 94,
          "capacity": 3,
          "min": 2,
          "images": [],
          "desc": "A spacious and modernly designed room with luxurious bedding and the latest facilities, ensuring a comfortable and relaxing stay.",
          "desc_eng": "A spacious and modernly designed room with luxurious bedding and the latest facilities, ensuring a comfortable and relaxing stay.",
          "originalId": 2
        },
        {
          "name": "PREMIUM",
          "name_eng": "premium", 
          "area": 105,
          "capacity": 4,
          "min": 2,
          "images": [],
          "desc": "A stylishly furnished room with elegant interiors and premium furniture, offering a luxurious atmosphere for a more relaxed and indulgent stay.",
          "desc_eng": "A stylishly furnished room with elegant interiors and premium furniture, offering a luxurious atmosphere for a more relaxed and indulgent stay.",
          "originalId": 3
        },
        {
          "name": "SUITE",
          "name_eng": "suite",
          "area": 200,
          "capacity": 6,
          "min": 4,
          "images": [],
          "desc": "A spacious and sophisticated room with a separate living area and bedroom, offering both privacy and comfort. Premium amenities and services are included.",
          "desc_eng": "A spacious and sophisticated room with a separate living area and bedroom, offering both privacy and comfort. Premium amenities and services are included.",
          "originalId": 4
        }
      ],
      "seasons": [
        {
          "name": "Off-Peak Season",
          "start_date": "2025-10-01",
          "end_date": "2025-06-30",
          "originalId": 1
        },
        {
          "name": "Peak Season", 
          "start_date": "2025-07-01",
          "end_date": "2025-09-30",
          "originalId": 2
        }
      ],
      "holidays": [
        { "holiday_name": "신정", "holiday_date": "2025-01-01", "originalId": 1 },
        { "holiday_name": "설날 연휴", "holiday_date": "2025-01-28", "originalId": 2 },
        { "holiday_name": "설날", "holiday_date": "2025-01-29", "originalId": 3 },
        { "holiday_name": "설날 연휴", "holiday_date": "2025-01-30", "originalId": 4 },
        { "holiday_name": "3·1절", "holiday_date": "2025-03-01", "originalId": 5 },
        { "holiday_name": "대체공휴일(3·1절)", "holiday_date": "2025-03-03", "originalId": 6 },
        { "holiday_name": "어린이날", "holiday_date": "2025-05-05", "originalId": 7 },
        { "holiday_name": "부처님 오신날", "holiday_date": "2025-05-05", "originalId": 8 },
        { "holiday_name": "대체공휴일(부처님 오신날)", "holiday_date": "2025-05-06", "originalId": 9 },
        { "holiday_name": "현충일", "holiday_date": "2025-06-06", "originalId": 10 },
        { "holiday_name": "광복절", "holiday_date": "2025-08-15", "originalId": 11 },
        { "holiday_name": "개천절", "holiday_date": "2025-10-03", "originalId": 12 },
        { "holiday_name": "추석 연휴", "holiday_date": "2025-10-05", "originalId": 13 },
        { "holiday_name": "추석", "holiday_date": "2025-10-06", "originalId": 14 },
        { "holiday_name": "추석 연휴", "holiday_date": "2025-10-07", "originalId": 15 },
        { "holiday_name": "대체공휴일(추석)", "holiday_date": "2025-10-08", "originalId": 16 },
        { "holiday_name": "한글날", "holiday_date": "2025-10-09", "originalId": 17 },
        { "holiday_name": "크리스마스", "holiday_date": "2025-12-25", "originalId": 18 }
      ],
      "prices": [
        { "room_id": 1, "season_id": 1, "weekday_price": 150000, "weekend_price": 180000, "holiday_price": 200000, "originalId": 1 },
        { "room_id": 1, "season_id": 2, "weekday_price": 180000, "weekend_price": 200000, "holiday_price": 250000, "originalId": 2 },
        { "room_id": 2, "season_id": 1, "weekday_price": 180000, "weekend_price": 200000, "holiday_price": 250000, "originalId": 3 },
        { "room_id": 2, "season_id": 2, "weekday_price": 200000, "weekend_price": 250000, "holiday_price": 280000, "originalId": 4 },
        { "room_id": 3, "season_id": 1, "weekday_price": 200000, "weekend_price": 250000, "holiday_price": 280000, "originalId": 5 },
        { "room_id": 3, "season_id": 2, "weekday_price": 250000, "weekend_price": 280000, "holiday_price": 320000, "originalId": 6 },
        { "room_id": 4, "season_id": 1, "weekday_price": 250000, "weekend_price": 280000, "holiday_price": 320000, "originalId": 7 },
        { "room_id": 4, "season_id": 2, "weekday_price": 280000, "weekend_price": 320000, "holiday_price": 400000, "originalId": 8 }
      ]
    };

    // 배치로 데이터 업로드 (더 효율적)
    const [rooms, seasons, holidays, prices] = await Promise.all([
      addDocumentsBatch(COLLECTIONS.ROOMS, initialData.rooms),
      addDocumentsBatch(COLLECTIONS.SEASONS, initialData.seasons),
      addDocumentsBatch(COLLECTIONS.HOLIDAYS, initialData.holidays),
      addDocumentsBatch(COLLECTIONS.PRICES, initialData.prices)
    ]);

    console.log('🎉 Firebase 데이터 마이그레이션 완료!');
    console.log('📊 업로드된 데이터:');
    console.log(`- 객실: ${rooms.length}개`);
    console.log(`- 시즌: ${seasons.length}개`);
    console.log(`- 공휴일: ${holidays.length}개`);
    console.log(`- 가격: ${prices.length}개`);
    
    return {
      rooms,
      seasons, 
      holidays,
      prices
    };

  } catch (error) {
    console.error('❌ 데이터 마이그레이션 실패:', error);
    throw error;
  } finally {
    migrationInProgress = false;
  }
};