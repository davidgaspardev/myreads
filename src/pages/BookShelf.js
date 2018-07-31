import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Style Sheet
import './BookShelf.css';

export default class BookShelf extends Component {

  state = {
    myBooks: []
  }


  render() {
    const { Header, Main } = this;
    const { books } = this.state;

    return(
      <div className='body-page' >

        <Header>My Reads</Header>

        <Main books={books}/>

        <Link className='bShelf-search' to='/search'>Search Book</Link>

      </div>
    );
  }

  /**
   * Functinal Stateless Components
   */
  Header = ({ children }) => (
    <header className='bShelf-header'>

      <h1>{children}</h1>

    </header>
  );

  Main = ({ books }) => (
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
