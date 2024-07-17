import React, { useEffect } from 'react';
import styles from './NavigationModal.module.css';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import BackgroundAnimation from '../../atoms/BackgroudAnimation/BackgroundAnimation';

interface NavigationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavigationModal: React.FC<NavigationModalProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
      document.documentElement.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
      document.documentElement.classList.remove('no-scroll');
    }

    // クリーンアップ関数
    return () => {
      document.body.classList.remove('no-scroll');
      document.documentElement.classList.remove('no-scroll');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.leftPane}>
          <BackgroundAnimation />
        </div>
        <div className={styles.rightPane}>
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
          <ThemeToggle />
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavigationModal;
