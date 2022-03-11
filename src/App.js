import { useState, useEffect } from 'react';
import './styles/main.scss';
import Quote from './components/Quote/Quote';
import ClockWidget from './components/ClockWidget/ClockWidget';

function App() {
  const [screenSize, setScreenSize] = useState();

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
      <div className='background background --day'></div>
      <main>
        <Quote />
        <ClockWidget />
      </main>
    </div>
  );
}

export default App;
