export type ProcessPhaseId = "establish" | "assess" | "restore" | "reveal" | "explore";
export type PaintId = "oxblood" | "obsidian" | "champagne" | "pearl";
export type SceneLifecycle = "poster" | "eligible" | "loading" | "ready" | "failed" | "paused";
export type CameraOwnership = "story" | "orbit" | "returning";
export type ViewportTier = "mobile" | "tablet" | "desktop";
export type SequenceDirection = -1 | 1;

export interface CameraPose {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
}

export const processPhases: ReadonlyArray<{
  id: Exclude<ProcessPhaseId, "establish" | "explore">;
  label: string;
  heading: string;
  body: string;
}> = [
  {
    id: "assess",
    label: "Assess",
    heading: "See the whole picture.",
    body: "Document the visible damage, locate the repair area, and define what needs closer review.",
  },
  {
    id: "restore",
    label: "Restore",
    heading: "Bring every line back into order.",
    body: "Panel relationships return in a controlled sequence, with each movement kept deliberately restrained.",
  },
  {
    id: "reveal",
    label: "Reveal",
    heading: "Let the surface tell the truth.",
    body: "Fit, color, and reflected light resolve together before the vehicle enters its final review.",
  },
] as const;

export const paintOptions: ReadonlyArray<{ id: PaintId; label: string; color: string }> = [
  { id: "oxblood", label: "Oxblood", color: "#541118" },
  { id: "obsidian", label: "Obsidian", color: "#0c0d10" },
  { id: "champagne", label: "Champagne", color: "#c7ad7b" },
  { id: "pearl", label: "Pearl", color: "#f2eee6" },
] as const;

export const processSequenceStops = [0, 0.25, 0.5, 0.75, 1] as const;

const keyframes: ReadonlyArray<{ progress: number; pose: CameraPose }> = [
  {
    progress: 0,
    pose: { position: [4.5, 0.96, -5.75], target: [0.12, 0.38, 0], fov: 29 },
  },
  {
    progress: 0.25,
    pose: { position: [4.05, 3.05, 4.35], target: [0.28, 0.42, 0.38], fov: 28 },
  },
  {
    progress: 0.5,
    pose: { position: [7.35, 0.82, -0.35], target: [0, 0.36, 0], fov: 29 },
  },
  {
    progress: 0.75,
    pose: { position: [5.7, 1.42, -6.55], target: [0, 0.43, 0], fov: 30 },
  },
  {
    progress: 1,
    pose: { position: [5.3, 1.5, -6.35], target: [0, 0.43, 0], fov: 30 },
  },
] as const;

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

function interpolateTuple(
  from: [number, number, number],
  to: [number, number, number],
  amount: number,
): [number, number, number] {
  return [
    from[0] + (to[0] - from[0]) * amount,
    from[1] + (to[1] - from[1]) * amount,
    from[2] + (to[2] - from[2]) * amount,
  ];
}

export function processPhaseAt(progress: number): ProcessPhaseId {
  const value = clamp(progress);
  if (value < 0.125) return "establish";
  if (value < 0.375) return "assess";
  if (value < 0.625) return "restore";
  if (value < 0.875) return "reveal";
  return "explore";
}

export function nextSequenceIndex(
  currentIndex: number,
  direction: SequenceDirection,
  locked: boolean,
) {
  if (locked) return null;
  const nextIndex = currentIndex + direction;
  if (nextIndex < 0 || nextIndex >= processSequenceStops.length) return null;
  return nextIndex;
}

export function cameraOwnershipAfterProgressChange(
  ownership: CameraOwnership,
  previousProgress: number,
  nextProgress: number,
): CameraOwnership {
  return ownership === "orbit" && Math.abs(nextProgress - previousProgress) > 0.004
    ? "returning"
    : ownership;
}

export function cameraPoseAt(progress: number, viewportTier: ViewportTier): CameraPose {
  const value = clamp(progress);
  let from = keyframes[0];
  let to = keyframes[keyframes.length - 1];

  for (let index = 0; index < keyframes.length - 1; index += 1) {
    const current = keyframes[index];
    const next = keyframes[index + 1];
    if (current && next && value >= current.progress && value <= next.progress) {
      from = current;
      to = next;
      break;
    }
  }

  if (!from || !to) throw new Error("Camera keyframes are incomplete.");
  const span = Math.max(0.0001, to.progress - from.progress);
  const linear = (value - from.progress) / span;
  const amount = linear * linear * (3 - 2 * linear);
  const tierDistance = viewportTier === "tablet" ? 1.08 : viewportTier === "mobile" ? 1.2 : 1;
  const position = interpolateTuple(from.pose.position, to.pose.position, amount);

  return {
    position: [position[0] * tierDistance, position[1], position[2] * tierDistance],
    target: interpolateTuple(from.pose.target, to.pose.target, amount),
    fov: from.pose.fov + (to.pose.fov - from.pose.fov) * amount,
  };
}
