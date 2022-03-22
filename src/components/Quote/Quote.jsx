import './quote.scss';
import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import RefreshBtn from '../../assets/refreshBtn.svg';

function Quote({ isAdditionalInfoShowed }) {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  const quoteContainerClasses = classNames('quote-container', {
    'quote-container --expanded': isAdditionalInfoShowed === true,
  });

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

  function getNewQuote() {
    fetchQuote();
  }

  return (
    <div className={quoteContainerClasses}>
      <div className='quote-container__text-wrapper'>
        <div className='quote-container__quote'>"{quote}"</div>
        <div className='quote-container__author'>{author}</div>
      </div>
      <button className='refresh-btn' onClick={getNewQuote}>
        <img src={RefreshBtn} alt='refresh button' />
      </button>
    </div>
  );
}

export default Quote;
