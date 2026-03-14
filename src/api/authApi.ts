import axiosClient from "./axiosClient";
import type { LoginRequest, LoginResponse } from "../types/auth";

export const authApi = {
  login: (data: LoginRequest): Promise<LoginResponse> => {
    // Backend trả về ApiResponse<LoginResponse>, axiosClient bóc tách lấy .data
    return axiosClient.post('/auth/login', data);
  },
  
  logout: (): Promise<void> => {
    return axiosClient.post('/auth/logout');
  }
};