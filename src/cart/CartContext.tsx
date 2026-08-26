import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { ProductDTO } from '../types/api';

export interface CartItem {
  product: ProductDTO;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  total: number;
  add: (product: ProductDTO, quantity?: number) => void;
  remove: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
}

const STORAGE_KEY = 'store-app.cart';
const CartContext = createContext<CartContextValue | undefined>(undefined);

function readCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(readCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const add = (product: ProductDTO, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      if (!existing) return [...current, { product, quantity: Math.max(1, quantity) }];

      return current.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + Math.max(1, quantity) }
          : item,
      );
    });
  };

  const remove = (productId: string) => {
    setItems((current) => current.filter((item) => item.product.id !== productId));
  };

  const setQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      remove(productId);
      return;
    }

    setItems((current) =>
      current.map((item) =>
        item.product.id === productId ? { ...item, quantity: Math.floor(quantity) } : item,
      ),
    );
  };

  const clear = () => setItems([]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
      total: items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
      add,
      remove,
      setQuantity,
      clear,
    }),
    [items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
}
