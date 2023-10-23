import { update, search, getAll} from "../BooksAPI.js"
import { useState} from "react";
import BooksList from "../components/BooksList";
import Book  from "../models/Book.js";
import SearchPageState from "../models/SearchPageState.js";
import {Link} from "react-router-dom";

function SearchPage() {
  const [searchPageState, setSearchPageState] = useState(new SearchPageState());

  const changeSearchStringHandler = (input) => {
    let newState = {...searchPageState};
    newState.searchString = input;
    if (input === ''){
      newState.searchResult = [];
      setSearchPageState(newState);
    }
    else
    {
      search(input, 10)
        .then((books) => {
          getAll()
            .then((allbooks) => {
              newState.searchResult = books.map(b => new Book(b.id, b.imageLinks ? b.imageLinks.thumbnail : '',
                allbooks.filter(ab => ab.id === b.id)[0] ? allbooks.filter(ab => ab.id === b.id)[0].shelf : 'none' ,
                b.authors, b.title));
              setSearchPageState(newState);
            })
            .catch((error) => {
              // Handle any errors that occur during the fetch or parsing
              console.error(error);
              newState.searchResult = [];
              setSearchPageState(newState);
            });
        })
        .catch((error) => {
          // Handle any errors that occur during the fetch or parsing
          console.error(error);
          newState.searchResult = [];
          setSearchPageState(newState);
        });
    }
  };

  const changeShelf = (book, newShelf) => {
    update(book, newShelf)
      .then(() => {
        changeSearchStringHandler(searchPageState.searchString);
      })
      .catch((error) => {
        // Handle any errors that occur during the fetch or parsing
        console.error(error);
      });
  }



  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link
          className="close-search"
          to="/"
        >
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={(e) => changeSearchStringHandler(e.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <BooksList books={searchPageState.searchResult} onChangeShelf={changeShelf} />
      </div>
    </div>
  );
}

export default SearchPage;