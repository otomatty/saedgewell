export const generateRandomOffset = () => {
  const offset = 50;
  const x = (Math.random() - 0.5) * offset;
  const y = (Math.random() - 0.5) * offset;
  return { x, y };
};

export const calculateInitialPositions = (width: number, height: number) => {
  const breakpoints = [
    { size: 2200, marginMultiplier: 7 },
    { size: 2000, marginMultiplier: 5.5 },
    { size: 1800, marginMultiplier: 5 },
    { size: 1600, marginMultiplier: 4.5 },
    { size: 1500, marginMultiplier: 4.2 },
    { size: 1400, marginMultiplier: 4 },
    { size: 1200, marginMultiplier: 3.5 },
    { size: 1000, marginMultiplier: 3 },
    { size: 800, marginMultiplier: 2.5 },
    { size: 600, marginMultiplier: 2 },
    { size: 400, marginMultiplier: 1.5 },
  ];

  const margin = Math.min(width, height) / 8; // 画面サイズに応じたマージンを計算

  let limitedWidth = width - margin;
  let limitedHeight = height - margin * 6;

  for (const breakpoint of breakpoints) {
    if (width > breakpoint.size) {
      limitedWidth = width - margin * breakpoint.marginMultiplier;
      limitedHeight = height - margin * (7 - breakpoint.marginMultiplier);
      break;
    }
  }

  return [
    { x: margin / 2, y: margin / 2 }, // 左上の頂点をより左上に移動
    { x: limitedWidth + margin, y: margin },
    { x: limitedWidth + margin, y: limitedHeight + margin },
    { x: margin, y: limitedHeight + margin * 1.5 }, // 右下の頂点をより右下に移動
  ];
};

export const clampPosition = (
  pos: { x: number; y: number },
  initialPos: { x: number; y: number }
) => {
  const radius = 50;
  const dx = pos.x - initialPos.x;
  const dy = pos.y - initialPos.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance > radius) {
    const factor = radius / distance;
    return {
      x: initialPos.x + dx * factor,
      y: initialPos.y + dy * factor,
    };
  }
  return pos;
};

export const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

export const getPolygonPointsForScreenSize = (
  width: number,
  height: number
) => {
  if (width > 1920) {
    return [
      { x: 100, y: 200 }, // 左上の頂点をより左上に移動
      { x: 1420, y: 300 },
      { x: 1420, y: 1380 },
      { x: 350, y: 1280 }, // 右下の頂点をより右下に移動
    ];
  } else if (width > 1400) {
    return [
      { x: 100, y: 100 }, // 左上
      { x: 1080, y: 260 }, //右上
      { x: 1280, y: 1230 }, //右下
      { x: 300, y: 930 }, // 左下
    ];
  } else if (width > 1280) {
    return [
      { x: 100, y: 100 }, // 左上
      { x: 1080, y: 260 }, //右上
      { x: 1280, y: 1230 }, //右下
      { x: 300, y: 930 }, // 左下
    ];
  } else if (width > 992) {
    return [
      { x: 50, y: 0 }, // 左上の頂点をより左上に移動
      { x: 920, y: 60 },
      { x: 1060, y: 1000 },
      { x: 200, y: 880 }, // 右下の頂点をより右下に移動
    ];
  } else if (width > 768) {
    return [
      { x: 50, y: 10 }, // 左上の頂点をより左上に移動
      { x: 760, y: 80 },
      { x: 860, y: 740 },
      { x: 200, y: 680 }, // 右下の頂点をより右下に移動
    ];
  } else if (width > 576) {
    return [
      { x: 50, y: 10 }, // 左上の頂点をより左上に移動
      { x: 760, y: 100 },
      { x: 860, y: 720 },
      { x: 200, y: 580 }, // 右下の頂点をより右下に移動
    ];
  } else {
    return [
      { x: 50, y: 10 }, // 左上の頂点をより左上に移動
      { x: 620, y: 160 },
      { x: 580, y: 780 },
      { x: 80, y: 580 }, // 右下の頂点をより右下に移動
    ];
  }
};
