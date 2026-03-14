import React, { useState } from 'react';
import { authApi } from '../../api/authApi';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // 1. Import hook

const LoginPage: React.FC = () => {
  const { t, i18n } = useTranslation(); // 2. Khai báo t và i18n
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

      // 3. Dịch thông báo thành công
      alert(t('login_success')); 
      
      if (response.userRole === 'SELLER') {
        navigate('/seller/dashboard');
      } else {
        navigate('/');
      }
    } catch (error: any) {
      // 4. Dịch thông báo lỗi
      alert(error.message || t('login_failed'));
    } finally {
      setLoading(false);
    }
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Nút chuyển ngôn ngữ nhỏ ở góc trên form */}
      <div className="mb-4 flex gap-2">
        <button 
          onClick={() => changeLanguage('vi')} 
          className={`px-3 py-1 rounded-full text-xs font-bold ${i18n.language === 'vi' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
        >
          VN
        </button>
        <button 
          onClick={() => changeLanguage('en')} 
          className={`px-3 py-1 rounded-full text-xs font-bold ${i18n.language === 'en' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
        >
          EN
        </button>
      </div>

      <form onSubmit={handleLogin} className="p-8 bg-white shadow-lg rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          {t('login_title')}
        </h2>
        
        <div className="mb-4">
          <label className="block text-gray-700">{t('email_label')}</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder={t('email_placeholder')}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700">{t('password_label')}</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder={t('password_placeholder')}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 disabled:bg-gray-400"
        >
          {loading ? t('processing') : t('login_button')}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;