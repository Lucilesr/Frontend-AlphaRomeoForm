import styles from '../styles/Popup.module.css';

function PostalCodePopup({ city, onClose, onConfirm }) {
  return (
    <div className={styles.popupOverlay}>
    <div className={styles.popupContent}>
      <p>Confirmation de votre ville, pour la récupération de votre véhicule :</p>
      <div className={styles.cityName}>{city}</div>
      <div className={styles.buttons}>
        <div button className={styles.modifyButton} >
          {/* Lorsque l'utilisateur clique sur "Non", la fonction onClose est appelée */}
          <button onClick={onClose}>Non</button>
          {/* Lorsque l'utilisateur clique sur "Oui", la fonction onConfirm est appelée */}
          <button onClick={onConfirm}>Oui</button>
        </div>
      </div>
      </div>
    </div>
  );
}


export default PostalCodePopup;
