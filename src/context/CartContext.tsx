import React, { createContext, useCallback, useContext, useEffect, useReducer } from 'react';
import type { CartItem } from '../types';
import { businessConfig } from '../config/business';

// ─── State ────────────────────────────────────────────────────────────────────

interface CartState {
  items: CartItem[];
}

const STORAGE_KEY = 'ayesha_cart';

const loadFromStorage = (): CartItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

// ─── Actions ──────────────────────────────────────────────────────────────────

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { productId: string; variantId?: string } }
  | { type: 'UPDATE_QTY'; payload: { productId: string; variantId?: string; quantity: number } }
  | { type: 'CLEAR' };

const itemKey = (productId: string, variantId?: string) =>
  variantId ? `${productId}__${variantId}` : productId;

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const key = itemKey(action.payload.productId, action.payload.variantId);
      const existing = state.items.find(
        (i) => itemKey(i.productId, i.variantId) === key
      );
      if (existing) {
        return {
          items: state.items.map((i) =>
            itemKey(i.productId, i.variantId) === key
              ? { ...i, quantity: i.quantity + action.payload.quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, action.payload] };
    }
    case 'REMOVE_ITEM': {
      const key = itemKey(action.payload.productId, action.payload.variantId);
      return { items: state.items.filter((i) => itemKey(i.productId, i.variantId) !== key) };
    }
    case 'UPDATE_QTY': {
      const key = itemKey(action.payload.productId, action.payload.variantId);
      if (action.payload.quantity <= 0) {
        return { items: state.items.filter((i) => itemKey(i.productId, i.variantId) !== key) };
      }
      return {
        items: state.items.map((i) =>
          itemKey(i.productId, i.variantId) === key
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      };
    }
    case 'CLEAR':
      return { items: [] };
    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  shipping: number;
  total: number;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQty: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: loadFromStorage() });

  // Persist to localStorage on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  const totalItems = state.items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = state.items.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping =
    subtotal === 0
      ? 0
      : subtotal >= businessConfig.freeShippingThreshold
      ? 0
      : businessConfig.shippingCharge;
  const total = subtotal + shipping;

  const addItem = useCallback((item: CartItem) => dispatch({ type: 'ADD_ITEM', payload: item }), []);
  const removeItem = useCallback(
    (productId: string, variantId?: string) =>
      dispatch({ type: 'REMOVE_ITEM', payload: { productId, variantId } }),
    []
  );
  const updateQty = useCallback(
    (productId: string, quantity: number, variantId?: string) =>
      dispatch({ type: 'UPDATE_QTY', payload: { productId, variantId, quantity } }),
    []
  );
  const clearCart = useCallback(() => dispatch({ type: 'CLEAR' }), []);

  return (
    <CartContext.Provider
      value={{ items: state.items, totalItems, subtotal, shipping, total, addItem, removeItem, updateQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextValue => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
};
