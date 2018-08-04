import React from 'react';
import './Book.css';

export const Book = ({ title, subtitle, authors, imageLinks }) => (
  <div className='book'>

    <img src={imageLinks.thumbnail} alt />

    <div>
      <h1>{ title }</h1>
    </div>

  </div>

);
