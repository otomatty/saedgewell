'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import BackgroundVideo from '../../../common/atoms/BackgroundVideo/BackgroundVideo';
import Catchphrase from '../../molecules/Catchphrase/Catchphrase';
import NavigationList from '@/components/common/molecules/NavigationList/NavigationList';
import styles from './MainVisual.module.css';

const slides = [
  { type: 'video', src: '/videos/fuji.webm' },
  { type: 'image', src: '/images/main-visual1.jpg' },
  { type: 'image', src: '/images/main-visual2.jpg' },
];

const catchphraseTitle = '最小限のリソースから\n最大限の成果を生み出す';
const catchphrases = [
  'Web/クラウドエンジニア',
  'メンター/コーチ',
  'UXデザイナー',
  'Webマーケター',
];

const MainVisual: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false); // Initially set autoplay to false

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAutoPlay) {
      timer = setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000); // Change slides every 5 seconds
    }
    return () => clearTimeout(timer);
  }, [currentSlide, isAutoPlay]);

  const handlePaginationClick = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlay(false); // Stop autoplay when pagination is clicked
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay((prev) => !prev);
  };

  return (
    <section className={styles.mainVisual}>
      <div className={styles.slider}>
        {slides[currentSlide].type === 'image' ? (
          <Image
            src={slides[currentSlide].src}
            alt={`Slide ${currentSlide + 1}`}
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        ) : (
          <BackgroundVideo src={slides[currentSlide].src} />
        )}
        <div className={styles.overlay}>
          {currentSlide === 0 ? (
            <Catchphrase title={catchphraseTitle} catchphrases={catchphrases} />
          ) : (
            <>
              <h1 className={styles.title}>Welcome to Our Website</h1>
              <p className={styles.subtitle}>
                We provide the best services for you
              </p>
            </>
          )}
        </div>
        <div className={styles.paginationWrapper}>
          <div className={styles.pagination}>
            {slides.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${
                  index === currentSlide ? styles.active : ''
                }`}
                onClick={() => handlePaginationClick(index)}
              />
            ))}
          </div>
          <button className={styles.autoPlayButton} onClick={toggleAutoPlay}>
            {isAutoPlay ? (
              <svg viewBox="0 0 24 24">
                <rect x="6" y="4" width="4" height="16" fill="white" />
                <rect x="14" y="4" width="4" height="16" fill="white" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24">
                <polygon points="5,3 19,12 5,21" fill="white" />
              </svg>
            )}
          </button>
        </div>
      </div>
      <div className={styles.navigation}>
        <NavigationList />
      </div>
    </section>
  );
};

export default MainVisual;
