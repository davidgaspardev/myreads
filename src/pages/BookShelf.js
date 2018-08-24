/**
 * Component responsible for book management added by the user
 * @author David Gaspar (davidgaspar.dev@gmail.com)
 */

// Modules (npm)
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as BooksAPI from './utils/BooksAPI';
import { Book } from './components/Book';
import { Footer } from './components/Footer';

// Style Sheet
import './BookShelf.css';

export default class BookShelf extends Component {


  // Initialized state
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
    isLoading: true,
    update: false
  }

  handleAddBook = (book, shelf) => {

    // Validation of arguments
    if(typeof(book) === 'object' && typeof(shelf) === 'string')
      BooksAPI.update(book, shelf).then(() => this.renderShelfUpdate());

  }

  handleShowBooks(shelf) {
    // Destructuring assignment
    const { state } = this;

    if(state.isLoading) return <div className='bShelf-loading' />;

    let shelves = state[shelf].map(book => <Book key={book.id} {...book} eventAddBook={this.handleAddBook} />);

    if(shelves.length > 0)
      return shelves;
    else
      return null;

  }

  // Update book list
  renderShelfUpdate() {

    BooksAPI.getAll().then(books => this.setState(() => {
      let newState = {
        currentlyReading: [],
        wantToRead: [],
        read: [],
        isLoading: false
      };

      // Inserting a books from a certain shelf to the nconsoleew state
      books.forEach(book => newState[book.shelf].push(book) );

      return newState;

    }));

  }

  componentDidMount() {

    this.renderShelfUpdate();

  }

  /**
   * @description Renders the components to the DOM
   * @return {object} JSX (React.createElement())
   */
  render() {
    // Destructuring assignment
    const { Header, MyBooks } = this;

    // Return JSX (React.createElement())
    return(
      <div className='bShelf-body' >

        <Header>My Reads</Header>

        <MyBooks />

        <Link className='bShelf-search' to='/search'>Search Book</Link>

        <Footer />

      </div>
    );
  }

  /**
   * ============ Stateless Functional Component ============
   * @description Local components for UI composition
   */
  Header = ({ children }) => (
    <header className='bShelf-header'>

      <h1>{children}</h1>

    </header>
  );

  MyBooks = () => {

    const shelf = {
      CURRENTLY_READING: 'currentlyReading',
      WANT_TO_READ: 'wantToRead',
      READ: 'read'
    }

    return (
      <main className='bShelf-main'>

        <article>

          <h2><strong>C</strong>urrently <strong>R</strong>eading</h2>

          <div className='bShelf-items'>

            { this.handleShowBooks(shelf.CURRENTLY_READING) }

          </div>

        </article>

        <article>

          <h2><strong>W</strong>ant to <strong>R</strong>ead</h2>

          <div className='bShelf-items'>

            { this.handleShowBooks(shelf.WANT_TO_READ) }

          </div>

        </article>

        <article>

          <h2><strong>R</strong>ead</h2>

          <div className='bShelf-items'>

            { this.handleShowBooks(shelf.READ) }

          </div>

        </article>

      </main>
    );
  }

}
