import './clockWidget.scss';
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
      <button className='expand-btn'>
        more
        <img className='test' src={ArrowDown} alt='' />
      </button>
    </div>
  );
}

export default ClockWidget;
