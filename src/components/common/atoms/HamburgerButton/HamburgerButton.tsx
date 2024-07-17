import React from 'react';
import { motion } from 'framer-motion';
import styles from './HamburgerButton.module.css';

export type HamburgerButtonProps = {
  onClick: () => void;
};

const HamburgerButton: React.FC<HamburgerButtonProps> = ({ onClick }) => {
  return (
    <motion.button
      className={styles.hamburgerButton}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
    >
      <div className={styles.bentoIcon}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <span className={styles.menuText}>メニュー</span>
    </motion.button>
  );
};

export default HamburgerButton;
