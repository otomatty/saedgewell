'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './Features.module.css';
import GearAnimation from '../../molecules/GearAnimation/GearAnimation';
import featuresData from '../../../../data/Features.json';

interface Feature {
  title: string;
  description: string;
}

interface FeaturesData {
  [key: string]: Feature;
}

const featuresDataTyped: FeaturesData = featuresData;

const Features: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [sectionHeight, setSectionHeight] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [prevScrollPosition, setPrevScrollPosition] = useState(0);
  const [titleToDisplay, setTitleToDisplay] = useState('');
  const [descriptionToDisplay, setDescriptionToDisplay] = useState('');
  const [animationClass, setAnimationClass] = useState('');
  const [scrollRatio, setScrollRatio] = useState(0);
  const [sectionIndex, setSectionIndex] = useState(0);

  useEffect(() => {
    if (sectionRef.current) {
      setSectionHeight(sectionRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);

      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        setIsInView(inView);

        const ratio =
          (position - sectionRef.current.offsetTop) / (sectionHeight / 5);
        setScrollRatio(ratio);

        // セクションの割合からインデックスを設定
        const index = Math.floor(ratio);
        setSectionIndex(index);
      }

      setPrevScrollPosition(scrollPosition);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPosition, sectionHeight]);

  const getTextToDisplay = () => {
    if (!isInView) return { title: '', description: '' };

    const sectionData = featuresDataTyped[sectionIndex.toString()];
    if (sectionData) {
      return {
        title: sectionData.title,
        description: sectionData.description,
      };
    }
    return { title: '', description: '' };
  };

  const { title: newTitleToDisplay, description: newDescriptionToDisplay } =
    getTextToDisplay();
  const scrollDirection = scrollPosition > prevScrollPosition ? 'down' : 'up';

  useEffect(() => {
    if (
      newTitleToDisplay !== titleToDisplay ||
      newDescriptionToDisplay !== descriptionToDisplay
    ) {
      const outClass =
        scrollDirection === 'down' ? styles.slideOutDown : styles.slideOutUp;
      const inClass =
        scrollDirection === 'down' ? styles.slideInDown : styles.slideInUp;
      console.log('Applying out animation class:', outClass);
      setAnimationClass(outClass);
      setTimeout(() => {
        setTitleToDisplay(newTitleToDisplay);
        setDescriptionToDisplay(newDescriptionToDisplay);
        console.log('Applying in animation class:', inClass);
        setAnimationClass(inClass);
      }, 500); // アニメーションの時間に合わせて調整
    }
  }, [
    newTitleToDisplay,
    newDescriptionToDisplay,
    titleToDisplay,
    descriptionToDisplay,
    scrollDirection,
  ]);

  return (
    <section ref={sectionRef} className={styles.featuresSection}>
      <div className={styles.sectionInner}>
        <GearAnimation
          scrollRatio={scrollRatio}
          scrollDirection={scrollDirection}
        />
        <div className={styles.textContainer}>
          <h2>
            Saedgewellが
            <br />
            課題を解決できる
            <br />
            3つの理由
          </h2>
          <div className={`${styles.textWrapper} ${animationClass}`}>
            {titleToDisplay && <h3>{titleToDisplay}</h3>}
            {descriptionToDisplay && (
              <p>
                {descriptionToDisplay.split('\n').map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
