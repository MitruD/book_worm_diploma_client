import React, { useState } from "react";
import { apiResponse, bookModel } from "../../../Interfaces";
import { Link, NavLink } from "react-router-dom";
import { useUpdateShoppingCartMutation } from "../../../APIs/shoppingCartApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../Storage/Redux/store";
import { useNavigate } from "react-router-dom";
import { toastNotify } from "../../../Helper";

interface Props {
  book: bookModel;
}

let imageFolderRootPath = "https://localhost:7193//images//";

function BookCard(props: Props) {
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  //when add to cart will be clicked updateShoppingCart will be envoked
  const [updateShoppingCart] = useUpdateShoppingCartMutation();
  //useSeleector extracts the slice of the state and saves in userdata.
  //If changes to the state were applied, redux will updated userdata.
  const userData = useSelector((state: RootState) => state.userAuthStore);
  const navigate = useNavigate();

  const handleAddToCart = async (bookId: number) => {
    if (!userData.id) {
      navigate("/login");
      return;
    }
    setIsAddingToCart(true);

    const response: apiResponse = await updateShoppingCart({
      bookId: bookId,
      updateQuantityBy: 1,
      userId: userData.id,
    });
    //console.log(response);
    if (response.data && response.data.isSuccess) {
      toastNotify("Item added to cart successfully!");
    }
    setIsAddingToCart(false);
  };

  return (
    <div className="col-md-3 col-12 p-4">
      <div
        className="card shadow p-3 mb-6 bg-white rounded-5"
        // className="card shadow-lg p-3 mb-5 bg-white rounded"
        style={{ height: "500px" }}
      >
        <div className="card-body pt-0 h-75">
          <div className="row col-10 offset-1 pt-3">
            <Link
              className="nav-link"
              to={`/bookDetails/${props.book.id}`}
              style={{ textDecoration: "none" }}
            >
              <img
                //src="https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png"
                src={imageFolderRootPath + props.book.imageURL}
                // src={props.book.imageURL}
                style={{ borderRadius: "5%" }}
                alt=""
                className="w-100 image-box"
              />
            </Link>
          </div>

          <div className="text-center pt-3">
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
// function updateShoppingCart(arg0: {
//   bookId: number;
//   updateQuantityBy: any;
//   userId: string;
// }) {
//   throw new Error("Function not implemented.");
// }
