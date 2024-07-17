import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './Logo.module.css';

interface LogoProps {
  as?: keyof JSX.IntrinsicElements;
}

const Logo: React.FC<LogoProps> = ({ as: Component = 'div' }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleThemeChange = () => {
      setIsDarkMode(document.body.classList.contains('dark-mode'));
    };

    handleThemeChange(); // 初期状態をチェック
    window.addEventListener('storage', handleThemeChange); // ローカルストレージの変化を監視

    return () => {
      window.removeEventListener('storage', handleThemeChange);
    };
  }, []);

  return (
    <Component className={styles.logo}>
      <Image
        className={styles.logo}
        src={'./images/saedgewell_logo.svg'}
        alt="Logo"
        width={260}
        height={60}
        sizes="100vw"
        priority
        style={{
          width: '100%',
          height: 'auto',
        }}
      />
    </Component>
  );
};

export default Logo;
