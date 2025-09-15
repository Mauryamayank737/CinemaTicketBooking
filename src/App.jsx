import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./Home";
import Success from "./Success";
import Cancel from "./Cancel";
import CinemaHall from "./CinemaHall";
import BookedSeatsSetails from "./BookedSeatsSetails";


function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<CinemaHall />} />
        <Route path="/booking-details" element={<BookedSeatsSetails /> }/>,
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
    </Router>
  );
}

export default App





