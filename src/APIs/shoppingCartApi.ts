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
        url: `shoppingCart`,
        params: {
          userId: userId,
        },
      }),
      providesTags: ["ShoppingCarts"],
    }),
    //muutations synon. for reducers
    updateShoppingCart: builder.mutation({
      //Parameters for shoppingcar api
      query: ({ bookId, updateQuantityBy, userId }) => ({
        url: "shoppingCart",
        method: "POST",
        params: {
          //same name as API param, if not then diffName: menuItemId
          bookId,
          updateQuantityBy,
          userId,
        },
      }),
      invalidatesTags: ["ShoppingCarts"],
    }),
  }),
});

export const { useGetShoppingCartQuery, useUpdateShoppingCartMutation } =
  shoppingCartApi;
export default shoppingCartApi;
