import React, { useEffect, useState } from "react";
import { itemApi } from "../../api/itemApi";
import { walletApi } from "../../api/walletApi";
import type { ItemResponse } from "../../types/item";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import Navbar from "../../components/layout/Navbar";

const CustomerDashboard = () => {
  const { t } = useTranslation();
  const [items, setItems] = useState<ItemResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const savedBalance = Number(localStorage.getItem("userBalance")) || 0;
  const [balance, setBalance] = useState<number>(savedBalance);
  const loadData = async () => {
    setLoading(true);
    try {
      const res: any = await itemApi.getAll();
      // Bóc tách dữ liệu từ cấu trúc Page của Spring Boot
      const actualData = res?.data?.content || res?.content || [];
      setItems(actualData);
    } catch (err) {
      console.error("Lỗi khi load data:", err);
      toast.error(t("error_load_data"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    const queryParams = new URLSearchParams(window.location.search);
    const vnpResponseCode = queryParams.get("vnp_ResponseCode");
    const vnpAmount = queryParams.get("vnp_Amount");

    if (vnpResponseCode === "00") {
      toast.success(t("payment_success") || "Nạp tiền thành công!");

      if (vnpAmount) {
        // VNPay trả về số tiền nhân 100 (ví dụ: 50000000 = 500k)
        const addedAmount = Number(vnpAmount) / 100;

        // Lấy balance hiện tại từ localStorage để tính toán chính xác nhất
        const currentBalance =
          Number(localStorage.getItem("userBalance")) || balance;
        const newBalance = currentBalance + addedAmount;

        setBalance(newBalance);
        localStorage.setItem("userBalance", newBalance.toString());
      }

      // Làm sạch URL
      window.history.replaceState({}, "", window.location.pathname);
    } else if (vnpResponseCode) {
      toast.error(t("payment_failed") || "Giao dịch không thành công.");
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []); // Chỉ chạy 1 lần khi load trang để kiểm tra kết quả thanh toán

  const handleDeposit = async (amount: number) => {
  try {
    const res: any = await walletApi.deposit(amount);
    console.log("Response thực tế:", res);

    // Dựa trên ảnh DevTools: res là Object có property 'payment'
    // Trong 'payment' có property 'vnp_url'
    const paymentUrl = res?.payment?.vnp_url || res?.data?.payment?.vnp_url;

    if (paymentUrl) {
      toast.success("Đang chuyển hướng sang VNPay...");
      setTimeout(() => {
        window.location.href = paymentUrl;
      }, 500);
    } else {
      // Log này hiện ra vì res.data không tồn tại trong cấu trúc Object của bạn
      toast.error("Không tìm thấy link thanh toán trong cấu trúc dữ liệu");
      console.log("Cấu trúc sai ở đâu:", { res });
    }
  } catch (error) {
    console.error("Lỗi gọi API:", error);
    toast.error("Lỗi hệ thống khi tạo GD");
  }
};

  const onBuy = async (itemId: string) => {
    const itemToBuy = items.find((i) => i.id === itemId);
    if (!itemToBuy) return;

    const price = itemToBuy.salePrice || itemToBuy.originalPrice;

    if (balance < price) {
      toast.error(t("insufficient_balance") || "Không đủ tiền trong ví!");
      return;
    }

    try {
      await itemApi.createOrder(itemId);
      toast.success(t("buy_success"));

      // Trừ tiền sau khi mua thành công
      const newBalance = balance - price;
      setBalance(newBalance);
      localStorage.setItem("userBalance", newBalance.toString());

      loadData(); // Cập nhật lại số lượng hàng tồn kho từ BE
    } catch (error: any) {
      toast.error(error.response?.data?.message || t("buy_failed"));
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 p-4 md:p-8 text-gray-800">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* --- WALLET SECTION --- */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-blue-50 border-dashed flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-gray-500 font-semibold text-sm uppercase tracking-wider">
                {t("wallet_balance")}
              </h2>
              <p className="text-4xl font-black text-blue-600">
                {balance.toLocaleString()} <span className="text-xl">₫</span>
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleDeposit(500000)}
                className="btn btn-outline btn-info rounded-xl"
              >
                +500K
              </button>
              <button
                onClick={() => handleDeposit(1000000)}
                className="btn btn-outline btn-info rounded-xl"
              >
                +1M
              </button>
            </div>
          </div>

          {/* --- ITEMS SECTION --- */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-black italic text-gray-800 uppercase">
              {t("flash_sale_title")}
            </h2>
            <button onClick={loadData} className="btn btn-ghost btn-sm gap-2">
              🔄 {t("refresh")}
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <span className="loading loading-spinner loading-lg text-blue-600"></span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {items.map((item) => {
                const isSale =
                  item.salePrice !== null &&
                  item.salePrice < item.originalPrice;
                return (
                  <div
                    key={item.id}
                    className="card bg-white shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                  >
                    <figure className="relative h-52 overflow-hidden bg-gray-100">
                      <img
                        src={
                          item.imageUrl || "https://via.placeholder.com/400x300"
                        }
                        alt={item.name}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                      />
                      {isSale && (
                        <div className="absolute top-3 left-3 badge badge-error text-white font-bold p-3 animate-pulse">
                          {t("sale_badge")}
                        </div>
                      )}
                    </figure>

                    <div className="card-body p-5">
                      <h3 className="card-title text-gray-800 text-base h-12 line-clamp-2 leading-tight">
                        {item.name}
                      </h3>

                      <div className="mt-2 flex flex-col">
                        <span
                          className={`text-2xl font-black ${isSale ? "text-red-500" : "text-blue-600"}`}
                        >
                          {(isSale
                            ? item.salePrice
                            : item.originalPrice
                          )?.toLocaleString()}
                          ₫
                        </span>
                        {isSale && (
                          <span className="text-sm text-gray-400 line-through">
                            {item.originalPrice.toLocaleString()}₫
                          </span>
                        )}
                      </div>

                      <div className="mt-3 flex items-center justify-between text-sm">
                        <span className="text-gray-500">
                          {t("stock_label") || "Còn lại"}:
                        </span>
                        <span
                          className={`font-bold ${item.quantity < 10 ? "text-error" : "text-gray-700"}`}
                        >
                          {item.quantity} {t("unit") || "sản phẩm"}
                        </span>
                      </div>

                      <div className="card-actions mt-6">
                        <button
                          onClick={() => onBuy(item.id)}
                          disabled={item.quantity <= 0}
                          className={`btn btn-block rounded-xl border-none font-bold shadow-md transition-all duration-200 ${
                            isSale
                              ? "bg-gradient-to-r from-red-500 to-orange-500 text-white hover:brightness-110"
                              : "btn-primary"
                          }`}
                        >
                          {item.quantity > 0
                            ? isSale
                              ? t("hunt_deal")
                              : t("buy_now")
                            : t("out_of_stock")}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CustomerDashboard;
