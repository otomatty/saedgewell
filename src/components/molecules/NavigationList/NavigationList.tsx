import React, { useState, useEffect, useCallback, useRef } from "react";
import styles from "./NavigationList.module.css";

const NavigationList: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    if (window.scrollY > lastScrollY.current) {
      // 下にスクロール
      setIsVisible(false);
    } else {
      // 上にスクロール
      setIsVisible(true);
    }
    lastScrollY.current = window.scrollY;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <nav
      className={`${styles.menu} ${isVisible ? styles.visible : styles.hidden}`}
    >
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
  );
};

export default NavigationList;
