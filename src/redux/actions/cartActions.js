// Action Types
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_QUANTITY = 'UPDATE_QUANTITY';

// Action Creators
export const addToCart = (item) => (dispatch, getState) => {
  const { cart } = getState();
  const existingItem = cart.items.find(
    (cartItem) => 
      cartItem.id === item.id && 
      (!cartItem.variant || cartItem.variant === item.variant) &&
      (!cartItem.size || cartItem.size === item.size)
  );

  if (existingItem) {
    // If item already exists in cart, update quantity
    dispatch(updateQuantity(item.id, (existingItem.qty || 1) + 1, item.variant, item.size));
  } else {
    // Otherwise, add new item to cart
    dispatch({
      type: ADD_TO_CART,
      payload: {
        ...item,
        qty: item.qty || 1
      }
    });
  }

  // Save cart to localStorage
  const updatedCart = {
    ...getState().cart,
    items: getState().cart.items.map(item => ({
      ...item,
      // Remove any non-serializable properties
      // that might cause issues with localStorage
      ...(item.variants && { variants: undefined })
    }))
  };
  localStorage.setItem('cart', JSON.stringify(updatedCart));
};

export const removeFromCart = (itemId, variant = null, size = null) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: { id: itemId, variant, size }
  });

  // Update localStorage after removal
  localStorage.setItem('cart', JSON.stringify(getState().cart));
};

export const updateQuantity = (itemId, newQty, variant = null, size = null) => (dispatch, getState) => {
  if (newQty <= 0) {
    dispatch(removeFromCart(itemId, variant, size));
    return;
  }

  dispatch({
    type: UPDATE_QUANTITY,
    payload: {
      id: itemId,
      qty: newQty,
      variant,
      size
    }
  });

  // Update localStorage after quantity change
  localStorage.setItem('cart', JSON.stringify(getState().cart));
};

// Load cart from localStorage
export const loadCart = () => (dispatch) => {
  try {
    const serializedCart = localStorage.getItem('cart');
    if (serializedCart === null) {
      return; // No saved cart
    }
    const cart = JSON.parse(serializedCart);
    dispatch({
      type: 'LOAD_CART',
      payload: cart
    });
  } catch (err) {
    console.error('Failed to load cart from localStorage', err);
  }
};
