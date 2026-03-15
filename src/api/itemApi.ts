import axiosClient from "./axiosClient";
import type { ItemResponse } from "../types/item";

export const itemApi = {
  // BE trả về Page nên cần bóc tách .content
  getAll: async (page = 0, size = 10) => {
    // Trả về promise của axios
    const response = await axiosClient.get(`/items`, {
      params: { page, size },
    });
    return response;
  },
  createOrder: (itemId: string, quantity: number = 1) => {
    return axiosClient.post(`/flash-sale/order`, {
      itemId: itemId,
      quantity: quantity,
    });
  },
};
