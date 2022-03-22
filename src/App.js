import { useState, useEffect } from 'react';
import classNames from 'classnames';
import './styles/main.scss';
import Quote from './components/Quote/Quote';
import ClockWidget from './components/ClockWidget/ClockWidget';

function App() {
  const [date, setDate] = useState({});
  const [isDayPhase, setIsDayPhase] = useState(true);
  const [greeting, setGreeting] = useState('');

  const backgroundClasses = classNames('background', {
    'background --day': isDayPhase === true,
    'background --night': isDayPhase === false,
  });

  useEffect(() => {
    fetchTime();
    getDayPhase();

    const interval = setInterval(() => {
      fetchTime();
      getDayPhase();
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
    getGreeting(dateObj.hours);
  };

  function getDayPhase() {
    if (date.hours >= 18 && date.hours < 5) {
      setIsDayPhase(false);
    }
  }

  function getGreeting(currentHour) {
    if (currentHour >= 5 && currentHour < 12) {
      setGreeting('Good Morning');
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }

  return (
    <div className='wrapper'>
      <div className={backgroundClasses}></div>
      <main className='content'>
        <Quote />
        <ClockWidget
          setIsModalActive={setIsModalActive}
          date={date}
          greeting={greeting}
          dayPhase={isDayPhase}
        />
      </main>
    </div>
  );
}

export default App;
