import React, { useState } from 'react';
import { userApi } from '../../api/userApi';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AuthLayout from '../../components/layout/AuthLayout';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '', isCustomer: 'true' });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await userApi.register(formData);
      toast.success(t('register_success') || 'Đăng ký thành công!');
      navigate('/login');
    } catch (error: any) {
      toast.error(error.message || t('register_failed'));
    }
  };

  return (
    <AuthLayout title={t('register_title')} subtitle={t('register_subtitle')}>
      <form onSubmit={handleRegister} className="space-y-6">
        <input 
          type="email" placeholder={t('email_placeholder')} required
          className="w-full px-5 py-3 bg-gray-50 border border-gray-200 text-gray-800 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        <input 
          type="password" placeholder={t('password_placeholder')} required
          className="w-full px-5 py-3 bg-gray-50 border border-gray-200 text-gray-800 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={(e) => setFormData({...formData, password: e.target.value})}
        />
        
        {/* Select Role theo DTO */}
        <select 
          className="select select-bordered w-full rounded-2xl bg-gray-50 text-gray-800"
          onChange={(e) => setFormData({...formData, isCustomer: e.target.value})}
        >
          <option value="true">{t('role_customer') || 'I am a Customer'}</option>
          <option value="false">{t('role_seller') || 'I am a Seller'}</option>
        </select>

        <button className="btn btn-primary w-full rounded-2xl border-none bg-gradient-to-r from-blue-600 to-indigo-600">
          {t('register_button')}
        </button>
      </form>
        <div className="mt-6 text-center text-sm text-gray-600"> 
        {/* Thêm text-gray-600 để thấy chữ "Đã có tài khoản?" */}
        {t('already_have_account')}{' '}
        <Link to="/login" className="text-blue-600 font-bold underline">
            {t('login_now')}
        </Link>
        </div>
    </AuthLayout>
  );
};

export default RegisterPage;