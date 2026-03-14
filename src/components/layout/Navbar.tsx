import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // 1. Import hook

const Navbar = () => {
  const { t, i18n } = useTranslation(); // 2. Khai báo t và i18n
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole');
  const isAuthenticated = !!localStorage.getItem('csrfToken');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  // Hàm đổi ngôn ngữ
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-2xl font-bold text-orange-600">FlashSale <span className="text-blue-600">App</span></Link>
      
      <div className="space-x-6 flex items-center">
        {/* Nút chuyển đổi ngôn ngữ nhanh */}
        <div className="flex border rounded overflow-hidden mr-4">
          <button 
            onClick={() => changeLanguage('vi')}
            className={`px-2 py-1 text-xs ${i18n.language === 'vi' ? 'bg-orange-500 text-white' : 'bg-gray-100'}`}
          >
            VN
          </button>
          <button 
            onClick={() => changeLanguage('en')}
            className={`px-2 py-1 text-xs ${i18n.language === 'en' ? 'bg-orange-500 text-white' : 'bg-gray-100'}`}
          >
            EN
          </button>
        </div>

        <Link to="/" className="text-gray-600 hover:text-orange-600 font-medium">
          {t('home')} {/* 3. Dùng hàm t() */}
        </Link>
        
        {userRole === 'SELLER' && (
          <Link to="/seller/dashboard" className="text-gray-600 hover:text-blue-600 font-medium">
            {t('seller_channel')}
          </Link>
        )}
        
        {isAuthenticated ? (
          <button 
            onClick={handleLogout}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition"
          >
            {t('logout')}
          </button>
        ) : (
          <Link 
            to="/login"
            className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition"
          >
            {t('login')}
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;