'use client';

import React, { useRef, useEffect } from 'react';

const setupCanvas = (canvas: HTMLCanvasElement) => {
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = (rect.width || 400) * dpr;
  canvas.height = (rect.height || 280) * dpr;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.scale(dpr, dpr);
  }
  return { ctx, width: rect.width || 400, height: rect.height || 280 };
};

const drawMarker = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string,
  title: string,
  val: string
) => {
  ctx.beginPath();
  ctx.arc(x, y, 5, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#ffffff';
  ctx.stroke();

  // Callout box
  const boxW = 120;
  const boxH = 34;
  const boxX = x > 300 ? x - boxW - 10 : x + 10;
  const boxY = y - 18;

  ctx.fillStyle = 'rgba(255, 255, 255, 0.96)';
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.fillRect(boxX, boxY, boxW, boxH);
  ctx.strokeRect(boxX, boxY, boxW, boxH);

  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 9px "JetBrains Mono", monospace';
  ctx.textAlign = 'left';
  ctx.fillText(title, boxX + 6, boxY + 13);

  ctx.fillStyle = color;
  ctx.font = '600 9px "JetBrains Mono", monospace';
  ctx.fillText(val, boxX + 6, boxY + 26);
};

export const PolarPatternCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = () => {
    if (!canvasRef.current) return;
    const { ctx, width, height } = setupCanvas(canvasRef.current);
    if (!ctx) return;

    const cx = width / 2;
    const cy = height / 2 + 10;
    const rMax = Math.min(width, height) * 0.42;

    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Concentric polar grid circles
    const rings = [
      { dBi: -20, r: rMax * 0.25 },
      { dBi: -10, r: rMax * 0.5 },
      { dBi: 0, r: rMax * 0.75 },
      { dBi: '+7.17', r: rMax * 1.0 },
    ];

    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;

    rings.forEach((ring) => {
      ctx.beginPath();
      ctx.arc(cx, cy, ring.r, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.textAlign = 'right';
      ctx.fillText(`${ring.dBi} dBi`, cx + ring.r - 4, cy - 4);
    });

    // Radial angle lines
    for (let a = 0; a < 360; a += 30) {
      const rad = (a * Math.PI) / 180;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + rMax * Math.cos(rad), cy + rMax * Math.sin(rad));
      ctx.stroke();

      if (a % 90 === 0) {
        ctx.fillStyle = '#64748b';
        ctx.font = 'bold 10px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const label = a === 270 ? '0° Zenith (Sky)' : a === 90 ? '180° Head (Operator)' : `${(a + 90) % 360}°`;
        const lx = cx + (rMax + 24) * Math.cos(rad);
        const ly = cy + (rMax + 24) * Math.sin(rad);
        ctx.fillText(label, lx, ly);
      }
    }

    // AMC/EBG Ground Shielding Boundary
    ctx.strokeStyle = '#059669';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(cx - rMax * 0.9, cy);
    ctx.lineTo(cx + rMax * 0.9, cy);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#059669';
    ctx.font = 'bold 9px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('AMC / EBG REFLECTION BOUNDARY', cx - rMax * 0.85, cy + 12);

    // Farfield Lobe
    ctx.beginPath();
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 2.2;

    const angleSteps = 180;
    for (let i = 0; i <= angleSteps; i++) {
      const angleDeg = (i / angleSteps) * 360;
      const angleRad = (angleDeg * Math.PI) / 180;

      const cosVal = Math.cos(angleRad - -Math.PI / 2);
      let gainFactor: number;
      if (cosVal > 0) {
        gainFactor = 0.35 + 0.65 * Math.pow(cosVal, 1.8);
      } else {
        gainFactor = 0.08 + 0.12 * Math.pow(Math.max(0, -cosVal), 2.5);
      }

      const r = rMax * gainFactor;
      const x = cx + r * Math.cos(angleRad);
      const y = cy + r * Math.sin(angleRad);

      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();

    // Gradient fill
    const lobeGrad = ctx.createRadialGradient(cx, cy - rMax * 0.5, 10, cx, cy, rMax);
    lobeGrad.addColorStop(0, 'rgba(2, 132, 199, 0.25)');
    lobeGrad.addColorStop(1, 'rgba(2, 132, 199, 0.02)');
    ctx.fillStyle = lobeGrad;
    ctx.fill();

    // Legends
    ctx.fillStyle = '#0f172a';
    ctx.font = '600 10px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('PEAK GAIN: ≈ 7.17 dBi (Zenith)', 16, 24);
    ctx.fillStyle = '#059669';
    ctx.fillText('HEAD-SHIELDING NULL: > -18 dB Suppression', 16, 38);
  };

  useEffect(() => {
    draw();
    const handleResize = () => draw();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} id="polar-canvas" className="w-full h-full block" />;
};

export const S11Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = () => {
    if (!canvasRef.current) return;
    const { ctx, width, height } = setupCanvas(canvasRef.current);
    if (!ctx) return;

    const pad = { top: 35, right: 30, bottom: 45, left: 55 };
    const plotW = width - pad.left - pad.right;
    const plotH = height - pad.top - pad.bottom;

    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Grid lines
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;

    // Y-Axis
    const yMin = -25;
    const yMax = 0;
    const ySteps = 5;
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillStyle = '#64748b';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';

    for (let i = 0; i <= ySteps; i++) {
      const val = yMax - i * 5;
      const y = pad.top + (i / ySteps) * plotH;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(width - pad.right, y);
      ctx.stroke();
      ctx.fillText(`${val} dB`, pad.left - 8, y);
    }

    // X-Axis
    const xMin = 300;
    const xMax = 1800;
    const xFreqs = [300, 435, 800, 1200, 1510, 1800];
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    xFreqs.forEach((freq) => {
      const x = pad.left + ((freq - xMin) / (xMax - xMin)) * plotW;
      ctx.beginPath();
      ctx.moveTo(x, pad.top);
      ctx.lineTo(x, height - pad.bottom);
      ctx.stroke();
      ctx.fillText(`${freq}M`, x, height - pad.bottom + 8);
    });

    // -10 dB Threshold line
    const y10 = pad.top + ((10 - 0) / 25) * plotH;
    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 4]);
    ctx.beginPath();
    ctx.moveTo(pad.left, y10);
    ctx.lineTo(width - pad.right, y10);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#f43f5e';
    ctx.textAlign = 'left';
    ctx.font = 'bold 9px "JetBrains Mono", monospace';
    ctx.fillText('-10 dB ACCEPTANCE THRESHOLD', pad.left + 8, y10 - 8);

    // S11 Curve
    const getS11 = (freq: number) => {
      let s11 = -2.8 - 0.001 * (freq - 300);
      const distUHF = (freq - 435.5) / 18.0;
      s11 -= 7.4 / (1 + distUHF * distUHF);
      const distL = (freq - 1510) / 32.0;
      s11 -= 15.3 / (1 + distL * distL);
      return Math.max(-24.5, s11);
    };

    ctx.beginPath();
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2.2;

    const numPoints = 250;
    for (let i = 0; i <= numPoints; i++) {
      const freq = xMin + (i / numPoints) * (xMax - xMin);
      const s11 = getS11(freq);
      const x = pad.left + ((freq - xMin) / (xMax - xMin)) * plotW;
      const y = pad.top + ((0 - s11) / (yMax - yMin)) * plotH;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Fill gradient
    ctx.lineTo(width - pad.right, height - pad.bottom);
    ctx.lineTo(pad.left, height - pad.bottom);
    ctx.closePath();
    const grad = ctx.createLinearGradient(0, pad.top, 0, height - pad.bottom);
    grad.addColorStop(0, 'rgba(15, 23, 42, 0.06)');
    grad.addColorStop(1, 'rgba(15, 23, 42, 0.0)');
    ctx.fillStyle = grad;
    ctx.fill();

    // Highlight Resonant Marker 1: UHF 435 MHz
    const xUHF = pad.left + ((435.5 - xMin) / (xMax - xMin)) * plotW;
    const yUHF = pad.top + ((0 - -10.2) / 25) * plotH;
    drawMarker(ctx, xUHF, yUHF, '#4f46e5', 'UHF: 435 MHz', 'S11 = -10.2 dB');

    // Highlight Resonant Marker 2: L-Band 1.51 GHz
    const xL = pad.left + ((1510 - xMin) / (xMax - xMin)) * plotW;
    const yL = pad.top + ((0 - -18.1) / 25) * plotH;
    drawMarker(ctx, xL, yL, '#0284c7', 'L-BAND: 1.51 GHz', 'S11 = -18.1 dB');

    // Axis Labels
    ctx.fillStyle = '#0f172a';
    ctx.font = '600 11px "JetBrains Mono", monospace';
    ctx.textAlign = 'right';
    ctx.fillText('Frequency (MHz)', width - pad.right, height - 12);
    ctx.save();
    ctx.translate(14, pad.top + plotH / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.fillText('Return Loss S11 (dB)', 0, 0);
    ctx.restore();
  };

  useEffect(() => {
    draw();
    const handleResize = () => draw();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} id="s11-canvas" className="w-full h-full block" />;
};

export const CouplingCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = () => {
    if (!canvasRef.current) return;
    const { ctx, width, height } = setupCanvas(canvasRef.current);
    if (!ctx) return;

    const pad = { top: 30, right: 30, bottom: 40, left: 55 };
    const plotW = width - pad.left - pad.right;
    const plotH = height - pad.top - pad.bottom;

    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Grid lines
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;

    // Y-Axis
    const yMin = -100;
    const yMax = -30;
    const ySteps = 7;
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillStyle = '#64748b';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';

    for (let i = 0; i <= ySteps; i++) {
      const val = yMax - i * 10;
      const y = pad.top + (i / ySteps) * plotH;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(width - pad.right, y);
      ctx.stroke();
      ctx.fillText(`${val} dB`, pad.left - 8, y);
    }

    // X-Axis
    const xMin = 400;
    const xMax = 1800;
    const xFreqs = [400, 700, 1000, 1300, 1600, 1800];
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    xFreqs.forEach((freq) => {
      const x = pad.left + ((freq - xMin) / (xMax - xMin)) * plotW;
      ctx.beginPath();
      ctx.moveTo(x, pad.top);
      ctx.lineTo(x, height - pad.bottom);
      ctx.stroke();
      ctx.fillText(`${freq}M`, x, height - pad.bottom + 8);
    });

    // Draw -45 dB and -90 dB Benchmark Zone
    const y45 = pad.top + ((yMax - -45) / (yMax - yMin)) * plotH;
    const y90 = pad.top + ((yMax - -90) / (yMax - yMin)) * plotH;

    ctx.fillStyle = 'rgba(5, 150, 105, 0.05)';
    ctx.fillRect(pad.left, y45, plotW, y90 - y45);

    ctx.strokeStyle = '#059669';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(pad.left, y45);
    ctx.lineTo(width - pad.right, y45);
    ctx.moveTo(pad.left, y90);
    ctx.lineTo(width - pad.right, y90);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#059669';
    ctx.font = 'bold 9px "JetBrains Mono", monospace';
    ctx.textAlign = 'right';
    ctx.fillText('HIGH-ISOLATION TARGET REGION (-45 to -90 dB)', width - pad.right - 8, y45 + 12);

    // S21 Isolation curve
    ctx.beginPath();
    ctx.strokeStyle = '#059669';
    ctx.lineWidth = 2.2;

    const numPoints = 180;
    for (let i = 0; i <= numPoints; i++) {
      const freq = xMin + (i / numPoints) * (xMax - xMin);
      const s21 = -65 - 18 * Math.sin((freq - 400) * 0.008) - 7 * Math.cos((freq - 600) * 0.02);
      const x = pad.left + ((freq - xMin) / (xMax - xMin)) * plotW;
      const y = pad.top + ((yMax - s21) / (yMax - yMin)) * plotH;

      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Axis Labels
    ctx.fillStyle = '#0f172a';
    ctx.font = '600 11px "JetBrains Mono", monospace';
    ctx.textAlign = 'right';
    ctx.fillText('Frequency (MHz)', width - pad.right, height - 12);
    ctx.save();
    ctx.translate(14, pad.top + plotH / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.fillText('Isolation S21 (dB)', 0, 0);
    ctx.restore();
  };

  useEffect(() => {
    draw();
    const handleResize = () => draw();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} id="coupling-canvas" className="w-full h-full block" />;
};
