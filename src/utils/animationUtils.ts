export const generateRandomOffset = () => {
  const offset = 50;
  const x = (Math.random() - 0.5) * offset;
  const y = (Math.random() - 0.5) * offset;
  return { x, y };
};

export const calculateInitialPositions = (width: number, height: number) => {
  const maxDimension = 800;
  const limitedWidth = Math.min(width, maxDimension);
  const limitedHeight = Math.min(height, maxDimension);

  return [
    { x: limitedWidth / 4, y: limitedHeight / 4 },
    { x: (limitedWidth * 3) / 4, y: limitedHeight / 3 },
    { x: (limitedWidth * 2.5) / 4, y: (limitedHeight * 3) / 4 },
    { x: limitedWidth / 5, y: (limitedHeight * 2.5) / 4 },
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
