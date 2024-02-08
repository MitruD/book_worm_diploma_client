import { configureStore } from "@reduxjs/toolkit";
import { bookReducer } from "./bookSlice";
import { authApi, bookApi, shoppingCartApi } from "../../APIs";
import { shoppingCartReducer } from "./shoppingCartSlice";
import { userAuthReducer } from "./userAuthSlice";

const store = configureStore({
  reducer: {
    bookStore: bookReducer,
    shoppingCartStore: shoppingCartReducer,
    userAuthStore: userAuthReducer,
    //invalidate,register api
    [bookApi.reducerPath]: bookApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [shoppingCartApi.reducerPath]: shoppingCartApi.reducer,
  },
  //add api to middleware, it's rhe way it should be done
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(bookApi.middleware)
      .concat(authApi.middleware)
      .concat(shoppingCartApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
