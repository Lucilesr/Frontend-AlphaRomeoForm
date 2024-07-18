import { useState } from 'react';
import styles from '../styles/Home.module.css';
import ModelOption from './ModelOption';
import InterestOption from './InterestOption';
import PurchaseOption from './PurchaseOption';
import LeaseOption from './LeaseOption';
import ContactForm from './ContactForm';
import PostalCodePopup from './PostalCodePopup';
import FormConfirmation from './FormConfirmation';

function Home() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    model: '',
    interest: '',
    purchaseOption: '',
    leaseOption: '',
    lastName: '',
    firstName: '',
    postalCode: '',
    phoneNumber: '',
  });

  const [showPopup, setShowPopup] = useState(false);
  const [city, setCity] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleModelSelect = (model) => {
    setFormData({ ...formData, model });
    nextStep();
  };

  const setInterest = (interest) => {
    setFormData({ ...formData, interest });
    nextStep();
  };

  const handlePurchaseOptionSelect = (purchaseOption) => {
    setFormData({ ...formData, purchaseOption });
    nextStep();
  };

  const handleLeaseOptionSelect = (leaseOption) => {
    setFormData({ ...formData, leaseOption });
    nextStep();
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const formatPhoneNumber = (phone) => {
    return phone.replace(/^0/, '+33').replace(/\s/g, '');
  };

  const getCityName = async (postalCode) => {
    const response = await fetch(`https://geo.api.gouv.fr/communes?codePostal=${postalCode}`);
    const data = await response.json();
    return data.length > 0 ? data[0].nom : '';
  };

  const confirmCity = async () => {
    const cityName = await getCityName(formData.postalCode);
    setCity(cityName);
    setShowPopup(true);
  };

  const submitForm = async () => {
    try {
      const payload = {
        data: {
          type_modele: formData.model,
          achat_ou_leasing: formData.interest === 'purchase' ? 'Achat' : 'Leasing',
          vehicule_neuf_ou_location: formData.purchaseOption || '',
          duree_leasing: formData.leaseOption || '',
          nom: formData.lastName,
          prenom: formData.firstName,
          ville: city,
          telephone: formatPhoneNumber(formData.phoneNumber),
        }
      };
  
      const email = 'lucile.desaintroman@gmail.com';
      const response = await fetch(`https://hooks.zapier.com/hooks/catch/16422019/37w62x0?em=${email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        alert('Formulaire envoyé avec succès !');
      } else {
        const errorMessage = await response.text();
        alert(`Erreur lors de l'envoi du formulaire : ${errorMessage}`);
      }
    } catch (error) {
      console.error('Erreur lors de la requête fetch', error);
      alert('Erreur lors de la requête fetch');
    }
    setShowPopup(false);
    nextStep(); // Move to confirmation step after form submission
  };  

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.logoContainer}>
          <img src="logo-alfa-romeo.png" alt="Logo" />
        </div>
      </div>
      <div className={styles.textContainer}>
        <div className={styles.title}>DE NOUVELLES ÉMOTIONS COMMENCENT ICI</div>
        <div className={styles.subtitle}>
          Réservez un essai gratuitement en remplissant le formulaire et faites connaissance avec l'univers Alfa Romeo.
        </div>
        <div className={styles.formulaire}>
          {step === 1 && <ModelOption onSelect={handleModelSelect} />}
          {step === 2 && <InterestOption setInterest={setInterest} />}
          {step === 3 && formData.interest === 'purchase' && <PurchaseOption onSelect={handlePurchaseOptionSelect} />}
          {step === 3 && formData.interest === 'lease' && <LeaseOption onSelect={handleLeaseOptionSelect} />}
          {step === 4 && <ContactForm onChange={handleChange} nextStep={confirmCity} />}
          {showPopup && (<PostalCodePopup city={city} onClose={() => setShowPopup(false)} onConfirm={submitForm}
          />)}
        <div className={styles.confirmationContainer}>
          {step === 5 && <FormConfirmation />}
        </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.footerLink}>POLITIQUE DE CONFIDENTIALITE</div>
        <div className={styles.footerLink}>CONDITIONS GÉNÉRALES D'UTILISATION</div>
        <div className={styles.footerLink}>RÉGLEMENTATION - LOI AGEC</div>
        <div className={styles.footerLink}>COOKIE</div>
        <div className={styles.footerLink}>DROIT D'AUTEUR</div>
      </div>
    </div>
  );
}

export default Home;
