import React, { useState } from 'react';
import { authApi } from '../../api/authApi';
import { Link } from 'react-router-dom'; // Thêm Link vào đây
import AuthLayout from '../../components/layout/AuthLayout';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

const ForgotPasswordPage = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authApi.sendForgotPasswordEmail(email);
      toast.success(t('email_sent') || 'Vui lòng kiểm tra email của bạn!');
    } catch (error: any) {
      toast.error(error.message || 'Lỗi gửi mail');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title={t('forgot_password_title')} subtitle={t('forgot_password_desc')}>
      <form onSubmit={handleSend} className="space-y-6">
        <div>
          <input 
            type="email" 
            placeholder={t('email_placeholder')} 
            required
            // Ép màu chữ text-gray-800 để không bị tàng hình
            className="w-full px-5 py-3 bg-gray-50 border border-gray-200 text-gray-800 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button 
          disabled={loading}
          className="btn btn-primary w-full rounded-2xl border-none bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold h-12"
        >
          {loading ? <span className="loading loading-spinner"></span> : t('send_request')}
        </button>
      </form>

      {/* Link quay lại Login */}
      <div className="mt-8 text-center">
        <Link to="/login" className="text-sm text-blue-600 font-bold hover:underline">
          {/* Bạn có thể thêm key "back_to_login" vào i18n hoặc viết cứng tạm thời */}
          ← {t('back_to_login') || 'Quay lại đăng nhập'}
        </Link>
      </div>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;