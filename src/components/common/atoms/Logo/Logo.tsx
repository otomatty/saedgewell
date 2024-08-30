'use client';

import React from 'react';
import Image from 'next/image';
import styles from './Logo.module.css';

interface LogoProps {
  as?: 'h1' | 'div';
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = ({
  as: Component = 'div',
  width = 120,
  height = 40,
}) => {
  return (
    <Component className={styles.logo}>
      <Image
        className={styles.logo}
        src={'./images/saedgewell_logo.svg'}
        alt="Logo"
        width={width}
        height={height}
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
