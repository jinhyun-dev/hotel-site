// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase 설정 (실제 프로젝트 설정값)
const firebaseConfig = {
  apiKey: "AIzaSyB-_L80d-_GSsLoRB75qo1tFmUyyie9SsA",
  authDomain: "hotel-site-2561f.firebaseapp.com",
  projectId: "hotel-site-2561f",
  storageBucket: "hotel-site-2561f.firebasestorage.app",
  messagingSenderId: "230120772610",
  appId: "1:230120772610:web:38122bb51e0dee2a5d831b"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Firestore 데이터베이스 초기화
export const db = getFirestore(app);

export default app;