import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const shoppingCartApi = createApi({
  reducerPath: "shoppingCartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7193/api/",
  }),
  tagTypes: ["ShoppingCarts"],
  endpoints: (builder) => ({
    getShoppingCart: builder.query({
      query: (userId) => ({
        url: `ShoppingCart`,
        params: {
          userId: userId,
        },
      }),
      providesTags: ["ShoppingCarts"],
    }),
    //muutations synon. for reducers
    updateShoppingCart: builder.mutation({
      //Parameters for shoppingcar api
      query: ({ userId, bookId, updateQuantityBy }) => ({
        url: "ShoppingCart",
        method: "POST",
        params: {
          //same name as API param, if not then diffName: bookId
          userId,
          bookId,
          updateQuantityBy,
        },
      }),
      invalidatesTags: ["ShoppingCarts"],
    }),
  }),
});

export const { useGetShoppingCartQuery, useUpdateShoppingCartMutation } =
  shoppingCartApi;
export default shoppingCartApi;
