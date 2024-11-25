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
import ProductListingPage from './pages/ProductListingPage';
import Insights from './pages/seller/Insights';
import AdvancedInsights from './pages/seller/AdvancedInsights';
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
            <Route path="/products" element={<ProductListingPage />} />
            <Route path="/auth/:userType/login" element={<LoginPage />} />
            <Route path="/auth/:userType/signup" element={<SignupPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/buyer/orders" element={<BuyerOrders />} />
            {/* Seller Routes */}
            <Route path="/seller">
              <Route index element={<SellerDashboard />} />
              <Route path="dashboard" element={<SellerDashboard />} />
              <Route path="insights" element={<Insights />} />
              <Route path="advanced-insights" element={<AdvancedInsights />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;