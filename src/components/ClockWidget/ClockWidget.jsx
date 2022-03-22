import './clockWidget.scss';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import SunIcon from '../../assets/desktop/icon-sun.svg';
import MoonIcon from '../../assets/desktop/icon-moon.svg';
import ArrowUp from '../../assets/desktop/icon-arrow-up.svg';
import ArrowDown from '../../assets/desktop/icon-arrow-down.svg';

function ClockWidget({ setIsModalActive, date, greeting, dayPhase }) {
  const [location, setLocation] = useState({});
  const [isDateInfoExpanded, setIsDateInfoExpanded] = useState(false);
  const modalClasses = classNames('test', {
    'test --expanded': isDateInfoExpanded,
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

  // function expandModal() {
  //   setIsModalActive(true);
  // }

  return (
    <div className='clock-container'>
      <div className='clock-container__greeting'>
        {dayPhase ? (
          <img src={SunIcon} alt='sun icon' />
        ) : (
          <img src={MoonIcon} alt='moon icon' />
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
      <button className='expand-btn'>
        more
        <img src={ArrowDown} alt='expand button' />
      </button>
      {/* <div className={modalClasses}>
        <div className='test__stat-wrapper'>
          <p className='test__left-stat'>current timezone</p>
          <p className='test__right-stat'>{date.timezone}</p>
        </div>
        <div className='test__stat-wrapper'>
          <p className='test__left-stat'>day of the year</p>
          <p className='test__right-stat'>{date.dayOfyear}</p>
        </div>
        <div className='test__stat-wrapper'>
          <p className='test__left-stat'>day of the week</p>
          <p className='test__right-stat'>{date.dayOfWeek}</p>
        </div>
        <div className='test__stat-wrapper'>
          <p className='test__left-stat'>week number</p>
          <p className='test__right-stat'>{date.week}</p>
        </div>
      </div> */}
    </div>
  );
}

export default ClockWidget;
