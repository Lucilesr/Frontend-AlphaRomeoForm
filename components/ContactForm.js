import styles from '../styles/Question.module.css';
import { useState } from 'react';

function ContactForm({ onChange, nextStep }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    postalCode: '',
    phoneNumber: '',
  });

  // Fonction pour gérer le changement du numéro de téléphone avec formatage
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    let formattedPhone = value;
    if (value.length > 1) {
      formattedPhone = value.slice(0, 2) + ' ' + value.slice(2, 4) + ' ' + value.slice(4, 6) + ' ' + value.slice(6, 8) + ' ' + value.slice(8, 10);
    }
    setFormData({ ...formData, phoneNumber: formattedPhone });
    onChange({ target: { name: 'phoneNumber', value: formattedPhone } }); // Transmettre la nouvelle valeur via onChange
  };

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    onChange(e); // Transmettre le changement via onChange
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div className={styles.questionContainer}>
      <h2>Contact</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="firstName">PRÉNOM</label><br />
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Votre prénom"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="lastName">NOM</label><br />
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Votre nom"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="postalCode">CODE POSTAL</label><br />
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            placeholder="Votre code postal"
            value={formData.postalCode}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phoneNumber">NUMÉRO DE TÉLÉPHONE</label><br />
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="06 00 00 00 00"
            value={formData.phoneNumber}
            onChange={handlePhoneChange}
            required
          />
        </div>
        <div className={styles.submitButton}>
          <button type="submit">Suivant</button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
