import React from 'react';
import { useTranslation } from 'react-i18next';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  const { i18n } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-700 p-4">
      <div className="w-full max-w-md">
        {/* Nút chuyển ngôn ngữ */}
        <div className="flex justify-end mb-4 space-x-2">
          {['vi', 'en'].map((lng) => (
            <button
              key={lng}
              onClick={() => i18n.changeLanguage(lng)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase transition-all duration-300 shadow-sm ${
                i18n.language === lng ? 'bg-white text-blue-600 scale-105' : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {lng}
            </button>
          ))}
        </div>

        {/* Card trắng chứa Form */}
        <div className="bg-white/95 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-white/20">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              {title}
            </h2>
            {subtitle && <p className="text-gray-500 mt-2 text-sm">{subtitle}</p>}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;