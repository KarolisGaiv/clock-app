import './clockWidget.scss';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import SunIcon from '../../assets/desktop/icon-sun.svg';
import MoonIcon from '../../assets/desktop/icon-moon.svg';
import ArrowUp from '../../assets/desktop/icon-arrow-up.svg';
import ArrowDown from '../../assets/desktop/icon-arrow-down.svg';

function ClockWidget({ setDayPhase }) {
  const [date, setDate] = useState({});
  const [greeting, setGreeting] = useState('Good afternoon');
  const [timeOfDay, setTimeofDay] = useState('day');
  const [location, setLocation] = useState({});
  const [isDateInfoExpanded, setIsDateInfoExpanded] = useState(false);
  const modalClasses = classNames('test', {
    'test --expanded': isDateInfoExpanded,
  });

  useEffect(() => {
    fetchTime();
    getGreeting(date.hours);
    getLocation();

    const interval = setInterval(() => {
      fetchTime();
      getGreeting();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchTime = async () => {
    const response = await fetch('http://worldtimeapi.org/api/ip');
    const data = await response.json();
    let current_date = new Date(data.datetime.toString());

    let dateObj = {
      hours: current_date.getHours(),
      minutes: ('0' + current_date.getMinutes()).slice(-2),
      abbreviation: data.abbreviation,
      timezone: data.timezone,
      dayOfyear: data.day_of_year,
      dayOfWeek: data.day_of_week,
      week: data.week_number,
    };
    setDate(dateObj);
  };

  function getGreeting(currentHour) {
    if (currentHour >= 5 && currentHour < 12) {
      setGreeting('Good morning');
      // send current day phase up to parent App.js
      setDayPhase('day');
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting('Good afternoon');
      setDayPhase('day');
    } else {
      setGreeting('Good evening');
      setTimeofDay('night');
      setDayPhase('night');
    }
  }

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

  function expandModal() {
    console.log(`before pressing modal state was ${isDateInfoExpanded}`);
    setIsDateInfoExpanded(!isDateInfoExpanded);
    console.log(`after pressing modal state is ${isDateInfoExpanded}`);
  }

  return (
    <div className='clock-container'>
      <div className='clock-container__greeting'>
        {timeOfDay === 'day' ? (
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
      <button className='expand-btn' onClick={expandModal}>
        more
        <img src={ArrowDown} alt='expand button' />
      </button>
      <div className={modalClasses}>
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
      </div>
    </div>
  );
}

export default ClockWidget;
