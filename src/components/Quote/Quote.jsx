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
      <div className='quote-container__text-wrapper'>
        <div className='quote-container__quote'>"{quote}"</div>
        <div className='quote-container__author'>{author}</div>
      </div>
      <div className='quote-container__btn-wrapper'>
        <button>
          <img src={RefreshBtn} alt='refresh button' />
        </button>
      </div>
    </div>
  );
}

export default Quote;
