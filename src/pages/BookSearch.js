import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './BookSearch.css'

export default class BookSearch extends Component {

  state = {
    query: ''
  }

  render() {
    const { SearchBar } = this;
    const { query } = this.state;

    return(
      <div className='container' >

        <SearchBar query={query} />

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

}
