import React, { useEffect, useState } from "react";
import { Footer, Header } from "../Components/Layout";
import { BookDetails, Home, NotFound, ShoppingCart } from "../Pages";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetShoppingCartQuery } from "../APIs/shoppingCartApi";
import { setShoppingCart } from "../Storage/Redux/shoppingCartSlice";

// we need to load the shopping cart when app is laoded

function App() {
  const dispatch = useDispatch();

  const { data, isLoading } = useGetShoppingCartQuery(
    "beef14eb-3e11-449f-8a16-eb81b0c008a7"
  );

  useEffect(() => {
    if (!isLoading) {
      console.log(data.result);
      dispatch(setShoppingCart(data.result?.cartItems));
    }
  }, [data]);

  return (
    <div>
      <Header />
      <div className="pb-5">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/bookDetails/:bookId" element={<BookDetails />}></Route>
          <Route path="/shoppingCart" element={<ShoppingCart />}></Route>

          {/* "*" means not found */}
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
