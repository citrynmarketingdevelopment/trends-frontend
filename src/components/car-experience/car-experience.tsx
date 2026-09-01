"use client";

import {
  AdaptiveDpr,
  Environment,
  Lightformer,
  OrbitControls,
  useGLTF,
  useProgress,
  useTexture,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Component,
  type ComponentRef,
  type ErrorInfo,
  type ReactNode,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as THREE from "three";
import { clone as cloneSkeleton } from "three/examples/jsm/utils/SkeletonUtils.js";

import { preloadRevueltoAssets } from "@/components/revuelto-model";
import styles from "./car-experience.module.css";

const MODEL_URL = "/models/revuelto-web.glb";
const GROUND_AO_URL = "/textures/internal_ground_ao_texture.jpeg";

type ViewName = "front" | "profile" | "rear";

const CAMERA_POSITIONS: Record<ViewName, THREE.Vector3> = {
  front: new THREE.Vector3(4.35, 1.6, -6.3),
  profile: new THREE.Vector3(7.25, 1.35, -0.15),
  rear: new THREE.Vector3(-4.4, 1.55, 6.25),
};

const paintOptions = [
  { label: "Arancio", color: "#d8522b" },
  { label: "Verde", color: "#8fa62f" },
  { label: "Nero", color: "#171a1f" },
] as const;

function useMediaPreference(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const update = () => setMatches(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, [query]);

  return matches;
}

function useWebGL2Availability() {
  const [available, setAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      try {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("webgl2", {
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        });

        context?.getExtension("WEBGL_lose_context")?.loseContext();
        setAvailable(context !== null);
      } catch {
        setAvailable(false);
      }
    }, 0);

    return () => window.clearTimeout(timeout);
  }, []);

  return available;
}

function tuneMaterial(material: THREE.Material, paintColor: string) {
  if (!(material instanceof THREE.MeshStandardMaterial)) return;

  const name = material.name.toLowerCase();
  const isPaint = /vehicle_generic_smallspecmap \[primary\]/.test(name);
  const isSecondaryPaint = /vehicle_generic_smallspecmap \[secondary\]/.test(name);
  const isGlass = name.includes("vehicle_generic_glasswindows2");
  const isTire = /^(009d15f0|01126a80)\./.test(name);
  const isWheel =
    name.includes("vehicle_generic_smallspecmap [wheel]") ||
    name.includes("novitec_vossen_nf9_dif [wheel]");
  const isLight = /lighta|coloredlights|buttonsimmisive|screen_/.test(name);
  const isMaskedLight = name.includes("buttonsimmisive");
  const isCutout = /badge|stitch|calliper|logo|licenseplate|dials|screw_|tial/.test(name);
  const isCarbon = name.includes("carbonfiber");
  const isBlackTrim = /^(black|dinghyblack)\./.test(name);
  const isGrille = name.includes("grille");
  const isLeather = /interior_leather|leatherbmp/.test(name);
  const isMetal = /silver|titanium/.test(name);

  material.depthTest = true;
  material.dithering = true;
  material.toneMapped = true;

  if (isPaint) {
    material.color.set(paintColor);
    material.transparent = false;
    material.opacity = 1;
    material.depthWrite = true;
    material.alphaTest = 0;
    material.metalness = 0.12;
    material.roughness = 0.24;
    material.envMapIntensity = 0.75;

    if (material instanceof THREE.MeshPhysicalMaterial) {
      material.clearcoat = 1;
      material.clearcoatRoughness = 0.1;
      material.ior = 1.46;
    }
  } else if (isSecondaryPaint) {
    material.color.set("#171a1e");
    material.transparent = false;
    material.opacity = 1;
    material.depthWrite = true;
    material.alphaTest = 0;
    material.metalness = 0.55;
    material.roughness = 0.3;
    material.envMapIntensity = 0.75;
  } else if (isGlass) {
    material.color.set("#101820");
    material.transparent = true;
    material.opacity = 0.22;
    material.depthWrite = false;
    material.alphaTest = 0;
    material.metalness = 0;
    material.roughness = 0.08;
    material.envMapIntensity = 1.2;
  } else if (isLight) {
    material.transparent = false;
    material.opacity = 1;
    material.depthWrite = true;
    material.alphaTest = isMaskedLight ? 0.4 : 0;
    material.alphaToCoverage = isMaskedLight;
    material.emissiveIntensity = 0.72;
  } else if (isCutout) {
    material.transparent = false;
    material.opacity = 1;
    material.depthWrite = true;
    material.alphaTest = 0.4;
    material.alphaToCoverage = true;
  } else {
    material.transparent = false;
    material.opacity = 1;
    material.depthWrite = true;
    material.alphaTest = 0;
    material.alphaToCoverage = false;
  }

  if (isTire) {
    material.color.set("#111214");
    material.transparent = false;
    material.opacity = 1;
    material.depthWrite = true;
    material.alphaTest = 0;
    material.metalness = 0;
    material.roughness = 0.82;
    material.envMapIntensity = 0.42;
  } else if (isWheel) {
    material.color.set("#353a40");
    material.transparent = false;
    material.opacity = 1;
    material.depthWrite = true;
    material.alphaTest = 0;
    material.metalness = 0.78;
    material.roughness = 0.26;
    material.envMapIntensity = 0.8;
  } else if (isCarbon) {
    material.color.set("#111418");
    material.metalness = 0.08;
    material.roughness = 0.3;
    material.envMapIntensity = 0.65;
  } else if (isBlackTrim) {
    material.color.set("#0b0d10");
    material.metalness = 0.04;
    material.roughness = 0.55;
    material.envMapIntensity = 0.5;
  } else if (isGrille) {
    material.color.set("#111419");
    material.metalness = 0.15;
    material.roughness = 0.48;
    material.envMapIntensity = 0.55;
  } else if (isLeather) {
    material.color.set("#171514");
    material.metalness = 0;
    material.roughness = 0.68;
    material.envMapIntensity = 0.4;
  } else if (isMetal) {
    material.metalness = Math.max(material.metalness, 0.42);
    material.roughness = Math.min(material.roughness, 0.36);
    material.envMapIntensity = 1;
  }

  material.needsUpdate = true;
}

