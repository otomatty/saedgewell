'use client';

import React, { useEffect, useState, useRef } from 'react';
import styles from './GearAnimation.module.css';
import Image from 'next/image';
import gear1 from './../../../../../public/images/gear1.svg';
import gear2 from './../../../../../public/images/gear2.svg';
import gear3 from './../../../../../public/images/gear3.svg';
import gear4 from './../../../../../public/images/gear4.svg';
import gear5 from './../../../../../public/images/gear5.svg';
import gear6 from './../../../../../public/images/gear6.svg';
import gear7 from './../../../../../public/images/gear7.svg';

const gears = [gear1, gear2, gear3, gear4, gear5, gear6, gear7];

const GearAnimation: React.FC<{ sectionHeight: number }> = ({
  sectionHeight,
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [prevScrollPosition, setPrevScrollPosition] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);

      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const inView = rect.top >= 0 && rect.bottom <= window.innerHeight;
        setIsInView(inView);
        console.log('Section In View:', inView); // セクションが表示されているかをコンソールに表示
      }

      setPrevScrollPosition(scrollPosition);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPosition]);

  const getNumberToDisplay = () => {
    if (!isInView) return '';

    const scrollRatio =
      (scrollPosition - sectionRef.current!.offsetTop) / sectionHeight - 2;

    if (scrollRatio < 0.2 || scrollRatio > 0.8) {
      return '';
    }
    if (scrollRatio < 0.4) {
      return '01';
    }
    if (scrollRatio < 0.6) {
      return '02';
    }
    if (scrollRatio < 0.8) {
      return '03';
    }
    return '';
  };

  const numberToDisplay = getNumberToDisplay();
  const scrollDirection = scrollPosition > prevScrollPosition ? 'down' : 'up';

  // 回転角度を計算
  const rotationAngle = scrollPosition % 360;

  // ランダムな位置を生成
  const generateRandomPosition = () => {
    const top = Math.random() * 80 + 10; // 10% から 90% の間
    const left = Math.random() * 80 + 10; // 10% から 90% の間
    return { top: `${top}%`, left: `${left}%` };
  };

  return (
    <div ref={sectionRef} className={styles.gearContainer}>
      <div className={styles.outerCircle}>
        <div className={styles.innerCircle}>
          {gears.map((gear, index) => {
            const position = generateRandomPosition();
            return (
              <Image
                key={index}
                src={gear}
                alt={`Gear ${index + 1}`}
                className={styles.gear}
                style={{
                  transform: `rotate(${rotationAngle}deg)`,
                  top: position.top,
                  left: position.left,
                }}
              />
            );
          })}
        </div>
        <div className={styles.smallCircle}>
          {numberToDisplay && (
            <span className={`${styles.reasonText} ${styles[scrollDirection]}`}>
              REASON
            </span>
          )}
          <span className={`${styles.numberText} ${styles[scrollDirection]}`}>
            {numberToDisplay}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GearAnimation;
