import React from "react";
import { TranslationProvider } from "./Context/TranslationContext";
import Navbar from "./components/Navbar";
import ScoutHomepage from "./Pages/ScoutHomePage";
import Footer from "./components/Footer"; // Import the new Footer component

function App() {
  return (
    <TranslationProvider>
      <Navbar />
      <ScoutHomepage />
      <Footer /> {/* Add the Footer component here */}
    </TranslationProvider>
  );
}

export default App;