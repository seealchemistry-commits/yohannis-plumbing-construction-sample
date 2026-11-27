export type ParallaxOffset = ['start start' | 'start end', 'end start'];

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function computeParallaxTranslateY({
  rectTop,
  rectHeight,
  viewportHeight,
  range,
  offset,
}: {
  rectTop: number;
  rectHeight: number;
  viewportHeight: number;
  range: readonly [number, number];
  offset: ParallaxOffset;
}): number {
  const [startAnchor] = offset;
  let progress = 0;

  if (startAnchor === 'start start') {
    progress = clamp(-rectTop / Math.max(rectHeight, 1), 0, 1);
  } else {
    progress = clamp(
      (viewportHeight - rectTop) / Math.max(viewportHeight + rectHeight, 1),
      0,
      1
    );
  }

  return range[0] + (range[1] - range[0]) * progress;
}
