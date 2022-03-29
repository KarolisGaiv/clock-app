import { useState, useEffect } from 'react';
import classNames from 'classnames';
import './styles/main.scss';
import Quote from './components/Quote/Quote';
import ClockWidget from './components/ClockWidget/ClockWidget';
import InformationModal from './components/InformationModal/InformationModal';

function App() {
  const [date, setDate] = useState({});
  const [isNightPhase, setIsNightPhase] = useState();
  const [greeting, setGreeting] = useState('');
  const [isAdditionalInfoShowed, setIsAdditionalInfoShowed] = useState(false);

  const backgroundClasses = classNames('background', {
    'background --night': isNightPhase === true,
    'background --day': isNightPhase === false,
  });

  const contentClasses = classNames('content', {
    'content --expanded': isAdditionalInfoShowed,
  });

  useEffect(() => {
    fetchTime();

    const interval = setInterval(() => {
      fetchTime();
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

  function getGreeting(currentHour) {
    if (currentHour >= 5 && currentHour < 12) {
      setGreeting('Good Morning');
      // set day phase status to determine app background
      setIsNightPhase(false);
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting('Good Afternoon');
      setIsNightPhase(false);
    } else {
      setGreeting('Good Evening');
      setIsNightPhase(true);
    }
  }

  return (
    <div className='wrapper'>
      <div className={backgroundClasses}></div>
      <main className={contentClasses}>
        <Quote isAdditionalInfoShowed={isAdditionalInfoShowed} />
        <ClockWidget
          date={date}
          greeting={greeting}
          dayPhase={isNightPhase}
          isAdditionalInfoShowed={isAdditionalInfoShowed}
          setIsAdditionalInfoShowed={setIsAdditionalInfoShowed}
        />
      </main>
      <InformationModal
        isAdditionalInfoShowed={isAdditionalInfoShowed}
        date={date}
        isNightPhase={isNightPhase}
      />
    </div>
  );
}

export default App;
