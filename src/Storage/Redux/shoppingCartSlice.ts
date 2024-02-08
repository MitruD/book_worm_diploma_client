import { createSlice } from "@reduxjs/toolkit";
import { shoppingCartModel } from "../../Interfaces";

//initiale state
const initialState: shoppingCartModel = {
  cartItems: [],
};

export const shoppingCartSlice = createSlice({
  name: "cartItems",
  initialState: initialState,
  reducers: {
    setShoppingCart: (state, action) => {
      state.cartItems = action.payload;
    },
    updateQuantity: (state, action) => {
      //paylaod- cart item that needs to be updated, newquantity
      //( === ) If the values are equal in value and type, it returns true.
      state.cartItems = state.cartItems?.map((item) => {
        if (item.id === action.payload.cartItem.id) {
          item.quantity = action.payload.quantity;
        }
        return item;
      });
    },
    removeFromCart: (state, action) => {
      //paylaod- cart item that needs to be updated, newquantity
      //( === ) If the values are equal in value and type, it returns true.
      state.cartItems = state.cartItems?.filter((item) => {
        if (item.id === action.payload.cartItem.id) {
          item.quantity = action.payload.quantity;
        }
        return item;
      });
    },
  },
});

export const { setShoppingCart, removeFromCart, updateQuantity } =
  shoppingCartSlice.actions;
export const shoppingCartReducer = shoppingCartSlice.reducer;
