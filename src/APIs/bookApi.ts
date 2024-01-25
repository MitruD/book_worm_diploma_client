import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7193/api/",
  }),
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => ({
        url: "book",
      }),
      providesTags: ["Books"],
    }),
    getBookById: builder.query({
      query: (id) => ({
        url: `book/${id}`,
      }),
      providesTags: ["Books"],
    }),
  }),
});

export const { useGetBooksQuery, useGetBookByIdQuery } = bookApi;
export default bookApi;
