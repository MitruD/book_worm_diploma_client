import React, { useEffect, useState } from "react";
import { bookModel } from "../../../Interfaces";
import BookCard from "./BookCard";
import { useDispatch } from "react-redux";
import { useGetBooksQuery } from "../../../APIs/bookApi";
import { setBook } from "../../../Storage/Redux/bookSlice";

function BooksList() {
  //const [books, setBooks] = useState<bookModel[]>([]);

  const dispatch = useDispatch();
  const { data, isLoading } = useGetBooksQuery(null);

  useEffect(() => {
    if (!isLoading) {
      dispatch(setBook(data.result));
    }
  }, [isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="d-flex justify-content-center mb-5">
      <div className="container row">
        {data.result.length > 0 &&
          data.result.map((book: bookModel, index: number) => (
            <BookCard book={book} key={index} />
          ))}
      </div>
    </div>
  );
}

export default BooksList;
