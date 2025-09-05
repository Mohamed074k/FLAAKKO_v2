import { configureStore, createSlice } from '@reduxjs/toolkit';
import cartReducer from './redux/reducers/cartReducer';

// For backward compatibility with existing code
const legacyCartSlice = createSlice({
  name: 'handleCart',
  initialState: [],
  reducers: {
    addCart: (state, action) => {
      const product = action.payload;
      const existingItemIndex = state.findIndex(item => {
        // Check if item already exists in cart with same ID, variant, and size
        return item.id === product.id && 
               (item.size === product.size) &&
               (item.selectedVariant === product.selectedVariant);
      });
      
      if (existingItemIndex >= 0) {
        // If item exists, check if we can increment quantity
        const existingItem = state[existingItemIndex];
        const newQty = (existingItem.qty || 1) + (product.qty || 1);
        
        // Check if requested quantity exceeds available stock
        if (product.stock !== undefined && newQty > product.stock) {
          // Don't modify state, just return current state
          // The error will be handled by the UI component
          return state;
        }
        
        // If we have enough stock, update the quantity
        state[existingItemIndex].qty = newQty;
      } else {
        // If item doesn't exist and we have stock, add it
        if (product.stock === undefined || (product.qty || 1) <= product.stock) {
          state.push({ ...product, qty: product.qty || 1 });
        }
      }
      
      // Save to localStorage for persistence
      localStorage.setItem('cart', JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      const newState = state.filter(item => item.id !== action.payload.id);
      localStorage.setItem('cart', JSON.stringify(newState));
      return newState;
    },
    clearCart: () => {
      localStorage.removeItem('cart');
      return [];
    },
    incrementQty: (state, action) => {
      const item = state.find(item => item.id === action.payload.id);
      if (item) {
        // Check if we can increment without exceeding stock
        if (item.stock === undefined || (item.qty + 1) <= item.stock) {
          item.qty = (item.qty || 1) + 1;
          localStorage.setItem('cart', JSON.stringify(state));
        }
      }
    },
    decrementQty: (state, action) => {
      const itemIndex = state.findIndex(item => item.id === action.payload.id);
      if (itemIndex !== -1) {
        const item = state[itemIndex];
        if ((item.qty || 1) > 1) {
          item.qty = (item.qty || 1) - 1;
        } else {
          state.splice(itemIndex, 1);
        }
        localStorage.setItem('cart', JSON.stringify(state));
      }
    }
  }
});

// Export the action creators as named exports for backward compatibility
export const { addCart, removeFromCart, clearCart, incrementQty, decrementQty } = legacyCartSlice.actions;

const store = configureStore({
  reducer: {
    // New cart reducer with more features
    cart: cartReducer,
    // Keep the old reducer for backward compatibility
    handleCart: legacyCartSlice.reducer
  },
  // Load cart from localStorage on store creation
  preloadedState: (() => {
    try {
      const serializedCart = localStorage.getItem('cart');
      if (serializedCart === null) {
        return undefined;
      }
      return { cart: JSON.parse(serializedCart) };
    } catch (err) {
      console.error('Failed to load cart from localStorage', err);
      return undefined;
    }
  })()
});

// Subscribe to store changes to save cart to localStorage
store.subscribe(() => {
  try {
    const { cart } = store.getState();
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem('cart', serializedCart);
  } catch (err) {
    console.error('Failed to save cart to localStorage', err);
  }
});

export default store;