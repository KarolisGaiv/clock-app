import React from 'react';
import './informationModal.scss';
import classNames from 'classnames';

function InformationModal({ isAdditionalInfoShowed }) {
  const modalClassnames = classNames('test', {
    'test --active': isAdditionalInfoShowed,
  });

  return <footer className={modalClassnames}></footer>;
}

export default InformationModal;
