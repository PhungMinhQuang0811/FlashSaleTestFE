import axiosClient from "./axiosClient";

export const walletApi = {
    // Hiện tại BE chưa có GET balance, mình sẽ để hàm này chờ hoặc gọi tạm
    // getBalance: () => axiosClient.get('/flash-sale/transaction/balance'), 
    
    deposit: (amount: number): Promise<any> => {
        // Vì BE dùng @RequestBody Long amount nên ta gửi trực tiếp số
        return axiosClient.post('/flash-sale/transaction/deposit', amount);
    },
    withdraw: (amount: number): Promise<any> => {
        return axiosClient.post('/flash-sale/transaction/withdraw', amount);
    }
};