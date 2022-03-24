import React from 'react';
import './informationModal.scss';
import classNames from 'classnames';

function InformationModal({ isAdditionalInfoShowed, date, isNightPhase }) {
  const modalClassnames = classNames('information-wrapper', {
    'information-wrapper --active-day': isAdditionalInfoShowed && !isNightPhase,
    'information-wrapepr --active-night':
      isAdditionalInfoShowed && isNightPhase,
  });

  return (
    <footer className={modalClassnames}>
      <div className='information-wrapper__data-field'>
        <p className='information-wrapper__data-field__name'>
          current timezone
        </p>
        <p className='information-wrapper__data-field__value'>
          {date.timezone}
        </p>
      </div>
      <div className='information-wrapper__data-field'>
        <p className='information-wrapper__data-field__name'>day of the year</p>
        <p className='information-wrapper__data-field__value'>
          {date.dayOfyear}
        </p>
      </div>
      <div className='information-wrapper__data-field'>
        <p className='information-wrapper__data-field__name'>day of the week</p>
        <p className='information-wrapper__data-field__value'>
          {date.dayOfWeek}
        </p>
      </div>
      <div className='information-wrapper__data-field'>
        <p className='information-wrapper__data-field__name'>week number</p>
        <p className='information-wrapper__data-field__value'>{date.week}</p>
      </div>
    </footer>
  );
}

export default InformationModal;
