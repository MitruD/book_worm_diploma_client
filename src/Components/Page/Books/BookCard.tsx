import React, { useState } from "react";
import { bookModel } from "../../../Interfaces";
import { Link, NavLink } from "react-router-dom";
import { useUpdateShoppingCartMutation } from "../../../APIs/shoppingCartApi";

interface Props {
  book: bookModel;
}

function BookCard(props: Props) {
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  //when add to cart will be clicked updateShoppingCart will be envoked
  const [updateShoppingCart] = useUpdateShoppingCartMutation();

  const handleAddToCart = async (bookId: number) => {
    setIsAddingToCart(true);

    const response = await updateShoppingCart({
      bookId: bookId,
      updateQuantityBy: 1,
      userId: "beef14eb-3e11-449f-8a16-eb81b0c008a7",
    });
    console.log(response);

    setIsAddingToCart(false);
  };

  return (
    <div className="col-md-3 col-12 p-4">
      <div
        className="card shadow p-3 mb-6 bg-white rounded"
        // className="card shadow-lg p-3 mb-5 bg-white rounded"
        style={{ height: "420px" }}
      >
        <div className="card-body pt-0 h-75">
          <div className="row col-10 offset-1 p-4">
            <Link
              className="nav-link"
              to={`/bookDetails/${props.book.id}`}
              style={{ textDecoration: "none" }}
            >
              <img
                src="https://via.placeholder.com/150"
                style={{ borderRadius: "5%" }}
                alt=""
                className="w-100 mt-5 image-box"
              />
            </Link>
          </div>

          <div className="text-center">
            <Link
              className="nav-link"
              to={`/bookDetails/${props.book.id}`}
              style={{ textDecoration: "none" }}
            >
              <p className="card-title m-0 text-primary fs-5">
                {props.book.name}
              </p>
            </Link>

            <p className="card-title m-0  fs-6">by {props.book.author}</p>
            <p className="badge bg-info" style={{ fontSize: "12px" }}>
              {props.book.genre}
            </p>
          </div>
          {/* <p
            className="card-text text-secondary"
            style={{ textAlign: "center" }}
          >
            {props.book.description}
          </p> */}
        </div>
        <div
          className="row text-center text-success"
          style={{ bottom: "0", paddingLeft: "90px" }}
        >
          <h4>${props.book.price}</h4>
        </div>
        <i
          className="bi bi-cart-plus btn btn-outline-success"
          style={{
            position: "absolute",
            bottom: "20px",
            left: "60px",
            padding: "5px 10px",
            borderRadius: "3px",
            outline: "none !important",
            cursor: "pointer",
          }}
          onClick={() => {
            handleAddToCart(props.book.id);
          }}
        ></i>
      </div>
    </div>
  );
}

export default BookCard;
function updateShoppingCart(arg0: {
  bookId: number;
  updateQuantityBy: any;
  userId: string;
}) {
  throw new Error("Function not implemented.");
}
