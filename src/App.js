import { useState, useEffect } from 'react';
import './styles/main.scss';

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

  return <div className='App'>{console.log(screenSize)}</div>;
}

export default App;
