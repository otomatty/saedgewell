import React from 'react';
import { motion } from 'framer-motion';
import { getPolygonPointsForScreenSize } from '../../../../utils/animationUtils'; // getPolygonPointsForScreenSizeをインポート

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
  if (positions.length === 0) {
    return null; // positionsが空の場合は何も描画しない
  }

  // SVGの中央に表示するためのオフセットを計算
  const offsetX = window.innerWidth / 10;
  const offsetY = window.innerHeight / 10;

  // 画面サイズに応じたポリゴンの形を取得
  const polygonPoints = getPolygonPointsForScreenSize(
    window.innerWidth,
    window.innerHeight
  );

  // polygonPointsが正しく初期化されているか確認
  if (!polygonPoints || polygonPoints.length === 0) {
    return null; // polygonPointsが空の場合は何も描画しない
  }

  // viewBoxの幅と高さを動的に計算
  let viewBoxWidth = window.innerWidth + 800; // デフォルトの幅
  let viewBoxHeight = window.innerHeight + 500; // デフォルトの高さ

  // 画面サイズが768pxより大きい場合
  if (window.innerWidth >= 768) {
    viewBoxWidth = window.innerWidth + 800;
    viewBoxHeight = window.innerHeight + 500;
  }

  // 画面サイズが1024pxより大きい場合
  if (window.innerWidth >= 1024) {
    viewBoxWidth = window.innerWidth + 400;
    viewBoxHeight = window.innerHeight + 1400;
  }

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`-200 -200 ${viewBoxWidth} ${viewBoxHeight}`} // 動的に計算したviewBoxを設定
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#465945', stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: '#7B8D42', stopOpacity: 1 }}
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
              fill: #1d1d1f;
              font-weight: 800; /* フォントを太字に設定 */
            }
            .subLabel {
              font-family: 'Noto Sans JP', sans-serif;
              fill: #1d1d1f;
              font-weight: bold; /* フォントを太字に設定 */
            }
          `}
        </style>
      </defs>
      <motion.polygon
        points={polygonPoints
          .map((pos) => `${pos.x + offsetX},${pos.y + offsetY}`)
          .join(' ')}
        fill="none"
        stroke="url(#gradient)"
        strokeWidth="16"
        animate={{
          points: polygonPoints
            .map((pos) => `${pos.x + offsetX},${pos.y + offsetY}`)
            .join(' '),
        }}
        transition={{ duration: 2 }}
      />
      {positions.length > 2 &&
        polygonPoints.length > 3 && ( // polygonPointsの長さを確認
          <>
            <motion.line
              x1={polygonPoints[0].x + offsetX}
              y1={polygonPoints[0].y + offsetY}
              x2={polygonPoints[2].x + offsetX}
              y2={polygonPoints[2].y + offsetY}
              stroke="url(#gradient)"
              strokeWidth="16"
              animate={{
                x1: polygonPoints[0].x + offsetX,
                y1: polygonPoints[0].y + offsetY,
                x2: polygonPoints[2].x + offsetX,
                y2: polygonPoints[2].y + offsetY,
              }}
              transition={{ duration: 2 }}
            />
            <motion.line
              x1={polygonPoints[1].x + offsetX}
              y1={polygonPoints[1].y + offsetY}
              x2={polygonPoints[3].x + offsetX}
              y2={polygonPoints[3].y + offsetY}
              stroke="url(#gradient)"
              strokeWidth="16"
              animate={{
                x1: polygonPoints[1].x + offsetX,
                y1: polygonPoints[1].y + offsetY,
                x2: polygonPoints[3].x + offsetX,
                y2: polygonPoints[3].y + offsetY,
              }}
              transition={{ duration: 2 }}
            />
          </>
        )}
      {positions.map((pos, index) => {
        if (!labels[index] || !subLabels[index]) return null; // labelsまたはsubLabelsが存在しない場合は描画しない
        const label = labels[index];
        const subLabel = subLabels[index]; // サブラベルを取得
        const textLength = label.length;
        const radius = fontSize * textLength * 0.4; // 図形のサイズを調整
        return (
          <motion.g
            key={index}
            initial={{
              x: polygonPoints[index].x + offsetX,
              y: polygonPoints[index].y + offsetY,
            }}
            animate={{
              x: polygonPoints[index].x + offsetX,
              y: polygonPoints[index].y + offsetY,
            }}
            transition={{ duration: 2 }}
          >
            <motion.circle
              cx={0}
              cy={0}
              r={radius} // 円の半径を調整
              fill="#FFFFF0"
              stroke="url(#gradient)"
              strokeWidth="16"
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