function NormalizedCar({ paintColor }: { paintColor: string }) {
  const { scene: sourceScene } = useGLTF(MODEL_URL);
  const { scene, materials, primaryMaterials } = useMemo(() => {
    const nextScene = cloneSkeleton(sourceScene);
    const materialCopies = new Map<THREE.Material, THREE.Material>();
    const nextPrimaryMaterials: THREE.MeshStandardMaterial[] = [];

    nextScene.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;

      const copyMaterial = (material: THREE.Material) => {
        const existing = materialCopies.get(material);
        if (existing) return existing;

        const copy = material.clone();
        tuneMaterial(copy, paintOptions[0].color);
        materialCopies.set(material, copy);
        if (
          copy instanceof THREE.MeshStandardMaterial &&
          /vehicle_generic_smallspecmap \[primary\]/i.test(copy.name)
        ) {
          nextPrimaryMaterials.push(copy);
        }
        return copy;
      };

      object.material = Array.isArray(object.material)
        ? object.material.map(copyMaterial)
        : copyMaterial(object.material);
    });

    return {
      scene: nextScene,
      materials: Array.from(materialCopies.values()),
      primaryMaterials: nextPrimaryMaterials,
    };
  }, [sourceScene]);

  useEffect(() => {
    primaryMaterials.forEach((material) => {
      material.color.set(paintColor);
      material.needsUpdate = true;
    });
  }, [paintColor, primaryMaterials]);

  useEffect(
    () => () => {
      materials.forEach((material) => material.dispose());
    },
    [materials],
  );

  const transform = useMemo(() => {
    scene.updateMatrixWorld(true);
    const bounds = new THREE.Box3().setFromObject(scene);
    const center = bounds.getCenter(new THREE.Vector3());
    const size = bounds.getSize(new THREE.Vector3());
    const scale = 5.05 / Math.max(size.x, size.z);

    return {
      scale,
      position: new THREE.Vector3(
        -center.x * scale,
        -bounds.min.y * scale + 0.045,
        -center.z * scale,
      ),
    };
  }, [scene]);

  return (
    <group position={transform.position} scale={transform.scale}>
      <primitive object={scene} dispose={null} />
    </group>
  );
}

function StudioGround({ lightTheme }: { lightTheme: boolean }) {
  const groundAo = useTexture(GROUND_AO_URL);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.015, 0]}>
      <circleGeometry args={[4.6, 96]} />
      <meshStandardMaterial
        color={lightTheme ? "#c9ced2" : "#111318"}
        roughness={1}
        metalness={0}
        aoMap={groundAo}
        aoMapIntensity={lightTheme ? 0.82 : 1.18}
      />
    </mesh>
  );
}

interface CameraRigProps {
  activeView: ViewName;
  viewRevision: number;
  autoRotate: boolean;
  reducedMotion: boolean;
  onInteraction: () => void;
}

