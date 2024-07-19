import styles from '../styles/Question.module.css';

function FormConfirmation() {
  return (
    <div className={styles.confirmationContainer}>
      <div className={styles.confirmContent}>
        <p className={styles.confirmText}>Votre réservation a bien été prise en compte.</p>
        <p className={styles.confirmText}>Vous serez contacté dans <u>un délai de 48 heures</u>.</p><br></br><br></br>
        <p>L'équipe Alfa Romeo vous remercie.</p>
      </div>
    </div>
  );
}

export default FormConfirmation;
