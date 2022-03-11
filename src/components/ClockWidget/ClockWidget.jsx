import './clockWidget.scss';

import React, { useEffect, useState } from 'react';

function ClockWidget() {
  const [date, setDate] = useState({});

  useEffect(() => {
    fetchTime();
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

  return (
    <div className='clock-container'>
      <div className='clock-container__greeting'>Greeting placeholder</div>
      <div className='clock-container__time'>
        {date.hours}:{date.minutes} {date.abbreviation}
      </div>
      <div className='clock-container__location'>Location placeholder</div>
    </div>
  );
}

export default ClockWidget;
