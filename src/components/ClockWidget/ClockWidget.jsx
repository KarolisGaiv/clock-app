import './clockWidget.scss';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import SunIcon from '../../assets/desktop/icon-sun.svg';
import MoonIcon from '../../assets/desktop/icon-moon.svg';
import ArrowDown from '../../assets/desktop/icon-arrow-down.svg';

function ClockWidget({
  date,
  greeting,
  currentDayPhase,
  isAdditionalInfoShowed,
  setIsAdditionalInfoShowed,
}) {
  const [location, setLocation] = useState({});
  const btnIconClasses = classNames('expand-btn__icon', {
    'expand-btn__icon --active': isAdditionalInfoShowed,
  });

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    const response = await fetch(
      'https://api.freegeoip.app/json/?apikey=2be569c0-a2af-11ec-8a82-ebd58e49ede1'
    );
    const data = await response.json();
    let locationObj = {
      city: data.city,
      country_code: data.country_code,
    };
    setLocation(locationObj);
  };

  function toggleAdditionalInformation() {
    setIsAdditionalInfoShowed(!isAdditionalInfoShowed);
  }

  return (
    <div className='clock-container'>
      <div className='clock-container__greeting'>
        {currentDayPhase ? (
          <img src={MoonIcon} alt='moon icon' />
        ) : (
          <img src={SunIcon} alt='sun icon' />
        )}

        {greeting}
      </div>
      <div className='clock-container__time'>
        <p className='clock-container__time__current-date'>{date.hours}:</p>
        <p className='clock-container__time__current-date'>{date.minutes}</p>
        <span className='clock-container__time__time-zone'>
          {date.abbreviation}
        </span>
      </div>
      <div className='clock-container__location'>
        In {location.city}, {location.country_code}{' '}
      </div>
      <button className='expand-btn' onClick={toggleAdditionalInformation}>
        {isAdditionalInfoShowed ? 'less' : 'more'}
        <img className={btnIconClasses} src={ArrowDown} alt='expand button' />
      </button>
    </div>
  );
}

export default ClockWidget;
