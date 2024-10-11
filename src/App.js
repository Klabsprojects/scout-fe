import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { TranslationProvider } from "./Context/TranslationContext";
import Navbar from "./components/Navbar";
import ScoutHomepage from "./Pages/ScoutHomePage";
import Footer from "./components/Footer";
import WhoWeAre from "./Pages/WhoWeAre";
import ScoutEducation from "./Pages/ScoutEducation";
import ScoutMethod from "./Pages/ScoutMethod";
import ScoutPromiseLaw from "./Pages/ScoutPromiseAndLaw";
import WhatWeDo from "./Pages/WhatWeDo";
import Gallery from "./Pages/Gallery";
import WhereWeWork from "./Pages/WhereWeWork";
import GetInvolved from "./Pages/GetInvolved";
import Products from "./Pages/Products";
import LoginPage from "./Pages/Login";
import ScoutingHistoryPage from "./Pages/ScoutingHistory";
import DonationPage from "./Pages/DonationPage";

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
          <Route path="/scout-method" element={<ScoutMethod />} />
          <Route path="/scout-promising-law" element={<ScoutPromiseLaw />} /> {/* Add this line */}
          <Route path="/what-we-do" element={<WhatWeDo />} />
          <Route path="/where-we-work" element={<WhereWeWork/>} />
          <Route path="/get-involved" element={<GetInvolved />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/product" element={<Products />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/scouting-history" element={<ScoutingHistoryPage />} />
          <Route path="/donation" element={<DonationPage/>}/>
        </Routes>
        <Footer />
      </TranslationProvider>
    </Router>
  );
}

export default App;