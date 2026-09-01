import { describe, expect, it } from "vitest";
import * as THREE from "three";

import {
  isPrimaryPaintMaterial,
  restorePanelAmount,
  updatePrimaryPaintMaterials,
} from "./revuelto-model";

describe("Revuelto model state", () => {
  it("classifies only the primary paint material family", () => {
    expect(isPrimaryPaintMaterial("Vehicle_Generic_SmallSpecMap [PRIMARY]")).toBe(true);
    expect(isPrimaryPaintMaterial("Vehicle_Generic_SmallSpecMap [SECONDARY]")).toBe(false);
  });

  it("opens during restore and returns exactly to zero during reveal", () => {
    expect(restorePanelAmount(0.2)).toBe(0);
    expect(restorePanelAmount(0.5)).toBeCloseTo(1);
    expect(restorePanelAmount(0.75)).toBe(0);
    expect(restorePanelAmount(1)).toBe(0);
  });

  it("updates paint in place without replacing the prepared material", () => {
    const material = new THREE.MeshStandardMaterial({ color: "#541118" });
    const originalVersion = material.version;

    updatePrimaryPaintMaterials([material], "#c7ad7b");

    expect(material.color.getHexString()).toBe("c7ad7b");
    expect(material.version).toBeGreaterThan(originalVersion);
  });
});
