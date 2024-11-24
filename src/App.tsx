import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import Categories from './components/Categories';
import Features from './components/Features';
import Contact from './components/Contact';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import ProfilePage from './pages/ProfilePage';
import SellerDashboard from './pages/seller/Dashboard';
import BuyerOrders from './pages/buyer/Orders';
import { AuthProvider } from './context/AuthContext';

function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <Categories />
      <Features />
      <Contact />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth/:userType/login" element={<LoginPage />} />
            <Route path="/auth/:userType/signup" element={<SignupPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/seller/dashboard" element={<SellerDashboard />} />
            <Route path="/buyer/orders" element={<BuyerOrders />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;