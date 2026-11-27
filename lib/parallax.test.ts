import assert from 'node:assert/strict';
import test from 'node:test';
import { computeParallaxTranslateY } from './parallax';

test('start-start parallax interpolates from range[0] to range[1] across section scroll', () => {
  assert.equal(
    computeParallaxTranslateY({
      rectTop: 0,
      rectHeight: 800,
      viewportHeight: 900,
      range: [0, 32],
      offset: ['start start', 'end start'],
    }),
    0
  );

  assert.equal(
    computeParallaxTranslateY({
      rectTop: -400,
      rectHeight: 800,
      viewportHeight: 900,
      range: [0, 32],
      offset: ['start start', 'end start'],
    }),
    16
  );

  assert.equal(
    computeParallaxTranslateY({
      rectTop: -800,
      rectHeight: 800,
      viewportHeight: 900,
      range: [0, 32],
      offset: ['start start', 'end start'],
    }),
    32
  );
});

test('start-end parallax centers at 0 when symmetric range passes mid-viewport', () => {
  assert.equal(
    computeParallaxTranslateY({
      rectTop: 900,
      rectHeight: 500,
      viewportHeight: 900,
      range: [-22, 22],
      offset: ['start end', 'end start'],
    }),
    -22
  );

  assert.equal(
    computeParallaxTranslateY({
      rectTop: 200,
      rectHeight: 500,
      viewportHeight: 900,
      range: [-22, 22],
      offset: ['start end', 'end start'],
    }),
    0
  );

  assert.equal(
    computeParallaxTranslateY({
      rectTop: -500,
      rectHeight: 500,
      viewportHeight: 900,
      range: [-22, 22],
      offset: ['start end', 'end start'],
    }),
    22
  );
});
