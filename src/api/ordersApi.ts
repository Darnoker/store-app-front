import { apiFetch } from './http';
import type { CreateOrderRequest, OrderDTO } from '../types/api';

export const ordersApi = {
  create(payload: CreateOrderRequest) {
    return apiFetch<OrderDTO>('/orders', {
      method: 'POST',
      auth: true,
      body: JSON.stringify(payload),
    });
  },

  mine() {
    return apiFetch<OrderDTO[]>('/orders/me', { auth: true });
  },

  get(orderId: string) {
    return apiFetch<OrderDTO>(`/orders/${orderId}`, { auth: true });
  },
};
