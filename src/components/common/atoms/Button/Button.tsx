import React from 'react';
import { motion } from 'framer-motion';
import styles from './Button.module.css';

export type ButtonProps = {
  label: string;
  onClick: () => void;
  hidden?: boolean; // hidden property added
};

const Button: React.FC<ButtonProps> = ({ label, onClick, hidden }) => {
  if (hidden) {
    return null; // If hidden is true, do not render the button
  }

  return (
    <motion.button
      className={styles.button}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
    >
      {label}
    </motion.button>
  );
};

export default Button;
