import React, { useEffect, useState } from "react";
import { bookModel } from "../../../Interfaces";
import BookCard from "./BookCard";

function BooksList() {
  const [books, setBooks] = useState<bookModel[]>([]);

  useEffect(() => {
    fetch("https://localhost:7193/api/Book")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBooks(data.result);
      });
  }, []);

  return (
    <div className="d-flex justify-content-center mb-5">
      <div className="container row">
        {books.length > 0 &&
          books.map((book, index) => <BookCard book={book} key={index} />)}
      </div>
    </div>
  );
}

export default BooksList;
