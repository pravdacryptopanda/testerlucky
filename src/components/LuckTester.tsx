import React, { useEffect, useState } from 'react';
import './LuckTester.css';
import { safeSaveLuckValue } from '../utils/saveLuckPercent';
import { getUserData } from '../utils/getUserData';

const LuckTester: React.FC = () => {
  const [currentColor, setCurrentColor] = useState<'green' | 'red'>('green');
  const [attempts, setAttempts] = useState(0);
  const [correctGuesses, setCorrectGuesses] = useState(0);

  useEffect(() => {
    getUserData(new Date().toISOString().split("T")[0]).then(({ attempts, correctGuesses }) => {
      setAttempts(attempts);
      setCorrectGuesses(correctGuesses);
    })
  }, [])

  const successRate = attempts > 0 ? ((correctGuesses / attempts) * 100).toFixed(2) : '0';

  const handleGuess = (guess: 'green' | 'red') => {
    const nextColor = Math.random() > 0.5 ? 'green' : 'red';
    setCurrentColor(nextColor);
    setAttempts(attempts + 1);

    if (guess === nextColor) {
      setCorrectGuesses(correctGuesses + 1);
      safeSaveLuckValue(attempts, correctGuesses);
    }
  };


  const handleReset = () => {
    setAttempts(0);
    setCorrectGuesses(0);
    safeSaveLuckValue(attempts, correctGuesses);
  };

  return (
    <div className="luck-tester-container">
      <h1 className='heading'>ТЕСТЕР УДАЧИ</h1>
      <div className={`circle ${currentColor}`}></div>
      <p className='label'>угадай, какой выпадет цвет:</p>
      <div>
        <button className="guess-button green" onClick={() => handleGuess('green')}>

        </button>
        <button className="guess-button red" onClick={() => handleGuess('red')}>

        </button>
      </div>
      <div className='result'>
        <div className='result-item'>Количество попыток: <br /> <span className='result-value'>{attempts}</span></div>
        <div>Процент удачи: <br />

          <span className='result-value'>{successRate}%</span></div>
      </div>

      <button className="reset-button" onClick={handleReset}>
        Сбросить статистику
      </button>

    </div>
  );
};

export default LuckTester;
