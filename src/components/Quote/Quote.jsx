import './quote.scss';
import React, { useState, useEffect } from 'react';
import RefreshBtn from '../../assets/refreshBtn.svg';

function Quote() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    const res = await fetch(
      'https://programming-quotes-api.herokuapp.com/Quotes/random'
    );
    const data = await res.json();
    setQuote(data.en);
    setAuthor(data.author);
  };

  return (
    <div className='quote-container'>
      <div className='quote-container__top'>
        <p className='quote-container__text'>"{quote}"</p>
        <button>
          <img src={RefreshBtn} alt='' />
        </button>
      </div>
      <div className='quote-container-bottom'>
        <p>{author}</p>
      </div>
    </div>
  );
}

export default Quote;
