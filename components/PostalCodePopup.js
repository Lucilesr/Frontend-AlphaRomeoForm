import styles from '../styles/Popup.module.css'; 

function PostalCodePopup({ city, onClose, onConfirm }) {
  // Le composant PostalCodePopup reçoit trois props : city, onClose, et onConfirm
  return (
    <div className={styles.popupOverlay}> {/* Superposition de la popup */}
      <div className={styles.popupContent}> {/* Contenu de la popup */}
        <p>Confirmation de votre ville, pour la récupération de votre véhicule :</p> 
        <div className={styles.cityName}>{city}</div> {/* Affichage nom ville */}
        <div className={styles.buttons}> {/* Conteneur  boutons */}
          <button onClick={onClose} className={styles.modifyButton}>Non</button> {/* Bouton fermer popup */}
          <button onClick={onConfirm} className={styles.confirmButton}>Oui</button> {/* Bouton confirmer */}
        </div>
      </div>
    </div>
  );
}

export default PostalCodePopup; // Exportation du composant PostalCodePopup
