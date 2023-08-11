
import { createSlice } from '@reduxjs/toolkit';

// Get the cart data from localStorage (if available)
const cartDataFromStorage = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

const initialState = {
  items: cartDataFromStorage, // Initialize cart state with data from localStorage
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex(item => item._id === newItem._id);
      if (existingItemIndex !== -1) {
        // If the product already exists in the cart, update its quantity
        state.items[existingItemIndex].qty = +state.items[existingItemIndex].qty + +newItem.qty;
      } else {
        // If the product doesn't exist, push the new item to the cart
        state.items.push(newItem);
      }

      // Save the updated cart data in localStorage
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeFromCart(state, action) {
      const itemId = action.payload;
      state.items = state.items.filter(item => item._id !== itemId);

      // Save the updated cart data in localStorage
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    clearCart(state) {
      state.items = [];

      // Clear the cart data from localStorage
      localStorage.removeItem('cart');
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;