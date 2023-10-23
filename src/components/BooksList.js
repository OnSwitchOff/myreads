import BookShelfType from '../enums/BookShelfType.js'

function BooksList({books, onChangeShelf}) {
  let booksList = books;
  console.log(books);
  return (
    <div className="bookshelf-books">
      <ol className="books-grid">
        {booksList.map((book) => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div
                  className="book-cover"
                  style={{
                    width: 128,
                    height: 193,
                    backgroundImage: `url(${book.imgUrl})`,
                  }}
                ></div>
                <div className="book-shelf-changer">
                  <select value={book.bookShelf} onChange={(e) => onChangeShelf(book, e.target.value)}>
                    <option value="default" disabled>
                      Move to...
                    </option>
                    <option value={BookShelfType.WANT_TO_READ}>Want to Read</option>
                    <option value={BookShelfType.CURRENTLY_READING}>
                      Currently Reading
                    </option>
                    <option value={BookShelfType.READ}>Read</option>
                    <option value={BookShelfType.NONE}>None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.bookTitle}</div>
              <div className="book-authors">{book.bookAuthors.join(", ")}</div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default BooksList;