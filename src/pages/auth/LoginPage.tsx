import React, { useState } from 'react';
import { authApi } from '../../api/authApi';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AuthLayout from '../../components/layout/AuthLayout';
import toast from 'react-hot-toast';

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authApi.login({ email, password });
      
      localStorage.setItem('userRole', response.userRole);
      localStorage.setItem('csrfToken', response.csrfToken);
      localStorage.setItem('userBalance', response.balance.toString());

      toast.success(t('login_success'));
      
      if (response.userRole === 'SELLER') {
        navigate('/seller');
      } else {
        navigate('/customer');
      }
    } catch (error: any) {
      toast.error(error.message || t('login_failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title={t('login_title')} 
      subtitle="Welcome back to Flash Sale!"
    >
      <form onSubmit={handleLogin} className="space-y-6">
        {/* Email Field */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
            {t('email_label')}
          </label>
          <input
            type="email"
            className="w-full px-5 py-3 bg-gray-50 border border-gray-200 text-gray-900 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder={t('email_placeholder')}
          />
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
            {t('password_label')}
          </label>
          <input
            type="password"
            className="w-full px-5 py-3 bg-gray-50 border border-gray-200 text-gray-900 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder={t('password_placeholder')}
          />
        </div>

        {/* Options */}
        <div className="flex items-center justify-between text-xs px-1">
          <label className="flex items-center text-gray-600 cursor-pointer">
            <input type="checkbox" className="mr-2 rounded" /> {t('remember_me') || 'Remember me'}
          </label>
          <Link to="/forgot-password" className="text-blue-600 hover:underline text-xs font-medium">
            {t('forgot_password') || 'Forgot password?'}
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full py-4 h-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold border-none shadow-lg hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-0.5 transition-all duration-200 disabled:bg-gray-400"
        >
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : t('login_button')}
        </button>
      </form>

      {/* Footer Link */}
      <div className="mt-8 text-center">
        <p className="text-gray-600 text-sm">
          {t('no_account') || "Don't have an account?"}{' '}
          <Link to="/register" className="text-blue-600 font-bold hover:underline">
            {t('register_now') || 'Register Now'}
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;