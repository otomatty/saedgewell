'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './Features.module.css';
import GearAnimation from '../../molecules/GearAnimation/GearAnimation';

const Features: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [sectionHeight, setSectionHeight] = useState(0);

  useEffect(() => {
    if (sectionRef.current) {
      setSectionHeight(sectionRef.current.offsetHeight);
    }
  }, []);

  return (
    <section ref={sectionRef} className={styles.featuresSection}>
      <div className={styles.sectionInner}>
        <GearAnimation sectionHeight={sectionHeight} />
        <div className={styles.textContainer}>
          <p>高性能</p>
          <p>使いやすさ</p>
          <p>信頼性</p>
        </div>
      </div>
    </section>
  );
};

export default Features;
