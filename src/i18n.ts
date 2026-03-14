import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  vi: {
    translation: {
      "login_title": "Đăng nhập Flash Sale",
      "email_label": "Email",
      "email_placeholder": "Nhập email của bạn",
      "password_label": "Mật khẩu",
      "password_placeholder": "Nhập mật khẩu",
      "login_button": "Đăng nhập",
      "processing": "Đang xử lý...",
      "login_success": "Đăng nhập thành công!",
      "login_failed": "Đăng nhập thất bại, kiểm tra lại tài khoản!",  
      "home": "Trang chủ",
      "seller_channel": "Kênh người bán",
      "login": "Đăng nhập",
      "logout": "Đăng xuất",
      "sold": "Đã bán",
      "add_to_cart": "Thêm vào giỏ"
    }
  },
  en: {
    translation: {
      "login_title": "Flash Sale Login",
      "email_label": "Email",
      "email_placeholder": "Enter your email",
      "password_label": "Password",
      "password_placeholder": "Enter your password",
      "login_button": "Login",
      "processing": "Processing...",
      "login_success": "Login successful!",
      "login_failed": "Login failed, please check your credentials!",  
      "home": "Home",
      "seller_channel": "Seller Channel",
      "login": "Login",
      "logout": "Logout",
      "sold": "Sold",
      "add_to_cart": "Add to cart"
    }
  }
};

i18n
  .use(LanguageDetector) // Tự động nhận diện ngôn ngữ trình duyệt
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'vi', // Ngôn ngữ mặc định
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;