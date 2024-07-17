'use client';

import React, { useEffect, useState } from 'react';
import { toggleDarkMode, applyTheme } from '../../../../utils/themeUtils';
import ToggleSwitch from '../../atoms/ToggleSwitch/ToggleSwitch';
import styles from './ThemeToggle.module.css';

const ThemeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    applyTheme();
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    }
  }, []);

  const handleToggle = () => {
    toggleDarkMode();
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={styles.themeToggle}>
      <ToggleSwitch checked={isDarkMode} onChange={handleToggle} />
    </div>
  );
};

export default ThemeToggle;
