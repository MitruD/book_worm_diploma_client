import React, { useEffect, useState } from "react";
import { Footer, Header } from "../Components/Layout";
import {
  AccessDenied,
  BookDetails,
  BookList,
  BookUpsert,
  Home,
  Login,
  NotFound,
  Register,
  ShoppingCart,
} from "../Pages";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetShoppingCartQuery } from "../APIs/shoppingCartApi";
import { setShoppingCart } from "../Storage/Redux/shoppingCartSlice";
import jwtDecode from "jwt-decode";
import { userModel } from "../Interfaces";
import { setLoggedInUser } from "../Storage/Redux/userAuthSlice";
import { RootState } from "../Storage/Redux/store";

function App() {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.userAuthStore);

  // we need to load the shopping cart when app is laoded
  const { data, isLoading } = useGetShoppingCartQuery(userData.id);

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      const { fullName, id, email, role }: userModel = jwtDecode(localToken);
      dispatch(setLoggedInUser({ fullName, id, email, role }));
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      //console.log(data.result);
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
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/book/bookList" element={<BookList />}></Route>
          <Route path="/book/bookUpsert" element={<BookUpsert />}></Route>
          <Route path="/book/bookUpsert/:id" element={<BookUpsert />}></Route>

          <Route path="/accessDenied" element={<AccessDenied />}></Route>

          {/* "*" means not found */}
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
