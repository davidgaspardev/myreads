/**
 * Component responsible for browsing the books that are stored on the server (back-end)
 * @author David Gaspar (davidgaspar.dev@gmail.com)
 */

// Modules (npm)
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Back-end communication
import * as BooksAPI from './utils/BooksAPI';

// Composition components
import { Book } from './components/Book';
//import { Footer } from './components/Footer';

// Style Sheet
import './BookSearch.css'

export default class BookSearch extends Component {

  constructor(props) {
    super(props);

    // It is not need to use setState method(function)
    BooksAPI.getAll().then(myBooks => this.state.myBooks = myBooks);

    this.handleAddBook = this.handleAddBook.bind(this);

  }

  // Initialized state
  state = {
    query: '',
    books: [],
    myBooks: [],
    isLoading: false
  }


  handleSearch(query, myBooks) {

    this.setState({ isLoading: query !== '' }, () => (

      // Sending request (async)
      BooksAPI.search(query).then(books => {

        // Check if you have received book vector from server
        // If no, books variable is empty
        if(!Array.isArray(books)) books = [];

        // Finish loading
        this.setState(() => {

          let state = { books, isLoading: false };

          if(typeof(myBooks) === 'object') state.myBooks = myBooks;

          return state;

        });

      })

    ));

  }

  handleAddBook = (book, shelf) => {
    const { query } = this.state;

    BooksAPI.update(book, shelf).then(() => {

      BooksAPI.getAll().then(myBooks => this.handleSearch(query, myBooks));

    });

  }

  renderBooks() {
    const { query, books, myBooks } = this.state;

    if(query === '')
      return <h1 className='bSearch-empty-entry' >Type something to do your research</h1>;

    if(books.length > 0) {

      // If the book is found, return this:
      return books.map(book => {

        for(var i = 0; i < myBooks.length; i++) {

          // If the book is already on some shelf
          if(book.id === myBooks[i].id)
            // If: Break line to stay more readable (recommended Udacity)
            return <Book key={book.id} {...book} eventAddBook={ this.handleAddBook } shelf={ myBooks[i].shelf } />;

        }

        // Return book without shelf (none)
        return <Book key={book.id} {...book} eventAddBook={ this.handleAddBook } />;

      });

    } else {

      // If the book is not found, return this:
      return <h1 className='bSearch-empty-entry' >We did not find this book ... Sorry</h1>;

    }

  }

  /**
   * @description Renders the components to the DOM
   * @return {object} JSX (React.createElement())
   */
  render() {
    // Destructuring assignment
    const { SearchBar, BookList } = this;
    const { query, books } = this.state;

    // Return JSX (React.createElement())
    return (
      <div className='bSearch-body' >

        <SearchBar query={query} />

        <BookList books={books} />

      </div>
    );
  }

  /**
   * ============ Stateless Functional Component ============
   * @description Local components for UI composition
   */

  /**
   * @description Component of the search bar for the composition
   * @param {object} Props - Containing onChangeEvent and query properties
   */
  SearchBar = ({ onChangeEvent, query }) => (
    <header className='bSearch-header' >

      <div>

        <Link to='/' >To Back</Link>

        <input
          placeholder='Search books here... :)'
          value={query}
          onChange={ ({ target }) => this.setState({ query: target.value} , () => this.handleSearch(target.value.trim())) }
        />

      </div>

    </header>
  );

  /**
   * @description component of the list of books for the composition
   * @param {object} Props - Containing onChangeEvent and query properties
   */
  BookList = ({ books }) => (
    <main className='bSearch-main'>

      {
        this.state.isLoading ? (

          <div className='bSearch-loading' />

        ) : (

          this.renderBooks()

        )
      }

    </main>
  );

}
