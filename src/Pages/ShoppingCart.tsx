import React from "react";
import { CartSummary } from "../Components/Page/Cart";
import { withAuth } from "../HOC";

function ShoppingCart() {
  return (
    <div
      className="row w-100 d-flex justify-content-center"
      style={{ marginTop: "10px" }}
    >
      <div className="col-lg-5 col-12" style={{ fontWeight: 300 }}>
        <CartSummary />
      </div>
    </div>
  );
}

export default withAuth(ShoppingCart);
