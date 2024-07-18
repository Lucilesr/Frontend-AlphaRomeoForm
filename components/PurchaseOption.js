import styles from '../styles/Question.module.css';

function PurchaseOption({ onSelect }) {
  return (
    <div className={styles.questionContainer}>
      <h2>Pour quel type de véhicule ?</h2>
      <button onClick={() => onSelect('NEUF')}>NEUF</button>
      <button onClick={() => onSelect('OCCASION')}>OCCASION</button>
    </div>
  );
}

export default PurchaseOption;
