import { getAll, update } from "../BooksAPI.js"
import { useEffect, useState} from "react";
import BooksList from "../components/BooksList";
import Book  from "../models/Book.js";
import BookShelfType from '../enums/BookShelfType.js'
import MainPageStateState from "../models/MainPageState";
import {Link} from "react-router-dom";

function MainPage() {
  const [mainPageState, setMainPageState] = useState(new MainPageStateState());

  const changeShelf = (book, newShelf) => {
    update(book, newShelf)
      .then((result) => {
        console.log(result);
        refreshShelves();
      })
      .catch((error) => {
        // Handle any errors that occur during the fetch or parsing
        console.error(error);
      });
  }

  const refreshShelves = () => {
    getAll()
      .then((books) => {
        let newState = { ...mainPageState };
        newState.currentlyReadingList = books.filter(b => b.shelf === BookShelfType.CURRENTLY_READING).map(b => new Book(b.id, b.imageLinks.thumbnail, BookShelfType.CURRENTLY_READING, b.authors, b.title));
        newState.wantToReadList = books.filter(b => b.shelf === BookShelfType.WANT_TO_READ).map(b => new Book(b.id, b.imageLinks.thumbnail, BookShelfType.WANT_TO_READ, b.authors, b.title));
        newState.readList = books.filter(b => b.shelf === BookShelfType.READ).map(b => new Book(b.id, b.imageLinks.thumbnail, BookShelfType.READ, b.authors, b.title));
        setMainPageState(newState);
      })
      .catch((error) => {
        // Handle any errors that occur during the fetch or parsing
        console.error(error);
      });
  };

  useEffect(refreshShelves, []);

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <h2 className="bookshelf-title">Want to read</h2>
      <BooksList books={mainPageState.wantToReadList} onChangeShelf={changeShelf} />
      <h2 className="bookshelf-title">Currently Reading</h2>
      <BooksList books={mainPageState.currentlyReadingList} onChangeShelf={changeShelf}/>
      <h2 className="bookshelf-title">Read</h2>
      <BooksList books={mainPageState.readList} onChangeShelf={changeShelf}/>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}
export default MainPage;