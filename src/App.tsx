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
import { ProductsPage } from './pages/ProductsPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminOverview from './pages/admin/AdminOverview';
import UserManagement from './pages/admin/UserManagement';
import ProductCatalog from './pages/admin/ProductCatalog';
import MiddlemanPortal from './pages/admin/MiddlemanPortal';
import Analytics from './pages/admin/Analytics';
import SystemSettings from './pages/admin/SystemSettings';
import Inventory from './pages/admin/Inventory';
import QualityControl from './pages/admin/QualityControl';
import FinancialReports from './pages/admin/FinancialReports';
import OverviewDashboard from './pages/middleman/OverviewDashboard';
import InventoryManagement from './pages/middleman/InventoryManagement';
import OrderAnalytics from './pages/middleman/OrderAnalytics';
import SupplierManagement from './pages/middleman/SupplierManagement';
import BuyerAnalytics from './pages/middleman/BuyerAnalytics';
import PriceAnalytics from './pages/middleman/PriceAnalytics';
import TransportationTracking from './pages/middleman/TransportationTracking';
import MiddlemanRoute from './components/middleware/MiddlemanRoute';
import { AdminProvider } from './context/AdminContext';
import AdminRoute from './components/AdminRoute';

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

const App: React.FC = () => {
  return (
    <Router>
      <AdminProvider>
        <AuthProvider>
          <div className="min-h-screen bg-white">
            <Navbar />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductListingPage />} />
              <Route path="/auth/:userType/login" element={<LoginPage />} />
              <Route path="/auth/:userType/signup" element={<SignupPage />} />
              
              {/* Protected Routes */}
              <Route path="/profile" element={<ProfilePage />} />
                <Route path="/buyer/orders" element={<BuyerOrders />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>}>
                <Route index element={<AdminOverview />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="products" element={<ProductCatalog />} />
                <Route path="middlemen" element={<MiddlemanPortal />} />
                <Route path="finances" element={<FinancialReports />} />
                <Route path="quality" element={<QualityControl />} />
                <Route path="inventory" element={<Inventory />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="settings" element={<SystemSettings />} />
              </Route>

              {/* Middleman Routes */}
              <Route path="/middleman">
                <Route path="overview" element={
                  <MiddlemanRoute>
                    <OverviewDashboard />
                  </MiddlemanRoute>
                } />
                <Route path="inventory" element={
                  <MiddlemanRoute>
                    <InventoryManagement />
                  </MiddlemanRoute>
                } />
                <Route path="orders" element={
                  <MiddlemanRoute>
                    <OrderAnalytics />
                  </MiddlemanRoute>
                } />
                <Route path="suppliers" element={
                  <MiddlemanRoute>
                    <SupplierManagement />
                  </MiddlemanRoute>
                } />
                <Route path="buyers" element={
                  <MiddlemanRoute>
                    <BuyerAnalytics />
                  </MiddlemanRoute>
                } />
                <Route path="prices" element={
                  <MiddlemanRoute>
                    <PriceAnalytics />
                  </MiddlemanRoute>
                } />
                <Route path="quality" element={
                  <MiddlemanRoute>
                    <QualityControl />
                  </MiddlemanRoute>
                } />
                <Route path="transportation" element={
                  <MiddlemanRoute>
                    <TransportationTracking />
                  </MiddlemanRoute>
                } />
                <Route path="financial-reports" element={
                  <MiddlemanRoute>
                    <FinancialReports />
                  </MiddlemanRoute>
                } />
              </Route>
              {/* Seller Routes */}
            <Route path="/seller">
              <Route index element={<SellerDashboard />} />
              <Route path="dashboard" element={<SellerDashboard />} />
              <Route path="insights" element={<Insights />} />
              <Route path="advanced-insights" element={<AdvancedInsights />} />
            </Route>
          </Routes>
          </div>
        </AuthProvider>
      </AdminProvider>
    </Router>
  );
};

export default App;