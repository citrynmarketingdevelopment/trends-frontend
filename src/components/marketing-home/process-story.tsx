"use client";

import { Environment, Lightformer, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Component,
  type ComponentRef,
  type ErrorInfo,
  type MutableRefObject,
  type ReactNode,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useLayoutEffect,
  useState,
} from "react";
import * as THREE from "three";

import {
  preloadRevueltoAssets,
  RevueltoModel,
  RevueltoStudioGround,
} from "@/components/revuelto-model";
import { canEnhanceCar, readCapabilitySnapshot, useExperienceState } from "./experience-state";
import {
  cameraOwnershipAfterProgressChange,
  cameraPoseAt,
  nextSequenceIndex,
  paintOptions,
  processPhaseAt,
  processPhases,
  processSequenceStops,
  type CameraOwnership,
  type PaintId,
  type ProcessPhaseId,
  type SceneLifecycle,
  type ViewportTier,
} from "./process-state";
import styles from "./marketing-home.module.css";

gsap.registerPlugin(Observer, ScrollTrigger);

const sequenceChapters = [
  { id: "assess", label: "Assess" },
  { id: "restore", label: "Restore" },
  { id: "reveal", label: "Reveal" },
  { id: "explore", label: "Explore" },
] as const;

const phaseHeadingLines = {
  assess: ["See the whole", "picture."],
  restore: ["Bring every line", "back into order."],
  reveal: ["Let the surface", "tell the truth."],
} as const;

const initialCameraPose = cameraPoseAt(0, "desktop");

interface SceneErrorBoundaryProps {
  children: ReactNode;
  onError: () => void;
}

interface SceneErrorBoundaryState {
  hasError: boolean;
}

class SceneErrorBoundary extends Component<SceneErrorBoundaryProps, SceneErrorBoundaryState> {
  override state: SceneErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): SceneErrorBoundaryState {
    return { hasError: true };
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError();
    console.error("Unable to render the Trends process scene", error, info);
  }

  override render() {
    return this.state.hasError ? null : this.props.children;
  }
}

function SceneReady({ onReady }: { onReady: () => void }) {
  useEffect(() => onReady(), [onReady]);
  return null;
}

function CameraDirector({
  progressRef,
  viewportTier,
  ownership,
  autoRotate,
  reducedMotion,
  onInteraction,
  onReturned,
}: {
  progressRef: MutableRefObject<number>;
  viewportTier: ViewportTier;
  ownership: CameraOwnership;
  autoRotate: boolean;
  reducedMotion: boolean;
  onInteraction: () => void;
  onReturned: () => void;
}) {
  const controls = useRef<ComponentRef<typeof OrbitControls>>(null);
  const camera = useRef<ComponentRef<typeof PerspectiveCamera>>(null);
  const desiredPosition = useMemo(() => new THREE.Vector3(), []);
  const desiredTarget = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, delta) => {
    if (ownership === "orbit" || !controls.current || !camera.current) return;
    const pose = cameraPoseAt(progressRef.current, viewportTier);
    desiredPosition.set(...pose.position);
    desiredTarget.set(...pose.target);
    const easing = ownership === "story" || reducedMotion ? 1 : 1 - Math.exp(-delta * 6.8);
    camera.current.position.lerp(desiredPosition, easing);
    const targetFocalLength =
      camera.current.getFilmHeight() / (2 * Math.tan(THREE.MathUtils.degToRad(pose.fov) / 2));
    camera.current.setFocalLength(
      THREE.MathUtils.lerp(camera.current.getFocalLength(), targetFocalLength, easing),
    );
    controls.current.target.lerp(desiredTarget, easing);
    controls.current.update();

    if (
      ownership === "returning" &&
      camera.current.position.distanceToSquared(desiredPosition) < 0.0025
    ) {
      onReturned();
    }
  });

  return (
    <>
      <PerspectiveCamera
        ref={camera}
        makeDefault
        position={initialCameraPose.position}
        fov={initialCameraPose.fov}
        near={0.1}
        far={100}
      />
      <OrbitControls
        ref={controls}
        makeDefault
        enabled={ownership === "orbit"}
        autoRotate={ownership === "orbit" && autoRotate && !reducedMotion}
        autoRotateSpeed={0.42}
        enableDamping
        dampingFactor={0.055}
        enablePan={false}
        minDistance={4.65}
        maxDistance={9.5}
        minPolarAngle={Math.PI * 0.3}
        maxPolarAngle={Math.PI * 0.52}
        target={initialCameraPose.target}
        onStart={onInteraction}
      />
    </>
  );
}

