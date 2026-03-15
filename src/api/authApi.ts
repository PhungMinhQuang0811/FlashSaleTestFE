import axiosClient from "./axiosClient";
import type { LoginRequest } from "../types/auth";
import type { ChangePasswordRequest } from "../types/auth";
import type { LoginResponse } from "../types/auth";

export const authApi = {
  login: (data: LoginRequest): Promise<LoginResponse> => {
    // Backend trả về ApiResponse<LoginResponse>, axiosClient bóc tách lấy .data
    return axiosClient.post("/auth/login", data);
  },
  // Quên mật khẩu - Bước 1: Gửi email
  sendForgotPasswordEmail: (email: string): Promise<string> => {
    return axiosClient.get(`/auth/forgot-password/${email}`);
  },

  // Quên mật khẩu - Bước 2: Verify token từ link email
  verifyForgotPassword: (token: string): Promise<string> => {
    return axiosClient.get(`/auth/forgot-password/verify`, {
      params: { t: token },
    });
  },
  // Quên mật khẩu - Bước 3: Đổi mật khẩu mới
  changePassword: (data: ChangePasswordRequest): Promise<string> => {
    return axiosClient.put("/auth/forgot-password/change", data);
  },
  logout: (): Promise<void> => {
    return axiosClient.post("/auth/logout");
  },
};
