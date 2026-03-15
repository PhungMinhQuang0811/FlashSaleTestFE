import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import ResetPasswordPage from '../pages/auth/ResetPasswordPage';
import VerifyEmailPage from '../pages/auth/VerifyEmailPage';

// IMPORT TRANG THẬT Ở ĐÂY
import CustomerDashboard from '../pages/customer/CustomerDashboard';

// Giữ lại Seller giả lập nếu bạn chưa làm trang Seller
const SellerDashboard = () => <div className="p-10 text-2xl font-bold italic text-orange-600">🏪 Seller: Quản lý kho hàng</div>;

const ProtectedRoute = ({ children, allowedRole }: { children: React.ReactNode, allowedRole: string }) => {
  const userRole = localStorage.getItem('userRole');
  if (!userRole) return <Navigate to="/login" />;
  
  // Nếu sai quyền, mình nên cho về trang 403 hoặc thông báo, 
  // ở đây tạm thời cho về login như code cũ của bạn
  return userRole === allowedRole ? (children as React.ReactElement) : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* --- Public Routes --- */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/auth/forgot-password/verify" element={<ResetPasswordPage />} />
      <Route path="/user/verify-email" element={<VerifyEmailPage/>} />

      {/* --- Luồng Customer (ĐÃ DẪN TỚI TRANG THẬT) --- */}
      <Route
          path="/customer"
          element={
            <ProtectedRoute allowedRole="CUSTOMER">
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />

      {/* --- Luồng Seller --- */}
      <Route
        path="/seller"
        element={
          <ProtectedRoute allowedRole="SELLER">
            <SellerDashboard />
          </ProtectedRoute>
        }
      />

      {/* --- Điều hướng mặc định --- */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;