"use client";

import { Environment, Lightformer, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import {
  Component,
  type ErrorInfo,
  type ReactNode,
  Suspense,
  useEffect,
  useMemo,
  useRef,
} from "react";
import * as THREE from "three";

import styles from "./marketing-home.module.css";

const LOGO_MODEL_URL = "/models/trends-logo-new.glb";
const SHADER_URL = "/shaders/hero-liquid-metal.glsl";

const vertexShader = /* glsl */ `
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

class SceneErrorBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { hasError: boolean }
> {
  override state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError();
    console.error("Unable to render the Trends hero scene", error, info);
  }

  override render() {
    return this.state.hasError ? null : this.props.children;
  }
}

function LiquidMetalBackground({ motionEnabled }: { motionEnabled: boolean }) {
  const fragmentShader = useLoader(THREE.FileLoader, SHADER_URL) as unknown as string;
  const viewport = useThree((state) => state.viewport);
  const gl = useThree((state) => state.gl);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const drawingBufferSize = useMemo(() => new THREE.Vector2(), []);
  const uniforms = useMemo(
    () => ({
      u_resolution: { value: new THREE.Vector2(1, 1) },
      u_time: { value: 0 },
      u_speed: { value: 0.08 },
      u_scale: { value: 2.15 },
      u_reflection: { value: 1.2 },
      u_black: { value: new THREE.Color("#050506") },
      u_metal: { value: new THREE.Color("#d8c49a") },
      u_red: { value: new THREE.Color("#c81d2b") },
    }),
    [],
  );

  useFrame(({ clock }) => {
    const material = materialRef.current;
    if (!material) return;
    gl.getDrawingBufferSize(drawingBufferSize);
    material.uniforms.u_resolution?.value.copy(drawingBufferSize);
    if (motionEnabled && material.uniforms.u_time) {
      material.uniforms.u_time.value = clock.elapsedTime;
    }
  });

  return (
    <mesh
      position={[0, 0, -3]}
      renderOrder={-1000}
      scale={[viewport.width * 1.72, viewport.height * 1.72, 1]}
    >
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        depthTest={false}
        depthWrite={false}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        vertexShader={vertexShader}
      />
    </mesh>
  );
}

function LogoModel({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene: sourceScene } = useGLTF(LOGO_MODEL_URL);
  const viewport = useThree((state) => state.viewport);
  const canvasWidth = useThree((state) => state.size.width);
  const prepared = useMemo(() => {
    const scene = sourceScene.clone(true);
    const materialCopies = new Map<THREE.Material, THREE.Material>();

    scene.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;
      object.renderOrder = 1;
      const copyMaterial = (material: THREE.Material) => {
        const existing = materialCopies.get(material);
        if (existing) return existing;
        const copy = material.clone();
        copy.side = THREE.DoubleSide;
        if (copy instanceof THREE.MeshStandardMaterial) copy.envMapIntensity = 1.45;
        copy.needsUpdate = true;
        materialCopies.set(material, copy);
        return copy;
      };
      object.material = Array.isArray(object.material)
        ? object.material.map(copyMaterial)
        : copyMaterial(object.material);
    });

    scene.updateMatrixWorld(true);
    const bounds = new THREE.Box3().setFromObject(scene);
    const center = bounds.getCenter(new THREE.Vector3());
    const size = bounds.getSize(new THREE.Vector3());
    const scale = 1 / Math.max(size.y, 0.001);

    return {
      materials: Array.from(materialCopies.values()),
      position: center.clone().multiplyScalar(-1),
      scale,
      scene,
    };
  }, [sourceScene]);

  useEffect(
    () => () => prepared.materials.forEach((material) => material.dispose()),
    [prepared.materials],
  );

  useFrame((_, delta) => {
    if (active && groupRef.current) groupRef.current.rotation.y += delta * 0.38;
  });

  const mobileViewport = canvasWidth < 768;
  const modelHeight = viewport.height * (mobileViewport ? 0.15 : 0.175);
  const modelVerticalPosition = viewport.height * (mobileViewport ? 0.25 : 0.22);

  return (
    <group
      ref={groupRef}
      position={[0, modelVerticalPosition, 0]}
      rotation={[-0.045, -0.18, -0.012]}
      scale={prepared.scale * modelHeight}
    >
      <group position={prepared.position}>
        <primitive object={prepared.scene} dispose={null} />
      </group>
    </group>
  );
}

function SceneReady({ onReady }: { onReady: () => void }) {
  const reported = useRef(false);

  useFrame(() => {
    if (reported.current) return;
    reported.current = true;
    onReady();
  });

  return null;
}

function HeroScene({ motionEnabled, onReady }: { motionEnabled: boolean; onReady: () => void }) {
  return (
    <>
      <LiquidMetalBackground motionEnabled={motionEnabled} />
      <ambientLight intensity={0.12} />
      <directionalLight color="#fff7ea" intensity={3.2} position={[-4.5, 4.8, 5]} />
      <directionalLight color="#c7ad7b" intensity={2.4} position={[-2.8, 0.7, 2.4]} />
      <directionalLight color="#c81d2b" intensity={5.2} position={[3.8, 0.1, -3.4]} />
      <Environment environmentIntensity={0.9} resolution={128}>
        <Lightformer
          color="#fff7ea"
          form="rect"
          intensity={4.2}
          position={[-2.1, 1.3, 3]}
          rotation={[0, 0.18, -0.08]}
          scale={[0.8, 4.6, 1]}
        />
        <Lightformer
          color="#c81d2b"
          form="rect"
          intensity={5}
          position={[2.6, -0.2, -2]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[3.6, 0.7, 1]}
        />
      </Environment>
      <LogoModel active={motionEnabled} />
      <SceneReady onReady={onReady} />
    </>
  );
}

export function HeroLogoScene({
  active,
  motionEnabled,
  onError,
  onReady,
}: {
  active: boolean;
  motionEnabled: boolean;
  onError: () => void;
  onReady: () => void;
}) {
  return (
    <div className={styles.heroCanvas}>
      <SceneErrorBoundary onError={onError}>
        <Canvas
          camera={{ far: 20, fov: 42, near: 0.01, position: [0, 0, 5] }}
          dpr={[1, 1.5]}
          frameloop={!active ? "never" : motionEnabled ? "always" : "demand"}
          gl={{
            alpha: false,
            antialias: true,
            outputColorSpace: THREE.SRGBColorSpace,
            powerPreference: "high-performance",
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.06,
          }}
          onCreated={({ gl }) => {
            gl.domElement.addEventListener(
              "webglcontextlost",
              (event) => {
                event.preventDefault();
                onError();
              },
              { once: true },
            );
          }}
        >
          <Suspense fallback={null}>
            <HeroScene motionEnabled={motionEnabled} onReady={onReady} />
          </Suspense>
        </Canvas>
      </SceneErrorBoundary>
    </div>
  );
}

useGLTF.preload(LOGO_MODEL_URL);
