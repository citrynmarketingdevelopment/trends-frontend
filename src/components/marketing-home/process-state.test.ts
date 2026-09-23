import { describe, expect, it } from "vitest";

import { canEnhanceCar, canEnhanceLogo } from "./experience-state";
import { cameraOwnershipAfterProgressChange, cameraPoseAt, processPhaseAt } from "./process-state";

const capableDesktop = {
  width: 1280,
  deviceMemory: 8,
  hardwareConcurrency: 8,
  saveData: false,
  webGL2: true,
} as const;

describe("marketing enhancement gates", () => {
  it("keeps mobile 3D available while respecting data, WebGL, and desktop limits", () => {
    expect(canEnhanceLogo(capableDesktop)).toBe(true);
    expect(canEnhanceCar(capableDesktop)).toBe(true);
    expect(canEnhanceLogo({ ...capableDesktop, width: 390 })).toBe(true);
    expect(canEnhanceCar({ ...capableDesktop, width: 390 })).toBe(true);
    expect(canEnhanceLogo({ ...capableDesktop, deviceMemory: 2, hardwareConcurrency: 2 })).toBe(
      true,
    );
    expect(
      canEnhanceCar({
        ...capableDesktop,
        width: 390,
        deviceMemory: 2,
        hardwareConcurrency: 2,
      }),
    ).toBe(true);
    expect(canEnhanceCar({ ...capableDesktop, deviceMemory: 4, hardwareConcurrency: 4 })).toBe(
      false,
    );
    expect(canEnhanceLogo({ ...capableDesktop, saveData: true })).toBe(false);
    expect(canEnhanceLogo({ ...capableDesktop, webGL2: false })).toBe(false);
    expect(canEnhanceCar({ ...capableDesktop, saveData: true })).toBe(false);
    expect(canEnhanceCar({ ...capableDesktop, webGL2: false })).toBe(false);
  });
});

describe("process direction", () => {
  it("uses the approved phase boundaries in both directions", () => {
    expect(processPhaseAt(0)).toBe("establish");
    expect(processPhaseAt(0.25)).toBe("assess");
    expect(processPhaseAt(0.5)).toBe("restore");
    expect(processPhaseAt(0.75)).toBe("reveal");
    expect(processPhaseAt(1)).toBe("explore");
    expect(processPhaseAt(0.37)).toBe("assess");
  });

  it("interpolates camera poses without mutating prior results", () => {
    const first = cameraPoseAt(0, "desktop");
    const middle = cameraPoseAt(0.5, "desktop");
    const tablet = cameraPoseAt(0.5, "tablet");

    expect(first).toEqual({
      position: [4.5, 0.96, -5.75],
      target: [0.12, 0.38, 0],
      fov: 29,
    });
    expect(middle.position).not.toEqual(first.position);
    expect(tablet.position[0]).toBeCloseTo(middle.position[0] * 1.08);
    expect(cameraPoseAt(0, "desktop")).toEqual(first);
  });

  it("keeps the reveal-to-explore handoff within one restrained camera move", () => {
    const reveal = cameraPoseAt(0.75, "desktop");
    const explore = cameraPoseAt(1, "desktop");
    const distance = Math.hypot(
      reveal.position[0] - explore.position[0],
      reveal.position[1] - explore.position[1],
      reveal.position[2] - explore.position[2],
    );

    expect(distance).toBeLessThan(0.5);
    expect(explore.fov).toBe(reveal.fov);
  });

  it("returns orbit ownership to the story when scrolling resumes", () => {
    expect(cameraOwnershipAfterProgressChange("orbit", 0.95, 0.9)).toBe("returning");
    expect(cameraOwnershipAfterProgressChange("orbit", 0.95, 0.948)).toBe("orbit");
    expect(cameraOwnershipAfterProgressChange("story", 0.95, 0.5)).toBe("story");
  });
});
