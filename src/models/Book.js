export default class Book {
  id: string;
  imgUrl: string;
  bookShelf: string;
  bookAuthors: string[];
  bookTitle: string;

  constructor(bookId, url, shelf, authors, title) {
    this.id = bookId;
    this.imgUrl = url;
    this.bookShelf = shelf;
    this.bookAuthors = authors ? authors : [];
    this.bookTitle = title;
  }
}