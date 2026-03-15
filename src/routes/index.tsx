import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage';

// Giả lập các trang Dashboard (Bạn sẽ tạo file thật sau)
const CustomerDashboard = () => <div className="p-10 text-2xl font-bold">🛒 Customer Flash Sale List</div>;
const SellerDashboard = () => <div className="p-10 text-2xl font-bold">🏪 Seller Inventory Management</div>;

// Component check quyền (Role Guard)
const ProtectedRoute = ({ children, allowedRole }: { children: React.ReactNode, allowedRole: string }) => {
  const userRole = localStorage.getItem('userRole');
  if (!userRole) return <Navigate to="/login" />;
  return userRole === allowedRole ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Mặc định vào Login */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Luồng Customer */}
      <Route
        path="/customer/*"
        element={
          <ProtectedRoute allowedRole="CUSTOMER">
            <CustomerDashboard />
          </ProtectedRoute>
        }
      />

      {/* Luồng Seller */}
      <Route
        path="/seller/*"
        element={
          <ProtectedRoute allowedRole="SELLER">
            <SellerDashboard />
          </ProtectedRoute>
        }
      />

      {/* 404 - Bắt các link bừa bãi */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;