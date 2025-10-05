/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { useUI } from '@/lib/state';

export default function Header() {
  const { toggleSidebar } = useUI();

  return (
    <header>
      <div className="header-left">
        <h1>Assistant Virtuel Numtema Agency</h1>
        <p>Interagissez avec notre IA pour explorer nos services et démarrer votre projet.</p>
      </div>
      <div className="header-right">
        <button
          className="settings-button"
          onClick={toggleSidebar}
          aria-label="Paramètres"
        >
          <span className="icon">tune</span>
        </button>
      </div>
    </header>
  );
}