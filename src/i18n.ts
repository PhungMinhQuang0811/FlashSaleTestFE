import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  vi: {
    translation: {
      login_title: "Đăng nhập Flash Sale",
      email_label: "Email",
      email_placeholder: "Nhập email của bạn",
      password_label: "Mật khẩu",
      password_placeholder: "Nhập mật khẩu",
      login_button: "Đăng nhập",
      processing: "Đang xử lý...",
      login_success: "Đăng nhập thành công!",
      login_failed: "Đăng nhập thất bại, kiểm tra lại tài khoản!",
      // --- Register ---
      register_title: "Đăng Ký Tài Khoản",
      register_subtitle: "Tạo tài khoản để tham gia săn sale ngay!",
      register_button: "Đăng ký",
      role_customer: "Tôi là người mua hàng",
      role_seller: "Tôi là người bán hàng",
      already_have_account: "Đã có tài khoản?",
      login_now: "Đăng nhập ngay",
      register_success: "Đăng ký thành công!",
      register_failed: "Đăng ký thất bại!",
      //verify mail
      verify_loading_title: "Xác thực tài khoản",
      verify_success_title: "Thành công!",
      verify_failed_title: "Xác thực thất bại",
      verify_loading_desc: "Hệ thống đang kiểm tra mã xác nhận của bạn...",
      verify_success_desc: "Tài khoản của bạn đã được kích hoạt thành công!",
      verify_success_sub:
        "Bây giờ bạn đã có thể đăng nhập để tham gia săn sale.",
      invalid_token: "Mã xác thực không hợp lệ hoặc đã hết hạn!",

      // --- Forgot & Reset Password ---
      forgot_password_title: "Quên mật khẩu",
      forgot_password_desc: "Nhập email để nhận link đặt lại mật khẩu",
      send_request: "Gửi yêu cầu",
      reset_password_title: "Đặt lại mật khẩu",
      new_password_placeholder: "Nhập mật khẩu mới",
      update_password: "Cập nhật mật khẩu",
      back_to_login: "Quay lại đăng nhập",
      //customer
      wallet_balance: "Số dư ví",
      flash_sale_title: "⚡ Flash Sale",
      refresh: "Làm mới",
      sale_badge: "GIẢM GIÁ",
      hunt_deal: "SĂN DEAL NGAY",
      buy_now: "MUA NGAY",
      out_of_stock: "HẾT HÀNG",
      deposit_success: "Đã nạp thành công {{amount}}đ",
      deposit_failed: "Nạp tiền thất bại",
      buy_success: "Mua hàng thành công!",
      buy_failed: "Mua hàng thất bại",
      error_load_data: "Lỗi tải dữ liệu",
      stock_label: "Còn lại",
      unit: "sản phẩm",

      home: "Trang chủ",
      seller_channel: "Kênh người bán",
      login: "Đăng nhập",
      logout: "Đăng xuất",
      sold: "Đã bán",
      add_to_cart: "Thêm vào giỏ",
    },
  },
  en: {
    translation: {
      login_title: "Flash Sale Login",
      email_label: "Email",
      email_placeholder: "Enter your email",
      password_label: "Password",
      password_placeholder: "Enter your password",
      login_button: "Login",
      processing: "Processing...",
      login_success: "Login successful!",
      login_failed: "Login failed, please check your credentials!",
      // --- Register ---
      register_title: "Create Account",
      register_subtitle: "Create an account to join the flash sale!",
      register_button: "Register",
      role_customer: "I am a Customer",
      role_seller: "I am a Seller",
      already_have_account: "Already have an account?",
      login_now: "Login now",
      register_success: "Registration successful!",
      register_failed: "Registration failed!",

      // --- Forgot & Reset Password ---
      forgot_password_title: "Forgot Password",
      forgot_password_desc: "Enter your email to reset password",
      send_request: "Send Request",
      reset_password_title: "Reset Password",
      new_password_placeholder: "Enter new password",
      update_password: "Update Password",
      back_to_login: "Back to login",
      //verify mail
      verify_loading_title: "Account Verification",
      verify_success_title: "Success!",
      verify_failed_title: "Verification Failed",
      verify_loading_desc: "The system is checking your verification code...",
      verify_success_desc: "Your account has been successfully activated!",
      verify_success_sub: "You can now log in to participate in flash sales.",
      invalid_token: "Invalid or expired verification token!",
      //customer
      wallet_balance: "wallet balance",
      flash_sale_title: "⚡ Flash Sale",
      refresh: "refresh",
      sale_badge: "Sale",
      hunt_deal: "Hunt deal",
      buy_now: "Buy now",
      out_of_stock: "Out of stock",
      deposit_success: "Deposit success {{amount}}đ",
      deposit_failed: "Deposit failed",
      buy_success: "Buy success!",
      buy_failed: "Buy failed",
      error_load_data: "error load data",
      stock_label: "stock label",
      unit: "unit",

      home: "Home",
      seller_channel: "Seller Channel",
      login: "Login",
      logout: "Logout",
      sold: "Sold",
      add_to_cart: "Add to cart",
    },
  },
};

i18n
  .use(LanguageDetector) // Tự động nhận diện ngôn ngữ trình duyệt
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "vi", // Ngôn ngữ mặc định
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
