import { configureStore } from "@reduxjs/toolkit";
import { bookReducer } from "./bookSlice";
import { bookApi, shoppingCartApi } from "../../APIs";

const store = configureStore({
  reducer: {
    bookStore: bookReducer,
    //invalidate,register api
    [bookApi.reducerPath]: bookApi.reducer,
    [shoppingCartApi.reducerPath]: shoppingCartApi.reducer,
  },
  //add api to middleware, it's rhe way it should be done
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(bookApi.middleware)
      .concat(shoppingCartApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
