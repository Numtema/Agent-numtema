/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import Modal from './Modal';
import { useEffect } from 'react';

type CalModalProps = {
  onClose: () => void;
};

export default function CalModal({ onClose }: CalModalProps) {
  useEffect(() => {
    const initializeCal = () => {
      // Add a check to ensure the target element exists, just in case.
      if (!document.getElementById('my-cal-inline-30min')) {
        console.error('Cal.com embed target not found in DOM.');
        return;
      }
      const Cal = (window as any).Cal;
      if (Cal) {
        Cal('init', '30min', { origin: 'https://app.cal.com' });
        Cal.ns['30min']('inline', {
          elementOrSelector: '#my-cal-inline-30min',
          config: { layout: 'month_view' },
          calLink: 'lionel-numtema-01/30min',
        });
        Cal.ns['30min']('ui', {
          hideEventTypeDetails: false,
          layout: 'month_view',
        });
      }
    };

    // Defer initialization to ensure the DOM element is ready.
    // This helps prevent race conditions, especially on subsequent modal openings.
    const timerId = setTimeout(() => {
      if (!(window as any).Cal) {
        const script = document.createElement('script');
        script.src = 'https://app.cal.com/embed/embed.js';
        script.async = true;
        script.id = 'cal-embed-script';
        script.onload = initializeCal;
        document.head.appendChild(script);
      } else {
        initializeCal();
      }
    }, 100); // A small delay is often sufficient.

    return () => {
      clearTimeout(timerId);
      const el = document.getElementById('my-cal-inline-30min');
      // Cleanup the container to allow for re-initialization if the modal is reopened.
      if (el) el.innerHTML = '';
    };
  }, []);

  return (
    <Modal onClose={onClose} className="cal-modal">
      <h2>Planifier une consultation de 30 minutes</h2>
      <p>
        Choisissez un créneau qui vous convient avec David, notre consultant.
      </p>
      <div className="cal-modal-content" id="my-cal-inline-30min"></div>
    </Modal>
  );
}
