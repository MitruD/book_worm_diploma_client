import bookModel from "./bookModel";

export default interface cartItemModel {
  id?: number;
  bookId?: number;
  book?: bookModel;
  quantity?: number;
}
