'use client';

import React, { useRef, useState, useEffect, useImperativeHandle, forwardRef, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RotateCw, HelpCircle } from 'lucide-react';

export interface HelmetViewerHandle {
  setBand: (band: 'all' | 'uhf' | 'lband') => void;
  setExploded: (exploded: boolean) => void;
  startRFTrace: (onComplete?: () => void) => void;
  resetView: () => void;
}

interface HelmetViewerProps {
  onRFTraceComplete?: () => void;
  activeBand?: 'all' | 'uhf' | 'lband';
}

const isWebGLSupported = () => {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl') || canvas.getContext('webgl2'))
    );
  } catch {
    return false;
  }
};

const ANTENNA_LAYER_KEYS = ['lamination', 'cstPlane', 'uhf', 'lband', 'feed', 'rogers', 'amc'] as const;

export const HelmetViewer = forwardRef<HelmetViewerHandle, HelmetViewerProps>(
  ({ onRFTraceComplete, activeBand: propBand = 'all' }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const controlsRef = useRef<OrbitControls | null>(null);
    const helmetGroupRef = useRef<THREE.Group | null>(null);
    const layersRef = useRef<{ [key: string]: THREE.Object3D }>({});
    const rfPulseMeshRef = useRef<THREE.Mesh | null>(null);
    const coaxCurveRef = useRef<THREE.CatmullRomCurve3 | null>(null);
    const isTracingRFRef = useRef<boolean>(false);
    const rfTraceProgressRef = useRef<number>(0);
    const isExplodedRef = useRef<boolean>(false);
    const explodeAnimIdRef = useRef<number | null>(null);
    const cameraAnimIdRef = useRef<number | null>(null);
    const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
    const cstPlaneMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
    const onRFTraceCompleteRef = useRef(onRFTraceComplete);

    const [webglError, setWebglError] = useState<boolean>(false);
    const [currentBand, setCurrentBand] = useState<'all' | 'uhf' | 'lband'>(propBand);
    const [currentExploded, setCurrentExploded] = useState<boolean>(false);
    const [showGpuHelp, setShowGpuHelp] = useState<boolean>(false);

    useEffect(() => {
      onRFTraceCompleteRef.current = onRFTraceComplete;
    }, [onRFTraceComplete]);

    useEffect(() => {
      setCurrentBand(propBand);
    }, [propBand]);

    const handleSetBand = useCallback((band: 'all' | 'uhf' | 'lband') => {
      const resetCST = () => {
        if (cstPlaneMatRef.current) {
          cstPlaneMatRef.current.emissive = new THREE.Color(0x000000);
          cstPlaneMatRef.current.emissiveIntensity = 0;
          cstPlaneMatRef.current.needsUpdate = true;
        }
      };

      const layers = layersRef.current;

      if (band === 'uhf') {
        resetCST();
        if (layers['uhf']) {
          layers['uhf'].visible = true;
          const mat = (layers['uhf'] as THREE.Mesh).material as THREE.MeshStandardMaterial;
          if (mat) {
            mat.opacity = 1.0;
            mat.emissive.setHex(0x4f46e5);
            mat.emissiveIntensity = 0.95;
            mat.needsUpdate = true;
          }
        }
        if (layers['lband']) {
          const mat = (layers['lband'] as THREE.Mesh).material as THREE.MeshStandardMaterial;
          if (mat) {
            mat.opacity = 0.45;
            mat.emissive.setHex(0xca8a04);
            mat.emissiveIntensity = 0.05;
            mat.needsUpdate = true;
          }
        }
        if (cstPlaneMatRef.current) {
          cstPlaneMatRef.current.emissive = new THREE.Color(0x4f46e5);
          cstPlaneMatRef.current.emissiveIntensity = 0.25;
          cstPlaneMatRef.current.needsUpdate = true;
        }
      } else if (band === 'lband') {
        resetCST();
        if (layers['lband']) {
          layers['lband'].visible = true;
          const mat = (layers['lband'] as THREE.Mesh).material as THREE.MeshStandardMaterial;
          if (mat) {
            mat.opacity = 1.0;
            mat.emissive.setHex(0x0284c7);
            mat.emissiveIntensity = 0.95;
            mat.needsUpdate = true;
          }
        }
        if (layers['uhf']) {
          const mat = (layers['uhf'] as THREE.Mesh).material as THREE.MeshStandardMaterial;
          if (mat) {
            mat.opacity = 0.45;
            mat.emissive.setHex(0xb45309);
            mat.emissiveIntensity = 0.05;
            mat.needsUpdate = true;
          }
        }
        if (cstPlaneMatRef.current) {
          cstPlaneMatRef.current.emissive = new THREE.Color(0x0284c7);
          cstPlaneMatRef.current.emissiveIntensity = 0.25;
          cstPlaneMatRef.current.needsUpdate = true;
        }
      } else {
        resetCST();
        if (layers['uhf']) {
          const mat = (layers['uhf'] as THREE.Mesh).material as THREE.MeshStandardMaterial;
          if (mat) {
            mat.opacity = 0.95;
            mat.emissive.setHex(0xb45309);
            mat.emissiveIntensity = 0.2;
            mat.needsUpdate = true;
          }
        }
        if (layers['lband']) {
          const mat = (layers['lband'] as THREE.Mesh).material as THREE.MeshStandardMaterial;
          if (mat) {
            mat.opacity = 0.95;
            mat.emissive.setHex(0xca8a04);
            mat.emissiveIntensity = 0.2;
            mat.needsUpdate = true;
          }
        }
      }
    }, []);

    const handleSetExploded = useCallback((exploded: boolean) => {
      isExplodedRef.current = exploded;
      setCurrentExploded(exploded);
      const layers = layersRef.current;

      if (explodeAnimIdRef.current) {
        cancelAnimationFrame(explodeAnimIdRef.current);
        explodeAnimIdRef.current = null;
      }

      const targetOffsets: { [key: string]: number } = exploded
        ? {
            lamination: 0.45,
            cstPlane: 0.30,
            uhf: 0.30,
            lband: 0.30,
            feed: 0.30,
            rogers: 0.18,
            amc: 0.08,
          }
        : {
            lamination: 0,
            cstPlane: 0,
            uhf: 0,
            lband: 0,
            feed: 0,
            rogers: 0,
            amc: 0,
          };

      const duration = 550;
      const startTime = performance.now();
      const startPositions: { [key: string]: number } = {};

      ANTENNA_LAYER_KEYS.forEach((key) => {
        if (layers[key]) {
          startPositions[key] = layers[key].position.y;
        }
      });

      const animateExplode = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);

        ANTENNA_LAYER_KEYS.forEach((key) => {
          if (layers[key]) {
            const start = startPositions[key] ?? 0;
            const target = targetOffsets[key] ?? 0;
            layers[key].position.y = start + (target - start) * ease;
          }
        });

        if (progress < 1) {
          explodeAnimIdRef.current = requestAnimationFrame(animateExplode);
        } else {
          ANTENNA_LAYER_KEYS.forEach((key) => {
            if (layers[key]) {
              layers[key].position.y = targetOffsets[key] ?? 0;
            }
          });
          explodeAnimIdRef.current = null;
        }
      };

      explodeAnimIdRef.current = requestAnimationFrame(animateExplode);
    }, []);

    const animateCameraTo = (x: number, y: number, z: number, targetY: number = 1.6) => {
      if (!cameraRef.current) return;
      if (cameraAnimIdRef.current) {
        cancelAnimationFrame(cameraAnimIdRef.current);
        cameraAnimIdRef.current = null;
      }

      const camera = cameraRef.current;
      const startX = camera.position.x;
      const startY = camera.position.y;
      const startZ = camera.position.z;
      const duration = 800;
      const startTime = performance.now();

      const step = (time: number) => {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);

        camera.position.set(
          startX + (x - startX) * ease,
          startY + (y - startY) * ease,
          startZ + (z - startZ) * ease
        );
        if (controlsRef.current) {
          controlsRef.current.target.set(0, targetY, 0);
          controlsRef.current.update();
        }

        if (progress < 1) {
          cameraAnimIdRef.current = requestAnimationFrame(step);
        } else {
          cameraAnimIdRef.current = null;
        }
      };
      cameraAnimIdRef.current = requestAnimationFrame(step);
    };

    const handleStartRFTrace = () => {
      isTracingRFRef.current = true;
      rfTraceProgressRef.current = 0;
      if (rfPulseMeshRef.current) rfPulseMeshRef.current.visible = true;
      animateCameraTo(-2.4, 2.5, -3.4, 1.8);
    };

    const handleResetView = useCallback(() => {
      if (explodeAnimIdRef.current) {
        cancelAnimationFrame(explodeAnimIdRef.current);
        explodeAnimIdRef.current = null;
      }

      const layers = layersRef.current;
      ANTENNA_LAYER_KEYS.forEach((key) => {
        if (layers[key]) {
          layers[key].position.y = 0;
        }
      });

      isExplodedRef.current = false;
      setCurrentExploded(false);

      handleSetBand('all');

      animateCameraTo(2.8, 3.2, 3.2, 1.6);
      if (controlsRef.current) {
        controlsRef.current.target.set(0, 1.6, 0);
        controlsRef.current.update();
      }
    }, [handleSetBand]);

    useImperativeHandle(ref, () => ({
      setBand: (band) => {
        setCurrentBand(band);
        handleSetBand(band);
      },
      setExploded: (exploded) => {
        handleSetExploded(exploded);
      },
      startRFTrace: (onComplete) => {
        if (onComplete) onRFTraceCompleteRef.current = onComplete;
        handleStartRFTrace();
      },
      resetView: () => {
        setCurrentBand('all');
        handleResetView();
      },
    }));

    const initThree = useCallback(() => {
      if (!containerRef.current) return;
      const container = containerRef.current;

      if (!isWebGLSupported()) {
        setWebglError(true);
        return;
      }

      const width = container.clientWidth || 600;
      const height = container.clientHeight || 500;

      // 1. Scene setup
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xffffff);
      sceneRef.current = scene;

      // 2. Camera setup (elevated 3/4 front view showcasing the front-facing UHF band)
      const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
      camera.position.set(2.8, 3.2, 3.2);
      cameraRef.current = camera;

      // 3. Renderer setup
      let renderer: THREE.WebGLRenderer | null = null;
      try {
        renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          powerPreference: 'default',
          failIfMajorPerformanceCaveat: false,
        });
      } catch (err) {
        console.warn('Could not create WebGL context:', err);
        setWebglError(true);
        return;
      }

      if (!renderer || !renderer.domElement) {
        setWebglError(true);
        return;
      }

      setWebglError(false);
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      if (THREE.ACESFilmicToneMapping) {
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.15;
      }
      rendererRef.current = renderer;

      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      container.appendChild(renderer.domElement);

      // 4. Lighting setup
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
      scene.add(ambientLight);

      const hemiLight = new THREE.HemisphereLight(0xffffff, 0x475569, 0.9);
      hemiLight.position.set(0, 20, 0);
      scene.add(hemiLight);

      const keyLight = new THREE.DirectionalLight(0xffffff, 1.9);
      keyLight.position.set(6, 14, 8);
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0xf1f5f9, 1.3);
      fillLight.position.set(-6, 8, -6);
      scene.add(fillLight);

      const crownLight = new THREE.DirectionalLight(0xffffff, 1.4);
      crownLight.position.set(0, 10, 0);
      scene.add(crownLight);

      const gridHelper = new THREE.GridHelper(12, 24, 0xcbd5e1, 0xf1f5f9);
      gridHelper.position.y = -0.05;
      scene.add(gridHelper);

      const shadowGeo = new THREE.PlaneGeometry(8, 8);
      const shadowMat = new THREE.ShadowMaterial({ opacity: 0.14 });
      const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
      shadowPlane.rotation.x = -Math.PI / 2;
      shadowPlane.position.y = -0.04;
      shadowPlane.receiveShadow = true;
      scene.add(shadowPlane);

      // 5. Controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.06;
      controls.minDistance = 1.8;
      controls.maxDistance = 10;
      controls.maxPolarAngle = Math.PI / 2 + 0.1;
      controls.target.set(0, 1.6, 0);
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.6;

      controls.addEventListener('start', () => {
        controls.autoRotate = false;
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      });

      controls.addEventListener('end', () => {
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        idleTimerRef.current = setTimeout(() => {
          if (!isExplodedRef.current) controls.autoRotate = true;
        }, 3000);
      });
      controlsRef.current = controls;

      // 6. Helmet Group & Rotated Conformal Antenna Assembly (UHF facing front +Z, L-Band at rear -Z)
      const helmetGroup = new THREE.Group();
      helmetGroupRef.current = helmetGroup;
      scene.add(helmetGroup);

      // Mathematical crown height formula
      const getCrownY = (x: number, z: number, layerOffset: number = 0) => {
        const x2 = x * x;
        const z2 = z * z;
        return (
          2.658 -
          0.375 * x2 -
          0.021 * z -
          0.163 * z2 -
          0.298 * x2 * x2 -
          0.110 * z * z2 +
          layerOffset
        );
      };

      // Helper to generate conformal planar mesh
      const createConformalPlane = (
        minX: number,
        maxX: number,
        minZ: number,
        maxZ: number,
        segsX: number,
        segsZ: number,
        layerOffset: number
      ) => {
        const width = maxX - minX;
        const depth = maxZ - minZ;
        const geo = new THREE.PlaneGeometry(width, depth, segsX, segsZ);
        const pos = geo.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          const localX = pos.getX(i);
          const localY = pos.getY(i);
          const worldX = minX + (localX + width * 0.5);
          const worldZ = minZ + (localY + depth * 0.5);
          const worldY = getCrownY(worldX, worldZ, layerOffset);
          pos.setXYZ(i, worldX, worldY, worldZ);
        }
        geo.computeVertexNormals();
        return geo;
      };

      const antennaGroup = new THREE.Group();
      antennaGroup.name = 'conformalAntenna';

      // Layer 1: AMC Ground Plane (Aligned along Z from -0.56 to +0.56, offset = 0.005)
      const amcMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        metalness: 0.85,
        roughness: 0.3,
        side: THREE.DoubleSide,
      });
      const amcGeo = createConformalPlane(-0.26, 0.26, -0.56, 0.56, 16, 28, 0.005);
      const amcMesh = new THREE.Mesh(amcGeo, amcMat);
      amcMesh.castShadow = true;
      layersRef.current['amc'] = amcMesh;
      antennaGroup.add(amcMesh);

      // AMC Periodic Grid Overlay
      const amcGridMat = new THREE.MeshBasicMaterial({
        color: 0x059669,
        wireframe: true,
        transparent: true,
        opacity: 0.4,
      });
      const amcGrid = new THREE.Mesh(amcGeo, amcGridMat);
      amcMesh.add(amcGrid);

      // Layer 2: Rogers RT/duroid 5880 Substrate Plate (Offset = 0.010)
      const rogersMat = new THREE.MeshStandardMaterial({
        color: 0x1d4ed8,
        roughness: 0.25,
        metalness: 0.15,
        transparent: true,
        opacity: 0.72,
        side: THREE.DoubleSide,
      });
      const rogersGeo = createConformalPlane(-0.24, 0.24, -0.54, 0.54, 16, 28, 0.010);
      const rogersMesh = new THREE.Mesh(rogersGeo, rogersMat);
      rogersMesh.castShadow = true;
      layersRef.current['rogers'] = rogersMesh;
      antennaGroup.add(rogersMesh);

      // Layer 3: CST Antenna Layout with 90° rotation (UHF element facing front +Z)
      const cstPlaneMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.3,
        roughness: 0.35,
        transparent: true,
        opacity: 0.95,
        side: THREE.DoubleSide,
      });
      cstPlaneMatRef.current = cstPlaneMat;

      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(
        '/cst_antenna_design.png',
        (tex) => {
          tex.wrapS = THREE.ClampToEdgeWrapping;
          tex.wrapT = THREE.ClampToEdgeWrapping;
          // Rotate texture 90° so the UHF element faces the front (+Z) of the helmet
          tex.center.set(0.5, 0.5);
          tex.rotation = Math.PI / 2;
          cstPlaneMat.map = tex;
          cstPlaneMat.needsUpdate = true;
        },
        undefined,
        () => {
          cstPlaneMat.color.setHex(0x1e3a8a);
        }
      );

      const cstBoardGeo = createConformalPlane(-0.22, 0.22, -0.52, 0.52, 16, 28, 0.014);
      const cstBoardMesh = new THREE.Mesh(cstBoardGeo, cstPlaneMat);
      cstBoardMesh.castShadow = true;
      layersRef.current['cstPlane'] = cstBoardMesh;
      antennaGroup.add(cstBoardMesh);

      // 3A. FRONT Element: Horizontal Rectangular UHF PIFA (433 MHz) facing FRONT (+Z)
      const uhfMat = new THREE.MeshStandardMaterial({
        color: 0xb45309,
        metalness: 0.95,
        roughness: 0.18,
        emissive: 0xb45309,
        emissiveIntensity: 0.2,
        side: THREE.DoubleSide,
      });
      const uhfGeo = createConformalPlane(-0.065, 0.065, 0.08, 0.48, 10, 18, 0.017);
      const uhfMesh = new THREE.Mesh(uhfGeo, uhfMat);
      uhfMesh.castShadow = true;
      layersRef.current['uhf'] = uhfMesh;
      antennaGroup.add(uhfMesh);

      // 3B. REAR Element: Vertical Rectangular L-Band Patch (1.51 GHz) facing REAR (-Z)
      const lbandMat = new THREE.MeshStandardMaterial({
        color: 0xca8a04,
        metalness: 0.95,
        roughness: 0.18,
        emissive: 0xca8a04,
        emissiveIntensity: 0.2,
        side: THREE.DoubleSide,
      });
      const lbandGeo = createConformalPlane(-0.18, 0.18, -0.46, -0.14, 18, 18, 0.017);
      const lbandMesh = new THREE.Mesh(lbandGeo, lbandMat);
      lbandMesh.castShadow = true;
      layersRef.current['lband'] = lbandMesh;
      antennaGroup.add(lbandMesh);

      // 3C. Center Microstrip Feedline & Lumped SMD Matching Network along Z
      const feedMat = new THREE.MeshStandardMaterial({
        color: 0xd97706,
        metalness: 0.9,
        roughness: 0.2,
        side: THREE.DoubleSide,
      });
      const feedGeo = createConformalPlane(-0.010, 0.010, -0.14, 0.08, 4, 8, 0.017);
      const feedMesh = new THREE.Mesh(feedGeo, feedMat);
      feedMesh.castShadow = true;

      const smdMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8, roughness: 0.25 });
      const smdGeo = createConformalPlane(-0.020, 0.020, -0.040, 0.012, 4, 4, 0.020);
      const smdMesh = new THREE.Mesh(smdGeo, smdMat);

      const feedGroup = new THREE.Group();
      feedGroup.add(feedMesh);
      feedGroup.add(smdMesh);
      layersRef.current['feed'] = feedGroup;
      antennaGroup.add(feedGroup);

      // Layer 4: Conformal Protective Radome Lamination (Offset = 0.022)
      const lamMat = new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        roughness: 0.08,
        metalness: 0.05,
        transparent: true,
        opacity: 0.26,
        side: THREE.DoubleSide,
      });
      const lamGeo = createConformalPlane(-0.26, 0.26, -0.56, 0.56, 16, 28, 0.022);
      const lamMesh = new THREE.Mesh(lamGeo, lamMat);
      layersRef.current['lamination'] = lamMesh;
      antennaGroup.add(lamMesh);

      helmetGroup.add(antennaGroup);

      // 7. Rear Coaxial Feed Cable & Breakaway Connector
      // Originates directly at the rear of the L-band substrate (-Z) and curves down the rear spine
      const coaxPoints = [
        new THREE.Vector3(0, 2.60, -0.54),
        new THREE.Vector3(0, 2.50, -0.75),
        new THREE.Vector3(0, 2.36, -0.95),
        new THREE.Vector3(0, 2.08, -1.12),
        new THREE.Vector3(0, 1.65, -1.26),
        new THREE.Vector3(0, 1.18, -1.34),
        new THREE.Vector3(0, 0.92, -1.36),
      ];
      const coaxCurve = new THREE.CatmullRomCurve3(coaxPoints);
      coaxCurveRef.current = coaxCurve;

      const coaxGeo = new THREE.TubeGeometry(coaxCurve, 64, 0.020, 12, false);
      const coaxMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.75, metalness: 0.25 });
      const coaxMesh = new THREE.Mesh(coaxGeo, coaxMat);
      coaxMesh.castShadow = true;
      helmetGroup.add(coaxMesh);

      // Tactical Cable Retention Clips
      const clipMat = new THREE.MeshStandardMaterial({ color: 0x27272a, roughness: 0.6, metalness: 0.4 });
      [0.20, 0.48, 0.74, 0.92].forEach((t) => {
        const pt = coaxCurve.getPoint(t);
        const clipGeo = new THREE.BoxGeometry(0.065, 0.025, 0.04);
        const clipMesh = new THREE.Mesh(clipGeo, clipMat);
        clipMesh.position.copy(pt);
        clipMesh.rotation.x = 0.2 + t * 0.4;
        helmetGroup.add(clipMesh);
      });

      // Quick-Disconnect Gold Breakaway Connector at the Nape
      const connectorGroup = new THREE.Group();
      const connBaseGeo = new THREE.CylinderGeometry(0.038, 0.038, 0.12, 16);
      const connMat = new THREE.MeshStandardMaterial({
        color: 0xd97706,
        metalness: 0.95,
        roughness: 0.18,
      });
      const connBase = new THREE.Mesh(connBaseGeo, connMat);
      connBase.rotation.x = Math.PI / 2 + 0.2;
      connectorGroup.add(connBase);

      const collarGeo = new THREE.CylinderGeometry(0.046, 0.046, 0.035, 16);
      const collarMat = new THREE.MeshStandardMaterial({ color: 0x1f2937, metalness: 0.8, roughness: 0.3 });
      const collarMesh = new THREE.Mesh(collarGeo, collarMat);
      collarMesh.rotation.x = Math.PI / 2 + 0.2;
      collarMesh.position.set(0, -0.015, -0.02);
      connectorGroup.add(collarMesh);

      connectorGroup.position.set(0, 0.92, -1.36);
      helmetGroup.add(connectorGroup);

      // 8. RF Pulse Tracer
      const pulseGeo = new THREE.SphereGeometry(0.040, 16, 16);
      const pulseMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.95 });
      const rfPulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
      rfPulseMesh.visible = false;
      helmetGroup.add(rfPulseMesh);
      rfPulseMeshRef.current = rfPulseMesh;

      // Direct raycast conformal mapping onto loaded 3D helmet mesh
      const conformGeometryToHelmet = (geo: THREE.BufferGeometry, modelMesh: THREE.Object3D, layerOffset: number) => {
        const raycaster = new THREE.Raycaster();
        const pos = geo.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          const x = pos.getX(i);
          const z = pos.getZ(i);
          raycaster.set(new THREE.Vector3(x, 5, z), new THREE.Vector3(0, -1, 0));
          const hits = raycaster.intersectObject(modelMesh, true);
          if (hits.length > 0) {
            pos.setY(i, hits[0].point.y + layerOffset);
          }
        }
        geo.computeVertexNormals();
        pos.needsUpdate = true;
      };

      // 9. Procedural Fallback Helmet
      const buildTacticalHelmetFallback = () => {
        const shellMat = new THREE.MeshStandardMaterial({
          color: 0x1f2126,
          roughness: 0.82,
          metalness: 0.12,
          side: THREE.DoubleSide,
        });

        const shellGeo = new THREE.SphereGeometry(1.35, 64, 48, 0, Math.PI * 2, 0, Math.PI * 0.58);
        const pos = shellGeo.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          let x = pos.getX(i);
          let y = pos.getY(i);
          let z = pos.getZ(i);
          z *= 1.15;
          x *= 0.98;
          if (Math.abs(x) > 0.78 && z > -0.4 && z < 0.5 && y < 0.25) {
            y += (0.3 - y) * 0.75;
          }
          if (z > 0.8 && y < 0.3) {
            y += 0.05 * Math.sin((z - 0.8) * 3);
          }
          if (z < -0.8 && y < 0.2) {
            y -= 0.08 * (Math.abs(z) - 0.8);
          }
          pos.setXYZ(i, x, y + 1.31, z - 0.05);
        }
        shellGeo.computeVertexNormals();

        const shellMesh = new THREE.Mesh(shellGeo, shellMat);
        shellMesh.castShadow = true;
        shellMesh.receiveShadow = true;
        helmetGroup.add(shellMesh);
      };

      // 10. Load 3D GLTF Model (/scene-v1.glb)
      const loader = new GLTFLoader();
      loader.load(
        '/scene-v1.glb',
        (gltf) => {
          const model = gltf.scene;
          model.rotation.y = Math.PI / 2;
          model.updateMatrixWorld(true);

          const box = new THREE.Box3().setFromObject(model);
          const size = box.getSize(new THREE.Vector3());
          const center = box.getCenter(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z);
          const targetSize = 2.8;
          const scale = targetSize / maxDim;
          model.scale.setScalar(scale);

          model.position.set(-center.x * scale, -box.min.y * scale, -center.z * scale);
          model.updateMatrixWorld(true);

          model.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              mesh.castShadow = true;
              mesh.receiveShadow = true;
              if (mesh.material) {
                if (Array.isArray(mesh.material)) {
                  mesh.material.forEach((m) => {
                    if (m && 'roughness' in m)
                      (m as THREE.MeshStandardMaterial).roughness = Math.max(
                        (m as THREE.MeshStandardMaterial).roughness,
                        0.35
                      );
                  });
                } else if ('roughness' in mesh.material) {
                  (mesh.material as THREE.MeshStandardMaterial).roughness = Math.max(
                    (mesh.material as THREE.MeshStandardMaterial).roughness,
                    0.35
                  );
                }
              }
            }
          });

          // Conform all rotated antenna layers directly to helmet shell surface
          conformGeometryToHelmet(amcGeo, model, 0.005);
          conformGeometryToHelmet(rogersGeo, model, 0.010);
          conformGeometryToHelmet(cstBoardGeo, model, 0.014);
          conformGeometryToHelmet(uhfGeo, model, 0.017);
          conformGeometryToHelmet(lbandGeo, model, 0.017);
          conformGeometryToHelmet(feedGeo, model, 0.017);
          conformGeometryToHelmet(smdGeo, model, 0.020);
          conformGeometryToHelmet(lamGeo, model, 0.022);

          helmetGroup.add(model);

          if (controls) {
            controls.target.set(0, 1.6, 0);
            controls.update();
          }
        },
        undefined,
        (error) => {
          console.warn('Falling back to procedural helmet:', error);
          buildTacticalHelmetFallback();
        }
      );

      // Resize handling
      const handleResize = () => {
        if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
        const w = containerRef.current.clientWidth;
        const h = containerRef.current.clientHeight;
        if (w === 0 || h === 0) return;
        cameraRef.current.aspect = w / h;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(w, h);
      };

      window.addEventListener('resize', handleResize);
      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(container);

      // Animation Loop
      let reqId: number;
      const animate = () => {
        reqId = requestAnimationFrame(animate);

        if (controlsRef.current) {
          controlsRef.current.update();
        }

        if (isTracingRFRef.current && coaxCurveRef.current && rfPulseMeshRef.current) {
          rfTraceProgressRef.current += 0.016;
          if (rfTraceProgressRef.current > 1) {
            rfTraceProgressRef.current = 0;
            isTracingRFRef.current = false;
            rfPulseMeshRef.current.visible = false;
            if (onRFTraceCompleteRef.current) {
              onRFTraceCompleteRef.current();
            }
          } else {
            const t = 1 - rfTraceProgressRef.current;
            const pt = coaxCurveRef.current.getPoint(t);
            rfPulseMeshRef.current.position.copy(pt);
          }
        }

        if (rendererRef.current && sceneRef.current && cameraRef.current) {
          rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
      };

      animate();

      return () => {
        cancelAnimationFrame(reqId);
        if (explodeAnimIdRef.current) cancelAnimationFrame(explodeAnimIdRef.current);
        if (cameraAnimIdRef.current) cancelAnimationFrame(cameraAnimIdRef.current);
        window.removeEventListener('resize', handleResize);
        resizeObserver.disconnect();
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        if (
          rendererRef.current &&
          rendererRef.current.domElement &&
          container.contains(rendererRef.current.domElement)
        ) {
          container.removeChild(rendererRef.current.domElement);
        }
        rendererRef.current?.dispose();
      };
    }, []);

    useEffect(() => {
      initThree();
    }, [initThree]);

    if (webglError) {
      return (
        <div
          id="helmet-canvas-container"
          ref={containerRef}
          className="w-full h-full flex flex-col items-center justify-center p-6 bg-white relative overflow-hidden tech-grid-bg"
          style={{ width: '100%', height: '100%', minHeight: '520px' }}
        >
          <div className="relative z-10 w-full max-w-lg flex flex-col items-center gap-4">
            <div className="relative bg-white border border-borderdark p-3 shadow-md rounded-sm w-full flex items-center justify-center tech-corner-accent">
              <img
                src="/cst_antenna_design.png"
                alt="Conformal Dual-Band Antenna Schematic"
                className="max-h-[320px] w-auto object-contain transition-all duration-300"
              />

              <div className="absolute top-3 left-3 flex flex-col gap-1.5 font-mono text-[10px]">
                <div
                  className={`px-2 py-0.5 border text-xs font-bold transition-all ${
                    currentBand === 'uhf' || currentBand === 'all'
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-sm'
                      : 'bg-white/80 border-slate-200 text-slate-400'
                  }`}
                >
                  UHF: 433 MHz (Front) {currentBand === 'uhf' || currentBand === 'all' ? '● TX/RX' : '○ STBY'}
                </div>
                <div
                  className={`px-2 py-0.5 border text-xs font-bold transition-all ${
                    currentBand === 'lband' || currentBand === 'all'
                      ? 'bg-sky-50 border-sky-500 text-sky-700 shadow-sm'
                      : 'bg-white/80 border-slate-200 text-slate-400'
                  }`}
                >
                  L-BAND: 1.51 GHz (Rear) {currentBand === 'lband' || currentBand === 'all' ? '● TX/RX' : '○ STBY'}
                </div>
              </div>

              <div className="absolute bottom-3 right-3 font-mono text-[10px] text-slate-500 bg-white/90 px-2 py-1 border border-borderlight">
                {currentExploded ? 'EXPLODED STACK VIEW' : 'CONFORMAL CROWN MOUNT'}
              </div>
            </div>

            <div className="w-full bg-slate-50 border border-borderlight p-3 font-mono text-xs flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-slate-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="font-semibold text-charcoal">Calibrated Conformal Crown View Active</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowGpuHelp((prev) => !prev)}
                  className="text-[11px] text-slate-500 hover:text-charcoal flex items-center gap-1 underline underline-offset-2"
                  title="Why is WebGL restricted?"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>3D Info</span>
                </button>

                <button
                  onClick={initThree}
                  className="btn-tech text-[10px] py-1 px-2.5 bg-white hover:bg-slate-100"
                  title="Retry WebGL 3D context initialization"
                >
                  <RotateCw className="w-3 h-3" />
                  <span>RETRY 3D</span>
                </button>
              </div>
            </div>

            {showGpuHelp && (
              <div className="w-full bg-white border border-borderdark p-4 shadow-lg text-left text-xs font-mono space-y-2 animate-fadeIn">
                <div className="font-bold text-charcoal flex items-center justify-between">
                  <span>Enabling 3D WebGL in your Browser:</span>
                  <button
                    onClick={() => setShowGpuHelp(false)}
                    className="text-slate-400 hover:text-charcoal text-xs"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-slate-600 font-sans text-xs leading-relaxed">
                  Your browser currently has GPU hardware acceleration disabled. To enable full 360° interactive WebGL rotation:
                </p>
                <ol className="list-decimal pl-4 space-y-1 text-[11px] text-slate-700">
                  <li>In Chrome / Edge: Go to <strong>Settings → System</strong>.</li>
                  <li>Toggle on <strong>&quot;Use graphics acceleration when available&quot;</strong>.</li>
                  <li>Relaunch the browser and click <strong>&quot;RETRY 3D&quot;</strong> above.</li>
                </ol>
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div
        id="helmet-canvas-container"
        ref={containerRef}
        className="w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />
    );
  }
);

HelmetViewer.displayName = 'HelmetViewer';
