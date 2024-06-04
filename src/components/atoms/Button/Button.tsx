import React from "react";
import { motion } from "framer-motion";
import styles from "./Button.module.css";

export type ButtonProps = {
  label: string;
  onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
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
