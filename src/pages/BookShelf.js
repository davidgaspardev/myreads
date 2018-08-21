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

    console.log(shelf);

    // Validation of arguments
    if(typeof(book) === 'object' && typeof(shelf) === 'string') BooksAPI.update(book, shelf).then(() => this.renderShelfUpdate());

  }

  handleShowBooks(shelf) {
    // Destructuring assignment
    const { state } = this;

    if(state.isLoading) return <div className='bShelf-loading' />;

    let shelves = state[shelf].map((book, index) => <Book key={index} {...book} eventAddBook={this.handleAddBook} />);

    if(shelves.length > 0) return shelves;
    // If you have nothing on the shelf


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

      console.log(books);

      books.map(book => {

        newState[book.shelf].push(book);

        return book;

      });

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
   * ============ Functinal Stateless Components ============
   * @description Local components for UI composition
   */
  Header = ({ children }) => (
    <header className='bShelf-header'>

      <h1>{children}</h1>

    </header>
  );

  MyBooks = () => (
    <main className='bShelf-main'>

      <article>

        <h2><strong>C</strong>urrently <strong>R</strong>eading</h2>

        <div className='bShelf-items'>

          { this.handleShowBooks(Object.keys(this.state)[0]) }

        </div>

      </article>

      <article>

        <h2><strong>W</strong>ant to <strong>R</strong>ead</h2>

        <div className='bShelf-items'>

          { this.handleShowBooks(Object.keys(this.state)[1]) }

        </div>

      </article>

      <article>

        <h2><strong>R</strong>ead</h2>

        <div className='bShelf-items'>

          { this.handleShowBooks(Object.keys(this.state)[2]) }

        </div>

      </article>

    </main>
  );


  Footer = () => (
    <footer>

    </footer>
  );

}
