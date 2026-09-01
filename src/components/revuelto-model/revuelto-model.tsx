"use client";

import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo } from "react";
import type { MutableRefObject } from "react";
import * as THREE from "three";
import { clone as cloneSkeleton } from "three/examples/jsm/utils/SkeletonUtils.js";

export const REVUELTO_MODEL_URL = "/models/revuelto-web.glb";
export const REVUELTO_GROUND_AO_URL = "/textures/internal_ground_ao_texture.jpeg";

const DEFAULT_PAINT = "#541118";
const DOOR_HINGE_AXIS = new THREE.Vector3(0, 1, 0);
const COVER_HINGE_AXIS = new THREE.Vector3(1, 0, 0);

type PanelKind = "driver-door" | "passenger-door" | "hood" | "engine-cover";

interface PanelRecord {
  kind: PanelKind;
  object: THREE.Bone;
  position: THREE.Vector3;
  quaternion: THREE.Quaternion;
}

interface RevueltoModelProps {
  paintColor: string;
  storyProgressRef?: MutableRefObject<number>;
}

interface StudioGroundProps {
  color?: string;
  aoIntensity?: number;
  radius?: number;
}

function classifyPanel(object: THREE.Object3D): PanelKind | null {
  if (!(object instanceof THREE.Bone)) return null;
  const normalized = object.name.toLowerCase();
  if (normalized === "door_dside_f") return "driver-door";
  if (normalized === "door_pside_f") return "passenger-door";
  if (normalized === "bonnet") return "hood";
  if (normalized === "boot") return "engine-cover";
  return null;
}

export function isPrimaryPaintMaterial(materialName: string) {
  return /vehicle_generic_smallspecmap \[primary\]/i.test(materialName);
}

function tuneMaterial(material: THREE.Material, paintColor: string) {
  if (!(material instanceof THREE.MeshStandardMaterial)) return;

  const name = material.name.toLowerCase();
  const isPaint = isPrimaryPaintMaterial(name);
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
    material.metalness = 0;
    material.roughness = 0.82;
    material.envMapIntensity = 0.42;
  } else if (isWheel) {
    material.color.set("#353a40");
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

function smoothstep(minimum: number, maximum: number, value: number) {
  const normalized = THREE.MathUtils.clamp((value - minimum) / (maximum - minimum), 0, 1);
  return normalized * normalized * (3 - 2 * normalized);
}

export function restorePanelAmount(progress: number) {
  const open = smoothstep(0.26, 0.44, progress);
  const close = smoothstep(0.58, 0.74, progress);
  return THREE.MathUtils.clamp(open - close, 0, 1);
}

export function updatePrimaryPaintMaterials(
  materials: ReadonlyArray<THREE.MeshStandardMaterial>,
  paintColor: string,
) {
  materials.forEach((material) => {
    material.color.set(paintColor);
    material.needsUpdate = true;
  });
}

export function preloadRevueltoAssets() {
  useGLTF.preload(REVUELTO_MODEL_URL);
  useTexture.preload(REVUELTO_GROUND_AO_URL);
}

export function RevueltoModel({ paintColor, storyProgressRef }: RevueltoModelProps) {
  const { scene: sourceScene } = useGLTF(REVUELTO_MODEL_URL);
  const prepared = useMemo(() => {
    const scene = cloneSkeleton(sourceScene);
    const materialCopies = new Map<THREE.Material, THREE.Material>();
    const primaryMaterials: THREE.MeshStandardMaterial[] = [];
    const panels: PanelRecord[] = [];

    scene.traverse((object) => {
      const panelKind = classifyPanel(object);
      if (panelKind && object instanceof THREE.Bone) {
        panels.push({
          kind: panelKind,
          object,
          position: object.position.clone(),
          quaternion: object.quaternion.clone(),
        });
      }

      if (!(object instanceof THREE.Mesh)) return;

      const copyMaterial = (material: THREE.Material) => {
        const existing = materialCopies.get(material);
        if (existing) return existing;

        const copy = material.clone();
        tuneMaterial(copy, DEFAULT_PAINT);
        materialCopies.set(material, copy);
        if (copy instanceof THREE.MeshStandardMaterial && isPrimaryPaintMaterial(copy.name)) {
          primaryMaterials.push(copy);
        }
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
    const scale = 5.05 / Math.max(size.x, size.z);

    return {
      scene,
      materials: Array.from(materialCopies.values()),
      primaryMaterials,
      panels,
      panelDelta: new THREE.Quaternion(),
      scale,
      position: new THREE.Vector3(
        -center.x * scale,
        -bounds.min.y * scale + 0.045,
        -center.z * scale,
      ),
    };
  }, [sourceScene]);

  useLayoutEffect(() => {
    updatePrimaryPaintMaterials(prepared.primaryMaterials, paintColor);
  }, [paintColor, prepared.primaryMaterials]);

  useEffect(
    () => () => {
      prepared.materials.forEach((material) => material.dispose());
    },
    [prepared.materials],
  );

  useFrame(() => {
    if (!storyProgressRef) return;
    const separation = restorePanelAmount(storyProgressRef.current);

    prepared.panels.forEach((panel) => {
      panel.object.position.copy(panel.position);
      panel.object.quaternion.copy(panel.quaternion);

      const angle =
        panel.kind === "driver-door"
          ? -0.56
          : panel.kind === "passenger-door"
            ? 0.56
            : panel.kind === "hood"
              ? -0.34
              : 0.38;
      prepared.panelDelta.setFromAxisAngle(
        panel.kind.includes("door") ? DOOR_HINGE_AXIS : COVER_HINGE_AXIS,
        angle * separation,
      );
      panel.object.quaternion.multiply(prepared.panelDelta);
    });
  });

  return (
    <group position={prepared.position} scale={prepared.scale}>
      <primitive object={prepared.scene} dispose={null} />
    </group>
  );
}

export function RevueltoStudioGround({
  color = "#111318",
  aoIntensity = 1.18,
  radius = 4.6,
}: StudioGroundProps) {
  const groundAo = useTexture(REVUELTO_GROUND_AO_URL);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.015, 0]}>
      <circleGeometry args={[radius, 96]} />
      <meshStandardMaterial
        color={color}
        roughness={1}
        metalness={0}
        aoMap={groundAo}
        aoMapIntensity={aoIntensity}
      />
    </mesh>
  );
}
