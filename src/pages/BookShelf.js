/**
 * Component responsible for book management added by the user
 * @author David Gaspar (davidgaspar.dev@gmail.com)
 */

// Modules (npm)
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Style Sheet
import './BookShelf.css';

export default class BookShelf extends Component {

  // Initialized state
  state = {
    myBooks: []
  }

  /**
   * @description Renders the components to the DOM
   * @return {object} JSX (React.createElement())
   */
  render() {
    // Destructuring assignment
    const { Header, MyBooks } = this;
    const { books } = this.state;

    // Return JSX (React.createElement())
    return(
      <div className='body-page' >

        <Header>My Reads</Header>

        <MyBooks books={books}/>

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

  MyBooks = ({ books }) => (
    <main className='bShelf-main'>

      <article>

        <h2><strong>C</strong>urrently <strong>R</strong>eading</h2>

        { /** code HERE */ }

      </article>

      <article>

        <h2><strong>W</strong>ant to <strong>R</strong>ead</h2>

        { /** code HERE */ }

      </article>

      <article>

        <h2><strong>R</strong>ead</h2>

        { /** code HERE */ }

      </article>

    </main>
  );

  Footer = () => (
    <footer>

    </footer>
  );

}
