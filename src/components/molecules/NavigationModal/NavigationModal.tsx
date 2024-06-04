import React from 'react';
import styles from './NavigationModal.module.css';

interface NavigationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavigationModal: React.FC<NavigationModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <nav className={styles.menu}>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/service">Service</a>
            </li>
            <li>
              <a href="/dashboard">Dashboard</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </nav>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
};

export default NavigationModal;
