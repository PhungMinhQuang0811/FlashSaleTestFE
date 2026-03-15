import axiosClient from "./axiosClient";
import type { AccountRegisterRequest, UserResponse } from "../types/auth";

export const userApi = {
    register: (data: AccountRegisterRequest): Promise<UserResponse> => {
        return axiosClient.post('/user/register', data);
    },

    // Xác thực email từ link mailtrap (/user/verify-email?t=...)
    verifyEmail: (token: string): Promise<any> => {
        return axiosClient.get('/user/verify-email', {
            params: { t: token }
        });
    },

    // Gửi lại email xác nhận nếu cần
    resendVerifyEmail: (email: string): Promise<any> => {
        return axiosClient.get(`/user/resend-verify-email/${email}`);
    },

    // Đổi mật khẩu khi đã đăng nhập
    editPassword: (data: any): Promise<any> => {
        return axiosClient.put('/user/edit-password', data);
    }
};