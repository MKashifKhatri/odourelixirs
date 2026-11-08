import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';
import { getProductById, MAX_QTY, SHIPPING_FEE } from '../data/products';

const KEY = 'oe_cart_v1';

function load() {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY));
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((i) => i && getProductById(i.id) && Number.isInteger(i.qty) && i.qty > 0);
  } catch {
    return [];
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'add': {
      const existing = state.find((i) => i.id === action.id);
      const qty = Math.min(MAX_QTY, (existing?.qty || 0) + (action.qty || 1));
      return existing
        ? state.map((i) => (i.id === action.id ? { ...i, qty } : i))
        : [...state, { id: action.id, qty }];
    }
    case 'set':
      return action.qty <= 0
        ? state.filter((i) => i.id !== action.id)
        : state.map((i) => (i.id === action.id ? { ...i, qty: Math.min(MAX_QTY, action.qty) } : i));
    case 'remove':
      return state.filter((i) => i.id !== action.id);
    case 'clear':
      return [];
    default:
      return state;
  }
}

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, undefined, load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable */
    }
  }, [items]);

  const addItem = useCallback((id, qty = 1) => dispatch({ type: 'add', id, qty }), []);
  const setQty = useCallback((id, qty) => dispatch({ type: 'set', id, qty }), []);
  const removeItem = useCallback((id) => dispatch({ type: 'remove', id }), []);
  const clear = useCallback(() => dispatch({ type: 'clear' }), []);

  const value = useMemo(() => {
    const lines = items.map((i) => ({ ...i, product: getProductById(i.id) }));
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const subtotal = lines.reduce((n, l) => n + l.qty * l.product.price, 0);
    const shipping = lines.length ? SHIPPING_FEE : 0;
    return { lines, count, subtotal, shipping, total: subtotal + shipping, addItem, setQty, removeItem, clear };
  }, [items, addItem, setQty, removeItem, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
};
