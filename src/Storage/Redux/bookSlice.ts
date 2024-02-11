import { createSlice } from "@reduxjs/toolkit";

//initiale state
const initialState = {
  book: [],
  search: "",
};

export const bookSlice = createSlice({
  name: "Book",
  initialState: initialState,
  reducers: {
    setBook: (state, action) => {
      state.book = action.payload;
    },
    setSearchBook: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setBook, setSearchBook } = bookSlice.actions;
export const bookReducer = bookSlice.reducer;
