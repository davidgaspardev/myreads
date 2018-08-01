import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as BooksAPI from './utils/BooksAPI';

import { Book } from './components/Book';

import './BookSearch.css'

export default class BookSearch extends Component {

  state = {
    query: '',
    books: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({ books }));
  }

  render() {
    const { SearchBar, Main } = this;
    const { query, books } = this.state;

    console.log(this.state);

    return(
      <div className='bSearch-body' >

        <SearchBar query={query} />

        <Main books={books} />

      </div>
    );
  }

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

  Main = ({ books }) => (
    <main className='bSearch-main'>

      {
        books.map((book, index) => <Book key={index} {...book} />)
      }

    </main>
  );

}
