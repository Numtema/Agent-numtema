/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { FunctionResponseScheduling } from '@google/genai';
import { FunctionCall } from '../state';

export const numtemaAgencyTools: FunctionCall[] = [
  {
    name: 'demander_strategie_digitale',
    description: "Propose une stratégie digitale personnalisée.",
    parameters: {
      type: 'OBJECT',
      properties: {
        objectifs: {
          type: 'STRING',
          description: "Les objectifs commerciaux principaux de l'entreprise.",
        },
        audience_cible: {
          type: 'STRING',
          description: "La description de l'audience cible.",
        },
      },
      required: ['objectifs', 'audience_cible'],
    },
    isEnabled: true,
    scheduling: FunctionResponseScheduling.INTERRUPT,
  },
  {
    name: 'creer_logo',
    description: "Lance la création d'un logo distinctif.",
    parameters: {
      type: 'OBJECT',
      properties: {
        nom_entreprise: {
          type: 'STRING',
          description: "Le nom de l'entreprise pour le logo.",
        },
        valeurs_marque: {
          type: 'STRING',
          description: 'Les valeurs et la personnalité que la marque souhaite véhiculer.',
        },
        preferences_couleur: {
          type: 'STRING',
          description: "Toutes préférences de couleurs ou d'exclusions.",
        },
      },
      required: ['nom_entreprise', 'valeurs_marque'],
    },
    isEnabled: true,
    scheduling: FunctionResponseScheduling.INTERRUPT,
  },
  {
    name: 'developper_identite_visuelle',
    description: "Développe une identité visuelle complète.",
    parameters: {
      type: 'OBJECT',
      properties: {
        nom_marque: {
          type: 'STRING',
          description: "Le nom de la marque pour laquelle développer l'identité.",
        },
        style_desire: {
          type: 'STRING',
          description: 'Description du style souhaité (ex: moderne, minimaliste, luxueux).',
        },
      },
      required: ['nom_marque', 'style_desire'],
    },
    isEnabled: true,
    scheduling: FunctionResponseScheduling.INTERRUPT,
  },
  {
    name: 'definir_communication_marque',
    description: "Structure la communication de votre marque.",
    parameters: {
      type: 'OBJECT',
      properties: {
        message_cle: {
          type: 'STRING',
          description: 'Le message principal que la marque veut communiquer.',
        },
        canaux_cibles: {
          type: 'STRING',
          description: 'Les canaux de communication à privilégier (ex: réseaux sociaux, blog, email).',
        },
      },
      required: ['message_cle', 'canaux_cibles'],
    },
    isEnabled: true,
    scheduling: FunctionResponseScheduling.INTERRUPT,
  },
    {
    name: 'concevoir_campagne_creative',
    description: 'Conçoit une campagne digitale créative.',
    parameters: {
      type: 'OBJECT',
      properties: {
        produit_ou_service: {
          type: 'STRING',
          description: 'Le produit ou service à promouvoir.',
        },
        objectif_campagne: {
          type: 'STRING',
          description: "L'objectif principal de la campagne (ex: notoriété, ventes, engagement).",
        },
      },
      required: ['produit_ou_service', 'objectif_campagne'],
    },
    isEnabled: true,
    scheduling: FunctionResponseScheduling.INTERRUPT,
  },
  {
    name: 'planifier_consultation',
    description: "Ouvre une fenêtre pour planifier une consultation de 30 minutes avec un expert.",
    parameters: {
      type: 'OBJECT',
      properties: {},
    },
    isEnabled: true,
    scheduling: FunctionResponseScheduling.INTERRUPT,
  },
];