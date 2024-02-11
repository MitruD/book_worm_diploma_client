import React, { useEffect, useState } from "react";
import { bookModel } from "../../../Interfaces";
import BookCard from "./BookCard";
import { useDispatch, useSelector } from "react-redux";
import { useGetBooksQuery } from "../../../APIs/bookApi";
import { setBook } from "../../../Storage/Redux/bookSlice";
import { RootState } from "../../../Storage/Redux/store";
import { MainLoader } from "../Common";

function BooksList() {
  const [books, setBooks] = useState<bookModel[]>([]);
  const dispatch = useDispatch();
  const { data, isLoading } = useGetBooksQuery(null);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [genreList, setGenreList] = useState([""]);

  const searchValue = useSelector((state: RootState) => state.bookStore.search);

  // useEffect: This hook allows you to perform side effects in function components.
  // It takes two arguments: a function containing the side effect,
  // and an array of dependencies that determine when the effect should be re-run.

  useEffect(() => {
    if (data && data.result) {
      const tempBookArray = handleFilters(selectedGenre, searchValue);
      setBooks(tempBookArray);
    }
    // [searchValue]: This is the dependency array.
    // It specifies that the effect should re-run whenever the value of searchValue changes.
    //This means that if searchValue changes, the effect will execute again.
  }, [searchValue]);

  useEffect(() => {
    if (!isLoading) {
      dispatch(setBook(data.result));
      setBooks(data.result);
      const tempGenreList = ["All"];
      data.result.forEach((item: bookModel) => {
        if (tempGenreList.indexOf(item.genre) === -1) {
          tempGenreList.push(item.genre);
        }
      });

      setGenreList(tempGenreList);
    }
  }, [isLoading]);

  const handleGenreClick = (i: number) => {
    //filter by css class
    const buttons = document.querySelectorAll(".custom-buttons");
    let localGenre;
    buttons.forEach((button, index) => {
      if (index === i) {
        button.classList.add("active");
        if (index === 0) {
          localGenre = "All";
        } else {
          localGenre = genreList[index];
        }
        setSelectedGenre(localGenre);
        const tempArray = handleFilters(localGenre, searchValue);
        setBooks(tempArray);
      } else {
        button.classList.remove("active");
      }
    });
  };

  const handleFilters = (genre: string, search: string) => {
    let tempArray =
      genre === "All"
        ? [...data.result]
        : data.result.filter(
            (item: bookModel) =>
              item.genre.toUpperCase() === genre.toUpperCase()
          );

    //serach functionality
    if (search) {
      const tempSearchBooks = [...tempArray];
      tempArray = tempSearchBooks.filter((item: bookModel) =>
        item.name.toLocaleUpperCase().includes(search.toUpperCase())
      );
    }
    return tempArray;
  };

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <div className="d-flex justify-content-center mb-5">
      <div className="container row">
        <div className="my-3">
          <ul className="nav w-100 d-flex justify-content-center">
            {genreList.map((genreName, index) => (
              <li className="nav-item" key={index}>
                <button
                  className={`nav-link p-2 custom-buttons fs-5 ${
                    index === 0 && "active"
                  } `}
                  onClick={() => handleGenreClick(index)}
                >
                  {genreName}
                </button>
              </li>
            ))}
          </ul>
        </div>
        {books.length > 0 &&
          books.map((book: bookModel, index: number) => (
            <BookCard book={book} key={index} />
          ))}
      </div>
    </div>
  );
}

export default BooksList;
