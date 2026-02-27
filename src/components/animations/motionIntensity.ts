export type MotionProfile = {
  multiplier: number;
  hoverScale: number;
  glowOpacity: number;
  blobDuration: number;
  tiltMaxDeg: number;
};

export function getMotionProfile(streak = 0): MotionProfile {
  const normalized = Math.max(0, Math.min(streak, 10));
  const multiplier = 1 + normalized * 0.02;

  return {
    multiplier,
    hoverScale: 1 + 0.025 * multiplier,
    glowOpacity: 0.16 * multiplier,
    blobDuration: Math.max(0.45, 0.7 - normalized * 0.02),
    tiltMaxDeg: Math.min(8, 5 + normalized * 0.3),
  };
}
