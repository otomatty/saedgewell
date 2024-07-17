'use client';

import React, { useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import styles from './WorksSlider.module.css';

interface WorksSliderProps {
  isInView: boolean;
  currentBarIndex: number;
  setCurrentBarIndex: React.Dispatch<React.SetStateAction<number>>;
  scrollToBar: (index: number) => void;
}

const WorksSlider: React.FC<WorksSliderProps> = ({
  isInView,
  currentBarIndex,
  setCurrentBarIndex,
  scrollToBar,
}) => {
  useEffect(() => {
    const bars = document.querySelectorAll(`.${styles.bar}`);
    bars.forEach((bar, index) => {
      const barElement = bar as HTMLElement;
      const circle = barElement.querySelector(
        `.${styles.circle}`
      ) as HTMLElement;
      if (index === currentBarIndex) {
        barElement.classList.add(styles.active);
        barElement.style.transform = 'translateY(-10%)'; // 動く距離を小さくする
        barElement.style.backgroundColor = 'var(--accent-color)';
        if (circle) {
          circle.style.opacity = '1';
        }
      } else {
        barElement.classList.remove(styles.active);
        barElement.style.transform = 'translateY(0)';
        barElement.style.backgroundColor = 'var(--secondary-color)';
        if (circle) {
          circle.style.opacity = '0';
        }
      }
    });
  }, [currentBarIndex]);

  const handlePrevClick = () => {
    setCurrentBarIndex((prevIndex: number) => {
      const newIndex = prevIndex > 0 ? prevIndex - 1 : prevIndex;
      scrollToBar(newIndex);
      return newIndex;
    });
  };

  const handleNextClick = () => {
    setCurrentBarIndex((prevIndex: number) => {
      const newIndex = prevIndex < 4 ? prevIndex + 1 : prevIndex;
      scrollToBar(newIndex);
      return newIndex;
    });
  };

  const handleBarClick = (index: number) => {
    scrollToBar(index);
    setCurrentBarIndex(index);
  };

  return (
    <div className={styles.sectionContent}>
      <div className={styles.worksHeader}>
        <h2 className={styles.worksTitle}>事業実績</h2>
      </div>
      <div className={styles.navigationWrapper}>
        <div
          className={`${styles.barsContainer} ${isInView ? styles.sticky : ''}`}
        >
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className={styles.bar}
              onClick={() => handleBarClick(index)}
            >
              <div className={styles.circle}></div>
            </div>
          ))}
        </div>
        <div className={styles.arrows}>
          <button onClick={handlePrevClick} className={styles.arrow}>
            <FaArrowLeft />
          </button>
          <button onClick={handleNextClick} className={styles.arrow}>
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorksSlider;
