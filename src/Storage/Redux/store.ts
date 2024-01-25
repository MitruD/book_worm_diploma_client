import { configureStore } from "@reduxjs/toolkit";
import { bookReducer } from "./bookSlice";
import { bookApi } from "../../APIs";

const store = configureStore({
  reducer: {
    bookStore: bookReducer,
    //register api
    [bookApi.reducerPath]: bookApi.reducer,
  },
  //add api to middleware, it's rhe way it should be done
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;