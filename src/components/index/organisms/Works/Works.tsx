'use client';

import React, { useEffect, useRef, useState } from 'react';
import WorksSlider from '../../molecules/WorksSlider/WorksSlider';
import WorksStats from '../../molecules/WorksStats/WorksStats';
import styles from './Works.module.css';

const Works: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [currentBarIndex, setCurrentBarIndex] = useState<number>(-1); // 初期状態でどのバーもアクティブにしない

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 1.0 } // セクションが完全に表示されているかを監視
    );

    const currentSectionRef = sectionRef.current; // 変数にコピー

    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const sectionTop = sectionRef.current.getBoundingClientRect().top;
        const sectionHeight = sectionRef.current.offsetHeight;

        if (sectionTop <= 0 && sectionTop > -sectionHeight) {
          const scrollPosition = -sectionTop;
          const sectionProgress = scrollPosition / sectionHeight;
          const newBarIndex = Math.floor(sectionProgress * 8); // 8等分に変更
          const validBarIndex =
            newBarIndex >= 1 && newBarIndex <= 6 ? newBarIndex - 1 : -1; // 1番目と8番目の部分ではどのバーもアクティブ状態にならない

          if (validBarIndex !== currentBarIndex) {
            setCurrentBarIndex(validBarIndex);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentBarIndex]);

  const scrollToBar = (index: number) => {
    const sectionHeight = sectionRef.current?.offsetHeight || 0;
    const targetPosition = (index + 1) * (sectionHeight / 8); // セクションの8等分の位置にスクロール
    const sectionTop = sectionRef.current?.getBoundingClientRect().top || 0;
    const scrollY = window.scrollY + sectionTop + targetPosition;
    window.scrollTo({ top: scrollY, behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} className={styles.worksSection}>
      <div className={styles.sectionInner}>
        <WorksSlider
          isInView={isInView}
          currentBarIndex={currentBarIndex}
          setCurrentBarIndex={setCurrentBarIndex}
          scrollToBar={scrollToBar}
        />
        <WorksStats />
      </div>
    </section>
  );
};

export default Works;
