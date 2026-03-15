import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { authApi } from '../../api/authApi';
import AuthLayout from '../../components/layout/AuthLayout';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

const ResetPasswordPage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Lấy token từ URL (?t=...)
  const token = searchParams.get('t');

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error("Token không hợp lệ hoặc đã hết hạn!");
      return;
    }

    setLoading(true);
    try {
      await authApi.changePassword({
        forgotPasswordToken: token,
        newPassword: newPassword
      });
      toast.success(t('change_password_success') || 'Đổi mật khẩu thành công!');
      navigate('/login');
    } catch (error: any) {
      toast.error(error.message || 'Lỗi khi đổi mật khẩu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title={t('reset_password_title') || "Đặt lại mật khẩu"}
      subtitle="Thiết lập mật khẩu mới cho tài khoản của bạn"
    >
      <form onSubmit={handleReset} className="space-y-6">
        <div className="text-center mb-2">
          <p className="text-sm text-gray-700 font-medium">
            Vui lòng nhập mật khẩu mới (ít nhất 9 ký tự và có chứa số)
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
            Mật khẩu mới
          </label>
          <input 
            type="password" 
            placeholder={t('new_password_placeholder') || "••••••••"} 
            required
            // Ép màu chữ text-gray-900 và bg-white/gray-50 cho rõ
            className="w-full px-5 py-3 bg-gray-50 border border-gray-200 text-gray-900 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 outline-none"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full py-4 h-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold border-none shadow-lg hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-0.5 transition-all duration-200 disabled:bg-gray-400"
        >
          {loading ? (
            <span className="flex items-center justify-center">
               <span className="loading loading-spinner mr-2"></span>
               {t('processing') || 'Đang xử lý...'}
            </span>
          ) : (
            t('update_password') || 'Cập nhật mật khẩu'
          )}
        </button>
      </form>
    </AuthLayout>
  );
};

export default ResetPasswordPage;