/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import './PopUp.css';

interface PopUpProps {
  onClose: () => void;
}

const PopUp: React.FC<PopUpProps> = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Bienvenue dans le Bac à Sable pour Appels de Fonction Audio Natif</h2>
        <p>Votre point de départ pour créer avec l'audio natif et les appels de fonction.</p>
        <p>Pour commencer :</p>
        <ol>
          <li><span className="icon">play_circle</span>Appuyez sur Lecture pour démarrer le streaming audio.</li>
          <li><span className="icon">save_as</span>Copiez ce bac à sable pour créer votre propre version.</li>
          <li><span className="icon">auto_awesome</span>Utilisez l'Assistant de Code pour personnaliser et tester votre création.</li>
        </ol>
        <button onClick={onClose}>Commencer à construire</button>
      </div>
    </div>
  );
};

export default PopUp;