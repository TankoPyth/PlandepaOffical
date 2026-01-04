import { useEffect } from 'react';
import { PopupModal } from 'react-calendly';

interface CalendlyPopupProps {
  isOpen: boolean;
  onClose: () => void;
  url?: string;
}

export function CalendlyPopup({ isOpen, onClose, url = 'https://calendly.com/admin-plandepa/30min' }: CalendlyPopupProps) {
  useEffect(() => {
    if (isOpen) {
      const root = document.getElementById('root');
      if (!root) {
        console.error('Root element not found for Calendly popup');
      }
    }
  }, [isOpen]);

  const rootElement = typeof document !== 'undefined' ? document.getElementById('root') : null;

  if (!rootElement) {
    return null;
  }

  return (
    <PopupModal
      url={url}
      open={isOpen}
      onModalClose={onClose}
      rootElement={rootElement}
    />
  );
}
