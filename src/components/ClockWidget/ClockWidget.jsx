import './clockWidget.scss';

import React, { useEffect, useState } from 'react';

function ClockWidget() {
  const [date, setDate] = useState({});
  const [greeting, setGreeting] = useState('Good afternoon');

  useEffect(() => {
    fetchTime();
    getGreeting();
  }, [date]);

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

  function getGreeting() {
    if (date.hours >= 12 && date.hours < 18) {
      setGreeting('Good afternoon');
    } else if (date.hours >= 18 && date.hours < 5) {
      setGreeting('Good evening');
    } else {
      setGreeting('Good morning');
    }
  }

  return (
    <div className='clock-container'>
      <div className='clock-container__greeting'>{greeting}</div>
      <div className='clock-container__time'>
        <p className='clock-container__time__current-date'>{date.hours}:</p>
        <p className='clock-container__time__current-date'>{date.minutes}</p>
        <span className='clock-container__time__time-zone'>
          {date.abbreviation}
        </span>
      </div>
      <div className='clock-container__location'>Location placeholder</div>
    </div>
  );
}

export default ClockWidget;
