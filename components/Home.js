import { useState, useEffect } from 'react'; 
import styles from '../styles/Home.module.css'; 
import ModelOption from './ModelOption'; 
import InterestOption from './InterestOption';
import PurchaseOption from './PurchaseOption';
import LeaseOption from './LeaseOption';
import ContactForm from './ContactForm';
import PostalCodePopup from './PostalCodePopup';
import FormConfirmation from './FormConfirmation';

function Home() {
  const [step, setStep] = useState(1); // État pour suivre étape actuelle du formulaire
  const [formData, setFormData] = useState({ // État pour stocker données du formulaire
    model: '', 
    interest: '', 
    purchaseOption: '', 
    leaseOption: '', 
    lastName: '', 
    firstName: '', 
    postalCode: '', 
    phoneNumber: '', 
  });

  const [showPopup, setShowPopup] = useState(false); // État pour gérer l'affichage du popup de code postal
  const [city, setCity] = useState(''); // État pour stocker le nom de la ville récupéré

  // Gere changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target; // Récupération du nom et de la valeur du champ modifié
    setFormData({ ...formData, [name]: value }); // Mise à jour des données du formulaire avec la nouvelle valeur
  };
  
  // Log changements données du formulaire à chaque MAJ de formData
  useEffect(() => {
    console.log('Form data updated:', formData);
  }, [formData]);

  // Gérer la sélection du modèle de voiture
  const handleModelSelect = (model) => {
    setFormData({ ...formData, model }); 
    nextStep(); 
  };

  // Gère achat ou leasing
  const setInterest = (interest) => {
    setFormData({ ...formData, interest }); 
    nextStep(); 
  };

  // Gére l'option d'achat
  const handlePurchaseOptionSelect = (purchaseOption) => {
    setFormData({ ...formData, purchaseOption }); 
    nextStep(); 
  };

  // Gére l'option de leasing
  const handleLeaseOptionSelect = (leaseOption) => {
    setFormData({ ...formData, leaseOption }); 
    nextStep(); 
  };

  // Passer à l'etape suivante
  const nextStep = () => {
    setStep(step + 1); 
    console.log('Proceed to the next step');
  };

  // Fonction pour formater le numéro de téléphone
  const formatPhoneNumber = (phone) => {
    return phone.replace(/^0/, '+33').replace(/\s/g, ''); 
    // Remplace 0 par +33 + suppression des espaces
  };

  // Récupére le nom de la ville à partir du code postal
  const getCityName = async (postalCode) => {
    try {
      const response = await fetch(`https://geo.api.gouv.fr/communes?codePostal=${postalCode}`); 
      // Requête API pour récupérer les informations de la ville basée sur le code postal
      if (!response.ok) {
        throw new Error('Failed to fetch city name'); 
      }
      const data = await response.json(); 
      return data.length > 0 ? data[0].nom : ''; 
      // Si des données sont retournées, récupérer le nom de la première ville, sinon retourner une chaîne vide
    } catch (error) {
      console.error('Erreur lors de la récupération du nom de la ville:', error);
      alert('Erreur lors de la récupération du nom de la ville'); 
      return '';
    }
  };

  // Confirme la ville et affiche popup
  const confirmCity = async () => {
    const cityName = await getCityName(formData.postalCode); 
    // Récupére nom de la ville en fonction du code postal
    setCity(cityName); // MAJ état city avec nom de ville récupéré
    setShowPopup(true); // Affichage du popup de confirmation de code postal
  };

  // Fonction pour soumettre le formulaire
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
      const response = await fetch(`/api?em=${email}`, {
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
    }
    setShowPopup(false);
    nextStep();
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
      </div>
        <div className={styles.formSize}>
          {step === 1 && <ModelOption onSelect={handleModelSelect} />} 
          {step === 2 && <InterestOption setInterest={setInterest} />} 
          {step === 3 && formData.interest === 'purchase' && <PurchaseOption onSelect={handlePurchaseOptionSelect} />} 
          {step === 3 && formData.interest === 'lease' && <LeaseOption onSelect={handleLeaseOptionSelect} />} 
          {step === 4 && <ContactForm onChange={handleChange} nextStep={confirmCity} />} 
          {showPopup && (
            <PostalCodePopup city={city} onClose={() => setShowPopup(false)} onConfirm={submitForm} /> 
          )}
          <div className={styles.confirmationContainer}>
            {step === 5 && <FormConfirmation />} 
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
