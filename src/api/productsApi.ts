import { apiFetch } from './http';
import type { CreateProductRequest, ProductDTO, ProductFilters } from '../types/api';

function toQuery(filters: ProductFilters = {}): string {
  const params = new URLSearchParams();

  filters.ids?.forEach((id) => params.append('ids', id));
  if (filters.type) params.set('type', filters.type);
  if (filters.minPrice !== undefined) params.set('minPrice', String(filters.minPrice));
  if (filters.maxPrice !== undefined) params.set('maxPrice', String(filters.maxPrice));

  const query = params.toString();
  return query ? `?${query}` : '';
}

export const productsApi = {
  list(filters?: ProductFilters) {
    return apiFetch<ProductDTO[]>(`/products${toQuery(filters)}`);
  },

  get(productId: string) {
    return apiFetch<ProductDTO>(`/products/${productId}`);
  },

  create(payload: CreateProductRequest) {
    return apiFetch<ProductDTO>('/products', {
      method: 'POST',
      auth: true,
      body: JSON.stringify(payload),
    });
  },
};
