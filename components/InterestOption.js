import { useState } from 'react';
import styles from '../styles/Question.module.css';

function InterestOption({ setInterest }) {
  const [selected, setSelected] = useState('');

  const handleInterest = (interest) => {
    setInterest(interest);
    setSelected(interest);
  };

  return (
    <div className={styles.questionContainer}>
      <h2>Choisissez votre intérêt :</h2>
      <button
        className={selected === 'purchase' ? styles.selected : ''}
        onClick={() => handleInterest('purchase')}
      >
        UN ACHAT
      </button>
      <button
        className={selected === 'lease' ? styles.selected : ''}
        onClick={() => handleInterest('lease')}
      >
        UN LEASING
      </button>
    </div>
  );
}

export default InterestOption;
