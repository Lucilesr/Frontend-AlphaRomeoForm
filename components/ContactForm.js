import styles from '../styles/Question.module.css';
import { useState } from 'react';

function ContactForm({ onChange, nextStep }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    let formattedPhone = value;
    if (value.length > 1) {
      formattedPhone = value.slice(0, 2) + ' ' + value.slice(2, 4) + ' ' + value.slice(4, 6) + ' ' + value.slice(6, 8) + ' ' + value.slice(8, 10);
    }
    setPhone(formattedPhone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div className={styles.questionContainer}>
      <h2>Contact</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="firstName">PRÉNOM</label><br></br>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Votre prénom"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              onChange(e);
            }}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="lastName">NOM</label><br></br>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Votre nom"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              onChange(e);
            }}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="postalCode">CODE POSTAL</label><br></br>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            placeholder="75001"
            pattern="\d{5}"
            value={postalCode}
            onChange={(e) => {
              setPostalCode(e.target.value);
              onChange(e);
            }}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phone">TÉLÉPHONE</label><br></br>
          <input
            type="tel"
            id="phone"
            name="phoneNumber"
            placeholder="06 XX XX XX XX"
            value={phone}
            onChange={(e) => {
              handlePhoneChange(e);
              onChange(e);
            }}
            pattern="0[0-9] [0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}"
            required
          />
        </div>
        <button type="submit">CONTINUER</button>
      </form>
    </div>
  );
}

export default ContactForm;
