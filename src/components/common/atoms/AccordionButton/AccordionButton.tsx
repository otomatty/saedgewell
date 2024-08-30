import React from 'react';
import styles from './AccordionButton.module.css';
import { FaChevronDown } from 'react-icons/fa';

interface AccordionButtonProps {
  isToggled: boolean;
  onToggle: () => void;
  className?: string; // 親コンポーネントからクラス名を渡せるようにする
}

const AccordionButton: React.FC<AccordionButtonProps> = ({
  isToggled,
  onToggle,
  className,
}) => {
  return (
    <button
      className={`${styles.accordionButton} ${isToggled ? styles.active : ''} ${className}`}
      onClick={onToggle}
    >
      <div className={styles.iconContainer}>
        <FaChevronDown />
      </div>
      {isToggled ? '閉じる' : 'さらに詳しく'}
    </button>
  );
};

export default AccordionButton;
