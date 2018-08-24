import React from 'react';
import { Route } from 'react-router-dom';

// Pages
import BookShelf from './pages/BookShelf';
import BookSearch from './pages/BookSearch';

const App = () => (
  <div className='container'>

    <Route exact path='/' component={BookShelf}  />
    <Route path='/search' component={BookSearch} />

  </div>
);

export default App;
