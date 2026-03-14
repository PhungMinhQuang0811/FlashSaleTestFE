import axios, { type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import type { ApiResponse } from '../types/common';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const csrfToken = localStorage.getItem('csrfToken');
    if (csrfToken && config.headers) {
      config.headers['X-CSRF-TOKEN'] = csrfToken;
    }
    return config;
  },
  (error: any) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response: AxiosResponse<ApiResponse<any>>) => {
    if (response.data && response.data.code === 1000) {
      return response.data.data;
    }
    return response.data;
  },
  (error: any) => {
    const status = error.response?.status;
    if (status === 401) {
      localStorage.removeItem('userRole');
      localStorage.removeItem('csrfToken');
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

export default axiosClient;