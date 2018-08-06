/**
 * Component to show the book
 * @author David Gaspar (davidgaspar.dev@gmail.com)
 */

// Ligrary
import React from 'react';

// Style Sheet
import './Book.css';

function handleShowAuthors(authors) {

  if(typeof(authors) === 'undefined') return 'author not specified';

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

function createLink(authors) {

  let qValue = '';

  for(let i = 0; i < authors.length; ++i) qValue += authors[i];

  return `https://www.google.com/search?q=${qValue}`;

}

export const Book = ({ title, subtitle, authors, imageLinks }) => {

  authors = handleShowAuthors(authors);

  return (
    <div className='book'>

      <div className='book-container-img' >
        <img src={imageLinks.thumbnail} alt={`${title} book`} />

        <div className='book-button'>
          <select>
            <option disabled>Move to...</option>
            <option>Currently Reading</option>
            <option>Want to Read</option>
            <option>Read</option>
            <option>None</option>
          </select>
        </div>

      </div>

      <div className='book-info'>
        <h1>{ title }</h1>
        <a href={createLink(authors)} target='_blank' >{authors}</a>
      </div>

    </div>
  );
}
