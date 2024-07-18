import styles from '../styles/Question.module.css';

function LeaseOption({ onSelect }) {
  return (
    <div className={styles.questionContainer}>
      <h2>Leasing - pour quelle durée ?</h2>
      <button onClick={() => onSelect('6M')}>6 mois</button>
      <button onClick={() => onSelect('12M')}>12 mois</button>
      <button onClick={() => onSelect('18M')}>18 mois</button>
      <button onClick={() => onSelect('24M')}>24 mois</button>
    </div>
  );
}

export default LeaseOption;
