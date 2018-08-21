/**
 * Component to show the book
 * @author David Gaspar (davidgaspar.dev@gmail.com)
 */

// Ligrary
import React from 'react';

// Style Sheet
import './Book.css';

// Responsible for string concatenation with authors' names
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

// Links for the authors
function createLink(authors) {

  let qValue = '';

  for(let i = 0; i < authors.length; ++i) qValue += authors[i];

  return `https://www.google.com/search?q=${qValue}`;

}

// Book view
export const Book = ({ id, title, subtitle, authors, imageLinks, shelf, eventAddBook }) => {

  authors = handleShowAuthors(authors);

  // If you do not have a shelf category
  if(shelf === undefined) shelf = 'none';

  // Categories shelfs
  let shelfs = ['currentlyReading', 'wantToRead', 'read', 'none'];

  return (
    <div className='book'>

      <div className='book-container-img' >

        <img src={typeof(imageLinks) !== 'undefined' && imageLinks.thumbnail } alt={`${title} book`} />

        <div className='book-button'>
          <select defaultValue={shelf} onChange={option => eventAddBook({ id: id }, option.target.value)} >
            <option value={shelfs[0]} disabled={shelf === shelfs[0]} >Currently Reading</option>
            <option value={shelfs[1]} disabled={shelf === shelfs[1]} >Want to Read</option>
            <option value={shelfs[2]} disabled={shelf === shelfs[2]} >Read</option>
            <option value={shelfs[3]} disabled={shelf === shelfs[3]} >None</option>
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
