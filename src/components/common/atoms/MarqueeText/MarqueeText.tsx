import React from 'react';
import styles from './MarqueeText.module.css';

interface MarqueeTextProps {
  text: string;
  animationDuration?: string; // アニメーションの時間を指定するプロパティを追加
}

const MarqueeText: React.FC<MarqueeTextProps> = ({
  text,
  animationDuration = '60s',
}) => {
  return (
    <div className={styles.marqueeContainer}>
      <div className={styles.marquee} style={{ animationDuration }}>
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </div>
  );
};

export default MarqueeText;
