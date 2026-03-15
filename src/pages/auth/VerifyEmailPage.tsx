import { useEffect, useState, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { userApi } from "../../api/userApi";
import AuthLayout from "../../components/layout/AuthLayout";
import { useTranslation } from "react-i18next";

const VerifyEmailPage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [errorMsg, setErrorMsg] = useState("");
  const hasCalled = useRef(false);

  const token = searchParams.get("t");

  useEffect(() => {
    const verify = async () => {
      if (hasCalled.current || !token) return;

      hasCalled.current = true;
      if (!token) {
        setStatus("error");
        setErrorMsg(t("invalid_token"));
        return;
      }
      try {
        await userApi.verifyEmail(token);
        setStatus("success");
      } catch (error: any) {
        setStatus("error");
        setErrorMsg(error.response?.data?.message || t("verify_failed_desc"));
      }
    };
    verify();
  }, [token, t]);

  // Hàm helper để lấy tiêu đề dựa trên trạng thái
  const getPageTitle = () => {
    if (status === "loading") return t("verify_loading_title");
    if (status === "success") return t("verify_success_title");
    return t("verify_failed_title");
  };

  return (
    <AuthLayout title={getPageTitle()}>
      <div className="text-center space-y-6">
        {/* TRẠNG THÁI ĐANG XỬ LÝ */}
        {status === "loading" && (
          <div className="flex flex-col items-center">
            <span className="loading loading-spinner loading-lg text-primary mb-4"></span>
            <p className="text-gray-600 font-medium">
              {t("verify_loading_desc")}
            </p>
          </div>
        )}

        {/* TRẠNG THÁI THÀNH CÔNG */}
        {status === "success" && (
          <div className="space-y-4">
            <div className="text-6xl mb-4 animate-bounce">✅</div>
            <p className="text-gray-800 font-bold text-lg">
              {t("verify_success_desc")}
            </p>
            <p className="text-gray-500 text-sm">{t("verify_success_sub")}</p>
          </div>
        )}

        {/* TRẠNG THÁI THẤT BẠI */}
        {status === "error" && (
          <div className="space-y-4">
            <div className="text-6xl mb-4">❌</div>
            <p className="text-red-600 font-bold text-lg">
              {t("verify_failed_title")}
            </p>
            <p className="text-gray-500 text-sm italic">{errorMsg}</p>
          </div>
        )}

        {/* NÚT QUAY LẠI LOGIN */}
        <div className="pt-6 border-t border-gray-100">
          <Link
            to="/login"
            className="btn btn-primary btn-block rounded-2xl text-white font-bold uppercase tracking-wider"
          >
            {t("login_now")}
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default VerifyEmailPage;
