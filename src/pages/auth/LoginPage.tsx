import React, { useState } from 'react';
import { authApi } from '../../api/authApi';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast'; // Thay alert bằng toast

const LoginPage: React.FC = () => {
  const { t, i18n } = useTranslation();
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

      toast.success(t('login_success'));
      
      if (response.userRole === 'SELLER') {
        navigate('/seller/dashboard');
      } else {
        navigate('/customer');
      }
    } catch (error: any) {
      toast.error(error.message || t('login_failed'));
    } finally {
      setLoading(false);
    }
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-700 p-4">
      <div className="w-full max-w-md">

        <div className="flex justify-end mb-4 space-x-2">
          {['vi', 'en'].map((lng) => (
            <button
              key={lng}
              onClick={() => changeLanguage(lng)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase transition-all duration-300 shadow-sm ${
                i18n.language === lng 
                  ? 'bg-white text-blue-600 scale-105' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {lng}
            </button>
          ))}
        </div>

        {/* Form Container */}
        <div className="bg-white/95 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-white/20">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              {t('login_title')}
            </h2>
            <p className="text-gray-500 mt-2 text-sm">{'Welcome back to Flash Sale!'}</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                {t('email_label')}
              </label>
              <input
                type="email"
                className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder={t('email_placeholder')}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                {t('password_label')}
              </label>
              <input
                type="password"
                className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder={t('password_placeholder')}
              />
            </div>

            <div className="flex items-center justify-between text-xs px-1">
               <label className="flex items-center text-gray-600 cursor-pointer">
                  <input type="checkbox" className="mr-2 rounded" /> {t('remember_me') || 'Remember me'}
               </label>
               <span className="text-blue-600 hover:underline cursor-pointer">{t('forgot_password') || 'Forgot password?'}</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold shadow-lg hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-0.5 transition-all duration-200 disabled:bg-gray-400 disabled:scale-100"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('processing')}
                </span>
              ) : t('login_button')}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              {t('no_account') || "Don't have an account?"}{' '}
              <span className="text-blue-600 font-bold hover:underline cursor-pointer">
                {t('register_now') || 'Register Now'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;