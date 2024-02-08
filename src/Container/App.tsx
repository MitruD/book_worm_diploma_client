import React, { useEffect, useState } from "react";
import { Footer, Header } from "../Components/Layout";
import {
  AccessDenied,
  AuthenticationTest,
  AuthenticationTestAdmin,
  BookDetails,
  Home,
  Login,
  NotFound,
  Register,
  ShoppingCart,
} from "../Pages";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetShoppingCartQuery } from "../APIs/shoppingCartApi";
import { setShoppingCart } from "../Storage/Redux/shoppingCartSlice";
import jwtDecode from "jwt-decode";
import { userModel } from "../Interfaces";
import { setLoggedInUser } from "../Storage/Redux/userAuthSlice";

function App() {
  const dispatch = useDispatch();

  // we need to load the shopping cart when app is laoded
  const { data, isLoading } = useGetShoppingCartQuery(
    "beef14eb-3e11-449f-8a16-eb81b0c008a7"
  );

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      const { fullName, id, email, role }: userModel = jwtDecode(localToken);
      dispatch(setLoggedInUser({ fullName, id, email, role }));
    }
  }, []);

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
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/authenticationTest"
            element={<AuthenticationTest />}
          ></Route>
          <Route
            path="/authenticationTestAdmin"
            element={<AuthenticationTestAdmin />}
          ></Route>
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
