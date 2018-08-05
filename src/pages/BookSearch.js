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

// Style Sheet
import './BookSearch.css'

export default class BookSearch extends Component {

  // Initialized state
  state = {
    query: '',
    books: []
  }

  componentDidMount() {

    BooksAPI.search('').then(books => this.setState({ books }));
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
        typeof(books) === 'undefined' ? (
          <h1 className='bSearch-empty-entry' >Type something to do your research</h1>
        ) : (
          books.length === 0 ? <div className='bSearch-loading' /> : books.map((book, index) => <Book key={index} {...book} />)
        )
      }

    </main>
  );

}
