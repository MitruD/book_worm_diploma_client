import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartItemModel } from "../../../Interfaces";
import { RootState } from "../../../Storage/Redux/store";
import {
  removeFromCart,
  updateQuantity,
} from "../../../Storage/Redux/shoppingCartSlice";
import { useUpdateShoppingCartMutation } from "../../../APIs/shoppingCartApi";

function CartSummary() {
  const dispatch = useDispatch();
  const [updateShoppingCart] = useUpdateShoppingCartMutation();
  const userData = useSelector((state: RootState) => state.userAuthStore);

  //Access the store. Type of the state is rootstate
  const shoppingCartFromStore: cartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );
  if (!shoppingCartFromStore) {
    return <div>Shopping Cart Empty</div>;
  }

  let imageFolderRootPath = "https://localhost:7193//images//";

  let grandTotal = 0;
  let totalItems = 0;

  shoppingCartFromStore?.map((cartItem: cartItemModel) => {
    totalItems += cartItem.quantity ?? 0;
    grandTotal += (cartItem.book?.price ?? 0) * (cartItem.quantity ?? 0);
  });

  const handleQuantity = (
    updateQuantityBy: number,
    cartItem: cartItemModel
  ) => {
    if (
      (updateQuantityBy == -1 && cartItem.quantity == 1) ||
      updateQuantityBy == 0
    ) {
      //remove item from DB
      updateShoppingCart({
        bookId: cartItem.book?.id,
        updateQuantityBy: 0,
        userId: userData.id,
      });
      //remove item from store
      dispatch(removeFromCart({ cartItem, quantity: 0 }));
    } else {
      //update the quntity with the new quantity in DB
      updateShoppingCart({
        bookId: cartItem.book?.id,
        //in API the cartItem.quantity! + is not needed, it is already stored in DB
        updateQuantityBy: updateQuantityBy,
        userId: userData.id,
      });
      //update the quntity with the new quantity in store
      dispatch(
        updateQuantity({
          cartItem,
          quantity: cartItem.quantity! + updateQuantityBy,
        })
      );
    }
  };

  return (
    <div className="container p-4">
      <h2 className="text-center text-dark">Cart Summary</h2>

      {shoppingCartFromStore.map((cartItem: cartItemModel, index: number) => (
        <div
          key={index}
          className="d-flex flex-sm-row flex-column align-items-center card shadow rounded m-5"
          // style={{ background: "lightgrey" }}
        >
          <div className="p-3">
            <img
              //src="https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png"
              src={imageFolderRootPath + cartItem.book?.imageURL}
              alt=""
              width={"120px"}
            />
          </div>

          <div className="p-2 mx-3" style={{ width: "100%" }}>
            <div className="d-flex justify-content-between align-items-center">
              <h4 style={{ fontWeight: 300 }}>{cartItem.book?.name}</h4>
              {/* !-not null */}
              <button
                className="btn btn-danger mx-1"
                onClick={() => handleQuantity(0, cartItem)}
              >
                Remove
              </button>
            </div>
            <div className="flex-fill">
              <h4 className="text-success">${cartItem.book!.price}</h4>
            </div>
            <div className="d-flex justify-content-between">
              <div
                className="d-flex justify-content-between p-2 mt-2 rounded-pill custom-card-shadow  "
                style={{
                  width: "100px",
                  height: "43px",
                }}
              >
                <span style={{ color: "rgba(22,22,22,.7)" }} role="button">
                  <i
                    className="bi bi-dash-square"
                    onClick={() => handleQuantity(-1, cartItem)}
                  ></i>
                </span>
                <span>
                  <b>{cartItem.quantity}</b>
                </span>
                <span style={{ color: "rgba(22,22,22,.7)" }} role="button">
                  <i
                    className="bi bi-plus-square"
                    onClick={() => handleQuantity(+1, cartItem)}
                  ></i>
                </span>
              </div>
            </div>
            <h4 className="pt-2 mb-0">
              Total: ${(cartItem.quantity! * cartItem.book!.price).toFixed(2)}
            </h4>
          </div>
        </div>
      ))}
      <div
        style={{
          margin: "50px",
        }}
      >
        <h3>Total items: {totalItems}</h3>
        <h3>Grand total: ${grandTotal.toFixed(2)}</h3>
      </div>
    </div>
  );
}

export default CartSummary;
