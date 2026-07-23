export const CINEMATIC_BAR_HEIGHT = 144;
export const DOG_BASE_WIDTH = 1440;
export const DOG_BASE_HEIGHT = 1424;

const DOG_KEYS = [
  { frame: 0, x: 1470, y: 300, scaleX: 0.16, scaleY: 0.16, rotate: -2 },
  { frame: 3, x: 1380, y: 270, scaleX: 0.25, scaleY: 0.25, rotate: -1.5 },
  { frame: 5, x: 1210, y: 225, scaleX: 0.42, scaleY: 0.42, rotate: -1 },
  { frame: 7, x: 1030, y: 185, scaleX: 0.58, scaleY: 0.58, rotate: -0.7 },
  { frame: 9, x: 904, y: 168, scaleX: 0.69, scaleY: 0.69, rotate: -0.4 },
  { frame: 27, x: 880, y: 160, scaleX: 0.72, scaleY: 0.72, rotate: 0.2 },
  { frame: 45, x: 836, y: 140, scaleX: 0.77, scaleY: 0.77, rotate: -0.5 },
  { frame: 63, x: 788, y: 124, scaleX: 0.815, scaleY: 0.815, rotate: 0.35 },
  { frame: 81, x: 760, y: 124, scaleX: 0.825, scaleY: 0.825, rotate: -0.5 },
  { frame: 89, x: 540, y: -40, scaleX: 1.22, scaleY: 1.1, rotate: -2.2 },
];

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const mix = (start, end, progress) => start + (end - start) * progress;
const smoothstep = (value) => value * value * (3 - 2 * value);
const easeInCubic = (value) => value ** 3;

const segmentProgress = (frame, start, end) =>
  clamp((frame - start) / (end - start), 0, 1);

const interpolateDog = (frame) => {
  const index = DOG_KEYS.findIndex((key) => frame <= key.frame);
  if (index <= 0) return { ...DOG_KEYS[0] };
  if (index === -1) return { ...DOG_KEYS.at(-1) };

  const start = DOG_KEYS[index - 1];
  const end = DOG_KEYS[index];
  const linear = segmentProgress(frame, start.frame, end.frame);
  const progress = end.frame === 89 ? easeInCubic(linear) : smoothstep(linear);

  return {
    frame,
    x: mix(start.x, end.x, progress),
    y: mix(start.y, end.y, progress),
    scaleX: mix(start.scaleX, end.scaleX, progress),
    scaleY: mix(start.scaleY, end.scaleY, progress),
    rotate: mix(start.rotate, end.rotate, progress),
  };
};

export const getReferenceTime = (frame) =>
  Number((22.25 + frame / 36).toFixed(6));

export function getSceneState(frame) {
  const dog = interpolateDog(frame);
  const pressure = segmentProgress(frame, 63, 89);
  const finalRush = segmentProgress(frame, 81, 89);
  const middleMotion = frame >= 27 && frame < 81
    ? Math.sin(((frame - 27) * Math.PI) / 6)
    : 0;

  dog.x += middleMotion * 7;
  dog.y += Math.abs(middleMotion) * 3;
  dog.rotate += middleMotion * 0.55;
  dog.scaleX += Math.max(0, middleMotion) * 0.008;
  dog.blur = Number((easeInCubic(finalRush) * 8.5).toFixed(3));

  const shakeStrength = finalRush * 18;
  const claude = pressure === 0
    ? { x: 0, y: 0, rotate: -4, scaleX: 1, scaleY: 1, blur: 0 }
    : {
      x: -pressure * 28 + Math.sin(frame * 2.2) * pressure * 7,
      y: pressure * 12 + Math.cos(frame * 2.6) * pressure * 4,
      rotate: -4 - pressure * 2 + Math.sin(frame * 2.05) * pressure * 0.8,
      scaleX: 1 - pressure * 0.06,
      scaleY: 1 + pressure * 0.025,
      blur: pressure * 1.2,
    };

  return {
    portalOpacity: Number((1 - segmentProgress(frame, 0, 10)).toFixed(6)),
    dog,
    claude,
    shake: {
      x: Math.sin(frame * 2.17) * shakeStrength,
      y: Math.cos(frame * 2.41) * shakeStrength * 0.72,
      rotate: Math.sin(frame * 1.73) * finalRush * 0.7,
    },
  };
}
