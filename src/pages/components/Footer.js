import React from 'react';

import './Footer.css';

export const Footer = () => (
  <div className='footer'>
    <h3 className='footer-text' >Developed by <strong>David Gaspar</strong></h3>
    <div>
      <a href='https://linkedin.com/in/davidgaspardev' target='_blank' rel='noopener' >
        <img className='footer-img' src={require('../icons/linkedin.png')}  alt='Linkedin logo' />
      </a>
      <a href='https://github.com/davidgaspardev/myreads' target='_blank' rel='noopener' >
        <img className='footer-img' src={require('../icons/github.png')} alt='Github logo' />
      </a>
    </div>
  </div>
);
