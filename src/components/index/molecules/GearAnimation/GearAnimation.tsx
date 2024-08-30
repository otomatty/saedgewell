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

const GearAnimation: React.FC<{
  scrollRatio: number;
  scrollDirection: 'up' | 'down';
}> = ({ scrollRatio, scrollDirection }) => {
  const [numberToDisplay, setNumberToDisplay] = useState('');
  const [prevScrollRatio, setPrevScrollRatio] = useState(scrollRatio);
  const sectionRef = useRef<HTMLDivElement>(null);
  const countBoxRef = useRef<HTMLDivElement>(null);

  const getNumberToDisplay = () => {
    if (scrollRatio < 1 || scrollRatio > 4) {
      return '';
    }
    if (scrollRatio < 2) {
      return '01';
    }
    if (scrollRatio < 3) {
      return '02';
    }
    if (scrollRatio < 4) {
      return '03';
    }
    return '';
  };

  // 回転角度を計算
  const calculateRotationAngle = (index: number) => {
    const baseAngle =
      scrollDirection === 'down' ? scrollRatio * 360 : -scrollRatio * 360;
    // 特定のギア（例えば、gear3とgear5）の回転方向を反転
    if (index === 2 || index === 4) {
      return -baseAngle;
    }
    return baseAngle;
  };

  const newNumberToDisplay = getNumberToDisplay();

  useEffect(() => {
    if (newNumberToDisplay !== numberToDisplay) {
      const outClass =
        scrollDirection === 'down' ? styles.slideOutDown : styles.slideOutUp;
      const inClass =
        scrollDirection === 'down' ? styles.slideInDown : styles.slideInUp;

      if (countBoxRef.current) {
        countBoxRef.current.classList.add(outClass);
      }

      setTimeout(() => {
        setNumberToDisplay(newNumberToDisplay);
        if (countBoxRef.current) {
          countBoxRef.current.classList.remove(outClass);
          countBoxRef.current.classList.add(inClass);
        }

        // アニメーションが終了した後にクラスを削除
        setTimeout(() => {
          if (countBoxRef.current) {
            countBoxRef.current.classList.remove(inClass);
          }
        }, 500); // スライドインのアニメーションの時間に合わせて調整
      }, 500); // スライドアウトのアニメーションの時間に合わせて調整
    }
  }, [newNumberToDisplay, numberToDisplay, scrollDirection]);

  useEffect(() => {
    setPrevScrollRatio(scrollRatio);
  }, [scrollRatio]);

  return (
    <div ref={sectionRef} className={styles.gearContainer}>
      <div className={styles.outerCircle}>
        <div className={styles.innerCircle}>
          {gears.map((gear, index) => (
            <Image
              key={index}
              src={gear}
              alt={`Gear ${index + 1}`}
              className={`${styles.gear} ${styles[`gear${index + 1}`]}`}
              style={{
                transform: `rotate(${calculateRotationAngle(index)}deg)`,
              }}
            />
          ))}
        </div>
        <div className={styles.smallCircle}>
          <div ref={countBoxRef} className={styles.countBox}>
            {numberToDisplay && (
              <>
                <span className={styles.reasonText}>REASON</span>
                <span className={styles.numberText}>{numberToDisplay}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GearAnimation;
