import styles from '../styles/Question.module.css';

function ModelOption({ onSelect }) {
  return (
    <div className={styles.questionContainer}>
      <h2>Quel est le type de modèle que vous souhaitez tester ?</h2>
      <button onClick={() => onSelect('COMPACTE')}>COMPACTE</button>
      <button onClick={() => onSelect('SUV')}>SUV</button>
      <button onClick={() => onSelect('ELECTRIQUES & HYBRIDES')}>ELECTRIQUES & HYBRIDES</button>
      <button onClick={() => onSelect('SPORTIVE')}>SPORTIVE</button>
    </div>
  );
}

export default ModelOption;
