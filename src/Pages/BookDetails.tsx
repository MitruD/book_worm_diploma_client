import React, { useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useGetBookByIdQuery } from "../APIs/bookApi";
import { useUpdateShoppingCartMutation } from "../APIs/shoppingCartApi";

let imageFolderRootPath = "https://localhost:7193//images//";

//USER ID required for shoppingCart api is taken from a JWT token
//= beef14eb-3e11-449f-8a16-eb81b0c008a7 can be found in AspNetUsers table

function BookDetails() {
  //useParams() => if your URL is something like /books/123, bookId will be "123"
  const { bookId } = useParams();
  const { data, isLoading } = useGetBookByIdQuery(bookId);
  //to see the data we are getting
  //console.log(data);

  const navigate = useNavigate();
  //useState(1) - default value
  const [quantity, setQuantity] = useState(1);
  // to track whne we are adding book to the shoppingCart
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  //when add to cart will be clicked updateShoppingCart will be envoked
  const [updateShoppingCart] = useUpdateShoppingCartMutation();

  const handleQuantity = (counter: number) => {
    let newQuantity = quantity + counter;
    if (newQuantity == 0) {
      newQuantity = 1;
    }
    setQuantity(newQuantity);
    return;
  };

  const handleAddToCart = async (bookId: number) => {
    setIsAddingToCart(true);

    const response = await updateShoppingCart({
      bookId: bookId,
      updateQuantityBy: quantity,
      userId: "beef14eb-3e11-449f-8a16-eb81b0c008a7",
    });
    console.log(response);

    setIsAddingToCart(false);
  };

  return (
    <div className="container pt-5 pb-3 pt-md-5">
      {!isLoading ? (
        <div className="row">
          <div className="col-5">
            <img
              src={imageFolderRootPath + data.result?.imageURL}
              width="70%"
              style={{ borderRadius: "5%" }}
              alt="No content"
            ></img>
          </div>
          <div className="col-7 pt-3">
            {/* ? - can be null or undefined. */}
            <h2 className="text-primary">{data.result?.name}</h2>
            <h3 className="text-dark">by {data.result?.author}</h3>
            <hr></hr>
            <span>
              <span
                className="badge bg-info pt-2"
                style={{ height: "40px", fontSize: "20px" }}
              >
                {data.result?.genre}
              </span>
            </span>
            <span></span>
            <p style={{ fontSize: "20px" }} className="pt-2">
              {data.result?.description}
            </p>
            <span className="h3">${data.result?.price}</span> &nbsp;&nbsp;&nbsp;
            <span
              className="pb-2  p-3"
              style={{ border: "1px solid #333", borderRadius: "30px" }}
            >
              <i
                onClick={() => {
                  handleQuantity(-1);
                }}
                className="bi bi-dash p-1"
                style={{ fontSize: "25px", cursor: "pointer" }}
              ></i>
              <span className="h3 mt-3 px-3">{quantity}</span>
              <i
                className="bi bi-plus p-1"
                onClick={() => {
                  handleQuantity(+1);
                }}
                style={{ fontSize: "25px", cursor: "pointer" }}
              ></i>
            </span>
            <div className="row pt-4">
              <div className="col-3">
                <button
                  className="btn btn-success form-control"
                  onClick={() => handleAddToCart(data.result?.id)}
                >
                  Add to Cart
                </button>
              </div>

              <div className="col-3 ">
                <NavLink className="nav-link" aria-current="page" to="/">
                  <button className="btn btn-secondary form-control">
                    Back to Home
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="d-flex justify-content-center"
          style={{ width: "100%" }}
        >
          <div>Loading...</div>
        </div>
      )}
    </div>
  );
}

export default BookDetails;