function CameraRig({
  activeView,
  viewRevision,
  autoRotate,
  reducedMotion,
  onInteraction,
}: CameraRigProps) {
  const controls = useRef<ComponentRef<typeof OrbitControls>>(null);
  const camera = useThree((state) => state.camera);
  const goal = useRef(CAMERA_POSITIONS.front.clone());
  const isTransitioning = useRef(false);
  const target = useMemo(() => new THREE.Vector3(0, 0.48, 0), []);

  useEffect(() => {
    goal.current.copy(CAMERA_POSITIONS[activeView]);
    isTransitioning.current = true;
    if (controls.current) controls.current.enabled = false;
  }, [activeView, viewRevision]);

  useFrame((_, delta) => {
    if (!isTransitioning.current || !controls.current) return;

    if (reducedMotion) {
      camera.position.copy(goal.current);
      controls.current.target.copy(target);
      controls.current.update();
      controls.current.enabled = true;
      isTransitioning.current = false;
      return;
    }

    const easing = 1 - Math.exp(-delta * 5.5);
    camera.position.lerp(goal.current, easing);
    controls.current.target.lerp(target, easing);
    controls.current.update();

    if (camera.position.distanceToSquared(goal.current) < 0.0025) {
      camera.position.copy(goal.current);
      controls.current.enabled = true;
      isTransitioning.current = false;
    }
  });

  return (
    <OrbitControls
      ref={controls}
      makeDefault
      autoRotate={autoRotate && !reducedMotion}
      autoRotateSpeed={0.42}
      enableDamping
      dampingFactor={0.055}
      enablePan={false}
      minDistance={4.65}
      maxDistance={9.5}
      minPolarAngle={Math.PI * 0.32}
      maxPolarAngle={Math.PI * 0.49}
      target={[0, 0.48, 0]}
      onStart={onInteraction}
    />
  );
}

interface SceneProps extends CameraRigProps {
  lightTheme: boolean;
  paintColor: string;
  onReady: () => void;
}

function SceneReady({ onReady }: { onReady: () => void }) {
  useEffect(() => {
    onReady();
  }, [onReady]);

  return null;
}

function Scene({ lightTheme, paintColor, onReady, ...cameraProps }: SceneProps) {
  return (
    <>
      <ambientLight intensity={lightTheme ? 0.22 : 0.14} />
      <directionalLight
        position={[-4, 7, -5]}
        intensity={lightTheme ? 1.5 : 1.35}
        color="#fff2e6"
      />
      <directionalLight
        position={[5, 2.5, 4]}
        intensity={lightTheme ? 0.42 : 0.34}
        color="#9eb4d8"
      />

      <Environment resolution={256} environmentIntensity={lightTheme ? 0.5 : 0.55}>
        <Lightformer
          form="rect"
          intensity={2.1}
          color="#f5f0e9"
          position={[0, 5, -4]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[8, 8, 1]}
        />
        <Lightformer
          form="rect"
          intensity={1.05}
          color={lightTheme ? "#eef2f4" : "#65738c"}
          position={[-5, 1, 1]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[5, 3, 1]}
        />
        <Lightformer
          form="rect"
          intensity={0.72}
          color="#ccd7e8"
          position={[4, 1, 3]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[3, 2, 1]}
        />
      </Environment>

      <NormalizedCar paintColor={paintColor} />
      <StudioGround lightTheme={lightTheme} />
      <CameraRig {...cameraProps} />
      <SceneReady onReady={onReady} />
      <AdaptiveDpr pixelated />
    </>
  );
}

function LoadingOverlay({ sceneReady }: { sceneReady: boolean }) {
  const { progress } = useProgress();
  const [complete, setComplete] = useState(false);
  const roundedProgress = Math.min(100, Math.round(progress));

  useEffect(() => {
    if (!sceneReady) return;
    const timeout = window.setTimeout(() => setComplete(true), 480);
    return () => window.clearTimeout(timeout);
  }, [sceneReady]);

  if (complete) return null;

  return (
    <div className={styles.loader} data-model-loader role="status" aria-live="polite">
      <div className={styles.loaderTopline}>
        <span>LOADING REVUELTO</span>
        <span>{roundedProgress}%</span>
      </div>
      <div className={styles.loaderTrack} aria-hidden="true">
        <span style={{ transform: `scaleX(${roundedProgress / 100})` }} />
      </div>
    </div>
  );
}

interface ErrorBoundaryProps {
  children: ReactNode;
  onError: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

function RenderingErrorState() {
  return (
    <div className={styles.errorState} role="alert">
      <p>THE 3D MODEL COULD NOT BE LOADED.</p>
      <button type="button" onClick={() => window.location.reload()}>
        TRY AGAIN
      </button>
    </div>
  );
}

class SceneErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  override state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError();
    console.error("Unable to render the Revuelto model", error, info);
  }

  override render() {
    if (this.state.hasError) {
      return <RenderingErrorState />;
    }

    return this.props.children;
  }
}