function ProcessTreatments({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const scan = useRef<THREE.Mesh>(null);
  const sweep = useRef<THREE.DirectionalLight>(null);

  useFrame(() => {
    const progress = progressRef.current;
    if (scan.current) {
      const assess = THREE.MathUtils.clamp(
        Math.min(progress / 0.08, (0.28 - progress) / 0.08),
        0,
        1,
      );
      scan.current.visible = assess > 0.01;
      scan.current.position.x = THREE.MathUtils.lerp(-2.9, 2.9, progress / 0.25);
      const material = scan.current.material;
      if (material instanceof THREE.MeshBasicMaterial) material.opacity = assess * 0.38;
    }
    if (sweep.current) {
      const reveal = THREE.MathUtils.clamp((progress - 0.5) / 0.25, 0, 1);
      sweep.current.position.x = THREE.MathUtils.lerp(-6, 6, reveal);
      sweep.current.intensity = Math.sin(reveal * Math.PI) * 2.6;
    }
  });

  return (
    <>
      <mesh ref={scan} rotation={[0, Math.PI / 2, 0]} position={[-3, 1.25, 0]}>
        <planeGeometry args={[3.8, 0.05]} />
        <meshBasicMaterial color="#c7ad7b" transparent opacity={0} side={THREE.DoubleSide} />
      </mesh>
      <directionalLight ref={sweep} position={[-6, 5, 2]} color="#f2eee6" intensity={0} />
    </>
  );
}

function ProcessScene({
  progressRef,
  paintColor,
  viewportTier,
  ownership,
  autoRotate,
  reducedMotion,
  onInteraction,
  onReturned,
  onReady,
}: {
  progressRef: MutableRefObject<number>;
  paintColor: string;
  viewportTier: ViewportTier;
  ownership: CameraOwnership;
  autoRotate: boolean;
  reducedMotion: boolean;
  onInteraction: () => void;
  onReturned: () => void;
  onReady: () => void;
}) {
  return (
    <>
      <ambientLight intensity={0.22} />
      <directionalLight position={[-4, 7, -5]} intensity={2.45} color="#fff2e6" />
      <directionalLight position={[5, 2.5, 4]} intensity={0.78} color="#aabbd7" />
      <Environment resolution={256} environmentIntensity={0.78}>
        <Lightformer
          form="rect"
          intensity={3.2}
          color="#f5f0e9"
          position={[0, 5, -4]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[8, 8, 1]}
        />
        <Lightformer
          form="rect"
          intensity={1.65}
          color="#7f2330"
          position={[-5, 1, 1]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[5, 3, 1]}
        />
        <Lightformer
          form="rect"
          intensity={0.8}
          color="#c7ad7b"
          position={[4, 1, 3]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[3, 2, 1]}
        />
      </Environment>
      <RevueltoModel paintColor={paintColor} storyProgressRef={progressRef} />
      <RevueltoStudioGround color="#050505" aoIntensity={1.25} radius={5.2} />
      <ProcessTreatments progressRef={progressRef} />
      <CameraDirector
        progressRef={progressRef}
        viewportTier={viewportTier}
        ownership={ownership}
        autoRotate={autoRotate}
        reducedMotion={reducedMotion}
        onInteraction={onInteraction}
        onReturned={onReturned}
      />
      <SceneReady onReady={onReady} />
    </>
  );
}

function viewportTierFor(width: number): ViewportTier {
  if (width < 768) return "mobile";
  if (width < 1120) return "tablet";
  return "desktop";
}

export function ProcessStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const lastProgressRef = useRef(0);
  const ownershipRef = useRef<CameraOwnership>("story");
  const sequenceIndexRef = useRef(0);
  const sequenceActiveRef = useRef(false);
  const sequenceLockedRef = useRef(false);
  const sequenceObserverRef = useRef<Observer | null>(null);
  const sequenceProgressRef = useRef<HTMLDivElement>(null);
  const sequenceProgressFillRef = useRef<HTMLSpanElement>(null);
  const invalidateSceneRef = useRef<() => void>(() => undefined);
  const ownsSceneRef = useRef(false);
  const { reducedMotion, sceneOwner, claimScene, releaseScene } = useExperienceState();
  const [phase, setPhase] = useState<ProcessPhaseId>("establish");
  const [lifecycle, setLifecycle] = useState<SceneLifecycle>("poster");
  const [sceneEnabled, setSceneEnabled] = useState(false);
  const [stageVisible, setStageVisible] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(true);
  const [viewportTier, setViewportTier] = useState<ViewportTier>("desktop");
  const [ownership, setOwnership] = useState<CameraOwnership>("story");
  const [autoRotate, setAutoRotate] = useState(false);
  const [paintId, setPaintId] = useState<PaintId>("oxblood");
  const [capable, setCapable] = useState(false);
  const [sequenceIndex, setSequenceIndex] = useState(0);
  const [sequencePlaying, setSequencePlaying] = useState(false);
  const sequenceEligible = capable && !reducedMotion && lifecycle !== "failed";
  const shouldOwnScene = stageVisible && sequenceEligible;

  const commitOwnership = useCallback((nextOwnership: CameraOwnership) => {
    ownershipRef.current = nextOwnership;
    setOwnership(nextOwnership);
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const snapshot = readCapabilitySnapshot();
      setViewportTier(viewportTierFor(snapshot.width));
      setCapable(canEnhanceCar(snapshot));
    }, 0);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const intersects = entry?.isIntersecting === true;
        setStageVisible(intersects);
        if (intersects && capable && !reducedMotion && !sceneEnabled) {
          setLifecycle("eligible");
          preloadRevueltoAssets();
          setSceneEnabled(true);
          setLifecycle("loading");
        }
      },
      { rootMargin: "85% 0px", threshold: 0 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [capable, reducedMotion, sceneEnabled]);

  useEffect(() => {
    if (shouldOwnScene) claimScene("car");
    else releaseScene("car");

    return () => releaseScene("car");
  }, [claimScene, releaseScene, shouldOwnScene]);

  useEffect(() => {
    const update = () => setDocumentVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage || !sequenceEligible) return;

    let tween: gsap.core.Tween | null = null;
    let armTimer: number | null = null;
    let intentFrame: number | null = null;
    let repositionFrame: number | null = null;
    let releaseFrame: number | null = null;
    let gestureArmed = true;
    let lastIntentAt = 0;
    let repositioning = false;
    let releaseDirection: -1 | 0 | 1 = 0;
    let captureSide: -1 | 1 = 1;

    const clearArmTimer = () => {
      if (armTimer !== null) window.clearTimeout(armTimer);
      armTimer = null;
    };

    const armAfterInputSettles = () => {
      clearArmTimer();
      const settle = () => {
        const remaining = 360 - (performance.now() - lastIntentAt);
        if (remaining > 0) {
          armTimer = window.setTimeout(settle, remaining);
          return;
        }
        if (!sequenceLockedRef.current) gestureArmed = true;
      };
      armTimer = window.setTimeout(settle, 360);
    };

    const clearFrame = (frame: number | null) => {
      if (frame !== null) window.cancelAnimationFrame(frame);
    };

    const deactivateSequence = () => {
      sequenceObserverRef.current?.disable();
      sequenceActiveRef.current = false;
    };

    const parkSequence = (self: ScrollTrigger, side: -1 | 1) => {
      captureSide = side;
      repositioning = true;
      clearFrame(repositionFrame);
      self.scroll(side > 0 ? self.start + 2 : self.end - 2);
      repositionFrame = window.requestAnimationFrame(() => {
        repositioning = false;
        repositionFrame = null;
      });
    };

    const releaseSequence = (direction: -1 | 1) => {
      releaseDirection = direction;
      deactivateSequence();
      trigger.scroll(direction > 0 ? trigger.end + 2 : trigger.start - 2);
      clearFrame(releaseFrame);
      releaseFrame = window.requestAnimationFrame(() => {
        releaseFrame = window.requestAnimationFrame(() => {
          releaseDirection = 0;
          releaseFrame = null;
        });
      });
    };

    const runSequence = (direction: -1 | 1) => {
      lastIntentAt = performance.now();
      if (
        ownershipRef.current !== "story" ||
        !sequenceActiveRef.current ||
        sequenceLockedRef.current ||
        !gestureArmed
      ) {
        return;
      }

      const nextIndex = nextSequenceIndex(sequenceIndexRef.current, direction, false);
      if (nextIndex === null) {
        releaseSequence(direction);
        return;
      }

      const targetProgress = processSequenceStops[nextIndex];
      if (targetProgress === undefined) return;

      gestureArmed = false;
      sequenceLockedRef.current = true;
      sequenceIndexRef.current = nextIndex;
      setSequenceIndex(nextIndex);
      setSequencePlaying(true);
      setPhase(processPhaseAt(targetProgress));

      const nextOwnership = cameraOwnershipAfterProgressChange(
        ownershipRef.current,
        lastProgressRef.current,
        targetProgress,
      );
      if (nextOwnership !== ownershipRef.current) {
        commitOwnership(nextOwnership);
        setAutoRotate(false);
      }

      tween?.kill();
      tween = gsap.to(progressRef, {
        current: targetProgress,
        duration: 1.65,
        ease: "power2.inOut",
        overwrite: true,
        onUpdate: () => {
          const value = THREE.MathUtils.clamp(progressRef.current, 0, 1);
          sequenceProgressRef.current?.setAttribute(
            "aria-valuenow",
            String(Math.round(value * 100)),
          );
          if (sequenceProgressFillRef.current) {
            sequenceProgressFillRef.current.style.transform = `scaleX(${value})`;
          }
          invalidateSceneRef.current();
        },
        onComplete: () => {
          lastProgressRef.current = targetProgress;
          sequenceLockedRef.current = false;
          setSequencePlaying(false);
          invalidateSceneRef.current();
          armAfterInputSettles();
        },
      });
    };

    const queueSequenceIntent = (direction: -1 | 1) => {
      clearFrame(intentFrame);
      intentFrame = window.requestAnimationFrame(() => {
        intentFrame = null;
        runSequence(direction);
      });
    };

    const observer = Observer.create({
      target: window,
      type: "wheel,touch",
      allowClicks: true,
      preventDefault: true,
      tolerance: 14,
      onChangeY: (self) => {
        lastIntentAt = performance.now();
        runSequence(self.deltaY > 0 ? 1 : -1);
      },
      onStop: armAfterInputSettles,
      onStopDelay: 0.18,
    });
    observer.disable();
    sequenceObserverRef.current = observer;

    const activateSequence = (self: ScrollTrigger, direction: -1 | 1) => {
      if (releaseDirection !== 0 || repositioning || sequenceActiveRef.current) return;
      sequenceActiveRef.current = true;
      parkSequence(self, direction);
      if (ownershipRef.current !== "orbit") observer.enable();
      queueSequenceIntent(direction);
    };

    const recaptureOvershoot = (self: ScrollTrigger, direction: -1 | 1) => {
      const finalIndex = processSequenceStops.length - 1;
      const hasChapter =
        direction > 0 ? sequenceIndexRef.current < finalIndex : sequenceIndexRef.current > 0;
      if (!hasChapter || ownershipRef.current === "orbit") return false;

      sequenceActiveRef.current = true;
      parkSequence(self, direction);
      observer.enable();
      queueSequenceIntent(direction);
      return true;
    };

    const returnCameraToStory = (self: ScrollTrigger) => {
      commitOwnership("returning");
      setAutoRotate(false);
      parkSequence(self, captureSide);
      observer.enable();
    };

    const trigger = ScrollTrigger.create({
      trigger: section,
      pin: stage,
      pinSpacing: true,
      start: "top top",
      end: () => `+=${Math.max(window.innerHeight, stage.offsetHeight, 720)}`,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onEnter: (self) => activateSequence(self, 1),
      onEnterBack: (self) => activateSequence(self, -1),
      onUpdate: (self) => {
        if (
          sequenceActiveRef.current &&
          ownershipRef.current === "orbit" &&
          releaseDirection === 0 &&
          !repositioning
        ) {
          returnCameraToStory(self);
        }
      },
      onLeave: (self) => {
        if (releaseDirection !== 0) {
          deactivateSequence();
          return;
        }
        if (ownershipRef.current === "orbit") {
          returnCameraToStory(self);
          return;
        }
        if (recaptureOvershoot(self, 1)) return;
        deactivateSequence();
      },
      onLeaveBack: (self) => {
        if (releaseDirection !== 0) {
          deactivateSequence();
          return;
        }
        if (ownershipRef.current === "orbit") {
          returnCameraToStory(self);
          return;
        }
        if (recaptureOvershoot(self, -1)) return;
        deactivateSequence();
      },
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (!sequenceActiveRef.current || ownershipRef.current === "orbit") return;
      if (
        event.target instanceof Element &&
        event.target.closest("a, button, input, select, textarea")
      ) {
        return;
      }

      const forward = ["ArrowDown", "PageDown", " "];
      const backward = ["ArrowUp", "PageUp"];
      if (forward.includes(event.key)) {
        event.preventDefault();
        runSequence(1);
      } else if (backward.includes(event.key)) {
        event.preventDefault();
        runSequence(-1);
      }
    };
    window.addEventListener("keydown", onKeyDown);

    const refreshFrame = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      const currentScroll = trigger.scroll();
      if (sequenceActiveRef.current || releaseDirection !== 0) return;

      if (currentScroll >= trigger.start && currentScroll <= trigger.end) {
        const side = currentScroll <= (trigger.start + trigger.end) / 2 ? 1 : -1;
        activateSequence(trigger, side);
        return;
      }

      const runway = trigger.end - trigger.start;
      const sectionRect = section.getBoundingClientRect();
      if (
        currentScroll > trigger.end &&
        currentScroll - trigger.end <= runway &&
        sectionRect.bottom > 0
      ) {
        recaptureOvershoot(trigger, 1);
      } else if (
        currentScroll < trigger.start &&
        trigger.start - currentScroll <= runway &&
        sectionRect.top < window.innerHeight
      ) {
        recaptureOvershoot(trigger, -1);
      }
    });
    return () => {
      window.cancelAnimationFrame(refreshFrame);
      window.removeEventListener("keydown", onKeyDown);
      clearArmTimer();
      clearFrame(intentFrame);
      clearFrame(repositionFrame);
      clearFrame(releaseFrame);
      tween?.kill();
      observer.kill();
      trigger.kill();
      sequenceObserverRef.current = null;
      sequenceActiveRef.current = false;
      sequenceLockedRef.current = false;
    };
  }, [commitOwnership, sequenceEligible]);

  const selectedPaint = paintOptions.find((paint) => paint.id === paintId) ?? paintOptions[0];
  if (!selectedPaint) throw new Error("The process paint palette is empty.");

  const markReady = useCallback(() => setLifecycle("ready"), []);
  const markFailed = useCallback(() => {
    if (ownsSceneRef.current) setLifecycle("failed");
  }, []);
  const enterExplore = () => {
    sequenceObserverRef.current?.disable();
    commitOwnership("orbit");
    setAutoRotate(true);
  };
  const returnToStory = () => {
    commitOwnership("returning");
    setAutoRotate(false);
    if (sequenceActiveRef.current) sequenceObserverRef.current?.enable();
  };
  const finishReturnToStory = useCallback(() => {
    commitOwnership("story");
    if (sequenceActiveRef.current) sequenceObserverRef.current?.enable();
  }, [commitOwnership]);

  const canvasActive = stageVisible && documentVisible && sceneOwner === "car";
  const frameLoop = !canvasActive
    ? "never"
    : ownership === "orbit" || ownership === "returning"
      ? "always"
      : "demand";

  const enhancementActive = sceneEnabled && !reducedMotion && lifecycle !== "failed";
  const ownsScene = enhancementActive && sceneOwner === "car";

  useLayoutEffect(() => {
    ownsSceneRef.current = ownsScene;
    return () => {
      ownsSceneRef.current = false;
    };
  }, [ownsScene]);

  return (
    <section
      ref={sectionRef}
      className={styles.processStory}
      id="process"
      aria-labelledby="process-heading"
      data-enhanced={enhancementActive || undefined}
      data-phase={phase}
      data-sequence-index={sequenceIndex}
      data-sequence-playing={sequencePlaying || undefined}
    >
      <div ref={stageRef} className={styles.processStage} data-process-stage>
        {enhancementActive && sceneOwner === "car" ? (
          <SceneErrorBoundary onError={markFailed}>
            <div
              className={styles.processCanvas}
              role="img"
              aria-label="Interactive three-dimensional vehicle repair process"
              data-lifecycle={lifecycle}
            >
              <Canvas
                camera={{
                  position: initialCameraPose.position,
                  fov: initialCameraPose.fov,
                  near: 0.1,
                  far: 100,
                }}
                dpr={[1, 1.45]}
                frameloop={frameLoop}
                gl={{
                  alpha: false,
                  antialias: true,
                  powerPreference: "high-performance",
                  outputColorSpace: THREE.SRGBColorSpace,
                  toneMapping: THREE.ACESFilmicToneMapping,
                  toneMappingExposure: 1.04,
                }}
                onCreated={({ gl, invalidate }) => {
                  invalidateSceneRef.current = invalidate;
                  gl.setClearColor("#000000", 1);
                  gl.domElement.addEventListener("webglcontextlost", markFailed, { once: true });
                }}
              >
                <Suspense fallback={null}>
                  <ProcessScene
                    progressRef={progressRef}
                    paintColor={selectedPaint.color}
                    viewportTier={viewportTier}
                    ownership={ownership}
                    autoRotate={autoRotate}
                    reducedMotion={reducedMotion}
                    onInteraction={() => setAutoRotate(false)}
                    onReturned={finishReturnToStory}
                    onReady={markReady}
                  />
                </Suspense>
              </Canvas>
            </div>
          </SceneErrorBoundary>
        ) : null}

        <div className={styles.processHeading}>
          <span>Vehicle process study</span>
          <h2 id="process-heading">
            <span>Three stages.</span>{" "}
            <span className={styles.outlineText}>One continuous standard.</span>
          </h2>
        </div>

        <div className={styles.phaseNarrative} aria-live="polite">
          {processPhases.map((item) => (
            <article key={item.id} data-active={phase === item.id || undefined}>
              <span>{item.label}</span>
              <h3 aria-label={item.heading}>
                <span>{phaseHeadingLines[item.id][0]}</span>{" "}
                <span className={styles.outlineText}>{phaseHeadingLines[item.id][1]}</span>
              </h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>

        <div className={styles.repairLabels} aria-hidden="true">
          <span>Driver-side panel</span>
          <span>Surface continuity</span>
        </div>

        {lifecycle === "loading" ? (
          <p className={styles.sceneStatus} role="status">
            Preparing live vehicle study
          </p>
        ) : null}
        {lifecycle === "failed" ? (
          <p className={styles.sceneFailure} role="alert">
            The live vehicle study is unavailable. The complete process remains below.
          </p>
        ) : null}

        <div className={styles.processRail}>
          <div
            ref={sequenceProgressRef}
            className={styles.sequenceProgress}
            role="progressbar"
            aria-label="Repair story progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={0}
          >
            <span ref={sequenceProgressFillRef} />
          </div>
          <div className={styles.sequenceSteps} aria-hidden="true">
            {sequenceChapters.map((item, index) => (
              <span
                key={item.id}
                data-active={sequenceIndex === index + 1 || undefined}
                data-complete={sequenceIndex > index + 1 || undefined}
              >
                <b>{String(index + 1).padStart(2, "0")}</b>
                {item.label}
              </span>
            ))}
          </div>
          <p className={styles.sequenceInstruction}>
            {sequencePlaying
              ? `Sequence ${Math.max(1, sequenceIndex)} of 4 in motion`
              : sequenceIndex === 4
                ? "Explore freely or scroll to continue"
                : "Scroll once to advance the next sequence"}
          </p>
        </div>

        <div className={styles.exploreControls} data-visible={phase === "explore" || undefined}>
          {ownership !== "orbit" ? (
            <button type="button" className={styles.primaryButton} onClick={enterExplore}>
              Explore 360
            </button>
          ) : (
            <>
              <button
                type="button"
                className={styles.secondaryButton}
                aria-pressed={autoRotate}
                onClick={() => setAutoRotate((current) => !current)}
              >
                {autoRotate ? "Pause 360" : "Play 360"}
              </button>
              <button type="button" className={styles.secondaryButton} onClick={returnToStory}>
                Return to story
              </button>
              <fieldset className={styles.paintControls}>
                <legend>Paint</legend>
                {paintOptions.map((paint) => (
                  <button
                    key={paint.id}
                    type="button"
                    aria-label={paint.label}
                    aria-pressed={paintId === paint.id}
                    style={{ backgroundColor: paint.color }}
                    onClick={() => setPaintId(paint.id)}
                  />
                ))}
              </fieldset>
            </>
          )}
        </div>
      </div>

      <div className={styles.phaseCards}>
        {processPhases.map((item) => (
          <article key={item.id}>
            <span>{item.label}</span>
            <h3>{item.heading}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
