export type ProductType = 'BOOK' | 'SWORD';

export interface AccessToken {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserProfile {
  userId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  roles: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookDetails {
  isbn: string;
  pages: number;
  author: string;
  publisher: string;
  language: string;
}

export interface SwordDetails {
  damage: number;
  weight: number;
  length: number;
  material: string;
}

export type ProductDetails = Record<string, unknown> & Partial<BookDetails & SwordDetails>;

export interface ProductDTO {
  id: string;
  name: string;
  description: string;
  price: number;
  productType: ProductType;
  details: ProductDetails;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilters {
  ids?: string[];
  type?: ProductType | '';
  minPrice?: number;
  maxPrice?: number;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  productType: ProductType;
  details: Record<string, string | number>;
}

export interface CreateOrderItemRequest {
  productId: string;
  quantity: number;
}

export interface CreateOrderRequest {
  items: CreateOrderItemRequest[];
}

export interface OrderItemDTO {
  orderItemId: string;
  productId: string;
  productType: string;
  productName: string;
  unitPrice: number;
  quantity: number;
}

export interface OrderDTO {
  orderId: string;
  customerId: string;
  items: OrderItemDTO[];
  totalAmount: number;
  currency: 'PLN';
  status: string;
  createdAt: string;
  updatedAt?: string;
}
