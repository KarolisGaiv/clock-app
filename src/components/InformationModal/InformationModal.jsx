import React from 'react';
import './informationModal.scss';
import classNames from 'classnames';

function InformationModal({ isAdditionalInfoShowed, date }) {
  const modalClassnames = classNames('information-wrapper', {
    'information-wrapper --active': isAdditionalInfoShowed,
  });

  return (
    <footer className={modalClassnames}>
      <div className='information-wrapper__line'>
        <p>current timezone</p>
        <p>{date.timezone}</p>
      </div>
    </footer>
  );
}

export default InformationModal;
