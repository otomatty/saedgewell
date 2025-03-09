'use client';

import React from 'react';
import type { MermaidDiagramProps } from './mermaid-types';
import { useMermaidDiagram } from './useMermaidDiagram';

/**
 * Mermaidダイアグラムを描画するコンポーネント
 * MDXコンテンツ内のmermaidコードブロックを図解として表示します
 */
export function MermaidDiagram({ chart, className = '' }: MermaidDiagramProps) {
  // カスタムフックからロジックを取得
  const {
    mermaidRef,
    diagramContainerRef,
    error,
    isRendered,
    zoomLevel,
    isCollapsed,
    handleZoom,
    resetAll,
    handleMouseDown,
    handleTouchStart,
    setIsCollapsed,
  } = useMermaidDiagram(chart);

  return (
    <div
      className={`mermaid-diagram ${className} ${error ? 'has-error' : ''} mx-auto max-w-[800px] w-full overflow-x-auto py-4`}
      suppressHydrationWarning
      ref={diagramContainerRef}
    >
      {error && (
        <div className="error-message p-2 text-red-500 text-sm bg-red-50 rounded border border-red-200 mb-2">
          {error}
        </div>
      )}

      {/* コントロールバー */}
      {isRendered && (
        <div className="diagram-controls flex flex-col space-y-2 mb-2 border-b pb-2">
          <div className="flex items-center justify-between">
            {/* 折りたたみボタン */}
            <button
              type="button"
              className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded flex items-center"
              onClick={() => setIsCollapsed(!isCollapsed)}
              aria-label={isCollapsed ? '展開' : '折りたたむ'}
            >
              {isCollapsed ? '展開' : '折りたたむ'}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ml-1 transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* ズームコントロール */}
            <div className="zoom-controls flex items-center space-x-2">
              <button
                type="button"
                className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded"
                onClick={() => handleZoom(Math.max(50, zoomLevel - 25))}
                aria-label="縮小"
              >
                -
              </button>
              <button
                type="button"
                className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded"
                onClick={() => handleZoom(Math.min(200, zoomLevel + 25))}
                aria-label="拡大"
              >
                +
              </button>
              <button
                type="button"
                className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded ml-2"
                onClick={resetAll}
                aria-label="リセット"
              >
                リセット
              </button>
            </div>
          </div>

          {/* 操作説明 */}
          <div className="text-xs text-gray-500 flex items-center justify-center flex-wrap">
            <span className="mr-4">
              <span className="font-medium">ズーム:</span> +/- ボタン または
              Ctrl+ホイール/ピンチ操作
            </span>
            <span>
              <span className="font-medium">移動:</span> ダイアグラムをドラッグ
            </span>
          </div>
        </div>
      )}

      {/* ダイアグラム本体 */}
      <div
        ref={mermaidRef}
        className={`mermaid w-full transition-all duration-300 ${isCollapsed ? 'max-h-0 overflow-hidden' : ''}`}
        style={{
          maxHeight: isCollapsed ? '0' : '600px',
          overflow: isCollapsed ? 'hidden' : 'auto',
          transition: 'max-height 0.3s ease-in-out',
          paddingLeft: '0',
          paddingRight: '0',
          position: 'relative',
          touchAction: 'none', // タッチデバイスでのスクロールを防止
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        suppressHydrationWarning
      />
    </div>
  );
}
