import { configureStore, createSlice } from '@reduxjs/toolkit';

// Minimal cart slice for demonstration
const cartSlice = createSlice({
  name: 'handleCart',
  initialState: [],
  reducers: {
    addCart: (state, action) => {
      const item = state.find(item => item.id === action.payload.id);
      if (item) {
        item.qty = (item.qty || 1) + 1;
      } else {
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

// Export the action creators as named exports
export const { addCart, removeFromCart, clearCart, incrementQty, decrementQty } = cartSlice.actions;

const store = configureStore({
  reducer: {
    handleCart: cartSlice.reducer
  }
});

export default store; 