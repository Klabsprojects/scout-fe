import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { TranslationProvider } from "./Context/TranslationContext";
import { ParallaxProvider } from 'react-scroll-parallax';
import { AuthProvider } from "./components/Navbar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import ScoutHomepage from "./Pages/ScoutHomePage";
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
import DonationPayment from "./Pages/DonationPayment";
import Cart from "./Pages/Cart";
import ProductDescription from "./Pages/ProductDescription";
import OfficeBearersPage from "./Pages/OfficeBearers";
import CheckoutPage from "./Pages/CheckoutPage";
import OrderSuccessPage from "./Pages/OrderSucessPage";
import OrdersPage from "./Pages/Order";
import MyProfile from "./Pages/MyProfile";
import YourAddress from "./Pages/YourAddresses";
// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('auth-storage') !== null;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <ParallaxProvider>
          <TranslationProvider>
            {/* Toast Container for notifications */}
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            
            <Navbar />
            
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<ScoutHomepage />} />
              <Route path="/ScoutHomepage" element={<ScoutHomepage />} />
              <Route path="/whoweare" element={<WhoWeAre />} />
              <Route path="/scout-education" element={<ScoutEducation />} />
              <Route path="/scout-method" element={<ScoutMethod />} />
              <Route path="/scout-promising-law" element={<ScoutPromiseLaw />} />
              <Route path="/what-we-do" element={<WhatWeDo />} />
              <Route path="/where-we-work" element={<WhereWeWork />} />
              <Route path="/get-involved" element={<GetInvolved />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/scouting-history" element={<ScoutingHistoryPage />} />
              <Route path="/office-bearers" element={<OfficeBearersPage />} />
              <Route path="/product" element={<Products />} />
              <Route path="/product-description" element={<ProductDescription />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/donation" element={<DonationPage />} />
              <Route path="/donate/:eventId" element={<DonationPayment />} />
              <Route path="/address" element={<YourAddress />} />

              {/* Protected Routes */}
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <CheckoutPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order-success"
                element={
                  <ProtectedRoute>
                    <OrderSuccessPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <OrdersPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <MyProfile />
                  </ProtectedRoute>
                }
              />

              {/* Catch all route - redirect to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            
            <Footer />
          </TranslationProvider>
        </ParallaxProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;