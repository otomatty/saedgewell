'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  generateRandomOffset,
  calculateInitialPositions,
  clampPosition,
  clamp,
} from '../../../../utils/animationUtils';
import AnimatedSVG from '../AnimatedSVG/AnimatedSVG';
import styles from './MessageAnimation.module.css';

const MessageAnimation: React.FC = () => {
  const initialPositions = useRef<{ x: number; y: number }[]>([]);
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);
  const [fontSize, setFontSize] = useState(48); // 初期フォントサイズを設定
  const labels = ['Marketing', 'Mentoring', 'Development', 'Design'];
  const subLabels = ['マーケティング', '人材育成', '制作・開発', 'デザイン']; // サブラベルを追加

  const updatePositions = useCallback(() => {
    setPositions((prevPositions) => {
      return prevPositions.map((pos, i) => {
        const offset = generateRandomOffset();
        const newPos = { x: pos.x + offset.x, y: pos.y + offset.y };
        return clampPosition(newPos, initialPositions.current[i]);
      });
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      initialPositions.current = calculateInitialPositions(
        window.innerWidth,
        window.innerHeight
      );
      setPositions(initialPositions.current);

      // 画面サイズに応じたフォントサイズを計算
      let newFontSize;
      if (window.innerWidth > 1920) {
        newFontSize = clamp(window.innerWidth / 15, 48, 120);
      } else if (window.innerWidth > 1600) {
        newFontSize = clamp(window.innerWidth / 15, 48, 100);
      } else if (window.innerWidth > 1200) {
        newFontSize = clamp(window.innerWidth / 15, 48, 90);
      } else if (window.innerWidth > 992) {
        newFontSize = clamp(window.innerWidth / 10, 48, 90);
      } else if (window.innerWidth > 768) {
        newFontSize = clamp(window.innerWidth / 10, 48, 60);
      } else if (window.innerWidth > 576) {
        newFontSize = clamp(window.innerWidth / 10, 48, 60);
      } else {
        newFontSize = clamp(window.innerWidth / 5, 48, 60);
      }
      setFontSize(newFontSize);
    };

    handleResize(); // 初期位置を計算
    window.addEventListener('resize', handleResize); // リサイズイベントを監視

    const interval = setInterval(updatePositions, 2000); // 2秒ごとに位置を更新
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize); // クリーンアップ
    };
  }, [updatePositions]);

  return (
    <div className={styles.container}>
      <AnimatedSVG
        positions={positions}
        labels={labels}
        subLabels={subLabels}
        fontSize={fontSize}
      />
    </div>
  );
};

export default MessageAnimation;
