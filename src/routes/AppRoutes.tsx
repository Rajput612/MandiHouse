import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from '../pages/AdminDashboard';
import AdminLogin from '../pages/AdminLogin';
import AdminRoute from '../components/AdminRoute';
import MiddlemanRoute from '../components/middleware/MiddlemanRoute';
import OverviewDashboard from '../pages/middleman/OverviewDashboard';
import InventoryManagement from '../pages/middleman/InventoryManagement';
import OrderAnalytics from '../pages/middleman/OrderAnalytics';
import SupplierManagement from '../pages/middleman/SupplierManagement';
import BuyerAnalytics from '../pages/middleman/BuyerAnalytics';
import PriceAnalytics from '../pages/middleman/PriceAnalytics';
import QualityControl from '../pages/middleman/QualityControl';
import TransportationTracking from '../pages/middleman/TransportationTracking';
import FinancialReports from '../pages/middleman/FinancialReports';
import UserManagement from '../pages/UserManagement';
import ProductCatalog from '../pages/ProductCatalog';
import MiddlemanPortal from '../pages/MiddlemanPortal';
import Inventory from '../pages/Inventory';
import Analytics from '../pages/Analytics'; // Added import statement

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/login" replace />} />
      
      {/* Admin Routes */}
      <Route path="/admin">
        <Route path="login" element={<AdminLogin />} />
        <Route path="dashboard" element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>}>
          <Route path="users" element={<UserManagement />} />
          <Route path="products" element={<ProductCatalog />} />
          <Route path="middlemen" element={<MiddlemanPortal />} />
          <Route path="finance" element={<FinancialReports />} />
          <Route path="quality" element={<QualityControl />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="analytics" element={<Analytics />} /> // Added Analytics page route
        </Route>
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
    </Routes>
  );
};

export default AppRoutes;
