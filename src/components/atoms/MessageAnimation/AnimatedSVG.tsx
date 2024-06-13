import React from "react";
import { motion } from "framer-motion";

interface AnimatedSVGProps {
  positions: { x: number; y: number }[];
  labels: string[];
  subLabels: string[]; // サブラベルを追加
  fontSize: number;
}

const AnimatedSVG: React.FC<AnimatedSVGProps> = ({
  positions,
  labels,
  subLabels, // サブラベルを追加
  fontSize,
}) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${window.innerWidth} ${window.innerHeight}`}
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#465945", stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: "#7B8D42", stopOpacity: 1 }}
          />
        </linearGradient>
        <filter id="dropshadow" height="130%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
          <feOffset dx="2" dy="2" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.5" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode in="offsetblur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap');
            .label {
              font-family: 'Noto Sans JP', sans-serif;
              fill: #333;
              font-weight: bold;
            }
            .subLabel {
              font-family: 'Noto Sans JP', sans-serif;
              fill: #333;
              font-weight: bold;
            }
          `}
        </style>
      </defs>
      <motion.polygon
        points={positions.map((pos) => `${pos.x},${pos.y}`).join(" ")}
        fill="none"
        stroke="url(#gradient)"
        strokeWidth="8"
        animate={{
          points: positions.map((pos) => `${pos.x},${pos.y}`).join(" "),
        }}
        transition={{ duration: 2 }}
      />
      <motion.line
        x1={positions[0].x}
        y1={positions[0].y}
        x2={positions[2].x}
        y2={positions[2].y}
        stroke="url(#gradient)"
        strokeWidth="8"
        animate={{
          x1: positions[0].x,
          y1: positions[0].y,
          x2: positions[2].x,
          y2: positions[2].y,
        }}
        transition={{ duration: 2 }}
      />
      <motion.line
        x1={positions[1].x}
        y1={positions[1].y}
        x2={positions[3].x}
        y2={positions[3].y}
        stroke="url(#gradient)"
        strokeWidth="8"
        animate={{
          x1: positions[1].x,
          y1: positions[1].y,
          x2: positions[3].x,
          y2: positions[3].y,
        }}
        transition={{ duration: 2 }}
      />
      {positions.map((pos, index) => {
        const label = labels[index];
        const subLabel = subLabels[index]; // サブラベルを取得
        const textLength = label.length;
        const radius = fontSize * textLength * 0.4;
        return (
          <motion.g
            key={index}
            initial={{ x: pos.x, y: pos.y }}
            animate={{ x: pos.x, y: pos.y }}
            transition={{ duration: 2 }}
          >
            <motion.circle
              cx={0}
              cy={0}
              r={radius}
              fill="#FFFFF0"
              stroke="url(#gradient)"
              strokeWidth="8"
              filter="url(#dropshadow)"
            />
            <motion.text
              x={0}
              y={-fontSize / 4} // テキストの位置を調整
              textAnchor="middle"
              alignmentBaseline="middle"
              className="label"
              fontSize={fontSize}
            >
              {label}
            </motion.text>
            <motion.text
              x={0}
              y={fontSize / 1.2} // サブラベルの位置を調整
              textAnchor="middle"
              alignmentBaseline="middle"
              className="subLabel"
              fontSize={fontSize * 0.6} // サブラベルのフォントサイズを調整
            >
              {subLabel}
            </motion.text>
          </motion.g>
        );
      })}
    </svg>
  );
};

export default AnimatedSVG;