const viewLabels: Array<{ id: ViewName; label: string }> = [
  { id: "front", label: "FRONT" },
  { id: "profile", label: "PROFILE" },
  { id: "rear", label: "REAR" },
];

export function CarExperience() {
  useEffect(() => {
    preloadRevueltoAssets();
  }, []);

  const reducedMotion = useMediaPreference("(prefers-reduced-motion: reduce)");
  const lightTheme = useMediaPreference("(prefers-color-scheme: light)");
  const webGL2Available = useWebGL2Availability();
  const [activeView, setActiveView] = useState<ViewName>("front");
  const [viewRevision, setViewRevision] = useState(0);
  const [autoRotate, setAutoRotate] = useState(false);
  const [modelError, setModelError] = useState(false);
  const [paintColor, setPaintColor] = useState<string>(paintOptions[0].color);
  const [sceneReady, setSceneReady] = useState(false);
  const markSceneReady = useCallback(() => setSceneReady(true), []);

  const selectView = (view: ViewName) => {
    setActiveView(view);
    setViewRevision((current) => current + 1);
    setAutoRotate(false);
  };
  const renderingFailed = modelError || webGL2Available === false;

  return (
    <section className={styles.experience} aria-labelledby="vehicle-title">
      <p className={styles.backdropWord} aria-hidden="true">
        REVUELTO
      </p>

      <header className={styles.header}>
        <a className={styles.brand} href="#vehicle-title" aria-label="Revuelto home">
          <span>AUTOMOBILI</span>
          <strong>LAMBORGHINI</strong>
        </a>

        <nav className={styles.viewNav} aria-label="Choose a camera angle">
          <span className={styles.viewLabel}>VIEW</span>
          {viewLabels.map((view) => (
            <button
              key={view.id}
              type="button"
              className={activeView === view.id ? styles.activeView : undefined}
              aria-pressed={activeView === view.id}
              onClick={() => selectView(view.id)}
            >
              {view.label}
            </button>
          ))}
        </nav>
      </header>

      <div
        className={styles.canvasWrap}
        role={renderingFailed ? undefined : "img"}
        aria-label={
          renderingFailed ? undefined : "Interactive three-dimensional Lamborghini Revuelto"
        }
      >
        {webGL2Available === false ? <RenderingErrorState /> : null}
        {webGL2Available ? (
          <SceneErrorBoundary onError={() => setModelError(true)}>
            <Canvas
              dpr={[1, 1.55]}
              camera={{ position: [4.35, 1.6, -6.3], fov: 32, near: 0.1, far: 100 }}
              gl={{
                antialias: true,
                alpha: true,
                powerPreference: "high-performance",
                outputColorSpace: THREE.SRGBColorSpace,
                toneMapping: THREE.ACESFilmicToneMapping,
                toneMappingExposure: lightTheme ? 0.96 : 0.86,
              }}
              performance={{ min: 0.55 }}
            >
              <Suspense fallback={null}>
                <Scene
                  activeView={activeView}
                  viewRevision={viewRevision}
                  autoRotate={autoRotate}
                  reducedMotion={reducedMotion}
                  lightTheme={lightTheme}
                  paintColor={paintColor}
                  onReady={markSceneReady}
                  onInteraction={() => setAutoRotate(false)}
                />
              </Suspense>
            </Canvas>
          </SceneErrorBoundary>
        ) : null}
      </div>

      <div className={styles.heroCopy}>
        <p className={styles.eyebrow}>FROM NOW ON</p>
        <h1 id="vehicle-title">REVUELTO</h1>
        <p className={styles.intro}>A new era of V12 performance, rendered in real time.</p>
        <button
          type="button"
          className={styles.primaryAction}
          aria-pressed={autoRotate}
          onClick={() => setAutoRotate((current) => !current)}
        >
          {autoRotate ? "PAUSE 360" : "VIEW 360"}
        </button>
      </div>

      <aside className={styles.interactionNote} aria-label="Interaction instructions">
        <span>DRAG TO ROTATE</span>
        <span>WHEEL TO ZOOM</span>
      </aside>

      <div className={styles.powertrain} aria-label="Powertrain">
        <span>V12</span>
        <span>HPEV</span>
      </div>

      <div className={styles.paintSelector} aria-label="Choose a paint color">
        <span>PAINT</span>
        {paintOptions.map((paint) => (
          <button
            key={paint.label}
            type="button"
            className={paintColor === paint.color ? styles.activePaint : undefined}
            style={{ backgroundColor: paint.color }}
            aria-label={paint.label}
            aria-pressed={paintColor === paint.color}
            onClick={() => setPaintColor(paint.color)}
          />
        ))}
      </div>

      {!renderingFailed ? <LoadingOverlay sceneReady={sceneReady} /> : null}
    </section>
  );
}
