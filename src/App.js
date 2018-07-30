import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// Pages
import BookShelf from './pages/BookShelf';
import BookSearch from './pages/BookSearch';

export default class App extends Component {

  render() {
    return (
      <div className='container'>

        <Route exact path='/' component={BookShelf} />
        <Route path='/search' component={BookSearch} />

      </div>
    );
  }
}
