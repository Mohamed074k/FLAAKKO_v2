import { 
  ADD_TO_CART, 
  REMOVE_FROM_CART, 
  UPDATE_QUANTITY 
} from '../actions/cartActions';

// Helper function to check if two items are the same
const isSameItem = (item1, item2) => {
  return (
    item1.id === item2.id &&
    (!item1.variant || item1.variant === item2.variant) &&
    (!item1.size || item1.size === item2.size)
  );
};

const initialState = {
  items: [],
  totalItems: 0,
  subtotal: 0
};

const cartReducer = (state = initialState, action) => {
  let updatedItems;
  
  switch (action.type) {
    case 'LOAD_CART':
      return {
        ...state,
        ...action.payload
      };
      
    case ADD_TO_CART:
      const existingItemIndex = state.items.findIndex(item => 
        item.id === action.payload.id &&
        (!item.variant || item.variant === action.payload.variant) &&
        (!item.size || item.size === action.payload.size)
      );
      
      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        updatedItems = state.items.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, qty: (item.qty || 1) + (action.payload.qty || 1) }
            : item
        );
      } else {
        // New item, add to cart
        updatedItems = [...state.items, { ...action.payload, qty: action.payload.qty || 1 }];
      }
      
      return {
        ...state,
        items: updatedItems,
        totalItems: updatedItems.reduce((total, item) => total + (item.qty || 1), 0),
        subtotal: updatedItems.reduce((total, item) => total + (item.price * (item.qty || 1)), 0)
      };
      
    case REMOVE_FROM_CART:
      updatedItems = state.items.filter(item => 
        !(item.id === action.payload.id && 
          (!item.variant || item.variant === action.payload.variant) &&
          (!item.size || item.size === action.payload.size))
      );
      return {
        ...state,
        items: updatedItems,
        totalItems: updatedItems.reduce((total, item) => total + (item.qty || 1), 0),
        subtotal: updatedItems.reduce((total, item) => total + (item.price * (item.qty || 1)), 0)
      };
      
    case UPDATE_QUANTITY:
      updatedItems = state.items.map(item => {
        if (item.id === action.payload.id && 
            (!item.variant || item.variant === action.payload.variant) &&
            (!item.size || item.size === action.payload.size)) {
          return { ...item, qty: action.payload.qty };
        }
        return item;
      });
      return {
        ...state,
        items: updatedItems,
        totalItems: updatedItems.reduce((total, item) => total + (item.qty || 1), 0),
        subtotal: updatedItems.reduce((total, item) => total + (item.price * (item.qty || 1)), 0)
      };
      
    default:
      return state;
  }
};

export default cartReducer;
