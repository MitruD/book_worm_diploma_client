import React, { useEffect, useState } from "react";
import { inputHelper, toastNotify } from "../../Helper";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateBookMutation,
  useGetBookByIdQuery,
  useUpdateBookMutation,
} from "../../APIs/bookApi";
import { MainLoader } from "../../Components/Page/Common";

let imageFolderRootPath = "https://localhost:7193//images//";

const bookData = {
  name: "",
  author: "",
  genre: "",
  description: "",
  price: "",
};

function BookUpsert() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imageToStore, setImageToStore] = useState<any>();
  const [imageToDisplay, setImageToDisplay] = useState<string>("");
  const [bookInputs, setBookInputs] = useState(bookData);
  const [loading, setLoading] = useState(false);
  const [createBook] = useCreateBookMutation();
  const [updateBook] = useUpdateBookMutation();

  const { data } = useGetBookByIdQuery(id);

  useEffect(() => {
    if (data && data.result) {
      const tempData = {
        name: data.result.name,
        author: data.result.author,
        genre: data.result.genre,
        description: data.result.description,
        price: data.result.price,
      };
      setBookInputs(tempData);
      setImageToDisplay(imageFolderRootPath + data.result.imageURL);
    }
  }, [data]);

  const handleBookInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelper(e, bookInputs);
    setBookInputs(tempData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const imgType = file.type.split("/")[1];
      const validImgTypes = ["jpeg", "jpg", "png"];

      const isImageTypeValid = validImgTypes.filter((e) => {
        return e === imgType;
      });

      if (file.size > 1000 * 1024) {
        setImageToStore("");
        toastNotify("File must be less then 1 MB", "error");
        return;
      } else if (isImageTypeValid.length === 0) {
        setImageToStore("");
        toastNotify("File must be in jpeg, jpg or png", "error");
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      setImageToStore(file);
      reader.onload = (e) => {
        const imgUrl = e.target?.result as string;
        setImageToDisplay(imgUrl);
      };
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!imageToStore && !id) {
      toastNotify("Please upload an image", "error");
      setLoading(false);
      return;
    }

    const formData = new FormData();

    formData.append("Name", bookInputs.name);
    formData.append("Author", bookInputs.author);
    formData.append("Description", bookInputs.description);
    formData.append("Genre", bookInputs.genre);
    formData.append("Price", bookInputs.price);

    if (imageToDisplay) formData.append("ImageFile", imageToStore);

    let response;

    if (id) {
      //update
      formData.append("Id", id);
      response = await updateBook({ data: formData, id });
      toastNotify("Book updated successfully", "success");
    } else {
      //create
      response = await createBook(formData);
      toastNotify("Book created successfully", "success");
    }

    if (response) {
      setLoading(false);
      navigate("/book/bookList");
    }

    setLoading(false);
  };

  return (
    <div className="container border mt-5 p-5 ">
      {loading && <MainLoader />}
      <h3 className=" px-2 text-black">{id ? "Edit Book" : "Add Book"}</h3>
      <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              required
              name="name"
              value={bookInputs.name}
              onChange={handleBookInput}
            />
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Enter Author"
              required
              name="author"
              value={bookInputs.author}
              onChange={handleBookInput}
            />

            <input
              type="text"
              className="form-control mt-3"
              placeholder="Enter Genre"
              required
              name="genre"
              value={bookInputs.genre}
              onChange={handleBookInput}
            />

            <textarea
              className="form-control mt-3"
              placeholder="Enter Description"
              name="description"
              rows={10}
              value={bookInputs.description}
              onChange={handleBookInput}
            ></textarea>
            <input
              type="number"
              className="form-control mt-3"
              required
              placeholder="Enter Price"
              name="price"
              value={bookInputs.price}
              onChange={handleBookInput}
            />
            <input
              type="file"
              onChange={handleFileChange}
              className="form-control mt-3"
            />
            <div className="row">
              <div className="col-6">
                <button
                  type="submit"
                  className="btn btn-success form-control mt-3"
                >
                  {id ? "Update" : "Create"}
                </button>
              </div>
              <div className="col-6">
                <a
                  onClick={() => navigate("/book/bookList")}
                  className="btn btn-secondary form-control mt-3"
                >
                  Back to Books
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-5 text-center">
            <img
              src={imageToDisplay}
              style={{ width: "100%", borderRadius: "30px" }}
              alt=""
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default BookUpsert;
