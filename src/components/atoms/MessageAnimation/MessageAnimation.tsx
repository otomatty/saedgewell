import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  generateRandomOffset,
  calculateInitialPositions,
  clampPosition,
  clamp,
} from "../../../utils/animationUtils";
import AnimatedSVG from "./AnimatedSVG";
import styles from "./MessageAnimation.module.css";

const MessageAnimation: React.FC = () => {
  const initialPositions = useRef(
    calculateInitialPositions(window.innerWidth, window.innerHeight)
  ).current;
  const [positions, setPositions] = useState(initialPositions);
  const labels = ["Marketing", "Mentoring", "Development", "Design"];
  const subLabels = ["マーケティング", "人材育成", "制作・開発", "デザイン"]; // サブラベルを追加

  const updatePositions = useCallback(() => {
    setPositions((prevPositions) => {
      return prevPositions.map((pos, i) => {
        const offset = generateRandomOffset();
        const newPos = { x: pos.x + offset.x, y: pos.y + offset.y };
        return clampPosition(newPos, initialPositions[i]);
      });
    });
  }, [initialPositions]);

  useEffect(() => {
    const interval = setInterval(updatePositions, 2000); // 2秒ごとに位置を更新
    return () => clearInterval(interval);
  }, [updatePositions]);

  const fontSize = clamp(window.innerWidth / 50, 16, 24); // 画面サイズに応じてフォントサイズを調整

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
