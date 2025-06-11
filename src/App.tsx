import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import HotelStory from './pages/HotelStory';
import Directions from './pages/Directions';
import Rooms from './pages/Rooms';
import Room1 from './pages/Room1';
import Room2 from './pages/Room2';
import Room3 from './pages/Room3';
import Room4 from './pages/Room4';
import Reservation from './pages/Reservation';
import Booking from './pages/Booking';
import RealtimeBooking from './pages/RealtimeBooking';
import Community from './pages/Community';
import Notice from './pages/Notice';
import Events from './pages/Events';
import FAQ from './pages/FAQ';
import ScrollToTop from './components/ScrollToTop'; // 추가

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/hotel-story" element={<HotelStory />} />
          <Route path="/directions" element={<Directions />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/room1" element={<Room1 />} />
          <Route path="/room2" element={<Room2 />} />
          <Route path="/room3" element={<Room3 />} />
          <Route path="/room4" element={<Room4 />} />
          <Route path="/reservation" element={<Booking />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/realtime-booking" element={<RealtimeBooking />} />
          <Route path="/community" element={<Community />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/events" element={<Events />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
        <Footer />
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;