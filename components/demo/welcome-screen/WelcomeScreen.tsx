/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import './WelcomeScreen.css';

const welcomeContent = {
  title: 'Numtema Agency',
  description: "Bienvenue sur l'assistant virtuel de Numtema Agency. Comment pouvons-nous vous aider à développer votre marque aujourd'hui ?",
  prompts: [
    "J'ai besoin d'un nouveau logo.",
    "Parlons de ma stratégie digitale.",
    "Comment améliorer mon identité visuelle ?",
  ],
};

const WelcomeScreen: React.FC = () => {
  const { title, description, prompts } = welcomeContent;
  return (
    <div className="welcome-screen">
      <div className="welcome-content">
        <div className="title-container">
          <span className="welcome-icon">mic</span>
          <h2 className="welcome-title">{title}</h2>
        </div>
        <p>{description}</p>
        <div className="example-prompts">
          {prompts.map((prompt, index) => (
            <div key={index} className="prompt">{prompt}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;