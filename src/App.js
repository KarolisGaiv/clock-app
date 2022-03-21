import { useState } from 'react';
import classNames from 'classnames';
import './styles/main.scss';
import Quote from './components/Quote/Quote';
import ClockWidget from './components/ClockWidget/ClockWidget';

function App() {
  const [dayPhase, setDayPhase] = useState();
  const backgroundClasses = classNames('background', {
    'background --day': dayPhase === 'day',
    'background --night': dayPhase === 'night',
  });

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
