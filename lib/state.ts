/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { create } from 'zustand';
import { numtemaAgencyTools } from './tools/customer-support';

// L'application est maintenant ciblée sur une seule expérience.
export type Template = 'numtema-agency';

const toolsets: Record<Template, FunctionCall[]> = {
  'numtema-agency': numtemaAgencyTools,
};

const systemPrompts: Record<Template, string> = {
  'numtema-agency': `Vous êtes un assistant expert et convivial de Nümtema Agency. Votre mission est de transformer chaque interaction en une opportunité pour nos clients.

### À Propos de Nümtema Agency
- **Expérience** : Plus de 7 ans dans le domaine du digital.
- **Projets** : Plus de 56 projets complétés avec succès.
- **Clients** : Plus de 53 clients satisfaits qui nous font confiance.
- **Notre force** : Nous concevons des stratégies sur-mesure orientées vers des résultats concrets et tangibles, en exploitant les technologies les plus récentes.
- **Témoignage Clé** : "Grâce à Nümtema AGENCY, mes rendez-vous en ligne ont augmenté de 40 % en seulement 3 mois. Leur expertise est incomparable !" - Aurélie B., CEO La mode d'aurelie.

### Nos Services Principaux
- Développement Web (Sites vitrines, E-commerce)
- Formations en IA (Midjourney, ChatGPT)
- Identité Visuelle et Numérique (Logo, Charte graphique)
- Stratégie Digitale et SEO
- Communication de Marque et Gestion des Réseaux Sociaux
- Création de Chatbots
- Consultation Stratégique

### Nos Offres Détaillées
- **Package Éveil (435€)** : Idéal pour entrepreneurs. Inclut logo, site vitrine basique (3 jours), SEO de base, et création de comptes réseaux sociaux.
- **Package Avancé (870€)** : Pour les PME. Comprend tout le package Éveil, plus un site standard (4 jours), SEO avancé, et un chatbot intégré.
- **Package Fusée (1740€)** : Pour l'E-commerce et les projets complexes. Inclut tout le package Avancé, plus un site complexe (7 jours), SEO complet, chatbot vocal, et gestion de campagnes publicitaires.

### Vos Personas d'Experts
Lorsque vous activez un outil, endossez le rôle de l'expert correspondant pour une expérience plus personnalisée :
- **Stratégie Digitale** : Vous êtes Sarah, la Stratège.
- **Création de Logo / Identité Visuelle** : Vous êtes Léo, le Designer.
- **Communication de Marque** : Vous êtes Clara, la Communicante.
- **Campagnes Créatives** : Vous êtes Alex, le Créatif.
- **Consultation Stratégique** : Lorsqu'un utilisateur souhaite une consultation, vous êtes David, le Consultant. Votre rôle est de confirmer leur intérêt et de déclencher l'outil pour ouvrir le calendrier de réservation. Ne demandez PAS de date ou d'heure, dites simplement que vous ouvrez le calendrier pour qu'ils choisissent un créneau.

Votre objectif est d'utiliser ces informations pour répondre précisément aux questions des utilisateurs et de déclencher les outils appropriés pour démarrer un projet avec eux. Soyez proactif, engageant et incarnez l'excellence de Nümtema Agency !`,
};
import { DEFAULT_LIVE_API_MODEL, DEFAULT_VOICE } from './constants';
import {
  FunctionResponse,
  FunctionResponseScheduling,
  LiveServerToolCall,
} from '@google/genai';

/**
 * Settings
 */
export const useSettings = create<{
  systemPrompt: string;
  model: string;
  voice: string;
  setSystemPrompt: (prompt: string) => void;
  setModel: (model: string) => void;
  setVoice: (voice: string) => void;
}>(set => ({
  systemPrompt: systemPrompts['numtema-agency'],
  model: DEFAULT_LIVE_API_MODEL,
  voice: DEFAULT_VOICE,
  setSystemPrompt: prompt => set({ systemPrompt: prompt }),
  setModel: model => set({ model }),
  setVoice: voice => set({ voice }),
}));

/**
 * UI
 */
