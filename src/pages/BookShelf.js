/**
 * Component responsible for book management added by the user
 * @author David Gaspar (davidgaspar.dev@gmail.com)
 */

// Modules (npm)
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import EnumBooks from './utils/EnumBooks';
import * as BooksAPI from './utils/BooksAPI';
import { Book } from './components/Book';

// Style Sheet
import './BookShelf.css';

export default class BookShelf extends Component {

  // Initialized state
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
    isLoading: true
  }

  handleShowBooks(category) {
    const { currentlyReading, wantToRead, read, isLoading } = this.state;

    if(isLoading) return <div className='bShelf-loading' />;

    switch(category) {
      case EnumBooks.CURRENTLY_READING:

        return currentlyReading.map((book, index) => <Book key={index} {...book} />);

      break;

      case EnumBooks.WANT_TO_READ:

        return wantToRead.map((book, index) => <Book key={index} {...book} />);

      break;

      case EnumBooks.READ:

        return read.map((book, index) => <Book key={index} {...book}/>);

      break;

      default:
        console.log('[ ERROR ] ', category)

    }


  }

  componentDidMount() {

    BooksAPI.getAll().then(books => this.setState(() => {
      let newState = {
        currentlyReading: [],
        wantToRead: [],
        read: [],
        isLoading: false
      };

      books.map(book => {

        switch(book.shelf) {

          case Object.keys(newState)[0]:
            newState.currentlyReading.push(book);
          break;

          case Object.keys(newState)[1]:
            newState.wantToRead.push(book);
          break;

          case Object.keys(newState)[2]:
            newState.read.push(book);
          break;

          default:
           console.log('[ ERROR ]', book);

        }

        return book;

      });

      return newState;

    }));

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
      <div className='body-page' >

        <Header>My Reads</Header>

        <MyBooks/>

        <Link className='bShelf-search' to='/search'>Search Book</Link>

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

          { this.handleShowBooks(EnumBooks.CURRENTLY_READING) }

        </div>

      </article>

      <article>

        <h2><strong>W</strong>ant to <strong>R</strong>ead</h2>

        <div className='bShelf-items'>

          { this.handleShowBooks(EnumBooks.WANT_TO_READ) }

        </div>

      </article>

      <article>

        <h2><strong>R</strong>ead</h2>

        <div className='bShelf-items'>

          { this.handleShowBooks(EnumBooks.READ) }

        </div>

      </article>

    </main>
  );


  Footer = () => (
    <footer>

    </footer>
  );

}
