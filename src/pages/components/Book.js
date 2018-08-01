import React from 'react';
import './Book.css';

export const Book = ({ title, subtitle, authors, imageLinks }) => (
  <div className='book'>

    <img src={imageLinks.thumbnail} width='100%' alt />

  </div>

);
