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

    this.handleAddBook = this.handleAddBook.bind(this);

    // It do not need to refresh the rendering
    BooksAPI.getAll().then(myBooks => this.state.myBooks = myBooks);

  }

  // Initialized state
  state = {
    query: '',
    books: [],
    myBooks: [],
    isLoading: false
  }


  handleSearch(query) {

    this.setState({ isLoading: query !== '' }, () => (

      // Sending request (async)
      BooksAPI.search(query).then(books => {

        // Check if you have received book vector from server
        // If no, books variable is empty
        if(!Array.isArray(books)) books = [];

        // Finish loading
        this.setState({ books, isLoading: false });

      })

    ));

  }

  handleAddBook = (book, shelf) => {
    const { query } = this.state;

    BooksAPI.update(book, shelf).then(() => this.handleSearch(query));

  }

  handleBookRender() {
    const { query, books, myBooks } = this.state;

    if(query === '') {

      return <h1 className='bSearch-empty-entry' >Type something to do your research</h1>;

    }

    if(books.length > 0) {

      return books.map((book, index) => {

        for(var i = 0; i < myBooks.length; i++) {

          if(book.id === myBooks[i].id) return <Book key={index} {...book} eventAddBook={ this.handleAddBook } shelf={ myBooks[i].shelf } />;

        }

        return <Book key={index} {...book} eventAddBook={ this.handleAddBook } />;

      });

    } else {

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
   * ============ Functinal Stateless Components ============
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

          this.handleBookRender()

        )
      }

    </main>
  );

}
