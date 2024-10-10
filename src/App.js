import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { TranslationProvider } from "./Context/TranslationContext";
import Navbar from "./components/Navbar";
import ScoutHomepage from "./Pages/ScoutHomePage";
import Footer from "./components/Footer";
import WhoWeAre from "./Pages/WhoWeAre";
import ScoutEducation from "./Pages/ScoutEducation";
import WhatWeDo from "./Pages/WhatWeDo";
import Gallery from "./Pages/Gallery";

function App() {
  return (
    <Router>
      <TranslationProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<ScoutHomepage />} />
          <Route path="/ScoutHomepage" element={<ScoutHomepage />} />
          <Route path="/whoweare" element={<WhoWeAre />} />
          <Route path="/scout-education" element={<ScoutEducation />} />
          <Route path="/what-we-do" element={<WhatWeDo />} />
          <Route path="/where-we-work" element={<div>Where We Work Page</div>} />
          <Route path="/get-involved" element={<div>Get Involved Page</div>} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
        <Footer />
      </TranslationProvider>
    </Router>
  );
}

export default App;