import React, { useState } from "react";
import HamburgerButton from "../../atoms/HamburgerButton/HamburgerButton";
import NavigationList from "../../molecules/NavigationList/NavigationList";
import styles from "./NavigationMenu.module.css";

const NavigationMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <HamburgerButton onClick={toggleMenu} />
      {isOpen && <NavigationList />}
    </div>
  );
};

export default NavigationMenu;
