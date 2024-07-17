import React, { useState } from 'react';
import NavigationList from '../../molecules/NavigationList/NavigationList';
import NavigationModal from '../../molecules/NavigationModal/NavigationModal';
import HamburgerButton from '../../atoms/HamburgerButton/HamburgerButton';
import styles from './NavigationMenu.module.css';

const NavigationMenu: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className={styles.navigationMenu}>
      <HamburgerButton onClick={toggleModal} />
      <NavigationModal isOpen={isModalOpen} onClose={toggleModal} />
      <NavigationList />
    </div>
  );
};

export default NavigationMenu;
