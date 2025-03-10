import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  selectedItems: 0,
  totalPrice: 0,
  tax: 0,
  taxRate: 0.05, // Tasa de impuesto ajustada al 5%
  grandTotal: 0,
};

// Funciones de cálculo
const calculateSelectedItems = (products) =>
  products.reduce((total, product) => total + product.quantity, 0);

const calculateTotalPrice = (products) =>
  products.reduce((total, product) => total + product.quantity * product.price, 0);

const calculateTax = (totalPrice, taxRate) => totalPrice * taxRate;

const calculateGrandTotal = (totalPrice, tax) => totalPrice + tax;

// Slice del carrito
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const isExist = state.products.find((product) => product.id === action.payload.id);

      if (!isExist) {
        state.products.push({ ...action.payload, quantity: 1 });
      } else {
        isExist.quantity += 1;
      }

      state.selectedItems = calculateSelectedItems(state.products);
      state.totalPrice = calculateTotalPrice(state.products);
      state.tax = calculateTax(state.totalPrice, state.taxRate);
      state.grandTotal = calculateGrandTotal(state.totalPrice, state.tax);
    },
    updateQuantity: (state, action) => {
      const { id, type } = action.payload;
      const product = state.products.find((product) => product.id === id);

      if (product) {
        if (type === "increment") {
          product.quantity += 1;
        } else if (type === "decrement" && product.quantity > 1) {
          product.quantity -= 1;
        }
      }

      state.selectedItems = calculateSelectedItems(state.products);
      state.totalPrice = calculateTotalPrice(state.products);
      state.tax = calculateTax(state.totalPrice, state.taxRate);
      state.grandTotal = calculateGrandTotal(state.totalPrice, state.tax);
    },
    removeFromCart: (state, action) => {
      state.products = state.products.filter((product) => product.id !== action.payload.id);

      state.selectedItems = calculateSelectedItems(state.products);
      state.totalPrice = calculateTotalPrice(state.products);
      state.tax = calculateTax(state.totalPrice, state.taxRate);
      state.grandTotal = calculateGrandTotal(state.totalPrice, state.tax);
    },
    clearCart: (state) => {
      state.products = [];
      state.selectedItems = 0;
      state.totalPrice = 0;
      state.tax = 0;
      state.grandTotal = 0;
    },
  },
});

// Exporta las acciones y el reducer
export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
