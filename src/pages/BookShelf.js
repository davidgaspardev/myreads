import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Style Sheet
import './BookShelf.css';

export default class BookShelf extends Component {



  render() {
    const { Header } = this;

    return(
      <div className='container' >

        <Header>My Reads</Header>

        <Link className='search-button' to='/search'>Search Book</Link>

      </div>
    );
  }

  Header = ({ children }) => (
    <header className='header'>

      <h1 className='header-title'>{children}</h1>

    </header>
  );

}
