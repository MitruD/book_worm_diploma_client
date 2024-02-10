import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import bookApi, {
  useDeleteBookMutation,
  useGetBooksQuery,
} from "../../APIs/bookApi";
import { MainLoader } from "../../Components/Page/Common";
import { bookModel } from "../../Interfaces";

let imageFolderRootPath = "https://localhost:7193//images//";

function BookList() {
  const [deleteBook] = useDeleteBookMutation();
  const { data, isLoading } = useGetBooksQuery(null);
  const navigate = useNavigate();

  const handlebookDelete = async (id: number) => {
    toast.promise(
      deleteBook(id),
      {
        pending: "Processing your request...",
        success: "Book Deleted Successfully 👌",
        error: "Error encoutnered 🤯",
      },
      {
        theme: "dark",
      }
    );
  };

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <div className="table p-5">
          <button
            className="btn btn-success m-5 mb-0 mt-0"
            onClick={() => navigate("/book/bookUpsert")}
          >
            Add New Book
          </button>
          <div>
            <div className="d-flex flex-sm-row flex-column align-items-center card  rounded m-5">
              <div className="col-1">Image</div>
              <div className="col-1">ID</div>
              <div className="col-2">Name</div>
              <div className="col-2">Author</div>
              <div className="col-1">Price</div>
              <div className="col-2">Genre</div>
              <div className="col-1">Action</div>
            </div>

            {data.result.map((book: bookModel) => {
              return (
                <div
                  className="d-flex flex-sm-row flex-column align-items-center card shadow rounded m-5"
                  key={book.id}
                >
                  <div className="col-1">
                    <img
                      src={imageFolderRootPath + book.imageURL}
                      alt="no content"
                      style={{ width: "100%", maxWidth: "120px" }}
                    />
                  </div>
                  <div className="col-1">{book.id}</div>
                  <div className="col-2">{book.name}</div>
                  <div className="col-2">{book.author}</div>
                  <div className="col-1">${book.price}</div>
                  <div className="col-2">{book.genre}</div>
                  <div className="col-1">
                    <button className="btn btn-success">
                      <i
                        className="bi bi-pencil-square"
                        onClick={() => navigate("/book/bookUpsert/" + book.id)}
                      ></i>
                    </button>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handlebookDelete(book.id)}
                    >
                      <i className="bi bi-trash3"></i>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default BookList;
