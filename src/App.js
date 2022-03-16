import { useState, useEffect } from 'react';
import classNames from 'classnames';
import './styles/main.scss';
import Quote from './components/Quote/Quote';
import ClockWidget from './components/ClockWidget/ClockWidget';

function App() {
  const [screenSize, setScreenSize] = useState();
  const [dayPhase, setDayPhase] = useState();
  const backgroundClasses = classNames('background', {
    'background --day': dayPhase === 'day',
    'background --night': dayPhase === 'night',
  });

  useEffect(() => {
    getScreenSize();
  }, []);

  function getScreenSize() {
    let size = window.screen.width;

    if (size < 768) {
      setScreenSize('phone');
    } else if (size >= 768 && size < 1023) {
      setScreenSize('tablet');
    } else {
      setScreenSize('desktop');
    }
  }

  return (
    <div className='content__wrapper'>
      <div className={backgroundClasses}></div>
      <main>
        <Quote />
        <ClockWidget setDayPhase={setDayPhase} />
      </main>
    </div>
  );
}

export default App;
