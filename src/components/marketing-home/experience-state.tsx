"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type SceneOwner = "logo" | "car" | null;

interface ExperienceContextValue {
  reducedMotion: boolean;
  sceneOwner: SceneOwner;
  claimScene: (owner: Exclude<SceneOwner, null>) => void;
  releaseScene: (owner: Exclude<SceneOwner, null>) => void;
}

const ExperienceContext = createContext<ExperienceContextValue | null>(null);

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [systemReduced, setSystemReduced] = useState(false);
  const [sceneOwner, setSceneOwner] = useState<SceneOwner>(null);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setSystemReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const claimScene = useCallback((owner: Exclude<SceneOwner, null>) => {
    setSceneOwner(owner);
  }, []);

  const releaseScene = useCallback((owner: Exclude<SceneOwner, null>) => {
    setSceneOwner((current) => (current === owner ? null : current));
  }, []);

  const value = useMemo<ExperienceContextValue>(
    () => ({
      reducedMotion: systemReduced,
      sceneOwner,
      claimScene,
      releaseScene,
    }),
    [claimScene, releaseScene, sceneOwner, systemReduced],
  );

  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>;
}

export function useExperienceState() {
  const value = useContext(ExperienceContext);
  if (!value) throw new Error("useExperienceState must be used inside ExperienceProvider.");
  return value;
}

export interface CapabilitySnapshot {
  width: number;
  deviceMemory: number | null;
  hardwareConcurrency: number;
  saveData: boolean;
  webGL2: boolean;
}

export function canEnhanceLogo(snapshot: CapabilitySnapshot) {
  return !snapshot.saveData && snapshot.webGL2;
}

export function canEnhanceCar(snapshot: CapabilitySnapshot) {
  return (
    !snapshot.saveData &&
    snapshot.webGL2 &&
    (snapshot.deviceMemory === null || snapshot.deviceMemory >= 6) &&
    snapshot.hardwareConcurrency >= 6
  );
}

interface NavigatorWithPerformanceHints extends Navigator {
  connection?: { saveData?: boolean };
  deviceMemory?: number;
}

export function readCapabilitySnapshot(): CapabilitySnapshot {
  const browserNavigator = navigator as NavigatorWithPerformanceHints;
  let webGL2 = false;

  try {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("webgl2", {
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    webGL2 = context !== null;
    context?.getExtension("WEBGL_lose_context")?.loseContext();
  } catch {
    webGL2 = false;
  }

  return {
    width: window.innerWidth,
    deviceMemory: browserNavigator.deviceMemory ?? null,
    hardwareConcurrency: browserNavigator.hardwareConcurrency || 1,
    saveData: browserNavigator.connection?.saveData === true,
    webGL2,
  };
}
