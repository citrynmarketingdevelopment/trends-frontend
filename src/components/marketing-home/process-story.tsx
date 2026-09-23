"use client";

import { Environment, Lightformer, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import gsap from "gsap";
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
  paintOptions,
  processPhaseAt,
  processPhases,
  type CameraOwnership,
  type PaintId,
  type ProcessPhaseId,
  type SceneLifecycle,
  type ViewportTier,
} from "./process-state";
import { ProcessStepsMobile } from "./process-steps-mobile";
import styles from "./marketing-home.module.css";

gsap.registerPlugin(ScrollTrigger);

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
        enableZoom={viewportTier === "mobile"}
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

function MobileVehicleSpin({ active, children }: { active: boolean; children: ReactNode }) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (active && group.current) group.current.rotation.y += delta * 0.14;
  });

  return <group ref={group}>{children}</group>;
}

function ProcessScene({
  progressRef,
  paintColor,
  viewportTier,
  ownership,
  autoRotate,
  passiveSpin,
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
  passiveSpin: boolean;
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
      <MobileVehicleSpin active={passiveSpin}>
        <RevueltoModel paintColor={paintColor} storyProgressRef={progressRef} />
      </MobileVehicleSpin>
      <RevueltoStudioGround color="#050505" aoIntensity={1.25} radius={5.2} />
      {viewportTier === "mobile" ? null : <ProcessTreatments progressRef={progressRef} />}
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
  const phaseRef = useRef<ProcessPhaseId>("establish");
  const ownershipRef = useRef<CameraOwnership>("story");
  const sequenceIndexRef = useRef(0);
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
  const mobileLayout = viewportTier === "mobile";
  const sceneEligible = capable && !reducedMotion && lifecycle !== "failed";
  const enhancementActive = sceneEnabled && sceneEligible;
  const sequenceEligible = enhancementActive && !mobileLayout;
  const shouldOwnScene = stageVisible && sceneEligible;

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
    if (!mobileLayout || !capable || reducedMotion) return;

    const preload = () => preloadRevueltoAssets();
    if (typeof window.requestIdleCallback === "function") {
      const idleCallback = window.requestIdleCallback(preload, { timeout: 2500 });
      return () => window.cancelIdleCallback(idleCallback);
    }

    const timeout = window.setTimeout(preload, 1200);
    return () => window.clearTimeout(timeout);
  }, [capable, mobileLayout, reducedMotion]);

  useEffect(() => {
    if (mobileLayout || !capable || reducedMotion) return;
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        preloadRevueltoAssets();
        observer.disconnect();
      },
      { rootMargin: "250% 0px", threshold: 0 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [capable, mobileLayout, reducedMotion]);

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
    if (!section || !sequenceEligible) return;

    const updateProgress = (progress: number) => {
      const value = THREE.MathUtils.clamp(progress, 0, 1);
      const nextOwnership = cameraOwnershipAfterProgressChange(
        ownershipRef.current,
        lastProgressRef.current,
        value,
      );
      if (nextOwnership !== ownershipRef.current) {
        commitOwnership(nextOwnership);
        setAutoRotate(false);
      }

      progressRef.current = value;
      lastProgressRef.current = value;

      const nextPhase = processPhaseAt(value);
      if (nextPhase !== phaseRef.current) {
        phaseRef.current = nextPhase;
        setPhase(nextPhase);
      }

      const nextIndex = sequenceChapters.findIndex((chapter) => chapter.id === nextPhase) + 1;
      if (nextIndex !== sequenceIndexRef.current) {
        sequenceIndexRef.current = nextIndex;
        setSequenceIndex(nextIndex);
      }

      sequenceProgressRef.current?.setAttribute("aria-valuenow", String(Math.round(value * 100)));
      if (sequenceProgressFillRef.current) {
        sequenceProgressFillRef.current.style.transform = `scaleX(${value})`;
      }
      invalidateSceneRef.current();
    };

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => updateProgress(self.progress),
      onRefresh: (self) => updateProgress(self.progress),
    });
    updateProgress(trigger.progress);

    return () => trigger.kill();
  }, [commitOwnership, sequenceEligible]);

  const selectedPaint = paintOptions.find((paint) => paint.id === paintId) ?? paintOptions[0];
  if (!selectedPaint) throw new Error("The process paint palette is empty.");

  const markReady = useCallback(() => setLifecycle("ready"), []);
  const markFailed = useCallback(() => {
    if (ownsSceneRef.current) setLifecycle("failed");
  }, []);
  const enterExplore = () => {
    commitOwnership("orbit");
    setAutoRotate(!mobileLayout);
  };
  const returnToStory = () => {
    commitOwnership("returning");
    setAutoRotate(false);
  };
  const finishReturnToStory = useCallback(() => {
    commitOwnership("story");
  }, [commitOwnership]);

  const canvasActive = stageVisible && documentVisible && sceneOwner === "car";
  const mobilePassiveSpin = mobileLayout && ownership === "story";
  const frameLoop = !canvasActive
    ? "never"
    : mobilePassiveSpin || ownership === "orbit" || ownership === "returning"
      ? "always"
      : "demand";

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
      data-car-capable={capable || undefined}
      data-camera-ownership={ownership}
      data-mobile-passive-spin={mobilePassiveSpin || undefined}
      data-phase={phase}
      data-viewport-tier={viewportTier}
      data-sequence-index={sequenceIndex}
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
                  if (!mobileLayout) {
                    gl.domElement.addEventListener(
                      "wheel",
                      (event) => event.stopImmediatePropagation(),
                      { capture: true, passive: true },
                    );
                  }
                }}
              >
                <Suspense fallback={null}>
                  <ProcessScene
                    progressRef={progressRef}
                    paintColor={selectedPaint.color}
                    viewportTier={viewportTier}
                    ownership={ownership}
                    autoRotate={autoRotate}
                    passiveSpin={mobilePassiveSpin}
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
            Loading 3D vehicle
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
            {ownership === "orbit"
              ? "Drag to rotate. Scroll to continue."
              : "Scroll to follow the repair."}
          </p>
        </div>

        <div
          className={styles.exploreControls}
          data-visible={enhancementActive && lifecycle === "ready" ? true : undefined}
        >
          {ownership !== "orbit" ? (
            <button type="button" className={styles.primaryButton} onClick={enterExplore}>
              {mobileLayout ? "Explore 3D" : "Explore 360"}
            </button>
          ) : (
            <>
              {mobileLayout ? null : (
                <button
                  type="button"
                  className={styles.secondaryButton}
                  aria-pressed={autoRotate}
                  onClick={() => setAutoRotate((current) => !current)}
                >
                  {autoRotate ? "Pause 360" : "Play 360"}
                </button>
              )}
              <button type="button" className={styles.secondaryButton} onClick={returnToStory}>
                {mobileLayout ? "Exit 3D" : "Return to story"}
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

      <ProcessStepsMobile />

      <div className={styles.phaseCards} data-process-phase-cards>
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