export const useUI = create<{
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  isCalModalOpen: boolean;
  openCalModal: () => void;
  closeCalModal: () => void;
}>(set => ({
  isSidebarOpen: true,
  toggleSidebar: () => set(state => ({ isSidebarOpen: !state.isSidebarOpen })),
  isCalModalOpen: false,
  openCalModal: () => set({ isCalModalOpen: true }),
  closeCalModal: () => set({ isCalModalOpen: false }),
}));

/**
 * Tools
 */
export interface FunctionCall {
  name: string;
  description?: string;
  parameters?: any;
  isEnabled: boolean;
  scheduling?: FunctionResponseScheduling;
}



export const useTools = create<{
  tools: FunctionCall[];
  template: Template;
  setTemplate: (template: Template) => void;
  toggleTool: (toolName: string) => void;
  addTool: () => void;
  removeTool: (toolName: string) => void;
  updateTool: (oldName: string, updatedTool: FunctionCall) => void;
}>(set => ({
  tools: numtemaAgencyTools,
  template: 'numtema-agency',
  setTemplate: (template: Template) => {
    set({ tools: toolsets[template], template });
    useSettings.getState().setSystemPrompt(systemPrompts[template]);
  },
  toggleTool: (toolName: string) =>
    set(state => ({
      tools: state.tools.map(tool =>
        tool.name === toolName ? { ...tool, isEnabled: !tool.isEnabled } : tool,
      ),
    })),
  addTool: () =>
    set(state => {
      let newToolName = 'nouvelle_fonction';
      let counter = 1;
      while (state.tools.some(tool => tool.name === newToolName)) {
        newToolName = `nouvelle_fonction_${counter++}`;
      }
      return {
        tools: [
          ...state.tools,
          {
            name: newToolName,
            isEnabled: true,
            description: '',
            parameters: {
              type: 'OBJECT',
              properties: {},
            },
            scheduling: FunctionResponseScheduling.INTERRUPT,
          },
        ],
      };
    }),
  removeTool: (toolName: string) =>
    set(state => ({
      tools: state.tools.filter(tool => tool.name !== toolName),
    })),
  updateTool: (oldName: string, updatedTool: FunctionCall) =>
    set(state => {
      // Check for name collisions if the name was changed
      if (
        oldName !== updatedTool.name &&
        state.tools.some(tool => tool.name === updatedTool.name)
      ) {
        console.warn(`Un outil avec le nom "${updatedTool.name}" existe déjà.`);
        // Prevent the update by returning the current state
        return state;
      }
      return {
        tools: state.tools.map(tool =>
          tool.name === oldName ? updatedTool : tool,
        ),
      };
    }),
}));

/**
 * Logs
 */
export interface LiveClientToolResponse {
  functionResponses?: FunctionResponse[];
}
export interface GroundingChunk {
  web?: {
    // FIX: Type 'GroundingChunk' from '@google/genai' has optional 'uri' and 'title'.
    uri?: string;
    title?: string;
  };
}

export interface ConversationTurn {
  timestamp: Date;
  role: 'user' | 'agent' | 'system';
  text: string;
  isFinal: boolean;
  toolUseRequest?: LiveServerToolCall;
  toolUseResponse?: LiveClientToolResponse;
  groundingChunks?: GroundingChunk[];
}

export const useLogStore = create<{
  turns: ConversationTurn[];
  addTurn: (turn: Omit<ConversationTurn, 'timestamp'>) => void;
  updateLastTurn: (update: Partial<ConversationTurn>) => void;
  clearTurns: () => void;
}>((set, get) => ({
  turns: [],
  addTurn: (turn: Omit<ConversationTurn, 'timestamp'>) =>
    set(state => ({
      turns: [...state.turns, { ...turn, timestamp: new Date() }],
    })),
  updateLastTurn: (update: Partial<Omit<ConversationTurn, 'timestamp'>>) => {
    set(state => {
      if (state.turns.length === 0) {
        return state;
      }
      const newTurns = [...state.turns];
      const lastTurn = { ...newTurns[newTurns.length - 1], ...update };
      newTurns[newTurns.length - 1] = lastTurn;
      return { turns: newTurns };
    });
  },
  clearTurns: () => set({ turns: [] }),
}));