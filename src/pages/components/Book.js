/**
 * Component to show the book
 * @author David Gaspar (davidgaspar.dev@gmail.com)
 */

// Ligrary
import React from 'react';

// Style Sheet
import './Book.css';

function handleShowAuthors(authors) {

  let len = authors.length;

  if(len > 1) {
    authors = authors.map((author, index) => {
      if(index === (len - 1)) return ` and ${author}`;
      if(index > 0) return `, ${author}`;
      return author;
    });
  }

  return authors;
}

export const Book = ({ title, subtitle, authors, imageLinks }) => (
  <div className='book'>

    <img src={imageLinks.thumbnail} alt={`${title} book`} />

    <div>
      <h1>{ title }</h1>
      <h3>{ handleShowAuthors(authors) }</h3>
    </div>

  </div>

);
