import { configureStore, createSlice } from '@reduxjs/toolkit';
import cartReducer from './redux/reducers/cartReducer';

// For backward compatibility with existing code
const legacyCartSlice = createSlice({
  name: 'handleCart',
  initialState: [],
  reducers: {
    addCart: (state, action) => {
      const existingItemIndex = state.findIndex(item => {
        // Check if item already exists in cart with same ID, variant, and size
        return item.id === action.payload.id && 
               (item.size === action.payload.size) &&
               (item.selectedVariant === action.payload.selectedVariant);
      });
      
      if (existingItemIndex >= 0) {
        // If item exists, increment quantity
        state[existingItemIndex].qty = (state[existingItemIndex].qty || 1) + (action.payload.qty || 1);
      } else {
        // If item doesn't exist, add it with quantity 1
        state.push({ ...action.payload, qty: action.payload.qty || 1 });
      }
    },
    removeFromCart: (state, action) => {
      return state.filter(item => item.id !== action.payload.id);
    },
    clearCart: () => [],
    incrementQty: (state, action) => {
      const item = state.find(item => item.id === action.payload.id);
      if (item) {
        item.qty = (item.qty || 1) + 1;
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