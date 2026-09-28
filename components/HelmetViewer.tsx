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
            mat.opacity = 0.38;
            mat.emissive.setHex(0x4f46e5);
            mat.emissiveIntensity = 0.85;
          }
        }
        if (layers['lband']) {
          layers['lband'].visible = false;
          const mat = (layers['lband'] as THREE.Mesh).material as THREE.MeshStandardMaterial;
          if (mat) mat.opacity = 0.0;
        }
        if (cstPlaneMatRef.current) {
          cstPlaneMatRef.current.emissive = new THREE.Color(0x4f46e5);
          cstPlaneMatRef.current.emissiveIntensity = 0.12;
          cstPlaneMatRef.current.needsUpdate = true;
        }
      } else if (band === 'lband') {
        resetCST();
        if (layers['lband']) {
          layers['lband'].visible = true;
          const mat = (layers['lband'] as THREE.Mesh).material as THREE.MeshStandardMaterial;
          if (mat) {
            mat.opacity = 0.38;
            mat.emissive.setHex(0x0284c7);
            mat.emissiveIntensity = 0.85;
          }
        }
        if (layers['uhf']) {
          layers['uhf'].visible = false;
          const mat = (layers['uhf'] as THREE.Mesh).material as THREE.MeshStandardMaterial;
          if (mat) mat.opacity = 0.0;
        }
        if (cstPlaneMatRef.current) {
          cstPlaneMatRef.current.emissive = new THREE.Color(0x0284c7);
          cstPlaneMatRef.current.emissiveIntensity = 0.12;
          cstPlaneMatRef.current.needsUpdate = true;
        }
      } else {
        resetCST();
        if (layers['uhf']) {
          layers['uhf'].visible = false;
          const mat = (layers['uhf'] as THREE.Mesh).material as THREE.MeshStandardMaterial;
          if (mat) mat.opacity = 0.0;
        }
        if (layers['lband']) {
          layers['lband'].visible = false;
          const mat = (layers['lband'] as THREE.Mesh).material as THREE.MeshStandardMaterial;
          if (mat) mat.opacity = 0.0;
        }
      }
    }, []);

    const handleSetExploded = useCallback((exploded: boolean) => {
      isExplodedRef.current = exploded;
      const layers = layersRef.current;

      const targetOffsets: { [key: string]: number } = exploded
        ? {
            lamination: 1.35,
            uhf: 1.1,
            lband: 1.1,
            rogers: 0.75,
            amc: 0.38,
            shell: 0,
          }
        : {
            lamination: 0,
            uhf: 0,
            lband: 0,
            rogers: 0,
            amc: 0,
            shell: 0,
          };

      const duration = 700;
      const startTime = performance.now();
      const startPositions: { [key: string]: number } = {};

      Object.keys(targetOffsets).forEach((key) => {
        if (layers[key]) {
          startPositions[key] = layers[key].position.y;
        }
      });

      const animateExplode = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);

        Object.keys(targetOffsets).forEach((key) => {
          if (layers[key]) {
            const start = startPositions[key] || 0;
            const target = targetOffsets[key];
            layers[key].position.y = start + (target - start) * ease;
          }
        });

        if (progress < 1) {
          requestAnimationFrame(animateExplode);
        }
      };

      requestAnimationFrame(animateExplode);
    }, []);

    const animateCameraTo = (x: number, y: number, z: number) => {
      if (!cameraRef.current) return;
      const camera = cameraRef.current;
      const startX = camera.position.x;
      const startY = camera.position.y;
      const startZ = camera.position.z;
      const duration = 900;
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
        if (controlsRef.current) controlsRef.current.update();

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    };

    const handleStartRFTrace = () => {
      isTracingRFRef.current = true;
      rfTraceProgressRef.current = 0;
      if (rfPulseMeshRef.current) rfPulseMeshRef.current.visible = true;
      animateCameraTo(-2.8, 1.8, -4.2);
    };

    const handleResetView = useCallback(() => {
      animateCameraTo(3.8, 2.5, 4.4);
      if (controlsRef.current) controlsRef.current.target.set(0, 0.25, 0);
      if (isExplodedRef.current) handleSetExploded(false);
      handleSetBand('all');
    }, [handleSetExploded, handleSetBand]);

    useImperativeHandle(ref, () => ({
      setBand: (band) => {
        setCurrentBand(band);
        handleSetBand(band);
      },
      setExploded: (exploded) => {
        setCurrentExploded(exploded);
        handleSetExploded(exploded);
      },
      startRFTrace: (onComplete) => {
        if (onComplete) onRFTraceCompleteRef.current = onComplete;
        handleStartRFTrace();
      },
      resetView: () => {
        setCurrentBand('all');
        setCurrentExploded(false);
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

      // 2. Camera setup
      const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
      camera.position.set(3.8, 2.5, 4.4);
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
        renderer.toneMappingExposure = 1.1;
      }
      rendererRef.current = renderer;

      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      container.appendChild(renderer.domElement);

      // 4. Lighting setup
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
      scene.add(ambientLight);

      const hemiLight = new THREE.HemisphereLight(0xffffff, 0x475569, 0.8);
      hemiLight.position.set(0, 20, 0);
      scene.add(hemiLight);

      const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
      keyLight.position.set(6, 12, 8);
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0xf1f5f9, 1.2);
      fillLight.position.set(-6, 6, -5);
      scene.add(fillLight);

      const crownLight = new THREE.DirectionalLight(0xffffff, 1.2);
      crownLight.position.set(0, 8, 2);
      scene.add(crownLight);

      const gridHelper = new THREE.GridHelper(12, 24, 0xcbd5e1, 0xf1f5f9);
      gridHelper.position.y = -1.6;
      scene.add(gridHelper);

      const shadowGeo = new THREE.PlaneGeometry(8, 8);
      const shadowMat = new THREE.ShadowMaterial({ opacity: 0.12 });
      const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
      shadowPlane.rotation.x = -Math.PI / 2;
      shadowPlane.position.y = -1.59;
      shadowPlane.receiveShadow = true;
      scene.add(shadowPlane);

      // 5. Controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.06;
      controls.minDistance = 2.0;
      controls.maxDistance = 10;
      controls.maxPolarAngle = Math.PI / 2 + 0.1;
      controls.target.set(0, 0.25, 0);
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.7;

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

      // 6. Helmet Group & Conformal Assembly
      const helmetGroup = new THREE.Group();
      helmetGroupRef.current = helmetGroup;
      scene.add(helmetGroup);

      const createCurvedSector = (
        radius: number,
        phiStart: number,
        phiLength: number,
        thetaStart: number,
        thetaLength: number
      ) => {
        const geo = new THREE.SphereGeometry(radius, 32, 24, phiStart, phiLength, thetaStart, thetaLength);
        const p = geo.attributes.position;
        for (let i = 0; i < p.count; i++) {
          p.setZ(i, p.getZ(i) * 1.15);
          p.setX(i, p.getX(i) * 0.98);
        }
        geo.computeVertexNormals();
        return geo;
      };

      const antennaGroup = new THREE.Group();
      antennaGroup.name = 'conformalAntenna';

      // Layer 1: AMC Ground Plane
      const amcMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        metalness: 0.7,
        roughness: 0.4,
        side: THREE.DoubleSide,
      });
      const amcGeo = createCurvedSector(1.408, -0.45 + Math.PI, 0.9, 0.05, 0.65);
      const amcMesh = new THREE.Mesh(amcGeo, amcMat);
      amcMesh.castShadow = true;
      layersRef.current['amc'] = amcMesh;
      antennaGroup.add(amcMesh);

      const amcGridMat = new THREE.MeshBasicMaterial({
        color: 0x059669,
        wireframe: true,
        transparent: true,
        opacity: 0.45,
      });
      const amcGrid = new THREE.Mesh(amcGeo, amcGridMat);
      amcMesh.add(amcGrid);

      // Layer 2: Rogers 5880
      const rogersMat = new THREE.MeshStandardMaterial({
        color: 0x2563eb,
        roughness: 0.35,
        metalness: 0.15,
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide,
      });
      const rogersGeo = createCurvedSector(1.416, -0.42 + Math.PI, 0.84, 0.06, 0.63);
      const rogersMesh = new THREE.Mesh(rogersGeo, rogersMat);
      rogersMesh.castShadow = true;
      layersRef.current['rogers'] = rogersMesh;
      antennaGroup.add(rogersMesh);

      // Layer 3: CST Antenna Panel
      const ANTENNA_RADIUS = 1.445;
      const PANEL_W = 1.8;
      const PANEL_H = 0.44;
      const SEGS_W = 28;
      const SEGS_H = 8;
      const thetaC = 0.3;
      const phiC = Math.PI;

      const cstGeo = new THREE.PlaneGeometry(PANEL_W, PANEL_H, SEGS_W, SEGS_H);
      const cpPos = cstGeo.attributes.position;
      for (let i = 0; i < cpPos.count; i++) {
        const px = cpPos.getX(i);
        const py = cpPos.getY(i);
        const dTheta = py * 0.19;
        const dPhi = px * 0.55;
        const theta = thetaC - dTheta;
        const phi = phiC + dPhi;
        const sx = ANTENNA_RADIUS * Math.sin(theta) * Math.cos(phi);
        const sy = ANTENNA_RADIUS * Math.cos(theta);
        const sz = ANTENNA_RADIUS * Math.sin(theta) * Math.sin(phi);
        cpPos.setXYZ(i, sx * 0.98, sy, sz * 1.15);
      }
      cstGeo.computeVertexNormals();

      const textureLoader = new THREE.TextureLoader();
      const cstPlaneMat = new THREE.MeshStandardMaterial({
        metalness: 0.48,
        roughness: 0.28,
        transparent: false,
        side: THREE.DoubleSide,
      });
      cstPlaneMatRef.current = cstPlaneMat;

      textureLoader.load(
        '/antenna_design.png',
        (tex) => {
          cstPlaneMat.map = tex;
          cstPlaneMat.needsUpdate = true;
        },
        undefined,
        () => {
          cstPlaneMat.color.setHex(0xb45309);
          cstPlaneMat.needsUpdate = true;
        }
      );

      const cstPlaneMesh = new THREE.Mesh(cstGeo, cstPlaneMat);
      cstPlaneMesh.castShadow = true;
      antennaGroup.add(cstPlaneMesh);

      // UHF and L-Band Overlays
      const buildHighlightMesh = (phiOffset: number, panelHalfW: number, mat: THREE.Material) => {
        const hGeo = new THREE.PlaneGeometry(panelHalfW, PANEL_H, 14, SEGS_H);
        const hPos = hGeo.attributes.position;
        for (let i = 0; i < hPos.count; i++) {
          const px = hPos.getX(i) + phiOffset;
          const py = hPos.getY(i);
          const theta = thetaC - py * 0.19;
          const phi = phiC + px * 0.55;
          const sx = ANTENNA_RADIUS * Math.sin(theta) * Math.cos(phi);
          const sy = ANTENNA_RADIUS * Math.cos(theta);
          const sz = ANTENNA_RADIUS * Math.sin(theta) * Math.sin(phi);
          hPos.setXYZ(i, sx * 0.98, sy, sz * 1.15);
        }
        hGeo.computeVertexNormals();
        return new THREE.Mesh(hGeo, mat);
      };

      const uhfMat = new THREE.MeshStandardMaterial({
        color: 0xc2410c,
        metalness: 0.9,
        roughness: 0.22,
        emissive: 0x4f46e5,
        emissiveIntensity: 0.15,
        transparent: true,
        opacity: 0.0,
        side: THREE.DoubleSide,
      });
      const uhfMesh = buildHighlightMesh(-0.45, PANEL_W * 0.5, uhfMat);
      layersRef.current['uhf'] = uhfMesh;
      antennaGroup.add(uhfMesh);

      const lbandMat = new THREE.MeshStandardMaterial({
        color: 0xea580c,
        metalness: 0.92,
        roughness: 0.2,
        emissive: 0x0284c7,
        emissiveIntensity: 0.15,
        transparent: true,
        opacity: 0.0,
        side: THREE.DoubleSide,
      });
      const lbandMesh = buildHighlightMesh(0.45, PANEL_W * 0.5, lbandMat);
      layersRef.current['lband'] = lbandMesh;
      antennaGroup.add(lbandMesh);

      // PIFA Feed Block
      const pifaFeedGeo = new THREE.BoxGeometry(0.04, 0.05, 0.04);
      const pifaFeedMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.8 });
      const pifaFeed = new THREE.Mesh(pifaFeedGeo, pifaFeedMat);
      pifaFeed.position.set(0, 1.34, -0.55);
      antennaGroup.add(pifaFeed);

      // Protective Conformal Lamination
      const lamMat = new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        roughness: 0.1,
        metalness: 0.05,
        transparent: true,
        opacity: 0.28,
        side: THREE.DoubleSide,
      });
      const lamGeo = createCurvedSector(1.432, -0.45 + Math.PI, 0.9, 0.05, 0.65);
      const lamMesh = new THREE.Mesh(lamGeo, lamMat);
      layersRef.current['lamination'] = lamMesh;
      antennaGroup.add(lamMesh);

      helmetGroup.add(antennaGroup);

      // Coaxial Feed & Connector
      const coaxPoints = [
        new THREE.Vector3(0, 1.15, -0.92),
        new THREE.Vector3(0, 0.95, -1.18),
        new THREE.Vector3(0, 0.58, -1.38),
        new THREE.Vector3(0, 0.22, -1.48),
        new THREE.Vector3(0, -0.05, -1.52),
      ];
      const coaxCurve = new THREE.CatmullRomCurve3(coaxPoints);
      coaxCurveRef.current = coaxCurve;

      const coaxGeo = new THREE.TubeGeometry(coaxCurve, 40, 0.024, 10, false);
      const coaxMat = new THREE.MeshStandardMaterial({ color: 0x111215, roughness: 0.8, metalness: 0.2 });
      const coaxMesh = new THREE.Mesh(coaxGeo, coaxMat);
      coaxMesh.castShadow = true;
      helmetGroup.add(coaxMesh);
      layersRef.current['coax'] = coaxMesh;

      const clipMat = new THREE.MeshStandardMaterial({ color: 0x222428, roughness: 0.6, metalness: 0.3 });
      [0.2, 0.55, 0.85].forEach((t) => {
        const pt = coaxCurve.getPoint(t);
        const clipGeo = new THREE.BoxGeometry(0.08, 0.03, 0.04);
        const clipMesh = new THREE.Mesh(clipGeo, clipMat);
        clipMesh.position.copy(pt);
        helmetGroup.add(clipMesh);
      });

      const connectorGroup = new THREE.Group();
      const connBaseGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.12, 16);
      const connMat = new THREE.MeshStandardMaterial({
        color: 0xca8a04,
        metalness: 0.92,
        roughness: 0.2,
      });
      const connBase = new THREE.Mesh(connBaseGeo, connMat);
      connBase.rotation.x = Math.PI / 2 + 0.35;
      connectorGroup.add(connBase);

      const ringGeo = new THREE.CylinderGeometry(0.052, 0.052, 0.04, 16);
      const ringMat = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.7, roughness: 0.3 });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2 + 0.35;
      ringMesh.position.set(0, -0.015, -0.02);
      connectorGroup.add(ringMesh);

      connectorGroup.position.set(0, -0.05, -1.54);
      helmetGroup.add(connectorGroup);
      layersRef.current['connector'] = connectorGroup;

      // Pulse Tracer
      const pulseGeo = new THREE.SphereGeometry(0.045, 16, 16);
      const pulseMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.95 });
      const rfPulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
      rfPulseMesh.visible = false;
      helmetGroup.add(rfPulseMesh);
      rfPulseMeshRef.current = rfPulseMesh;

      // Procedural fallback helmet function
      const buildTacticalHelmetFallback = () => {
        const shellMat = new THREE.MeshStandardMaterial({
          color: 0x1f2126,
          roughness: 0.82,
          metalness: 0.12,
          side: THREE.DoubleSide,
        });

        const shellGeo = new THREE.SphereGeometry(1.4, 64, 48, 0, Math.PI * 2, 0, Math.PI * 0.58);
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
          pos.setXYZ(i, x, y, z);
        }
        shellGeo.computeVertexNormals();

        const shellMesh = new THREE.Mesh(shellGeo, shellMat);
        shellMesh.castShadow = true;
        shellMesh.receiveShadow = true;
        helmetGroup.add(shellMesh);
        layersRef.current['shell'] = shellMesh;
      };

      // Load GLTF Model (/scene-v1.glb)
      const loader = new GLTFLoader();
      loader.load(
        '/scene-v1.glb',
        (gltf) => {
          const model = gltf.scene;
          // Orient the model so front faces +Z and rear nape faces -Z (back of helmet)
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

          helmetGroup.add(model);
          layersRef.current['shell'] = model;

          const modelTop = box.max.y * scale;
          if (controls) {
            controls.target.set(0, modelTop * 0.5, 0);
            controls.update();
          }
          camera.position.set(0, modelTop * 0.9, modelTop * 2.2);
          camera.lookAt(0, modelTop * 0.5, 0);
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
            const pt = coaxCurveRef.current.getPoint(rfTraceProgressRef.current);
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
          {/* Main Visual Presentation */}
          <div className="relative z-10 w-full max-w-lg flex flex-col items-center gap-4">
            {/* Image Preview with Dynamic Band Glow */}
            <div className="relative bg-white border border-borderdark p-3 shadow-md rounded-sm w-full flex items-center justify-center tech-corner-accent">
              <img
                src={currentExploded ? '/cst_antenna_design.png' : '/helmet_reference.jpg'}
                alt="Conformal Dual-Band Antenna Schematic"
                className="max-h-[320px] w-auto object-contain transition-all duration-300"
              />

              {/* Band Tag Overlay */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5 font-mono text-[10px]">
                <div
                  className={`px-2 py-0.5 border text-xs font-bold transition-all ${
                    currentBand === 'uhf' || currentBand === 'all'
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-sm'
                      : 'bg-white/80 border-slate-200 text-slate-400'
                  }`}
                >
                  UHF: 433 MHz {currentBand === 'uhf' || currentBand === 'all' ? '● TX/RX' : '○ STBY'}
                </div>
                <div
                  className={`px-2 py-0.5 border text-xs font-bold transition-all ${
                    currentBand === 'lband' || currentBand === 'all'
                      ? 'bg-sky-50 border-sky-500 text-sky-700 shadow-sm'
                      : 'bg-white/80 border-slate-200 text-slate-400'
                  }`}
                >
                  L-BAND: 1.51 GHz {currentBand === 'lband' || currentBand === 'all' ? '● TX/RX' : '○ STBY'}
                </div>
              </div>

              {/* Status indicator */}
              <div className="absolute bottom-3 right-3 font-mono text-[10px] text-slate-500 bg-white/90 px-2 py-1 border border-borderlight">
                {currentExploded ? 'EXPLODED STACK VIEW' : 'CONFORMAL FLUSH MOUNT'}
              </div>
            </div>

            {/* Information & Action Ribbon */}
            <div className="w-full bg-slate-50 border border-borderlight p-3 font-mono text-xs flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-slate-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="font-semibold text-charcoal">Calibrated Conformal View Active</span>
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

            {/* Explanatory Help Popup */}
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
