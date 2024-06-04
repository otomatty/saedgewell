import React from "react";
import styles from "./Header.module.css";
import Logo from "../../atoms/Logo/Logo";
import Button from "../../atoms/Button/Button";
import NavigationMenu from "../NavigationMenu/NavigationMenu";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <Button label="無料相談予約" onClick={() => alert("無料相談予約")} />
      <NavigationMenu />
    </header>
  );
};

export default Header;
