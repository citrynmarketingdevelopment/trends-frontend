"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import { BrandLogo } from "@/components/brand-logo";

import { canEnhanceLogo, readCapabilitySnapshot, useExperienceState } from "./experience-state";
import styles from "./marketing-home.module.css";

const HeroLogoScene = dynamic(
  () => import("./hero-logo-scene").then((module) => module.HeroLogoScene),
  { ssr: false },
);

export function HeroLogo3D() {
  const hostRef = useRef<HTMLDivElement>(null);
  const { reducedMotion, sceneOwner, claimScene, releaseScene } = useExperienceState();
  const [hydrated, setHydrated] = useState(false);
  const [capable, setCapable] = useState(false);
  const [visible, setVisible] = useState(true);
  const [documentVisible, setDocumentVisible] = useState(true);
  const [ready, setReady] = useState(false);
  const [hasPresented, setHasPresented] = useState(false);
  const [failed, setFailed] = useState(false);
  const [recovering, setRecovering] = useState(false);
  const [sceneAttempt, setSceneAttempt] = useState(0);
  const recoveryTimer = useRef<number | null>(null);
  const ownsSceneRef = useRef(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setCapable(canEnhanceLogo(readCapabilitySnapshot()));
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(
    () => () => {
      if (recoveryTimer.current !== null) window.clearTimeout(recoveryTimer.current);
    },
    [],
  );

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const observer = new IntersectionObserver(
      ([entry]) =>
        setVisible(entry?.isIntersecting === true && (entry?.intersectionRatio ?? 0) >= 0.3),
      { threshold: [0, 0.3] },
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const update = () => setDocumentVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  const wantsScene = capable && !failed && !recovering && visible;
  const shouldOwnScene = wantsScene && sceneOwner === "logo";
  const loading = !hydrated || (capable && !hasPresented && !ready && !failed);

  useLayoutEffect(() => {
    ownsSceneRef.current = shouldOwnScene;
    return () => {
      ownsSceneRef.current = false;
    };
  }, [shouldOwnScene]);

  const handleSceneReady = useCallback(() => {
    setReady(true);
    setHasPresented(true);
  }, []);

  const handleSceneError = useCallback(() => {
    if (!ownsSceneRef.current) return;
    setReady(false);
    if (recoveryTimer.current !== null) return;

    if (sceneAttempt === 0) {
      setRecovering(true);
      recoveryTimer.current = window.setTimeout(() => {
        recoveryTimer.current = null;
        setSceneAttempt(1);
        setRecovering(false);
      }, 650);
      return;
    }

    setFailed(true);
  }, [sceneAttempt]);

  useEffect(() => {
    if (wantsScene) claimScene("logo");
    else releaseScene("logo");
  }, [claimScene, releaseScene, wantsScene]);

  useEffect(() => {
    if (shouldOwnScene) return;
    const frame = window.requestAnimationFrame(() => setReady(false));
    return () => window.cancelAnimationFrame(frame);
  }, [shouldOwnScene]);

  return (
    <div
      ref={hostRef}
      className={styles.heroCanvasHost}
      aria-hidden="true"
      data-attempt={sceneAttempt}
      data-failed={failed || undefined}
      data-hydrated={hydrated || undefined}
      data-loading={loading || undefined}
      data-presented={hasPresented || undefined}
      data-ready={ready || undefined}
      data-recovering={recovering || undefined}
      data-scene-owner={sceneOwner ?? undefined}
      data-visible={visible || undefined}
      data-rotation={shouldOwnScene && ready ? (reducedMotion ? "paused" : "rotating") : "waiting"}
    >
      {shouldOwnScene ? (
        <HeroLogoScene
          key={sceneAttempt}
          active={documentVisible && visible}
          motionEnabled={!reducedMotion}
          onError={handleSceneError}
          onReady={handleSceneReady}
        />
      ) : null}
      <div className={styles.heroLoader} data-hero-loader>
        <BrandLogo className={styles.heroLoaderLogo} preload />
        <span className={styles.heroLoaderRail}>
          <span />
        </span>
      </div>
    </div>
  );
}
